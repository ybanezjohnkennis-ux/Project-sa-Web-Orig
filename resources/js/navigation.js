import { state, persist, toast } from './state';

const csrfToken = () => document.querySelector('meta[name="csrf-token"]').content;

export async function authRequest(url, options = {}) {
    const request = () => fetch(url, {
        ...options,
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken(),
            ...(options.headers || {}),
        },
    });
    let response = await request();
    if (response.status === 419) {
        const page = await fetch(window.location.href, { credentials: 'same-origin' });
        const html = await page.text();
        const freshToken = new DOMParser().parseFromString(html, 'text/html').querySelector('meta[name="csrf-token"]')?.content;
        if (freshToken) {
            document.querySelector('meta[name="csrf-token"]').content = freshToken;
            response = await request();
        }

    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = Object.values(payload.errors || {}).flat()[0] || payload.message || 'Authentication failed.';
        throw new Error(message);
    }
    return payload;
}

let onboardingStep = 0;
const onboardingTotal = 8;
function renderOnboardingStep() {
    document.querySelectorAll('.onboarding-step').forEach((step) => step.classList.toggle('active', Number(step.dataset.step) === onboardingStep));
    document.querySelector('#onboardingProgress').style.width = `${((onboardingStep + 1) / onboardingTotal) * 100}%`;
    document.querySelector('#onboardingNext').textContent = onboardingStep === onboardingTotal - 1 ? 'Explore WorkBridge →' : 'Continue →';
}
function finishOnboarding() {
    state.onboardingComplete = true;
    state.profile.title = document.querySelector('#onboardingTitle').value.trim() || state.profile.title;
    state.profile.skills = document.querySelector('#onboardingSkills').value.trim() || state.profile.skills;
    persist();
    show('opportunities');
    toast('Your experience is ready.');
}
export function startOnboarding() {
    document.querySelector('#onboardingGreeting').textContent = `${state.user?.name?.split(' ')[0] || 'Welcome'}, let’s personalize your experience`;
    onboardingStep = 0;
    renderOnboardingStep();
    show('onboarding');
}

export function show(id) {
    document.querySelectorAll('.screen').forEach((screen) => screen.classList.toggle('active', screen.id === id));
    document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.go === id));
    document.querySelector('#mainNav').classList.remove('mobile-open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function openAccount(mode = 'signin', role = null) {
    if (state.user) {
        show('opportunities');
        return;
    }
    window.accountMode = mode;
    const accountModal = document.querySelector('#accountModal');
    accountModal.classList.remove('hidden');
    accountModal.classList.toggle('signin-mode', mode === 'signin');
    accountModal.classList.toggle('signup-mode', mode === 'signup');
    document.querySelector('#signInTab').classList.toggle('active', mode === 'signin');
    document.querySelector('#signUpTab').classList.toggle('active', mode === 'signup');
    document.querySelector('#accountTitle').textContent = mode === 'signin' ? 'Sign in' : 'Create your account';
    document.querySelector('#accountCopy').textContent = mode === 'signin' ? '' : 'Choose your account type.';
    document.querySelector('#roleChoices').style.display = mode === 'signup' && !role ? 'grid' : 'none';
    document.querySelector('#accountForm').classList.toggle('hidden', mode === 'signup' && !role);
    document.querySelector('#accountName').required = mode === 'signup';
    document.querySelector('#accountNameLabel').hidden = mode !== 'signup';
    document.querySelector('#accountEmailConfirmationLabel').hidden = mode !== 'signup';
    document.querySelector('#accountPasswordConfirmationLabel').hidden = mode !== 'signup';
    document.querySelector('#forgotPassword').hidden = mode !== 'signin';
    document.querySelector('#keepSignedIn').hidden = mode !== 'signin';
    document.querySelector('#signinJoin').hidden = mode !== 'signin';
    document.querySelector('#signinSocials').hidden = mode !== 'signin';
    document.querySelector('#signupSocials').hidden = mode !== 'signup';
    document.querySelector('#signinTerms').hidden = mode !== 'signin';
    document.querySelector('#signinDivider').hidden = mode !== 'signin';
    document.querySelector('.signup-switch').hidden = mode !== 'signup';
    document.querySelector('.signup-terms').hidden = mode !== 'signup';
    document.querySelector('#accountForm [type="submit"]').textContent = mode === 'signin' ? 'Sign in' : 'Continue';
    if (role && mode === 'signup') chooseRole(role);
}

export function chooseRole(role) {
    state.role = role;
    document.querySelector('#roleChoices').style.display = 'none';
    document.querySelector('#accountForm').classList.remove('hidden');
    document.querySelector('#accountEmailConfirmationLabel').hidden = window.accountMode !== 'signup';
    document.querySelector('#accountPasswordConfirmationLabel').hidden = window.accountMode !== 'signup';
    document.querySelector('#accountEmailConfirmation').required = window.accountMode === 'signup';
    document.querySelector('#accountPasswordConfirmation').required = window.accountMode === 'signup';
    document.querySelector('#accountModal').classList.remove('signin-mode');
    document.querySelector('#accountModal').classList.add('signup-mode');
    document.querySelector('#accountForm [type="submit"]').textContent = 'Continue';
    document.querySelector('#accountCopy').textContent = role === 'client' ? 'Client account: post jobs and find talent.' : 'Worker account: build your profile and find work.';
}

export function updateHeader() {
    const login = document.querySelector('#loginBtn');
    const start = document.querySelector('#startBtn');
    login.textContent = state.user ? 'My profile' : 'Sign in';
    start.textContent = state.user ? 'Messages' : 'Get started';
    login.onclick = () => state.user ? show('profile') : openAccount('signin');
    start.onclick = () => state.user ? show('messages') : openAccount('signup');
}

