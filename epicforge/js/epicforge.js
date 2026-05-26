// ================= SCROLL TO TOP BUTTON =================

const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show the button when user scrolls down more than 300px
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

// Smoothly scroll back to the top when button is clicked
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ================= SEARCH BAR =================

const searchbar = document.getElementById("searchbar");

// Simple search filter — highlights matching game cards by name
searchbar.addEventListener("input", () => {
    const query = searchbar.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".image-card");

    cards.forEach(card => {
        const name = card.querySelector("p").textContent.toLowerCase();
        if (query === "" || name.includes(query)) {
            card.style.opacity = "1";
            card.style.transform = "";
        } else {
            card.style.opacity = "0.3";
            card.style.transform = "scale(0.95)";
        }
    });
});


// ================= WATER DROPLET SPLASH EFFECT =================

const pointerDot = document.querySelector('.pointer-dot');

// Track mouse movement and position the dot
document.addEventListener('mousemove', (e) => {
    pointerDot.style.left = `${e.pageX}px`;
    pointerDot.style.top = `${e.pageY}px`;
});

document.addEventListener('click', (e) => {
    // Only trigger splash when clicking on body content (exclude topline and footer)
      const topline = document.querySelector('.topline');
    /*const footer = document.querySelector('#footer');*/
    
    if (topline && topline.contains(e.target)) return;
   /* if (footer && footer.contains(e.target)) return;*/

    // Fade out the pointer dot
    pointerDot.style.opacity = '0';

    // Reappear the dot after 60ms (50ms delay added)
    setTimeout(() => {
        pointerDot.style.opacity = '1';
    }, 350);

    // Delay the splash effect by 200ms (50ms delay added)
    setTimeout(() => {
        const numDroplets = 17; // number of water droplets
        const maxRadius = 30;   // splash radius in px
        const splashDuration = 800; // animation duration in ms

        for (let i = 0; i < numDroplets; i++) {
            const droplet = document.createElement('div');
            droplet.classList.add('water-droplet');
            droplet.style.left = `${e.pageX - 4}px`;
            droplet.style.top = `${e.pageY - 4}px`;
            document.body.appendChild(droplet);

            // Calculate random direction and distance
            const angle = (Math.random() * Math.PI * 2);
            const distance = Math.random() * maxRadius;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            // Animate the droplet
            let startTime = performance.now();
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / splashDuration, 1);

                // Ease out quad for natural motion
                const easeProgress = 1 - Math.pow(1 - progress, 2);

                // Apply movement in random direction (no gravity)
                const currentX = dx * easeProgress;
                const currentY = dy * easeProgress;
                const opacity = Math.max(0, 1 - progress);
                const scale = 1 - (progress * 0.5);

                droplet.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
                droplet.style.opacity = opacity;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    droplet.remove();
                }
            }

            requestAnimationFrame(animate);
        }
    }, 10);
});