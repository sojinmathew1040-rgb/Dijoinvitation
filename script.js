/**
 * Bespoke Luxury Digital Wedding Invitation - Interactive Features & Particles
 */

// --- Google Form Integration Configuration ---
// Follow the instructions in the setup guide to get these values.
const GOOGLE_FORM_CONFIG = {
    enabled: true, // Activated!
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfKOQo8bzsERuzQnqhB-EMCVBLFbjUHvbEG_tPZ8Rc91-JISA/formResponse',
    entries: {
        name: 'entry.1066227594',
        attendance: 'entry.842250812',
        guests: 'entry.1730887486',
        notes: 'entry.246791842'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let triggerMusicPlay = () => {};

    // --- 1. Custom Cursor Trail Setup (Dynamic DOM injection) ---
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Springy ease interpolation for smooth movement
    const animateCursor = () => {
        // Outer capsule delay
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Inner glowing dot (higher speed, less delay)
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Hover delegation matching luxury components
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (!target) return;
        
        const isHoverable = 
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.tagName === 'INPUT' || 
            target.tagName === 'LABEL' || 
            target.closest('.ceremony-card') || 
            target.closest('.about-card') || 
            target.closest('.rsvp-form-card') || 
            target.closest('.btn-calendar-trigger') || 
            target.closest('.floating-location-btn');

        if (isHoverable) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    });

    // --- 2. Atmospheric Particle Engine (Gold Dust & Crimson Petals) ---
    const petalsContainer = document.getElementById('petalsContainer');
    const maxParticles = 50; // Cap maximum active particles for mobile efficiency
    let activeParticles = 0;

    // Red-Gold color themes
    const roseColors = [
        'linear-gradient(135deg, #c5a059 0%, #f6e4bd 100%)',   // Champagne gold leaf
        'linear-gradient(135deg, #8b0000 0%, #6b0a18 100%)',   // Crimson velvet red
        'linear-gradient(135deg, #e8a7a1 0%, #c5a059 100%)',   // Rose gold tint
        'linear-gradient(135deg, #ffd700 0%, #d4af37 100%)',   // Brilliant gold
        'linear-gradient(135deg, #ffb7c5 0%, #ffa1b2 100%)',   // Soft sakura pink
        'linear-gradient(135deg, #b88e44 0%, #edd8a6 100%)'    // Muted gold
    ];

    const petalShapes = [
        '50% 50% 50% 50% / 40% 40% 60% 60%',   // Curved cup
        '12% 85% 15% 80% / 15% 80% 15% 85%',   // Asymmetric organic flutter petal
        '70% 30% 70% 70% / 70% 30% 70% 70%',   // Teardrop petal
        '50% 50% 50% 50% / 30% 30% 70% 70%'    // Gentle heart petal
    ];

    function createParticle(isGoldDust = false) {
        if (activeParticles >= maxParticles || !petalsContainer) return;

        const particle = document.createElement('div');
        activeParticles++;

        if (isGoldDust) {
            particle.classList.add('gold-dust');
            const size = Math.random() * 4 + 2; // 2px to 6px tiny stars
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `-10px`;

            const swayX = `${(Math.random() - 0.5) * 180}px`;
            particle.style.setProperty('--sway-x', swayX);
            particle.style.setProperty('--rotate-deg', `${(Math.random() - 0.5) * 360}deg`);
            particle.style.setProperty('--petal-opacity', Math.random() * 0.7 + 0.3);

            const duration = Math.random() * 5 + 6; // 6s to 11s
            particle.style.animationDuration = `${duration}s`;
            particle.style.zIndex = Math.random() > 0.5 ? '95' : '10';

            petalsContainer.appendChild(particle);
            setTimeout(() => {
                particle.remove();
                activeParticles--;
            }, duration * 1000);
        } else {
            particle.classList.add('petal');
            const size = Math.random() * 16 + 8; // 8px to 24px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `-30px`;

            particle.style.background = roseColors[Math.floor(Math.random() * roseColors.length)];
            particle.style.borderRadius = petalShapes[Math.floor(Math.random() * petalShapes.length)];
            particle.style.boxShadow = '0 4px 10px rgba(197, 160, 89, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.4)';

            const swayX = `${(Math.random() - 0.5) * 160}px`;
            const rotateDeg = `${(Math.random() - 0.5) * 1080}deg`;
            particle.style.setProperty('--sway-x', swayX);
            particle.style.setProperty('--rotate-deg', rotateDeg);
            particle.style.setProperty('--petal-opacity', Math.random() * 0.4 + 0.4);

            let duration;
            if (size > 18) {
                // Blur foreground petals for camera visual focus
                particle.style.filter = `blur(${Math.random() * 2 + 1}px)`;
                particle.style.zIndex = '105';
                duration = Math.random() * 4 + 4;
            } else if (size < 12) {
                particle.style.filter = 'none';
                particle.style.zIndex = '5';
                duration = Math.random() * 6 + 8;
            } else {
                particle.style.filter = Math.random() > 0.7 ? 'blur(0.5px)' : 'none';
                particle.style.zIndex = '92';
                duration = Math.random() * 5 + 6;
            }
            particle.style.animationDuration = `${duration}s`;

            petalsContainer.appendChild(particle);
            setTimeout(() => {
                particle.remove();
                activeParticles--;
            }, duration * 1000);
        }
    }

    // Spawn loop triggered once loading overlay is dismissed
    let spawnInterval;
    function startParticles() {
        if (!spawnInterval && petalsContainer) {
            spawnInterval = setInterval(() => {
                // 50% chance of gold dust star, 50% chance of rose petal
                createParticle(Math.random() > 0.5);
            }, 220);

            // Initial burst of particles
            for (let i = 0; i < 15; i++) {
                setTimeout(() => createParticle(Math.random() > 0.5), i * 100);
            }
        }
    }


    // --- 3. Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.reveal, .timeline-bubble-item');

    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('reveal-active');
        });
    }


    // --- 4. Bottom Sticky Action Bar Visibility Logic ---
    const bottomBar = document.getElementById('bottomBar');
    const heroSection = document.getElementById('hero');
    const rsvpSection = document.getElementById('rsvp');

    const handleScroll = () => {
        if (!heroSection || !bottomBar) return;

        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;

        // Show bottom bar after scrolling past 80% of hero height
        let showBar = scrollPosition > (heroHeight * 0.8);

        // Hide bar if user reaches the RSVP form section itself
        if (rsvpSection) {
            const rsvpTop = rsvpSection.offsetTop;
            const viewportHeight = window.innerHeight;
            if (scrollPosition + viewportHeight > rsvpTop + 150) {
                showBar = false;
            }
        }

        if (showBar) {
            bottomBar.classList.add('show');
        } else {
            bottomBar.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run on page load


    // --- 5. Dynamic RSVP Form Interactive Logic ---
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccessOverlay = document.getElementById('rsvpSuccessOverlay');
    const successMsg = document.getElementById('successMsg');
    const guestsWrapper = document.getElementById('guests-wrapper');
    const guestsInput = document.getElementById('guests');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

    // Toggle Number of Guests input based on attendance selection
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'declined') {
                guestsWrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                guestsWrapper.style.opacity = '0';
                guestsWrapper.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    guestsWrapper.style.display = 'none';
                    guestsInput.removeAttribute('required');
                }, 400);
            } else {
                guestsWrapper.style.display = 'block';
                guestsInput.setAttribute('required', 'required');
                guestsWrapper.offsetHeight; // Force layout recalculation
                guestsWrapper.style.opacity = '1';
                guestsWrapper.style.transform = 'translateY(0)';
            }
        });
    });

    // Form Submission & Animation State
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation checks
        const nameInput = document.getElementById('name');
        let isValid = true;

        if (!nameInput.value.trim()) {
            markInvalid(nameInput);
            isValid = false;
        } else {
            clearInvalid(nameInput);
        }

        if (!isValid) return;

        // Visual loading state on the button
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Details...';
        submitBtn.style.opacity = '0.8';

        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const guestName = nameInput.value.trim();
        const guestsVal = attendance === 'accepted' ? guestsInput.value : '0';
        const notesVal = document.getElementById('notes').value.trim();

        // Function to handle the layout transition and overlay display
        const displaySuccessState = () => {
            if (attendance === 'accepted') {
                successMsg.textContent = `Dear ${guestName}, we are delighted to know that you will join us. We look forward to celebrating our wedding with you in April!`;
            } else {
                successMsg.textContent = `Dear ${guestName}, thank you for letting us know. You will be missed, and we appreciate your warm thoughts and blessings.`;
            }

            // Display success overlay screen
            rsvpSuccessOverlay.classList.add('active');

            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send RSVP';
            submitBtn.style.opacity = '';
        };

        if (GOOGLE_FORM_CONFIG.enabled) {
            const formData = new FormData();
            formData.append(GOOGLE_FORM_CONFIG.entries.name, guestName);
            formData.append(GOOGLE_FORM_CONFIG.entries.attendance, attendance === 'accepted' ? 'Joyfully accept' : 'Regretfully decline');
            formData.append(GOOGLE_FORM_CONFIG.entries.guests, guestsVal);
            formData.append(GOOGLE_FORM_CONFIG.entries.notes, notesVal);

            fetch(GOOGLE_FORM_CONFIG.formUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
                .then(() => {
                    displaySuccessState();
                    console.log('RSVP Details Submitted to Google Forms Successfully.');
                })
                .catch((error) => {
                    console.error('Error submitting RSVP to Google Forms:', error);
                    displaySuccessState(); // Fallback so the UX never hangs
                });
        } else {
            setTimeout(() => {
                displaySuccessState();
                console.log('RSVP Details Mock Submitted:', {
                    name: guestName,
                    attendance: attendance,
                    guests: guestsVal,
                    notes: notesVal
                });
            }, 1500);
        }
    });

    function markInvalid(inputElement) {
        inputElement.style.borderBottomColor = '#df4747';
        inputElement.parentElement.style.animation = 'shake 0.3s ease';
        setTimeout(() => {
            inputElement.parentElement.style.animation = '';
        }, 300);
    }

    function clearInvalid(inputElement) {
        inputElement.style.borderBottomColor = '';
    }

    // CSS injection for input shake animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(style);


    // --- 6. Smooth Anchor Scrolling for Fixed Navigation ---
    const rsvpStickyBtn = document.getElementById('rsvp-sticky-btn');
    if (rsvpStickyBtn) {
        rsvpStickyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = rsvpStickyBtn.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- 7. Love Story Timeline Progress Animation ---
    const progressPath = document.getElementById('timelineWavePathProgress');
    const timelineSection = document.getElementById('story-timeline');

    if (progressPath && timelineSection) {
        let pathLength = progressPath.getTotalLength();

        const initPath = () => {
            pathLength = progressPath.getTotalLength();
            progressPath.style.strokeDasharray = pathLength;
            progressPath.style.strokeDashoffset = pathLength;
        };

        initPath();

        // Recalculate path length on resize to handle responsive layouts
        window.addEventListener('resize', () => {
            initPath();
            handleTimelineScroll();
        });

        const handleTimelineScroll = () => {
            const sectionRect = timelineSection.getBoundingClientRect();
            const sectionHeight = timelineSection.offsetHeight;
            const viewportHeight = window.innerHeight;

            const startScroll = sectionRect.top - (viewportHeight * 0.7);
            const scrollRange = sectionHeight - (viewportHeight * 0.4);

            let pct = -startScroll / scrollRange;
            pct = Math.max(0, Math.min(1, pct));

            progressPath.style.strokeDashoffset = pathLength - (pct * pathLength);
        };

        window.addEventListener('scroll', handleTimelineScroll, { passive: true });
        handleTimelineScroll();
    }

    // --- 8. Scroll-Driven Floating Countdown Items (Parallax) ---
    const countdownSection = document.querySelector('.countdown-section');
    const countdownItems = document.querySelectorAll('.countdown-item');

    const handleCountdownScroll = () => {
        if (!countdownSection) return;
        const rect = countdownSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const centerOffset = sectionCenter - viewportCenter;

            // Velocities for organic asynchronous visual float
            const velocities = [-0.14, 0.1, -0.07, 0.07];

            countdownItems.forEach((item, idx) => {
                const velocity = velocities[idx % velocities.length];
                const translateY = centerOffset * velocity;
                item.style.setProperty('--scroll-translate-y', `${translateY}px`);
            });
        }
    };

    window.addEventListener('scroll', handleCountdownScroll, { passive: true });
    handleCountdownScroll();


    // --- 9. Cinematic Countdown Timer ---
    const targetDate = new Date('August 31, 2026 23:00:00').getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const messageEl = document.getElementById('countdownMessage');

    const topDaysEl = document.getElementById('top-cd-days');
    const topHoursEl = document.getElementById('top-cd-hours');
    const topMinutesEl = document.getElementById('top-cd-minutes');
    const topSecondsEl = document.getElementById('top-cd-seconds');
    const topCountdownBar = document.getElementById('topCountdownBar');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            const zeroText = '00';
            if (daysEl) daysEl.textContent = zeroText;
            if (hoursEl) hoursEl.textContent = zeroText;
            if (minutesEl) minutesEl.textContent = zeroText;
            if (secondsEl) secondsEl.textContent = zeroText;

            if (topDaysEl) topDaysEl.textContent = zeroText;
            if (topHoursEl) topHoursEl.textContent = zeroText;
            if (topMinutesEl) topMinutesEl.textContent = zeroText;
            if (topSecondsEl) topSecondsEl.textContent = zeroText;

            if (messageEl) messageEl.textContent = "The Blessed Celebration Has Begun!";
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const dStr = String(days).padStart(2, '0');
        const hStr = String(hours).padStart(2, '0');
        const mStr = String(minutes).padStart(2, '0');
        const sStr = String(seconds).padStart(2, '0');

        if (daysEl) daysEl.textContent = dStr;
        if (hoursEl) hoursEl.textContent = hStr;
        if (minutesEl) minutesEl.textContent = mStr;
        if (secondsEl) secondsEl.textContent = sStr;

        if (topDaysEl) topDaysEl.textContent = dStr;
        if (topHoursEl) topHoursEl.textContent = hStr;
        if (topMinutesEl) topMinutesEl.textContent = mStr;
        if (topSecondsEl) topSecondsEl.textContent = sStr;
    };

    let countdownInterval;
    if (daysEl || topDaysEl) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    const handleTopBarScroll = () => {
        if (!countdownSection || !topCountdownBar) return;
        const sectionRect = countdownSection.getBoundingClientRect();

        if (sectionRect.bottom < 0) {
            topCountdownBar.classList.add('show');
        } else {
            topCountdownBar.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleTopBarScroll, { passive: true });
    handleTopBarScroll();

    // --- 10. Add to Calendar Dropdown Interactivity ---
    const calendarDropdowns = document.querySelectorAll('.calendar-dropdown');
    
    calendarDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.btn-calendar-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
                const isExpanded = dropdown.classList.contains('active');
                trigger.setAttribute('aria-expanded', isExpanded);
            });
        }
    });

    document.addEventListener('click', () => {
        calendarDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const trigger = dropdown.querySelector('.btn-calendar-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    });

    const icalLinks = document.querySelectorAll('.ical-download-link');
    icalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Dijo and Anna Wedding//NONSGML Invitation//EN',
                'CALSCALE:GREGORIAN',
                'METHOD:PUBLISH',
                'BEGIN:VEVENT',
                'UID:dijo-anna-wedding-2026@dijoinvitation.vercel.app',
                'DTSTAMP:20260625T120000Z',
                'DTSTART;TZID=Asia/Kolkata:20260831T110000',
                'DTEND;TZID=Asia/Kolkata:20260831T160000',
                'SUMMARY:Wedding: Dijo & Anna',
                'DESCRIPTION:You are cordially invited to celebrate the holy matrimony of Dijo J Perumalil and Anna Rajeev on Monday\\, August 31\\, 2026.\\n\\n11:00 AM: Holy Matrimony at St. Ann\'s Church\\, Kodikulam\\n12:30 PM: Wedding Reception %26 Lunch at St. Ann\'s Church Parish Hall',
                'LOCATION:St. Ann\'s Church\\, Kodikulam\\, Thodupuzha\\, Kerala',
                'STATUS:CONFIRMED',
                'SEQUENCE:0',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'Dijo_Anna_Wedding.ics';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        });
    });

    // --- 11. Autoplay Background Music Logic ---
    const bgMusic = document.getElementById('bgMusic');

    if (bgMusic) {
        bgMusic.volume = 0.35;
        bgMusic.load();

        let isPlayAttempted = false;

        const playAudio = () => {
            if (isPlayAttempted) return;
            isPlayAttempted = true;

            removeInteractionListeners();

            bgMusic.play()
                .then(() => {
                    console.log("Audio playing successfully.");
                })
                .catch(err => {
                    console.log("Audio autoplay blocked, waiting for gesture:", err.message);
                    isPlayAttempted = false;
                    addInteractionListeners();
                });
        };

        triggerMusicPlay = playAudio;

        const autoPlayOnInteraction = () => {
            playAudio();
        };

        const addInteractionListeners = () => {
            document.addEventListener('click', autoPlayOnInteraction);
            document.addEventListener('touchstart', autoPlayOnInteraction);
            document.addEventListener('touchend', autoPlayOnInteraction);
            document.addEventListener('pointerdown', autoPlayOnInteraction);
            document.addEventListener('mousedown', autoPlayOnInteraction);
            document.addEventListener('keydown', autoPlayOnInteraction);
        };

        const removeInteractionListeners = () => {
            document.removeEventListener('click', autoPlayOnInteraction);
            document.removeEventListener('touchstart', autoPlayOnInteraction);
            document.removeEventListener('touchend', autoPlayOnInteraction);
            document.removeEventListener('pointerdown', autoPlayOnInteraction);
            document.removeEventListener('mousedown', autoPlayOnInteraction);
            document.removeEventListener('keydown', autoPlayOnInteraction);
        };

        playAudio();
        addInteractionListeners();
    }

    // --- 12. Premium Loading Screen controller ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgressBar = document.getElementById('loadingProgressBar');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const enterBtn = document.getElementById('enter-btn');
    const progressContainer = document.querySelector('.loading-progress-container');

    if (loadingScreen && loadingProgressBar && loadingPercentage && enterBtn) {
        let progress = 0;
        const totalDuration = 1200; // Smooth loading pace
        const stepTime = 15;
        const increment = 100 / (totalDuration / stepTime);

        const loadingInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);

                setTimeout(() => {
                    progressContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    progressContainer.style.opacity = '0';
                    progressContainer.style.transform = 'translateY(-10px)';

                    setTimeout(() => {
                        progressContainer.style.display = 'none';
                        enterBtn.style.display = 'inline-flex';
                    }, 400);
                }, 300);
            }
            loadingProgressBar.style.width = `${progress}%`;
            loadingPercentage.textContent = `${Math.floor(progress)}%`;
        }, stepTime);

        let isUnlocked = false;
        const triggerUnlock = () => {
            if (isUnlocked) return;
            isUnlocked = true;

            // 1. Immediately trigger visual unlock animations (lock shake + shackle swing-open)
            enterBtn.classList.add('unlocked');

            if (typeof triggerMusicPlay === 'function') {
                triggerMusicPlay();
            }

            // 2. Wait 550ms for lock unlock animation to play before sliding screen up
            setTimeout(() => {
                // Start the slide-up transition to reveal the invitation
                loadingScreen.classList.add('fade-out');
                document.body.classList.remove('loading-active');

                // Launch the particles
                startParticles();

                // Wait for the slide-up transition to complete before removing the overlay
                setTimeout(() => {
                    loadingScreen.remove();
                }, 1200);
            }, 550);
        };

        // Click fallback handler
        enterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerUnlock();
        });

        // 1. Mouse Scroll Wheel Handler (Desktop)
        window.addEventListener('wheel', (e) => {
            if (document.body.classList.contains('loading-active') && e.deltaY > 10) {
                triggerUnlock();
            }
        }, { passive: true });

        // 2. Touch Drag / Swipe Handler (Mobile)
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            if (document.body.classList.contains('loading-active')) {
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (document.body.classList.contains('loading-active')) {
                const touchEndY = e.touches[0].clientY;
                const diffY = touchStartY - touchEndY; // Swiping up scrolls down
                if (diffY > 40) { // Swiped up past 40px threshold
                    triggerUnlock();
                }
            }
        }, { passive: true });
    }

    // --- 13. Mouse Reactive Spotlight Tracking (Ambient Glow) ---
    window.addEventListener('mousemove', (e) => {
        const backdrop = document.getElementById('ambientGlowBackdrop');
        if (backdrop) {
            backdrop.style.setProperty('--mouse-x', `${e.clientX}px`);
            backdrop.style.setProperty('--mouse-y', `${e.clientY}px`);
        }
    });

    // --- 14. Card 3D Tilt Micro-Animations ---
    const tiltElements = document.querySelectorAll('.ceremony-card, .about-card, .rsvp-form-card');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // horizontal cursor offset
            const y = e.clientY - rect.top;  // vertical cursor offset
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -6; // 6 deg tilt
            const rotateY = ((x - centerX) / centerX) * 6;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
});
