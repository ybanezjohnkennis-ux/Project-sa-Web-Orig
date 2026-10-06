<section id="onboarding" class="screen onboarding-screen">
    <div class="onboarding-card">
        <div class="onboarding-progress"><span id="onboardingProgress"></span></div>
        <p class="tiny-label">PERSONALIZE YOUR WORKBRIDGE</p>
        <div id="onboardingSteps">
            <div class="onboarding-step active" data-step="0"><h2 id="onboardingGreeting">Welcome</h2><p>Let us personalize your experience before you explore.</p><label>Where are you based?<input id="onboardingLocation" placeholder="City, country"></label></div>
            <div class="onboarding-step" data-step="1"><h2>What is your most recent experience?</h2><p>You can always change this later.</p><label>Job title or current focus<input id="onboardingExperience" placeholder="e.g. Student, Web Developer"></label><label>Company or school<input id="onboardingCompany" placeholder="Optional"></label></div>
            <div class="onboarding-step" data-step="2"><h2>Are you looking for a job?</h2><p>Your answer helps us personalize opportunities.</p><div class="onboarding-options"><button data-onboarding-choice="looking" data-value="actively">Yes, I’m actively looking</button><button data-onboarding-choice="looking" data-value="maybe">Maybe, if I see the right opportunity</button><button data-onboarding-choice="looking" data-value="not-now">No, I’m not looking right now</button></div></div>
            <div class="onboarding-step" data-step="3"><h2>What kind of jobs interest you?</h2><p>Add roles you would consider.</p><label>Job titles<input id="onboardingInterests" placeholder="e.g. Customer Support, Web Developer"></label><div id="onboardingInterestTags" class="selected-tags"></div></div>
            <div class="onboarding-step" data-step="4"><h2>Set up your job notifications</h2><p>Recommended alerts based on your interests.</p><label class="check-row"><input id="onboardingNotifications" type="checkbox" checked> Send me relevant opportunity updates</label></div>
            <div class="onboarding-step" data-step="5"><h2>Complete your profile</h2><p>A clear profile helps you connect with the right people.</p><label>Professional title<input id="onboardingTitle" placeholder="e.g. Junior Web Developer"></label><label>Skills<input id="onboardingSkills" placeholder="e.g. JavaScript, Communication"></label></div>
            <div class="onboarding-step" data-step="6"><h2>Connect with opportunities</h2><p>You can message clients and collaborators from your inbox.</p><div class="onboarding-info">Your profile and preferences help WorkBridge show better matches.</div></div>
            <div class="onboarding-step" data-step="7"><h2>You are ready to explore</h2><p>Browse skills, opportunities, messages, and your profile.</p><div class="onboarding-info">You can update these details anytime from Edit profile.</div></div>
        </div>
        <div class="onboarding-actions"><button class="pill-btn pill-outline" id="onboardingSkip" type="button">Skip</button><button class="pill-btn pill-orange" id="onboardingNext" type="button">Continue &rarr;</button></div>
    </div>
</section>
