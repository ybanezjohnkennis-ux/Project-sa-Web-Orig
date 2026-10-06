import { jobs } from './data';
import { state, persist, toast } from './state';
import { openAccount, show } from './navigation';

let category = 'All Categories';
let filter = 'all';
let pendingResumeFile = null;

function allJobs() {
    const posted = (state.clientJobs || []).map((job) => ({ ...job, source: 'client' }));
    return [...jobs, ...posted];
}

function openJob(id) {
    state.activeJob = allJobs().find((job) => job.id === id);
    if (!state.activeJob) return;
    document.querySelector('#jobTitle').textContent = state.activeJob.title;
    document.querySelector('#jobCopy').textContent = state.activeJob.desc;
    document.querySelector('#jobMeta').innerHTML = `<div class="job-summary"><strong>${state.activeJob.company}</strong><p>${state.activeJob.cat} · ${state.activeJob.place} · ${state.activeJob.salary}</p></div>`;
    document.querySelector('#starJobBtn').textContent = state.starred.includes(id) ? '★ Starred' : '☆ Star';
    document.querySelector('#jobModal').classList.remove('hidden');
}

export function renderJobs() {
    const query = document.querySelector('#jobSearch').value.toLowerCase().trim();
    const filtered = allJobs().filter((job) => (category === 'All Categories' || job.cat === category) && (filter === 'all' || job.type === filter || (filter === 'remote' && job.place.toLowerCase().includes('remote'))) && (!query || `${job.title} ${job.company} ${job.cat} ${job.tags.join(' ')}`.toLowerCase().includes(query)));
    document.querySelector('#jobGrid').innerHTML = filtered.length ? filtered.map((job) => `<article class="job-card"><div class="company-line"><span class="company-logo">${job.company[0]}</span><span class="match">${job.match}% match</span></div><h3>${job.title}</h3><p>${job.company} · ${job.place} · ${job.salary}</p><div class="job-tags">${job.tags.map((tag) => `<span>${tag}</span>`).join('')}</div><button class="job-btn" data-job="${job.id}" type="button">View job post &rarr;</button></article>`).join('') : '<div class="no-results">No jobs match your filters.</div>';
    document.querySelectorAll('[data-job]').forEach((button) => button.addEventListener('click', () => openJob(button.dataset.job)));
}

function submitApplication() {
    const job = state.activeJob;
    if (!job || state.applications.some((application) => application.jobId === job.id)) {
        toast('You already applied to this opportunity.');
        return;
    }
    state.applications.unshift({
        id: Date.now(),
        jobId: job.id,
        title: job.title,
        company: job.company,
        submitted: new Date().toLocaleDateString(),
        status: 'Pending Review',
        resume: state.resume.name,
        applicant: state.user ? { id: state.user.id, name: state.user.name, email: state.user.email } : null,
        clientId: job.ownerId || null,
    });
    persist();
    document.querySelector('#jobModal').classList.add('hidden');
    document.querySelector('#resumeUploadModal').classList.add('hidden');
    toast('Application submitted with your resume.');
    show('profile');
    setTimeout(() => document.querySelector('[data-profile="pending"]')?.click(), 0);
    window.dispatchEvent(new Event('auth:updated'));
}

function openResumeUpload() {
    document.querySelector('#jobModal').classList.add('hidden');
    document.querySelector('#resumeJobTitle').textContent = state.activeJob.title;
    document.querySelector('#resumeUploadName').textContent = 'No file selected';
    document.querySelector('#continueApplicationBtn').disabled = true;
    pendingResumeFile = null;
    document.querySelector('#resumeUploadModal').classList.remove('hidden');
}

function initResumeUpload() {
    document.querySelector('#chooseJobResumeBtn').addEventListener('click', () => document.querySelector('#jobResumeInput').click());
    document.querySelector('#jobResumeInput').addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!/\.(pdf|doc|docx)$/i.test(file.name)) { toast('Choose a PDF, DOC, or DOCX file.'); return; }
        if (file.size > 4 * 1024 * 1024) { toast('Choose a resume smaller than 4 MB.'); return; }
        pendingResumeFile = file;
        document.querySelector('#resumeUploadName').textContent = file.name;
        document.querySelector('#continueApplicationBtn').disabled = false;
    });
    document.querySelector('#continueApplicationBtn').addEventListener('click', () => {
        if (!pendingResumeFile) return;
        const reader = new FileReader();
        reader.onload = () => {
            state.resume = { name: pendingResumeFile.name, type: pendingResumeFile.type, size: pendingResumeFile.size, data: reader.result, updated: new Date().toLocaleDateString() };
            persist();
            submitApplication();
        };
        reader.readAsDataURL(pendingResumeFile);
    });
}

export function initOpportunities() {
    const categories = ['All Categories', ...new Set(allJobs().map((job) => job.cat))];
    document.querySelector('#categoryBar').innerHTML = categories.map((item) => `<button class="category-btn ${item === category ? 'active' : ''}" data-category="${item}" type="button">${item}</button>`).join('');
    document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => { category = button.dataset.category; document.querySelectorAll('[data-category]').forEach((item) => item.classList.toggle('active', item === button)); renderJobs(); }));
    document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button)); renderJobs(); }));
    document.querySelector('#jobSearch').addEventListener('input', renderJobs);
    document.querySelector('#starJobBtn').addEventListener('click', () => { const id = state.activeJob.id; state.starred = state.starred.includes(id) ? state.starred.filter((item) => item !== id) : [...state.starred, id]; persist(); openJob(id); toast('Starred jobs updated.'); });
    document.querySelector('#applyBtn').addEventListener('click', () => {
        if (!state.user) { document.querySelector('#jobModal').classList.add('hidden'); openAccount('signup', 'worker'); toast('Create a worker account to apply.'); return; }
        if (state.role !== 'worker') { toast('Only worker accounts can apply to opportunities.'); return; }
        if (state.applications.some((application) => application.jobId === state.activeJob.id)) { toast('You already applied to this opportunity.'); return; }
        if (!state.resume) { openResumeUpload(); return; }
        submitApplication();
    });
    initResumeUpload();
    window.addEventListener('jobs:updated', renderJobs);
    renderJobs();
}
