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

document.addEventListener('DOMContentLoaded', function() {
    // Epilepsy Warning Handling
    const loader = document.querySelector('.loader');
    const continueBtn = document.querySelector('.continue-btn');
    const epilepsyWarning = document.querySelector('.epilepsy-warning');

    continueBtn.addEventListener('click', () => {
        loader.classList.add('warning-accepted');
        epilepsyWarning.style.display = 'none';
        
        // Start the normal loader sequence
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