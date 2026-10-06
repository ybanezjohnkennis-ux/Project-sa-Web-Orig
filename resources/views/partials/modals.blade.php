

<div class="modal hidden" id="accountModal">
    <div class="modal-card">
        <button class="close-btn" data-close="accountModal" type="button">&times;</button>
        <p class="tiny-label account-eyebrow">WORKBRIDGE ACCOUNT</p>
        <h3 id="accountTitle">Sign in</h3>
        <p id="accountCopy">Access your account to get started.</p>
        <p id="signinJoin" class="signin-join">New to WorkBridge? <button type="button">Join now</button></p>
        <div class="account-switch" role="tablist" aria-label="Account tabs">
            <button id="signInTab" class="active" type="button">Sign in</button>
            <button id="signUpTab" type="button">Create account</button>
        </div>
        <div class="social-signin" id="signinSocials">
            <button class="social-provider social-google" type="button"><span class="provider-avatar">S</span><span><strong>Continue as Shine Hope</strong><small>jagdoh.shinehope@llc.edu.ph</small></span><b>G</b></button>
            <button class="social-provider" type="button"><span class="provider-icon microsoft-icon">■</span><strong>Sign in with Microsoft</strong></button>
            <button class="social-provider" type="button"><span class="provider-icon apple-icon">●</span><strong>Sign in with Apple</strong></button>
        </div>
        <div class="social-signin signup-socials" id="signupSocials">
            <button class="pill-btn pill-outline" type="button">Continue with Google</button>
            <button class="pill-btn pill-outline" type="button">Continue with LinkedIn</button>
        </div>
        <p id="signinTerms" class="signin-terms">By continuing, you agree to WorkBridge's <a href="#">User Agreement</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.</p>
        <div id="signinDivider" class="signin-divider"><span>or</span></div>
        <form id="accountForm" class="account-form hidden">
            <label id="accountNameLabel">Full name<input id="accountName" placeholder="Your full name"></label>
            <label>Email or phone<input id="accountEmail" type="email" required placeholder="you@example.com"></label>
            <label id="accountEmailConfirmationLabel">Confirm email<input id="accountEmailConfirmation" type="email" placeholder="Confirm email"></label>
            <label>Password<input id="accountPassword" type="password" minlength="6" required placeholder="Password"><button id="passwordVisibility" class="password-visibility" type="button" aria-label="Show password">◉</button></label>
            <label id="accountPasswordConfirmationLabel">Confirm password<input id="accountPasswordConfirmation" type="password" minlength="6" placeholder="Confirm password"></label>
            <a id="forgotPassword" class="forgot-password" href="#">Forgot password?</a>
            <label id="keepSignedIn" class="keep-signed-in"><input type="checkbox"> <span>Keep me signed in</span></label>
            <div class="account-submit-row"><button class="pill-btn pill-orange" type="submit">Sign in</button><span class="signup-terms">By continuing you agree to our Terms</span></div>
            <div class="signup-switch">Already have an account? <button id="switchToSignIn" type="button">Sign in</button></div>
        </form>
        <div id="roleChoices" class="choice-grid" style="margin-top:14px;">
            <button class="choice" data-role-choice="client" type="button">
                <b>Client</b>
                <span>I am hiring talent.</span>
            </button>
            <button class="choice" data-role-choice="worker" type="button">
                <b>Worker</b>
                <span>I am looking for work.</span>
            </button>
        </div>
    </div>
</div>
<div class="modal hidden" id="jobModal">
    <div class="modal-card">
        <button class="close-btn" data-close="jobModal" type="button">&times;</button>
        <p class="tiny-label">JOB POST</p><h3 id="jobTitle">Job</h3>
        <p id="jobCopy"></p>
        <div id="jobMeta"></div>
        <div class="modal-actions">
            <button class="pill-btn pill-dark" id="starJobBtn" type="button">☆ Star</button>
            <button class="pill-btn pill-orange" id="applyBtn" type="button">Apply now &rarr;</button></div></div></div>
