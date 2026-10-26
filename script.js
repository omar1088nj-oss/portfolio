// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close menu after clicking a navigation link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Highlight the current section in the navigation
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;

        link.classList.toggle("active", isActive);
      });
    }
  });
}, {
  rootMargin: "-25% 0px -60% 0px",
  threshold: 0
});

sections.forEach((section) => observer.observe(section));

// Fruits Hub project details modal
const fruitsHubModal = document.getElementById("fruitsHubModal");
const fruitsHubCard = document.querySelector('[data-project-modal="fruits-hub"].project-card');
const lightboxImage = fruitsHubModal.querySelector(".lightbox-image-button");
const modalCloseButtons = fruitsHubModal.querySelectorAll("[data-modal-close]");
const cinemakModal = document.getElementById("cinemakModal");
const cinemakCard = document.querySelector('[data-project-modal="cinemak"].project-card');
const cinemakLightboxImage = cinemakModal.querySelector(".lightbox-image-button");
const cinemakCloseButtons = cinemakModal.querySelectorAll('[data-modal-close="cinemak"]');
const booklyModal = document.getElementById("booklyModal");
const booklyCard = document.querySelector('[data-project-modal="bookly"].project-card');
const booklyLightboxImage = booklyModal.querySelector(".lightbox-image-button");
const booklyCloseButtons = booklyModal.querySelectorAll('[data-modal-close="bookly"]');

const closeFruitsHubModal = () => {
  fruitsHubModal.classList.remove("is-open");
  fruitsHubModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lightboxImage.classList.remove("is-zoomed");
};

const closeCinemakModal = () => {
  cinemakModal.classList.remove("is-open");
  cinemakModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  cinemakLightboxImage.classList.remove("is-zoomed");
};

const openFruitsHubModal = () => {
  fruitsHubModal.classList.add("is-open");
  fruitsHubModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const openCinemakModal = () => {
  cinemakModal.classList.add("is-open");
  cinemakModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeBooklyModal = () => {
  booklyModal.classList.remove("is-open");
  booklyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  booklyLightboxImage.classList.remove("is-zoomed");
};

const openBooklyModal = () => {
  booklyModal.classList.add("is-open");
  booklyModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

fruitsHubCard.addEventListener("click", (event) => {
  if (!event.target.closest("a, button")) {
    openFruitsHubModal();
  }
});

document.querySelectorAll('[data-project-modal="fruits-hub"]').forEach((trigger) => {
  trigger.addEventListener("click", openFruitsHubModal);
});

lightboxImage.addEventListener("click", () => {
  lightboxImage.classList.toggle("is-zoomed");
});

cinemakCard.addEventListener("click", (event) => {
  if (!event.target.closest("a, button")) {
    openCinemakModal();
  }
});

document.querySelectorAll('[data-project-modal="cinemak"]').forEach((trigger) => {
  trigger.addEventListener("click", openCinemakModal);
});

cinemakLightboxImage.addEventListener("click", () => {
  cinemakLightboxImage.classList.toggle("is-zoomed");
});

booklyCard.addEventListener("click", (event) => {
  if (!event.target.closest("a, button")) {
    openBooklyModal();
  }
});

document.querySelectorAll('[data-project-modal="bookly"]').forEach((trigger) => {
  trigger.addEventListener("click", openBooklyModal);
});

booklyLightboxImage.addEventListener("click", () => {
  booklyLightboxImage.classList.toggle("is-zoomed");
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeFruitsHubModal);
});

cinemakCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCinemakModal);
});

booklyCloseButtons.forEach((button) => {
  button.addEventListener("click", closeBooklyModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && fruitsHubModal.classList.contains("is-open")) {
    closeFruitsHubModal();
  }

  if (event.key === "Escape" && cinemakModal.classList.contains("is-open")) {
    closeCinemakModal();
  }

  if (event.key === "Escape" && booklyModal.classList.contains("is-open")) {
    closeBooklyModal();
  }
});

// CV Download Handler (Friend's Code)
document.querySelectorAll(".cv-link").forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    const confirmed = confirm(
      "Do you want to download your CV to your device?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch("./omar_cv.pdf");

      if (!response.ok) {
        throw new Error("Could not find the CV PDF file.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = downloadUrl;
      downloadLink.download = "Omar_Najjar_Flutter_Developer_CV.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (error) {
      console.error(error);
      alert(
        "Download failed. Please open the website using a local server or GitHub Pages."
      );
    }
  });
});