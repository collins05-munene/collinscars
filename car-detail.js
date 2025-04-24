import { allCars } from '/car-data.js';

document.addEventListener("DOMContentLoaded", () => {
  const car = JSON.parse(localStorage.getItem("selectedCar"));
  const carId = localStorage.getItem("selectedCarId");
  const selectedCarFromAllCars = allCars.find(c => c.id == carId);

  if (!car) return console.error("No car data found in localStorage.");
  if (!selectedCarFromAllCars) return console.error("No matching car found in allCars.");

  const $ = (id) => document.querySelector(id);
  const imgFallback = (src, fallback) => src || fallback;

  $("#car-img").src = imgFallback(car.img, "/assets/cars/default.jpg");
  $("#car-img-front").src = imgFallback(car.imgFront, "/assets/cars/default-front.jpg");
  $("#car-img-rear").src = imgFallback(car.imgRear, "/assets/cars/default-rear.jpg");
  $("#car-img-dashboard").src = imgFallback(car.imgDashboard, "/assets/cars/default-dashboard.jpg");
  $("#car-img-side").src = imgFallback(car.imgSide, "/assets/cars/default-side.jpg");

  $("#car-name").textContent = selectedCarFromAllCars.name || "N/A";
  $("#car-price").textContent = `Ksh ${Number(selectedCarFromAllCars.price || 0).toLocaleString()}`;
  $("#car-year").textContent = selectedCarFromAllCars.year || "N/A";
  $("#car-brand").textContent = selectedCarFromAllCars.brand || "N/A";

  // ✅ Define similarCars first
  const similarCars = allCars.filter(c =>
    c.brand === selectedCarFromAllCars.brand && c.id !== selectedCarFromAllCars.id
  );

  const similarContainer = document.getElementById("similar-cars");
  if (similarContainer) {
    // Check if there are similar cars
    if (similarCars.length > 0) {
      similarCars.forEach(car => {
        const carCard = `
          <div class="car-card">  
            <img src="${car.img}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>${car.year}</p>
            <p>Ksh ${car.price}</p>
            <button class="view-full-details" data-id="${car.id}"
              data-id="${car.id}"
              data-name="${car.name}"
              data-brand="${car.brand}"
              data-year="${car.year}"
              data-price="${car.price}"
              data-img="${car.img}"
              data-img-front="${car.imgFront || ''}"
              data-img-rear="${car.imgRear || ''}"
              data-img-dashboard="${car.imgDashboard || ''}"
              data-img-side="${car.imgSide || ''}">
              View Full Details
            </button>
          </div>
        `;
        similarContainer.innerHTML += carCard;
      });
    } else {
      // Show a message if there are no similar cars
      similarContainer.innerHTML = "<p>No similar cars at the moment.</p>";
    }
  }

  // Add click event listener for the "View Full Details" button
  document.querySelectorAll('.view-full-details').forEach(button => {
    button.addEventListener('click', (e) => {
      const carId = e.target.getAttribute('data-id');
      const selectedCar = allCars.find(car => car.id === carId);
      if (selectedCar) {
        // Store selected car in localStorage
        localStorage.setItem("selectedCar", JSON.stringify(selectedCar));
        localStorage.setItem("selectedCarId", selectedCar.id);
        // Redirect to car details page
        window.location.href = 'car-details.html';
      }
    });
  });

  const whatsappText = encodeURIComponent(`Hi, I'm interested in the ${car.name}`);
  $("#whatsapp-btn").href = `https://wa.me/254790342156?text=${whatsappText}`;
  $("#call-btn").href = `tel:+254790342156`;

  const specsContainer = $("#car-specs");
  if (selectedCarFromAllCars.specs && specsContainer) {
    specsContainer.innerHTML = Object.entries(selectedCarFromAllCars.specs).map(([key, value]) =>
      `<p><strong>${capitalize(key)}:</strong> ${value}</p>`
    ).join("");
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
