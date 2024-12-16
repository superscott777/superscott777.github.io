// Add copy address functionality
function copyAddress() {
    const address = 'HEr0xxSC0TT11111111111111111111111111111111';
    navigator.clipboard.writeText(address).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = 'COPIED!';
        copyBtn.style.background = 'var(--primary)';
        setTimeout(() => {
            copyBtn.textContent = 'COPY';
            copyBtn.style.background = 'var(--secondary)';
        }, 2000);
    });
}

// Initialize background music
const bgMusic = document.getElementById('bgMusic');
const soundControl = document.querySelector('.sound-control');
const soundIcon = document.querySelector('.sound-icon');
let musicStarted = false;

// Set initial volume and muted state
bgMusic.volume = 0.5;
soundControl.classList.add('muted');
soundIcon.textContent = '🔈';

// Function to toggle music
async function toggleMusic() {
    try {
        if (bgMusic.paused) {
            await bgMusic.play();
            soundIcon.textContent = '🔊';
            soundControl.classList.remove('muted');
            musicStarted = true;
        } else {
            bgMusic.pause();
            soundIcon.textContent = '🔈';
            soundControl.classList.add('muted');
        }
    } catch (error) {
        console.log("Audio playback failed:", error);
        soundIcon.textContent = '🔈';
        soundControl.classList.add('muted');
    }
}

// Function to start background music
async function startBackgroundMusic() {
    try {
        if (bgMusic.paused) {
            await bgMusic.play();
            musicStarted = true;
            soundIcon.textContent = '🔊';
            soundControl.classList.remove('muted');
        }
    } catch (error) {
        console.log("Audio playback failed:", error);
        soundIcon.textContent = '🔈';
        soundControl.classList.add('muted');
    }
}

// Add click event listener to sound control
soundControl.addEventListener('click', toggleMusic);

document.addEventListener('DOMContentLoaded', function() {
    // Epilepsy Warning Handling
    const loader = document.querySelector('.loader');
    const continueBtn = document.querySelector('.continue-btn');
    const epilepsyWarning = document.querySelector('.epilepsy-warning');

    // Load audio
    bgMusic.load();

    // Single click handler for the entire document
    const handleFirstInteraction = async (e) => {
        // Only handle clicks that aren't on the sound control
        if (!e.target.closest('.sound-control')) {
            await startBackgroundMusic();
        }
        // Remove the listener after first interaction
        document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);

    continueBtn.addEventListener('click', async () => {
        await startBackgroundMusic();
        
        loader.classList.add('warning-accepted');
        epilepsyWarning.style.display = 'none';
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    });

    // Menu Toggle
    const menuTrigger = document.querySelector('.menu-trigger');
    const menuItems = document.querySelector('.menu-items');
    
    menuTrigger.addEventListener('click', () => {
        menuItems.classList.toggle('active');
    });

    // Video Background
    const video = document.querySelector('.video-background video');
    video.play().catch(function(error) {
        console.log("Video play failed:", error);
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            menuItems.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Power Stats Animation
    const stats = document.querySelectorAll('.stat .value');
    stats.forEach(stat => {
        if (stat.dataset.value) {
            const value = parseInt(stat.dataset.value);
            let current = 0;
            const increment = value / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    clearInterval(timer);
                    stat.textContent = value.toLocaleString();
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        }
    });
}); 