document.addEventListener("DOMContentLoaded", () => {
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Apply saved theme or default to dark (no class means dark by default in CSS logic or we add explicit attribute)
    // Actually, our CSS uses [data-theme="light"] for light mode, so default is dark.
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        updateText(currentTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            let targetTheme = "light";
            if (document.documentElement.getAttribute("data-theme") === "light") {
                targetTheme = "dark";
            }

            document.documentElement.setAttribute("data-theme", targetTheme);
            localStorage.setItem("theme", targetTheme);
            updateText(targetTheme);
        });
    }

    function updateText(theme) {
        if (!themeToggleBtn) return;

        const iconSvg = themeToggleBtn.querySelector('svg');
        if (!iconSvg) return;

        // Clear current content
        iconSvg.innerHTML = '';

        if (theme === 'dark') {
            // Show Sun icon (to switch to light)
            iconSvg.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else {
            // Show Moon icon (to switch to dark)
            iconSvg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }

    // --- Mobile Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active"); // Optional: Add animation to hamburger itself
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Add a class if needed, or rely on CSS animation
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-up').forEach(el => {
        // Reset for JS control if not using pure CSS animation keyframes exclusively
        // But our CSS has @keyframes. Let's just ensuring opacity starts at 0 if JS is running
        // Actually, CSS handles the animation on load. 
        // For scroll-triggered animations on other sections, we might need this.
        // For now, let's keep it simple and rely on CSS `animate-up` class which runs on load.
        // If we want scroll-trigger, we should add a class 'in-view' instead.
    });
});
