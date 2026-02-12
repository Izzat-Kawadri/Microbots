// Navigation scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  const logo = document.getElementById("navbarLogo");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    logo.src = logo.dataset.logoScrolled;
  } else {
    navbar.classList.remove("scrolled");
    logo.src = logo.dataset.logoDefault;
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
  });
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// Counter animation functionality
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  const countersSection = document.querySelector(".impact-counters");

  if (!countersSection || counters.length === 0) return;

  let countersAnimated = false;

  const animateCounter = (counter, target) => {
    const duration = 2000; // Animation duration in ms
    const increment = target / (duration / 16); // Approx 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  };

  const handleIntersection = (entries) => {
    if (countersAnimated) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
        });
        countersAnimated = true;
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });

  observer.observe(countersSection);
});
