import { skillData } from './data';
import { state, persist, toast } from './state';
import { show } from './navigation';

export function renderSkill(key) {
    const skill = skillData[key] || skillData.cybersecurity;
    state.skill = key; persist();
    document.querySelector('#pathName').textContent = skill.title; document.querySelector('#pathDescription').textContent = skill.copy;
    document.querySelector('#readiness').textContent = `${skill.readiness}%`; document.querySelector('#readinessBar').style.width = `${skill.readiness}%`;
    document.querySelector('#detailLabel').textContent = skill.label; document.querySelector('#detailTitle').textContent = skill.title; document.querySelector('#detailCopy').textContent = skill.copy;
    document.querySelector('#detailReadiness').textContent = `${skill.readiness}%`; document.querySelector('#detailReadinessBar').style.width = `${skill.readiness}%`; document.querySelector('#detailMatches').textContent = skill.matches;
    document.querySelector('#moduleGrid').innerHTML = skill.modules.map((module, index) => `<div class="module-card"><small>0${index + 1}</small><b>${module}</b><p>Practical learning for your ${skill.title.toLowerCase()} career path.</p></div>`).join('');
    show('detail');
}

export function initSkills() {
    const colors = ['s-purple', 's-blue', 's-green', 's-orange', 's-red', 's-lime', 's-indigo', 's-gold'];
    document.querySelector('#skillGrid').innerHTML = Object.entries(skillData).map(([key, skill], index) => `<button class="skill-card ${colors[index]}" data-skill="${key}" type="button"><small>${skill.readiness / 10} · Career path</small><b>${skill.title}</b><span>${skill.copy.split('.')[0]}.</span></button>`).join('');
    document.querySelectorAll('[data-skill]').forEach((button) => button.addEventListener('click', () => renderSkill(button.dataset.skill)));
    document.querySelector('#lastPathBtn').addEventListener('click', () => renderSkill(state.skill)); document.querySelector('#backSkills').addEventListener('click', () => show('skills'));
    document.querySelector('#enrollBtn').addEventListener('click', () => toast('Learning path started.')); document.querySelector('#saveBtn').addEventListener('click', () => toast('Skill path saved.')); document.querySelector('#matchesBtn').addEventListener('click', () => show('opportunities'));
}
