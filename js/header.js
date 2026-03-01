
window.addEventListener('scroll', function () {
    const header = document.querySelector('header'); if (header) { if (window.scrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } }
});

// Mobile menu toggle 
const menuToggle = document.querySelector('.menu-toggle');
 if (menuToggle) { 
    menuToggle.addEventListener('click', function () {
         const navLinks = document.querySelector('.nav-links');
          if (navLinks) { navLinks.classList.toggle('active'); } }); }





function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("active");
}

