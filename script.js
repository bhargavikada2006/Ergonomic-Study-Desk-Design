document.addEventListener('DOMContentLoaded', () => {
    // Initialize Mermaid for the process flowchart
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ 
            startOnLoad: false, // Prevent drawing while hidden
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: "'Inter', sans-serif"
        });
    }

    // --- TAB NAVIGATION LOGIC ---
    const navButtons = document.querySelectorAll('.nav-btn, .nav-action');
    const sections = document.querySelectorAll('.tab-section');

    function switchTab(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));

        // De-highlight nav links
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        // Show specific section
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Highlight matching top-nav
        const activeNavBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (activeNavBtn) activeNavBtn.classList.add('active');

        // Draw the flowchart ONLY after the tab is visible and has a physical size
        if (targetId === 'process' && !window.mermaidRendered) {
            window.mermaidRendered = true;
            setTimeout(() => {
                mermaid.init(undefined, document.querySelectorAll('.mermaid'));
            }, 50); // slight delay ensures the browser processes 'display: block' safely first
        }
    }

    // Attach click events
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Check hash on load
    const hash = window.location.hash.substring(1);
    if (hash) switchTab(hash);

    // --- NAVBAR LOGIC ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- THEME TOGGLER LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                icon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }

    // --- SLIDER LOGIC ---
    const slider = document.getElementById('slider');
    const beforeContainer = document.getElementById('before-container');
    const sliderHandle = document.getElementById('slider-handle');

    if (slider && beforeContainer && sliderHandle) {
        slider.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            beforeContainer.style.width = sliderValue + '%';
            sliderHandle.style.left = sliderValue + '%';
        });
    }

    // --- FORM LOGIC ---
    const feedbackForm = document.getElementById('feedbackForm');
    const successMsg = document.getElementById('successMessage');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            feedbackForm.style.display = 'none';
            successMsg.style.display = 'block';
        });
    }
});
