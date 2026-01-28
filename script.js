// Wait for the DOM to fully load before running our script
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    // We select all the elements we need to manipulate
    const greetingText = document.getElementById('greeting-text');

    // Daily Plan Elements
    const planContent = document.getElementById('todays-plan-content');
    const editPlanBtn = document.getElementById('edit-plan-btn');

    // Stats Displays
    const streakDisplay = document.getElementById('streak-display');
    const totalFocusDisplay = document.getElementById('total-focus-display');
    const profileFocusDisplay = document.getElementById('profile-focus-display');
    const profileSessionsDisplay = document.getElementById('profile-sessions-display');

    // Profile Elements
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const editProfileBtn = document.getElementById('edit-profile-btn');

    // Timer Elements
    const timerDisplay = document.getElementById('timer-display');
    const timerStatus = document.getElementById('timer-status');
    const timerProgress = document.getElementById('timer-progress');
    const toggleBtn = document.getElementById('toggle-timer-btn');
    const resetBtn = document.getElementById('reset-btn');
    const modePills = document.querySelectorAll('.mode-pill');

    // Stopwatch Elements
    const switchBtn = document.getElementById('switch-mode-text-btn');
    const timerGroup = document.getElementById('timer-ui-group');
    const stopwatchUI = document.getElementById('stopwatch-ui');
    const stopwatchControls = document.getElementById('stopwatch-controls');
    const swDisplay = document.getElementById('stopwatch-display');
    const swToggle = document.getElementById('sw-toggle-btn');
    const swReset = document.getElementById('sw-reset-btn');

    function setGreeting() {
        if (!greetingText) return;

        const hour = new Date().getHours();
        let greeting = "Good Morning";
        if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
        else if (hour >= 17) greeting = "Good Evening";

        greetingText.textContent = `${greeting}, Friend!`;
    }
    setGreeting();

    // --- Local Storage Loading ---
    // We use parseInt because LocalStorage saves everything as a string
    let totalFocusSeconds = parseInt(localStorage.getItem('FocusSeconds')) || 0;

    function updateFocusDisplay() {
        const totalMinutes = Math.floor(totalFocusSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const displayString = `${hours}h ${mins}m`;

        if (totalFocusDisplay) totalFocusDisplay.textContent = displayString;
        if (profileFocusDisplay) profileFocusDisplay.textContent = displayString;
    }
    updateFocusDisplay();

    let totalSessions = parseInt(localStorage.getItem('Sessions')) || 0;
    if (profileSessionsDisplay) profileSessionsDisplay.textContent = totalSessions;


    function loadDailyPlan() {
        if (!planContent) return;
        const savedPlan = localStorage.getItem('DailyPlan');
        if (savedPlan && savedPlan.trim() !== "") {
            planContent.textContent = savedPlan;
            planContent.classList.remove('placeholder');
        } else {
            planContent.textContent = "What's your main goal for today?";
            planContent.classList.add('placeholder');
        }
    }
    loadDailyPlan();

    if (editPlanBtn && planContent) {
        editPlanBtn.addEventListener('click', () => {
            const isEditable = planContent.getAttribute('contenteditable') === 'true';

            if (isEditable) {
                planContent.setAttribute('contenteditable', 'false');
                editPlanBtn.textContent = '✎';
                editPlanBtn.classList.remove('active');

                const text = planContent.textContent.trim();
                localStorage.setItem('DailyPlan', text);

                if (text === "") {
                    planContent.textContent = "What's your main goal for today?";
                    planContent.classList.add('placeholder');
                }
            } else {
                if (planContent.classList.contains('placeholder')) {
                    planContent.textContent = "";
                    planContent.classList.remove('placeholder');
                }

                planContent.setAttribute('contenteditable', 'true');
                editPlanBtn.innerHTML = '<svg class="icon-svg" style="width: 16px; height: 16px;" viewBox="0 0 407.096 407.096" xmlns="http://www.w3.org/2000/svg"><g><path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"/><path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"/></g></svg>';
            }
        });
    }

    if (streakDisplay) {
        let streak = parseInt(localStorage.getItem('Streak')) || 0;
        const lastVisit = localStorage.getItem('LastVisit');
        const today = new Date().toDateString();

        if (lastVisit !== today) {
            if (lastVisit) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastVisit === yesterday.toDateString()) {
                    streak++;
                } else {
                    streak = 1;
                }
            } else {
                streak = 1;
            }

            localStorage.setItem('Streak', streak);
            localStorage.setItem('LastVisit', today);
        }

        streakDisplay.textContent = streak;
    }

    if (editProfileBtn && profileName && profileBio) {
        const savedName = localStorage.getItem('ProfileName');
        const savedBio = localStorage.getItem('ProfileBio');

        if (savedName) profileName.textContent = savedName;
        if (savedBio) profileBio.textContent = savedBio;

        editProfileBtn.addEventListener('click', () => {
            const isEditable = profileName.getAttribute('contenteditable') === 'true';

            if (isEditable) {
                profileName.setAttribute('contenteditable', 'false');
                profileBio.setAttribute('contenteditable', 'false');

                editProfileBtn.textContent = 'Edit Profile';
                editProfileBtn.classList.remove('btn-primary');
                editProfileBtn.classList.add('btn-ghost');

                // Clear inline styles applied during edit mode
                editProfileBtn.style.border = '';
                editProfileBtn.style.color = '';

                // Reset text area styles
                profileName.style.borderColor = 'transparent';
                profileName.style.background = 'transparent';
                profileBio.style.borderColor = 'transparent';
                profileBio.style.background = 'transparent';

                // Save to LocalStorage
                localStorage.setItem('ProfileName', profileName.textContent);
                localStorage.setItem('ProfileBio', profileBio.textContent);

                // Explicitly blur fields to remove any focus ring
                profileName.blur();
                profileBio.blur();

            } else {
                profileName.setAttribute('contenteditable', 'true');
                profileBio.setAttribute('contenteditable', 'true');

                profileName.focus();

                editProfileBtn.textContent = 'Save Profile';
                editProfileBtn.classList.remove('btn-primary');
                editProfileBtn.classList.add('btn-ghost');
                editProfileBtn.style.border = '1px solid var(--primary)';
                editProfileBtn.style.color = 'var(--primary)';

                profileName.style.borderColor = 'var(--primary)';
                profileName.style.background = 'var(--bg-body)';
                profileBio.style.borderColor = 'var(--primary)';
                profileBio.style.background = 'var(--bg-body)';
            }
        });
    }

    if (timerDisplay && timerProgress) {

        // Initialize Timer Variables
        let countdown;
        let isRunning = false;
        let timeLeft = 25 * 60; // Default to 25 minutes
        let totalTime = 25 * 60;
        let currentMode = 'focus';

        // Calculate the SVG circle circumference for the progress bar
        // Radius is approx 140px in our CSS
        const circumference = 2 * Math.PI * 140;

        timerProgress.style.strokeDasharray = `${circumference} ${circumference}`;
        timerProgress.style.strokeDashoffset = 0;

        // Function to update the circle stroke
        function setProgress(percent) {
            const offset = circumference - (percent / 100) * circumference;
            timerProgress.style.strokeDashoffset = offset;
        }

        function updateDisplay() {
            // Convert seconds to MM:SS format
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Update the circular progress bar
            const percent = (timeLeft / totalTime) * 100;
            setProgress(percent);
        }

        function toggleTimer() {
            if (isRunning) {
                clearInterval(countdown);
                isRunning = false;
                toggleBtn.textContent = '▶';
                timerStatus.textContent = 'Paused';
                timerProgress.style.stroke = 'var(--secondary)';

                localStorage.setItem('FocusSeconds', totalFocusSeconds);
                updateFocusDisplay();

            } else {
                isRunning = true;
                toggleBtn.textContent = '⏸';
                timerStatus.textContent = 'Focusing...';
                timerProgress.style.stroke = 'var(--primary)';

                countdown = setInterval(() => {
                    timeLeft--;
                    updateDisplay();

                    if (currentMode === 'focus') {
                        totalFocusSeconds++;

                        if (totalFocusSeconds % 60 === 0) {
                            localStorage.setItem('FocusSeconds', totalFocusSeconds);
                            updateFocusDisplay();
                        }
                    }

                    if (timeLeft <= 0) {
                        clearInterval(countdown);
                        isRunning = false;
                        toggleBtn.textContent = '▶';
                        timerStatus.textContent = 'Session Complete!';

                        localStorage.setItem('FocusSeconds', totalFocusSeconds);
                        updateFocusDisplay();

                        if (currentMode === 'focus') {
                            let totalSessions = parseInt(localStorage.getItem('Sessions')) || 0;
                            totalSessions++;
                            localStorage.setItem('Sessions', totalSessions);
                            const profileSessionsDisplay = document.getElementById('profile-sessions-display');
                            if (profileSessionsDisplay) profileSessionsDisplay.textContent = totalSessions;
                        }

                        alert("Time's up! Take a break.");
                    }
                }, 1000);
            }
        }

        function resetTimer() {
            clearInterval(countdown);

            localStorage.setItem('FocusSeconds', totalFocusSeconds);
            updateFocusDisplay();

            isRunning = false;
            timeLeft = totalTime;
            toggleBtn.textContent = '▶';
            timerStatus.textContent = 'Ready to Focus';
            updateDisplay();
            timerProgress.style.strokeDashoffset = 0;
            timerProgress.style.stroke = 'var(--primary)';
        }

        function setMode(mode) {
            clearInterval(countdown);

            localStorage.setItem('FocusSeconds', totalFocusSeconds);
            updateFocusDisplay();

            isRunning = false;
            toggleBtn.textContent = '▶';

            currentMode = mode;

            modePills.forEach(p => p.classList.remove('active'));
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

            if (mode === 'focus') {
                totalTime = 25 * 60;
                timerStatus.textContent = 'Focus Mode';
                timerProgress.style.stroke = 'var(--primary)';
            } else if (mode === 'short') {
                totalTime = 5 * 60;
                timerStatus.textContent = 'Short Break';
                timerProgress.style.stroke = 'var(--primary)';
            } else if (mode === 'long') {
                totalTime = 15 * 60;
                timerStatus.textContent = 'Long Break';
                timerProgress.style.stroke = 'var(--primary)';
            }

            timeLeft = totalTime;
            updateDisplay();
            timerProgress.style.strokeDashoffset = 0;
        }

        toggleBtn.addEventListener('click', toggleTimer);
        resetBtn.addEventListener('click', resetTimer);

        modePills.forEach(btn => {
            btn.addEventListener('click', (e) => {
                setMode(e.target.dataset.mode);
            });
        });

        updateDisplay();

        const skipBtn = document.getElementById('skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                if (currentMode === 'focus') {
                    setMode('short');
                } else {
                    setMode('focus');
                }

                toggleTimer();
            });
        }
    }

    if (switchBtn && timerGroup && stopwatchUI) {
        let isStopwatchMode = false;
        let swInterval;
        let swTime = 0;
        let swRunning = false;

        switchBtn.addEventListener('click', () => {
            isStopwatchMode = !isStopwatchMode;

            if (isStopwatchMode) {
                timerGroup.style.display = 'none';
                stopwatchUI.style.display = 'flex';
                stopwatchControls.style.display = 'flex';
                switchBtn.textContent = 'Switch to Timer';
            } else {
                timerGroup.style.display = 'flex';
                stopwatchUI.style.display = 'none';
                stopwatchControls.style.display = 'none';
                switchBtn.textContent = 'Switch to Stopwatch';
            }
        });

        function updateStopwatch() {
            const minutes = Math.floor(swTime / 60);
            const seconds = swTime % 60;
            swDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        swToggle.addEventListener('click', () => {
            if (swRunning) {
                clearInterval(swInterval);
                swRunning = false;
                swToggle.textContent = '▶';
            } else {
                swRunning = true;
                swToggle.textContent = '⏸';
                swInterval = setInterval(() => {
                    swTime++;
                    updateStopwatch();
                }, 1000);
            }
        });

        swReset.addEventListener('click', () => {
            clearInterval(swInterval);
            swRunning = false;
            swTime = 0;
            updateStopwatch();
            swToggle.textContent = '▶';
        });
    }

});
