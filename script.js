
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxjzQ6_qDgnFFzFSO6RHJhcFoVtc0Z0Wnr6B-4-t2H35bIyGwgVNhSey_BtL5pBAs/exec";

const checkInForm = document.getElementById("checkInForm");
const formCard = document.getElementById("formCard");
const successCard = document.getElementById("successCard");
const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementById("errorMessage");
const gentleMessage = document.getElementById("gentleMessage");
const anotherButton = document.getElementById("anotherButton");

checkInForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  errorMessage.textContent = "";

  if (SCRIPT_URL === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
    errorMessage.textContent = "The form owner still needs to connect the Google Apps Script URL.";
    return;
  }

  const answers = {
    mood: checkInForm.mood.value,
    day: checkInForm.day.value,
    need: checkInForm.need.value,
    message: checkInForm.message.value.trim(),
    name: checkInForm.name.value.trim(),
    consent: document.getElementById("consent").checked
  };

  submitButton.disabled = true;
  submitButton.textContent = "Sending your check-in... ♡";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(answers)
    });

    if (answers.mood === "Sad" || answers.mood === "Overwhelmed") {
      gentleMessage.textContent = "You don't have to solve everything at once. Take one small breath, and be gentle with yourself. ♡";
    } else if (answers.mood === "Tired" || answers.mood === "Not sure") {
      gentleMessage.textContent = "It's okay to rest and take things one step at a time. You don't need to have all the answers today. ♡";
    } else {
      gentleMessage.textContent = "Whatever today looked like, you deserve a little kindness. I hope you give some of it to yourself, too. ♡";
    }

    formCard.classList.add("hidden");
    successCard.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    errorMessage.textContent = "Something went wrong while sending. Please check your connection and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send my check-in ♡";
  }
});

anotherButton.addEventListener("click", function () {
  checkInForm.reset();
  successCard.classList.add("hidden");
  formCard.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dreamy lo-fi background music
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");

if (backgroundMusic && musicToggle && musicStatus) {
  backgroundMusic.volume = 0.25;
  backgroundMusic.autoplay = true;

  function updateMusicButton() {
    if (backgroundMusic.paused) {
      musicToggle.textContent = "♪ Play Music";
      musicToggle.setAttribute("aria-label", "Play background music");
      musicStatus.textContent = "a little song for you ♡";
    } else {
      musicToggle.textContent = "Ⅱ Pause Music";
      musicToggle.setAttribute("aria-label", "Pause background music");
      musicStatus.textContent = "now playing: dreamy lofi ♡";
    }
  }

  musicToggle.addEventListener("click", async function () {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
      } catch (error) {
        musicStatus.textContent = "tap play for a little music ♡";
      }
    } else {
      backgroundMusic.pause();
    }

    updateMusicButton();
  });

  backgroundMusic.addEventListener("play", updateMusicButton);
  backgroundMusic.addEventListener("pause", updateMusicButton);

  // Try playing as soon as the page opens
  backgroundMusic.load();
  backgroundMusic.play().catch(function () {
    musicStatus.textContent = "tap play for a little music ♡";
  });

  updateMusicButton();
}
