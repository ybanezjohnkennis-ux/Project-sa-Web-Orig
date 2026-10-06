const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export const state = {
    role: localStorage.getItem('wb_role') || null,
    user: read('wb_user', null),
    skill: localStorage.getItem('wb_skill') || 'cybersecurity',
    starred: read('wb_starred', []),
    applications: read('wb_applications', []),
    resume: read('wb_resume', null),
    profile: read('wb_profile', { name: '', title: '', skills: '', bio: '' }),
    messages: read('wb_messages', [{ id: 'support', name: 'WorkBridge Support', sub: 'Platform support', unread: false, chat: [{ who: 'them', text: 'Welcome to WorkBridge. Need help with your profile or application?' }] }]),
    clientJobs: read('wb_clientJobs', []),
    activeJob: null,
    selectedChat: null,
    onboardingComplete: localStorage.getItem('wb_onboarding_complete') === '1',
    onboarding: read('wb_onboarding', {}),
};

export function persist() {
    localStorage.setItem('wb_role', state.role || '');
    localStorage.setItem('wb_user', JSON.stringify(state.user));
    localStorage.setItem('wb_skill', state.skill);
    localStorage.setItem('wb_starred', JSON.stringify(state.starred));
    localStorage.setItem('wb_applications', JSON.stringify(state.applications));
    localStorage.setItem('wb_profile', JSON.stringify(state.profile));
    localStorage.setItem('wb_messages', JSON.stringify(state.messages));
    localStorage.setItem('wb_clientJobs', JSON.stringify(state.clientJobs));
    if (state.resume) localStorage.setItem('wb_resume', JSON.stringify(state.resume));
    else localStorage.removeItem('wb_resume');
    localStorage.setItem('wb_onboarding_complete', state.onboardingComplete ? '1' : '0');
    localStorage.setItem('wb_onboarding', JSON.stringify(state.onboarding));
}

export function toast(message) {
    const element = document.querySelector('#toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(window.workbridgeToast);
    window.workbridgeToast = setTimeout(() => element.classList.remove('show'), 2400);
}

export const initials = (name = 'Guest User') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'W';
