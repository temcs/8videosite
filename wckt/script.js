document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glass-card');
    
    // Add a subtle 3D tilt effect on mouse movement
    document.addEventListener('mousemove', (e) => {
        // Only apply effect on devices that probably use a mouse
        if (window.innerWidth > 768) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            cards.forEach(card => {
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
        }
    });

    // Reset rotation when mouse leaves the page
    document.addEventListener('mouseleave', () => {
        cards.forEach(card => {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            card.style.transition = 'transform 0.5s ease';
            
            // Remove transition after it completes to make mousemove feel responsive again
            setTimeout(() => {
                card.style.transition = 'transform 0.1s ease-out';
            }, 500);
        });
    });
});
