/*
  MOM'S BIRTHDAY WEBSITE
  ----------------------
  1. Photos auto-load from the numbered JPGs in assets/.
  2. Music is a real MP3 file in assets/.
  3. Edit the letter directly in index.html.
*/

const PHOTO_FILES = [];
for (let num = 92121; num <= 92185; num++) {
  if (num === 92135 || num === 92180) continue;
  PHOTO_FILES.push(`${num}.jpg`);
}

const PHOTO_DATA = PHOTO_FILES.map((file, index) => ({
  file,
  caption: [
    "A memory I'll always keep.",
    "One of my favorite moments.",
    "Thank you for this memory.",
    "Forever grateful for you.",
    "Another moment worth keeping.",
    "Love you, Mom. ♡",
  ][index % 6],
}));

const MUSIC_FILE = "assets/birthday-song.mp3";

const screens = [...document.querySelectorAll(".screen")];
const gallery = document.getElementById("gallery");
const finalPhotos = document.getElementById("finalPhotos");
const musicPlayer = document.getElementById("musicPlayer");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const audio = document.getElementById("birthdaySong");
const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const secretOverlay = document.getElementById("secretMessageOverlay");
const secretMessageText = document.getElementById("secretMessageText");
const secretClose = document.getElementById("secretClose");

function openLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightboxView() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSecretMessage(message) {
  secretMessageText.textContent = message;
  secretOverlay.classList.remove("hidden");
}

function closeSecretMessage() {
  secretOverlay.classList.add("hidden");
}

function burstGiftPhotos() {
  const intro = document.getElementById("intro");
  const burst = document.createElement("div");
  burst.className = "gift-burst";

  const flash = document.createElement("div");
  flash.className = "gift-flash";
  burst.appendChild(flash);

  const dust = document.createElement("div");
  dust.className = "dust-cloud";
  dust.style.animationDelay = "0.2s";
  burst.appendChild(dust);

  const shockwave = document.createElement("div");
  shockwave.className = "shockwave-ring";
  shockwave.style.animationDelay = "0.1s";
  burst.appendChild(shockwave);

  const burstCount = Math.min(18, PHOTO_DATA.length);
  for (let i = 0; i < burstCount; i++) {
    const photo = PHOTO_DATA[i % PHOTO_DATA.length];
    const burstPhoto = document.createElement("img");
    burstPhoto.src = `assets/${photo.file}`;
    burstPhoto.alt = "Bursting memory";
    burstPhoto.className = "burst-photo";
    burstPhoto.style.setProperty("--x", `${(Math.random() - 0.5) * 560}px`);
    burstPhoto.style.setProperty("--y", `${-220 + Math.random() * 380}px`);
    burstPhoto.style.setProperty(
      "--rotate",
      `${(Math.random() - 0.5) * 220}deg`,
    );
    burstPhoto.style.setProperty("--scale", `${0.7 + Math.random() * 0.9}`);
    burstPhoto.style.animationDelay = `${i * 0.035}s`;
    burst.appendChild(burstPhoto);
  }

  for (let i = 0; i < 7; i++) {
    const photo = PHOTO_DATA[(i + 5) % PHOTO_DATA.length];
    const secondWave = document.createElement("img");
    secondWave.src = `assets/${photo.file}`;
    secondWave.alt = "Second wave memory";
    secondWave.className = "burst-photo second-wave";
    secondWave.style.setProperty("--x2", `${(Math.random() - 0.5) * 760}px`);
    secondWave.style.setProperty("--y2", `${-180 + Math.random() * 320}px`);
    secondWave.style.setProperty(
      "--rotate2",
      `${(Math.random() - 0.5) * 260}deg`,
    );
    secondWave.style.setProperty("--scale2", `${0.75 + Math.random() * 0.75}`);
    secondWave.style.animationDelay = `${1.2 + i * 0.14}s`;
    burst.appendChild(secondWave);
  }

  intro.appendChild(burst);
  setTimeout(() => burst.remove(), 5000);
}

function makePetals(count = 18) {
  const container = document.querySelector(".floating-petals");
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petal.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 14000);
  }
}

function buildGallery() {
  gallery.innerHTML = "";
  PHOTO_DATA.forEach((photo, index) => {
    const card = document.createElement("figure");
    card.className = "photo-card";
    const img = document.createElement("img");
    img.src = `assets/${photo.file}`;
    img.alt = photo.caption.replace(/"/g, "&quot;");
    img.loading = index < 3 ? "eager" : "lazy";
    img.addEventListener("click", () => openLightbox(img.src));
    img.onerror = () => (card.style.display = "none");

    const caption = document.createElement("figcaption");
    caption.className = "photo-caption";
    caption.textContent = photo.caption;

    card.appendChild(img);
    card.appendChild(caption);
    gallery.appendChild(card);
  });
}

function buildFinalPhotos() {
  finalPhotos.innerHTML = "";
  PHOTO_DATA.slice(0, 3).forEach((photo) => {
    const img = document.createElement("img");
    img.src = `assets/${photo.file}`;
    img.alt = "A memory with Mom";
    img.onerror = () => img.remove();
    finalPhotos.appendChild(img);
  });
}

function setupMusic() {
  audio.src = MUSIC_FILE;
  audio.load();

  audio.addEventListener("error", () => {
    musicStatus.textContent = "Tap ▶ to play your song";
    musicToggle.disabled = false;
    musicToggle.style.opacity = "1";
  });

  audio.addEventListener("play", () => {
    musicPlayer.classList.add("playing");
    musicToggle.textContent = "❚❚";
    musicStatus.textContent = "Playing for you ♡";
  });

  audio.addEventListener("pause", () => {
    musicPlayer.classList.remove("playing");
    musicToggle.textContent = "▶";
    musicStatus.textContent = "Paused";
  });

  musicToggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        musicStatus.textContent = "Tap ▶ to play your song";
      }
    } else {
      audio.pause();
    }
  });
}

document.getElementById("openGift").addEventListener("click", () => {
  const button = document.getElementById("openGift");
  if (button.classList.contains("opening")) return;

  button.classList.add("opening");
  burstGiftPhotos();
  makePetals(28);
  buildGallery();
  buildFinalPhotos();

  audio.play().catch(() => {
    musicStatus.textContent = "Tap ▶ to play your song";
  });

  setTimeout(() => {
    musicPlayer.classList.remove("hidden");
    showScreen("memories");
  }, 4200);
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});

document.getElementById("envelope").addEventListener("click", () => {
  const envelope = document.getElementById("envelope");
  if (!envelope.classList.contains("open")) {
    envelope.classList.add("open");
    document.getElementById("letterHint").textContent = "♡";
    setTimeout(
      () => document.getElementById("toFinal").classList.remove("hidden"),
      1000,
    );
    makePetals(14);
  }
});

document.getElementById("toFinal").addEventListener("click", () => {
  showScreen("final");
  makePetals(24);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === closeLightbox) {
    closeLightboxView();
  }
});

closeLightbox.addEventListener("click", closeLightboxView);
secretClose.addEventListener("click", closeSecretMessage);
secretOverlay.addEventListener("click", (event) => {
  if (event.target === secretOverlay) closeSecretMessage();
});

document.querySelectorAll(".secret-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () =>
    openSecretMessage(trigger.dataset.message || "You are loved."),
  );
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!lightbox.classList.contains("hidden")) {
      closeLightboxView();
    }
    if (!secretOverlay.classList.contains("hidden")) {
      closeSecretMessage();
    }
  }
});

buildGallery();
buildFinalPhotos();
setupMusic();