function applyTheme(theme) {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    const toggle = document.querySelector('#themeToggle');
    if (toggle) {
        toggle.textContent = theme === 'light' ? '☾' : '☼';
        toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
}

export function initNavigation() {
    applyTheme(localStorage.getItem('wb_theme') || 'light');
    document.querySelector('#themeToggle').addEventListener('click', () => {
        const theme = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
        localStorage.setItem('wb_theme', theme);
        applyTheme(theme);
    });
    document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => {
        const dest = button.dataset.go;
        // Require sign-in for all sections except welcome and about; prompt sign-in when unauthenticated
        const requiresAuth = dest !== 'welcome' && dest !== 'about';
        if (requiresAuth && !state.user) {
            openAccount('signin');
            return;
        }
        show(dest);
    }));
    document.querySelector('#menuBtn').addEventListener('click', () => document.querySelector('#mainNav').classList.toggle('mobile-open'));
    document.querySelector('#loginBtn').addEventListener('click', () => openAccount());
    document.querySelector('#startBtn').addEventListener('click', () => openAccount('signup'));
    document.querySelectorAll('.role-card[data-role]').forEach((button) => button.addEventListener('click', () => openAccount('signin')));
    document.querySelectorAll('[data-role-choice]').forEach((button) => button.addEventListener('click', () => chooseRole(button.dataset.roleChoice)));
    document.querySelector('#signInTab').addEventListener('click', () => openAccount('signin'));
    document.querySelector('#signUpTab').addEventListener('click', () => openAccount('signup'));
    document.querySelector('#signinJoin button').addEventListener('click', () => openAccount('signup'));
    document.querySelector('#switchToSignIn').addEventListener('click', () => openAccount('signin'));
    document.querySelector('#passwordVisibility').addEventListener('click', (event) => {
        const password = document.querySelector('#accountPassword');
        password.type = password.type === 'password' ? 'text' : 'password';
        event.currentTarget.setAttribute('aria-label', password.type === 'password' ? 'Show password' : 'Hide password');
    });
    document.querySelector('#accountForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const submit = event.currentTarget.querySelector('[type="submit"]');
        submit.disabled = true;
        try {
            const payload = await authRequest(window.accountMode === 'signup' ? '/auth/register' : '/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    name: document.querySelector('#accountName').value.trim(),
                    email: document.querySelector('#accountEmail').value.trim(),
                    email_confirmation: document.querySelector('#accountEmailConfirmation').value.trim(),
                    password: document.querySelector('#accountPassword').value,
                    password_confirmation: document.querySelector('#accountPasswordConfirmation').value,
                    role: state.role,
                }),
            });
            if (window.accountMode === 'signup') {
                const registeredEmail = payload.user.email;
                const registeredRole = payload.user.role;
                state.user = null;
                state.role = registeredRole;
                persist();
                document.querySelector('#accountEmail').value = registeredEmail;
                document.querySelector('#accountPassword').value = '';
                openAccount('signin', registeredRole);
                toast('Account created. Please sign in.');
            } else {
                state.user = payload.user;
                state.role = payload.user.role;
                state.profile.name = payload.user.name;
                persist();
                updateHeader();
                window.dispatchEvent(new Event('auth:updated'));
                document.querySelector('#accountModal').classList.add('hidden');
                toast('Signed in.');
                if (!state.onboardingComplete && state.role === 'worker') startOnboarding();
                else show('opportunities');
            }
        } catch (error) {
            toast(error.message);
        } finally {
            submit.disabled = false;
        }
    });
    loadCurrentUser();
    document.querySelector('#onboardingNext').addEventListener('click', () => {
        const step = document.querySelector(`.onboarding-step[data-step="${onboardingStep}"]`);
        if (onboardingStep === 0) state.onboarding.location = document.querySelector('#onboardingLocation').value.trim();
        if (onboardingStep === 1) { state.onboarding.experience = document.querySelector('#onboardingExperience').value.trim(); state.onboarding.company = document.querySelector('#onboardingCompany').value.trim(); }
        if (onboardingStep === 2 && !state.onboarding.looking) { toast('Choose an option to continue.'); return; }
        if (onboardingStep === 3) state.onboarding.interests = document.querySelector('#onboardingInterests').value.split(',').map((item) => item.trim()).filter(Boolean);
        if (onboardingStep === 4) state.onboarding.notifications = document.querySelector('#onboardingNotifications').checked;
        if (onboardingStep < onboardingTotal - 1) { onboardingStep += 1; renderOnboardingStep(); } else finishOnboarding();
    });
    document.querySelector('#onboardingSkip').addEventListener('click', finishOnboarding);
    document.querySelectorAll('[data-onboarding-choice]').forEach((button) => button.addEventListener('click', () => {
        state.onboarding[button.dataset.onboardingChoice] = button.dataset.value;
        document.querySelectorAll(`[data-onboarding-choice="${button.dataset.onboardingChoice}"]`).forEach((item) => item.classList.toggle('selected', item === button));
    }));
}

async function loadCurrentUser() {
    try {
        const payload = await authRequest('/auth/me');
        if (payload.user) {
            state.user = payload.user;
            state.role = payload.user.role;
            state.profile.name = payload.user.name;
            persist();
            updateHeader();
            document.querySelector('#accountModal')?.classList.add('hidden');
            window.dispatchEvent(new Event('auth:updated'));
            if (!state.onboardingComplete && state.role === 'worker') startOnboarding();
        }
    } catch {
        state.user = null;
        state.role = null;
        persist();
    }
}