<div class="modal hidden" id="resumeUploadModal">
    <div class="modal-card resume-upload-card">
        <button class="close-btn" data-close="resumeUploadModal" type="button">&times;</button>
        <p class="tiny-label">APPLICATION REQUIREMENT</p>
        <h3>Upload your resume</h3>
        <p>Attach a resume before applying to <strong id="resumeJobTitle">this opportunity</strong>.</p>
        <div class="resume-upload-box">
            <div class="resume-file-icon">PDF</div>
            <div><strong id="resumeUploadName">No file selected</strong><span>PDF, DOC, or DOCX · Maximum 4 MB</span></div></div>
            <input id="jobResumeInput" type="file" accept=".pdf,.doc,.docx" hidden>
            <button class="pill-btn pill-outline" id="chooseJobResumeBtn" type="button">Choose resume</button>
            <div class="modal-actions">
                <button class="pill-btn pill-dark" data-close="resumeUploadModal" type="button">Cancel</button>
                <button class="pill-btn pill-orange" id="continueApplicationBtn" type="button" disabled>Continue application &rarr;</button></div></div></div>
<div class="modal hidden" id="profileModal">
    <div class="modal-card">
        <button class="close-btn" data-close="profileModal" type="button">&times;</button>
        <p class="tiny-label">PROFILE SETTINGS</p>
        <h3>Edit your profile</h3>
        <form id="profileForm" class="account-form">
            <label>Full name<input id="profileFullName" required></label><label>Professional title<input id="profileTitle"></label><label>Skills<input id="profileSkills"></label><label>About you<textarea id="profileBio"></textarea></label><button class="pill-btn pill-orange" type="submit">Save profile</button></form></div></div>
<div class="modal hidden" id="postJobModal">
    <div class="modal-card">
        <button class="close-btn" data-close="postJobModal" type="button">&times;</button>
        <p class="tiny-label">CLIENT OPPORTUNITY</p>
        <h3>Post a job</h3>
        <p>Share a clear opportunity so workers can understand the role and apply.</p>
        <form id="postJobForm" class="account-form">
            <label>Job title<input id="postJobTitle" required maxlength="120"></label>
            <label>Category<select id="postJobCategory" required>
                <option>Admin & Virtual Assistants</option>
                <option>Customer Support</option>
                <option>Web & Tech</option>
                <option>Content & Social Media</option>
                <option>Creative & Design</option>
                <option>AI & Automation</option>
                <option>Others</option></select></label>
                <label id="otherCategoryLabel" hidden>Other category<input id="postJobOtherCategory" maxlength="80"></label>
                <label>Location<input id="postJobPlace" placeholder="Remote or city" required maxlength="120"></label>
                <label>Work type<select id="postJobType" required>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="gig">Gig</option></select></label>
                    <label>Budget / salary<input id="postJobBudget" placeholder="e.g. ₱30k–₱40k" required maxlength="80"></label>
                    <label>Description<textarea id="postJobDescription" required maxlength="1000"></textarea></label>
                    <label>Skills</label><div class="skill-options"><label><input type="checkbox" value="Communication"> Communication</label>
                    <label><input type="checkbox" value="Customer Service"> Customer Service</label>
                    <label><input type="checkbox" value="Microsoft Office"> Microsoft Office</label>
                    <label><input type="checkbox" value="JavaScript"> JavaScript</label>
                    <label><input type="checkbox" value="Design"> Design</label>
                    <label><input type="checkbox" value="Others" id="otherSkillChoice"> Others</label></div>
                    <input id="postJobOtherSkill" placeholder="Specify other skills" maxlength="100" hidden>
                    <button class="pill-btn pill-orange" type="submit">Publish job &rarr;</button></form></div></div>
<div class="modal hidden" id="resumePreviewModal">
    <div class="modal-card resume-preview-card">
        <button class="close-btn" data-close="resumePreviewModal" type="button">&times;</button>
        <p class="tiny-label">RESUME PREVIEW</p>
        <h3 id="previewResumeTitle">Resume</h3>
        <div class="resume-preview-frame" id="resumePreviewFrame"></div>
        <div class="modal-actions">
            <button class="pill-btn pill-dark" data-close="resumePreviewModal" type="button">Close</button>
            <button class="pill-btn pill-orange" id="previewDownloadBtn" type="button">Download resume</button></div></div></div>
