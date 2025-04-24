document.addEventListener("DOMContentLoaded", () => { 
  // Toggle navigation menu
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // ======= PRODUCT CAROUSEL =======
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    const cards = document.querySelectorAll(".product-card");

    // Clone product cards
    cards.forEach(card => {
      carousel.appendChild(card.cloneNode(true));
    });

    // Autoplay scroll
    const scrollStep = 1;
    const delay = 20;
    let scrollInterval;

    function autoScrollCarousel() {
      carousel.scrollLeft += scrollStep;
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }
    }

    setTimeout(() => {
      scrollInterval = setInterval(autoScrollCarousel, delay);
    }, 1000);

    // Add passive event listener for touchstart (fixes the issue)
    carousel.addEventListener("touchstart", () => {}, { passive: true });
  }

  // ======= FEATURED PRODUCTS AUTO SCROLL =======
  const featuredProductsCarousel = document.getElementById("featured-products-carousel");

  if (featuredProductsCarousel) {
    function getCardWidth() {
      const card = featuredProductsCarousel.querySelector(".product-card");
      return card ? card.offsetWidth + 16 : 200;
    }

    function autoScrollFeatured() {
      const scrollStep = getCardWidth();
      if (featuredProductsCarousel.scrollLeft + featuredProductsCarousel.offsetWidth >= featuredProductsCarousel.scrollWidth) {
        featuredProductsCarousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        featuredProductsCarousel.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }

    setInterval(autoScrollFeatured, 4000);

    // Add passive event listener for touchstart (fixes the issue)
    featuredProductsCarousel.addEventListener("touchstart", () => {}, { passive: true });
  }

  // ======= TESTIMONIALS CAROUSEL =======
  const testimonialsCarousel = document.getElementById("testimonials-carousel");

  if (testimonialsCarousel) {
    let scrollAmount = 0;

    setInterval(() => {
      scrollAmount += testimonialsCarousel.clientWidth;

      if (scrollAmount >= testimonialsCarousel.scrollWidth) {
        scrollAmount = 0;
      }

      testimonialsCarousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 4000);

    // Add passive event listener for touchstart (fixes the issue)
    testimonialsCarousel.addEventListener("touchstart", () => {}, { passive: true });
  }

  // ======= COUNTDOWN TIMERS =======
  function startCountdown(timerId) {
    const timerElement = document.getElementById(timerId);
    if (!timerElement) return;

    let [hours, minutes, seconds] = timerElement.textContent.split(":").map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
        timerElement.textContent = "00:00:00";
        return;
      }

      totalSeconds--;

      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");

      timerElement.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  ["timer1", "timer2", "timer3"].forEach(startCountdown);

  // ======= CAR DETAIL PAGE TRIGGER =======//
  // ======= MAIN.JS =======

  // Car Detail Button Event Handler
  const detailButtons = document.querySelectorAll(".add-to-cart");

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const carData = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        brand: btn.dataset.brand,
        year: btn.dataset.year,
        price: btn.dataset.price,
        img: btn.dataset.img,
        imgFront: btn.dataset.imgFront || "",
        imgRear: btn.dataset.imgRear || "",
        imgDashboard: btn.dataset.imgDashboard || "",
        imgSide: btn.dataset.imgSide || ""
      };

      // Save the entire car object and ID separately
      localStorage.setItem("selectedCar", JSON.stringify(carData));
      localStorage.setItem("selectedCarId", carData.id);

      // Navigate to car details page
      window.location.href = "car-details.html";
    });
  });
}
);


