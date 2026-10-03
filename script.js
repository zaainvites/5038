/* Daanish & Adeena — GitHub Pages wedding invitation */

const opening = document.getElementById("opening");
const openingVideo = document.getElementById("openingVideo");
const introVideo = document.getElementById("introVideo");
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");

document.body.classList.add("locked");

/* ---------- OPENING ---------- */
let openingHandled = false;

function finishOpening() {
  if (openingHandled) return;
  openingHandled = true;

  // Hide the cover immediately and remove it from the document after the fade.
  opening.classList.add("hide");
  document.body.classList.remove("locked");

  window.setTimeout(() => {
    opening.classList.add("removed");
    opening.setAttribute("aria-hidden", "true");
  }, 1250);

  // Start the envelope-opening video only after the user gesture.
  if (introVideo && introVideo.querySelector("source")) {
    openingVideo.classList.add("show");
    const playPromise = introVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        openingVideo.classList.remove("show");
        openingVideo.classList.add("hidden");
      });
    }
  }
}

async function handleOpeningGesture(e) {
  if (e) e.preventDefault();
  if (openingHandled) return;

  // Mobile Safari/Chrome allow media playback when started from this gesture.
  try {
    if (music) {
      await music.play();
      if (musicIcon) musicIcon.textContent = "♫";
    }
  } catch (err) {
    // Music is optional; the invitation must still open.
  }

  finishOpening();
}

opening.addEventListener("click", handleOpeningGesture, { passive: false });
opening.addEventListener("pointerup", handleOpeningGesture, { passive: false });

if (introVideo) {
  introVideo.addEventListener("ended", () => {
    openingVideo.classList.add("fade-out");
    window.setTimeout(() => {
      openingVideo.classList.remove("show", "fade-out");
      openingVideo.classList.add("hidden");
    }, 1000);
  }, { once: true });

  introVideo.addEventListener("error", () => {
    openingVideo.classList.remove("show");
    openingVideo.classList.add("hidden");
  });
}

if (musicButton && music) {
  musicButton.addEventListener("click", async () => {
    if (music.paused) {
      try { await music.play(); } catch(e) {}
      if (musicIcon) musicIcon.textContent = "♫";
    } else {
      music.pause();
      if (musicIcon) musicIcon.textContent = "♪";
    }
  });
}

/* ---------- SCRATCH TO REVEAL ---------- */
const scratchCanvas = document.getElementById("scratchCanvas");
const scratchArea = document.querySelector(".scratch-area");
const ctx = scratchCanvas.getContext("2d", { willReadFrequently: true });

function sizeScratchCanvas() {
  const rect = scratchArea.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  scratchCanvas.width = Math.round(rect.width * dpr);
  scratchCanvas.height = Math.round(rect.height * dpr);
  scratchCanvas.style.width = rect.width + "px";
  scratchCanvas.style.height = rect.height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  // Premium gold scratch layer.
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, "#b99355");
  gradient.addColorStop(.48, "#d8bd87");
  gradient.addColorStop(1, "#a98043");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  // Fine paper-like pattern.
  for (let i = 0; i < 850; i++) {
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * .12})`;
    ctx.fillRect(x, y, 1, 1);
  }

  ctx.fillStyle = "rgba(255,250,240,.92)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '500 14px Cinzel, serif';
  ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 9);
  ctx.font = '13px "Cormorant Garamond", serif';
  ctx.fillText("✦ 24 NOVEMBER 2026 ✦", rect.width / 2, rect.height / 2 + 17);
}

sizeScratchCanvas();
window.addEventListener("resize", sizeScratchCanvas);

let scratching = false;
let lastX = 0;
let lastY = 0;
let scratchCheck = 0;

function pointerPosition(e) {
  const rect = scratchCanvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function scratch(e) {
  if (!scratching) return;
  const p = pointerPosition(e);

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = 42;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
  ctx.restore();

  lastX = p.x;
  lastY = p.y;

  scratchCheck++;
  if (scratchCheck % 14 === 0) checkScratchPercent();
}

scratchCanvas.addEventListener("pointerdown", e => {
  scratching = true;
  scratchCanvas.setPointerCapture(e.pointerId);
  const p = pointerPosition(e);
  lastX = p.x;
  lastY = p.y;
  scratch(e);
});

scratchCanvas.addEventListener("pointermove", scratch);
scratchCanvas.addEventListener("pointerup", () => {
  scratching = false;
  checkScratchPercent();
});
scratchCanvas.addEventListener("pointercancel", () => scratching = false);

function checkScratchPercent() {
  const rect = scratchCanvas.getBoundingClientRect();
  const sample = ctx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
  let transparent = 0;
  const step = 16;

  for (let i = 3; i < sample.data.length; i += 4 * step) {
    if (sample.data[i] < 80) transparent++;
  }

  const total = Math.ceil(sample.data.length / (4 * step));
  const percent = transparent / total;

  // Once roughly 48% is cleared, finish the reveal.
  if (percent > .48) {
    ctx.clearRect(0, 0, rect.width, rect.height);
    scratchCanvas.style.pointerEvents = "none";
    document.querySelector(".scratch-hint").textContent = "✦ The date is revealed ✦";
  }
}

/* ---------- VIDEO STORY: PLAY ONE BY ONE ---------- */
const storyVideos = [...document.querySelectorAll(".story-video")];

const videoObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");
    if (entry.isIntersecting) {
      storyVideos.forEach(card => {
        if (card !== entry.target) {
          const other = card.querySelector("video");
          other.pause();
        }
      });
      video.play().catch(() => {});
      entry.target.classList.add("is-playing");
    } else {
      video.pause();
    }
  });
}, { threshold: .35 }) : null;

if (videoObserver) {
  storyVideos.forEach(card => videoObserver.observe(card));
}

/* ---------- SCROLL REVEALS ---------- */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: .08, rootMargin: "0px 0px -5% 0px" });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

// Safety fallback: never leave the whole invitation transparent on mobile.
window.setTimeout(() => {
  revealElements.forEach(el => el.classList.add("visible"));
}, 1800);

/* ---------- COUNTDOWN ---------- */
/* Change this date/time when the real wedding date is confirmed. */
const weddingDate = new Date("2026-11-24T18:00:00+05:30").getTime();

function updateCountdown() {
  const diff = Math.max(0, weddingDate - Date.now());

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- RSVP POPUP ---------- */
const modal = document.getElementById("rsvpModal");
const rsvpButton = document.getElementById("rsvpButton");
const closeModal = document.getElementById("closeModal");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpSuccess = document.getElementById("rsvpSuccess");

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

rsvpButton.addEventListener("click", openModal);
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", e => {
  if (e.target === modal) hideModal();
});

rsvpForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value;

  // Front-end only. Replace this with WhatsApp/Formspree/Google Apps Script
  // when you want actual RSVP data to be stored.
  const message = encodeURIComponent(
    `Nikah RSVP — Daanish & Adeena\nName: ${name}\nGuests: ${count}`
  );

  rsvpSuccess.innerHTML =
    `Thank you, ${name}. Your RSVP is ready. ` +
    `<a href="https://wa.me/?text=${message}" target="_blank" rel="noopener">Send via WhatsApp</a>`;
});

/* ---------- IMAGE FALLBACK ---------- */
document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.visibility = "hidden";
  });
});

// Keyboard accessibility for the opening cover.
opening.setAttribute("role", "button");
opening.setAttribute("tabindex", "0");
opening.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") handleOpeningGesture(e);
});
