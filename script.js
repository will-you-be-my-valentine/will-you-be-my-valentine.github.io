var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let showCanvasText = true;


// ================= PASSWORD GATE =================
const CORRECT_PASSWORD = "sreelekha"; // 🔐 CHANGE THIS

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("passwordOverlay");
  const input = document.getElementById("passwordInput");
  const btn = document.getElementById("unlockBtn");
  const error = document.getElementById("errorMsg");

  btn.addEventListener("click", unlock);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") unlock();
  });

  function unlock() {
    if (input.value === CORRECT_PASSWORD) {
      overlay.style.transition = "opacity 1s ease";
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 1000);
    } else {
      error.textContent = "Hmm… that’s not it 💭";
      input.value = "";
    }
  }
});


var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const yesBtn = document.getElementById("yesBtn");
const carouselSection = document.getElementById("carouselSection");
const choiceButtons = document.getElementById("choiceButtons");

let carouselStarted = false;

yesBtn.addEventListener("click", () => {
  // STOP canvas text
  showCanvasText = false;

  // Hide buttons & tease text
  choiceButtons.style.display = "none";
  teaseText.style.display = "none";

  // Fade in carousel
  carouselSection.style.display = "block";
  carouselSection.style.opacity = 0;

  let fade = 0;
  const fadeIn = setInterval(() => {
    fade += 0.02;
    carouselSection.style.opacity = fade;
    if (fade >= 1) clearInterval(fadeIn);
  }, 30);

  if (!carouselStarted) {
    startCarousel();
    carouselStarted = true;
  }
});



function startCarousel() {
  const slides = document.querySelectorAll(".carousel-img");
  let currentSlide = 0;

  if (slides.length === 0) {
    console.error("Carousel error: no images found");
    return;
  }

  setInterval(() => {
    slides[currentSlide]?.classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide]?.classList.add("active");
  }, 3000);
}


const slides = document.querySelectorAll(".carousel-img");
let currentSlide = 0;

const noBtn = document.getElementById("noBtn");
const teaseText = document.getElementById("teaseText");

const messages = [
  "Are you sure? 🥺",
  "You know the answer ✨",
  "Nice try 😌",
  "That button is broken 💙"
];

let attempts = 0;

noBtn.addEventListener("mouseenter", () => {
  const maxX = 220; // horizontal movement range
  const maxY = 40;  // vertical movement range

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  teaseText.innerText = messages[attempts % messages.length];
  attempts++;
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber < 250){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Every day, I can’t believe how lucky I am.", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Every day, I can’t believe how lucky I am.", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 500){
        opacity = 0;
    }
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["Among trillions and trillions of stars, over billions of years,"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Among trillions and trillions of stars, over billions of years,", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Among trillions and trillions of stars, over billions of years,"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Among trillions and trillions of stars, over billions of years,", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("to be alive and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("to be alive and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely.", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely.", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["And yet, here I am, given the impossible chance", "to know you, to love you, and to choose you."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("And yet, here I am, given the impossible chance to know you, to love you, and to choose you.", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["And yet, here I am, given the impossible chance", "to know you, to love you, and to choose you."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("And yet, here I am, given the impossible chance to know you, to love you, and to choose you.", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
    }
    if(frameNumber > 2500 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much, ladoomanii ❤️😘", "more than all the time and space in the universe can contain."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much, ladoomanii ❤️😘 more than all the time and space in the universe can contain.", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    
    if(frameNumber >= 2750 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["And I can’t wait to spend all the time","in the world sharing that love with you.!"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("And I can’t wait to spend all the time in the world sharing that love with you.!", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
        context.fillText("So Will You Be My Valentine", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        document.getElementById("choiceButtons").style.display = "block";
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "rgba(255, 255, 255, 0.8)";
    context.shadowBlur = 12;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();
  updateStars();

  if (showCanvasText) {
    drawText();
  }

  frameNumber++;
  requestAnimationFrame(draw);
}


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
