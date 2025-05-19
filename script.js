// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all the navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Add smooth scroll behavior to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Get the top position of the target section, accounting for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                // Check if browser supports smooth scrolling
            if ('scrollBehavior' in document.documentElement.style) {
                // Use native smooth scrolling if supported
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Custom smooth scrolling function for browsers that don't support it
                smoothScrollTo(targetPosition, 800); // 800ms duration
            }
            
            // Update URL but without jumping (optional)
            history.pushState(null, null, targetId);
            }
        });
    });
    
    // Custom smooth scrolling function for browsers without native support
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Easing function for smoother acceleration/deceleration
        function easeInOutQuad(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }

    // Highlight the active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // Add some offset
            const sectionHeight = section.clientHeight;
            
            // If the scroll position is past the top of the section minus some padding
            if(window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        // Remove active class from all links and add to the current one
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
