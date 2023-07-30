// check if there is local storage color option

let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    if (mainColor === e.dataset.color) e.classList.add("active");
  });
}

// Setting box

let settingBox = document.querySelector(".setting-box .fa-gear");

settingBox.addEventListener("click", function () {
  settingBox.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
});

// Switch colors

const colorsLi = document.querySelectorAll(".colors-list li");
// console.log(colorsLi)

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color)
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color in local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
// Switch background
let backgroundOption = true;
let backgroundInterval;
const bg = document.querySelectorAll(".random-bg span");
let mainBg = localStorage.getItem("image_option");
if (mainBg !== null) {
  if (mainBg === "yes") backgroundOption = true;
  else backgroundOption = false;
  bg.forEach((e) => {
    e.classList.remove("active");
    if (mainBg === e.dataset.background) e.classList.add("active");
  });
}
// console.log(colorsLi)

bg.forEach((e) => {
  e.addEventListener("click", (el) => {
    handleActive(el);
    localStorage.setItem("image_option", el.target.dataset.background);
    if (el.target.dataset.background === "yes") {
      backgroundOption = true;
      RandomBackground();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});
// landing pages
let imgsArray = ["1", "2", "3", "4", "5", "6", "7", "8"];
function RandomBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      document.querySelector(
        ".landing-page"
      ).style.backgroundImage = `url(images/shuffle-0${imgsArray[randomNumber]}.jpg)`;
    }, 2000);
  }
}
RandomBackground();

// Select skills
let ourSkill = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkill.offsetTop;
  // Outer height
  let skillsOuterHeight = ourSkill.offsetHeight;

  // Window height
  let windowHeight = this.innerHeight;

  // window scroll top
  let windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop >
    skillsOuterHeight + skillsOffsetTop - windowHeight - 1
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    if (img.alt !== null) {
      let heading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      heading.appendChild(imgText);
      popupBox.appendChild(heading);
    }
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // create close span

    let closeButton = document.createElement("span");

    // create the close button text
    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links li a");

function ScrollTo(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
ScrollTo(allBullets);
ScrollTo(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocal = localStorage.getItem("bullets_option");
if (bulletLocal !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocal === "show") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    localStorage.setItem("bullets_option", e.target.dataset.display);
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
    } else {
      bulletsContainer.style.display = "none";
    }
    handleActive(e);
  });
});

// reset button
document.querySelector(".reset-option").addEventListener("click", (e) => {
  localStorage.clear();
  window.location.reload();
});

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// click any where out side menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
      toggleBtn.classList.remove("menu-active");
      tLinks.classList.remove("open");
    }
});

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
