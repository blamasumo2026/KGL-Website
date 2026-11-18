
/* =========================================
   KASTASEN GHANA LIMITED
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   1. LOADING SCREEN
========================================= */

const loader = document.querySelector("#loader");

if (loader) {

  loader.classList.add("active");

  function hideLoader() {
    loader.classList.remove("active");
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }

}


/* =========================================
   2. MOBILE NAVIGATION MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");

const nav = document.querySelector("header nav");

const menuIcon = menuToggle
  ? menuToggle.querySelector("span")
  : null;


if (menuToggle && nav && menuIcon) {

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", function() {

    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {

      menuIcon.textContent = "✕";

      menuToggle.setAttribute("aria-label", "Close navigation");

      menuToggle.setAttribute("aria-expanded", "true");

    } else {

      menuIcon.textContent = "☰";

      menuToggle.setAttribute("aria-label", "Open navigation");

      menuToggle.setAttribute("aria-expanded", "false");

    }

  });


  // Close menu when a navigation link is clicked

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

      nav.classList.remove("active");

      menuIcon.textContent = "☰";

      menuToggle.setAttribute("aria-label", "Open navigation");

      menuToggle.setAttribute("aria-expanded", "false");

    });

  });

}


/* =========================================
   3. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");

const links = document.querySelectorAll("header nav a");


function updateActiveLink() {

  let currentSection = "";

  sections.forEach(function(section) {

    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 160) {

      currentSection = section.getAttribute("id");

    }

  });


  links.forEach(function(link) {

    link.classList.remove("active-link");

    if (
      currentSection &&
      link.getAttribute("href") === "#" + currentSection
    ) {

      link.classList.add("active-link");

    }

  });

}


window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);


/* =========================================
   4. BACK TO TOP BUTTON
========================================= */

const backToTop = document.querySelector("#backToTop");


if (backToTop) {

  // Show button when scrolling down

  window.addEventListener("scroll", function() {

    if (window.scrollY > 400) {

      backToTop.classList.add("show");

    } else {

      backToTop.classList.remove("show");

    }

  });


  // Scroll back to the top

  backToTop.addEventListener("click", function() {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  });

}


/* =========================================
   5. GALLERY LIGHTBOX
========================================= */

const galleryImages = document.querySelectorAll(
  ".gallery-container .gallery-item img"
);

const lightbox = document.querySelector("#lightbox");

const lightboxImage = document.querySelector("#lightboxImage");

const lightboxCaption = document.querySelector("#lightboxCaption");

const closeLightbox = document.querySelector("#closeLightbox");

const prevImage = document.querySelector("#prevImage");

const nextImage = document.querySelector("#nextImage");

let currentImageIndex = 0;


// Open an image

function openLightbox(index) {

  if (!lightbox || !lightboxImage || galleryImages.length === 0) {
    return;
  }

  currentImageIndex = index;

  const selectedImage = galleryImages[currentImageIndex];

  lightboxImage.src = selectedImage.src;

  lightboxImage.alt = selectedImage.alt || "KGL gallery image";

  lightboxCaption.textContent =
    selectedImage.alt || "Kastasen Ghana Limited Gallery";

  lightbox.classList.add("active");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

}


// Show next image

function showNextImage() {

  currentImageIndex++;

  if (currentImageIndex >= galleryImages.length) {

    currentImageIndex = 0;

  }

  openLightbox(currentImageIndex);

}


// Show previous image

function showPreviousImage() {

  currentImageIndex--;

  if (currentImageIndex < 0) {

    currentImageIndex = galleryImages.length - 1;

  }

  openLightbox(currentImageIndex);

}


// Close lightbox

function hideLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


// Make gallery images clickable

galleryImages.forEach(function(image, index) {

  image.style.cursor = "pointer";

  image.addEventListener("click", function() {

    openLightbox(index);

  });

});


// Close button

if (closeLightbox) {

  closeLightbox.addEventListener("click", hideLightbox);

}


