import './bootstrap';
import '../css/app.css';
import { state } from './state';
import { initNavigation, updateHeader, show } from './navigation';
import { initSkills, renderSkill } from './skills';
import { initOpportunities } from './opportunities';
import { initProfile, renderProfile } from './profile';
import { initMessages } from './messages';

document.addEventListener('DOMContentLoaded', () => {
	initNavigation();
	initSkills();
	initOpportunities();
	initProfile();
	initMessages();
	renderSkill(state.skill);
	show('welcome');
	renderProfile();
	updateHeader();

	document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => {
		document.querySelector(`#${button.dataset.close}`).classList.add('hidden');
	}));
	document.querySelectorAll('.modal').forEach((modal) => modal.addEventListener('click', (event) => {
		if (event.target === modal) modal.classList.add('hidden');
	}));
});