// Next button

if (nextImage) {

  nextImage.addEventListener("click", showNextImage);

}


// Previous button

if (prevImage) {

  prevImage.addEventListener("click", showPreviousImage);

}


// Close when clicking outside the image

if (lightbox) {

  lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

      hideLightbox();

    }

  });

}


// Keyboard controls

document.addEventListener("keydown", function(event) {

  if (!lightbox || !lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {

    hideLightbox();

  }

  if (event.key === "ArrowRight") {

    showNextImage();

  }

  if (event.key === "ArrowLeft") {

    showPreviousImage();

  }

});


/* =========================================
   6. FAQ ACCORDION
========================================= */

const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach(function(item) {

  const question = item.querySelector(".faq-question");

  const answer = item.querySelector(".faq-answer");

  const icon = question
    ? question.querySelector("span")
    : null;

  if (!question || !answer) return;

  question.setAttribute("aria-expanded", "false");

  answer.setAttribute("hidden", "");


  question.addEventListener("click", function() {

    const isOpen = item.classList.contains("active");


    // Close all FAQ items

    faqItems.forEach(function(faq) {

      faq.classList.remove("active");

      const faqQuestion = faq.querySelector(".faq-question");

      const faqAnswer = faq.querySelector(".faq-answer");

      const faqIcon = faqQuestion
        ? faqQuestion.querySelector("span")
        : null;

      faqQuestion.setAttribute("aria-expanded", "false");

      faqAnswer.setAttribute("hidden", "");

      if (faqIcon) {

        faqIcon.textContent = "+";

      }

    });


    // Open selected FAQ

    if (!isOpen) {

      item.classList.add("active");

      question.setAttribute("aria-expanded", "true");

      answer.removeAttribute("hidden");

      if (icon) {

        icon.textContent = "−";

      }

    }

  });

});


/* =========================================
   7. CUSTOMER ENQUIRY FORM
========================================= */

const customerForm = document.querySelector("#customerForm");

const formMessage = document.querySelector("#formMessage");


if (customerForm && formMessage) {

  customerForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Collect customer information

    const customerName =
      document.querySelector("#customerName").value.trim();

    const phone =
      document.querySelector("#phone").value.trim();

    const customerEmail =
      document.querySelector("#customerEmail").value.trim();

    const interestedProduct =
      document.querySelector("#interestedProduct").value;

    const message =
      document.querySelector("#message").value.trim();


    // Validate customer information

    if (customerName === "") {

      formMessage.textContent = "Please enter your full name.";

      formMessage.className = "error";

      return;

    }


    if (phone === "") {

      formMessage.textContent = "Please enter your phone number.";

      formMessage.className = "error";

      return;

    }


    if (interestedProduct === "") {

      formMessage.textContent = "Please select a product.";

      formMessage.className = "error";

      return;

    }


    // Prepare WhatsApp enquiry

    const whatsappMessage = `
NEW CUSTOMER ENQUIRY

KASTASEN GHANA LIMITED

Customer Name: ${customerName}

Phone Number: ${phone}

Email Address: ${customerEmail || "Not provided"}

Interested Product: ${interestedProduct}

Customer Message: ${message || "No additional message"}

Sent through Kastasen Ghana Limited Website.
    `;


    // KGL WhatsApp business number

    const whatsappNumber = "233538847616";


    // Generate WhatsApp URL

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(whatsappMessage);


    // Open WhatsApp

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );


    // Display confirmation

    if (whatsappWindow) {

      formMessage.textContent =
        "Your enquiry is ready. Please press SEND in WhatsApp to complete your enquiry.";

      formMessage.className = "success";

    } else {

      formMessage.textContent =
        "WhatsApp could not open. Please contact us directly on +233 538 847616.";

      formMessage.className = "error";

    }

  });

}


/* =========================================
   8. WEBSITE INITIALIZATION
========================================= */

console.log(
  "Kastasen Ghana Limited website loaded successfully!"
);
