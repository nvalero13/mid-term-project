let toggled = false;

window.addEventListener("load", (e) => {
  setActive();
  toggled = false;
});

function setActive() {
  let url = window.location.href;
  let urlSplit = url.split("/");
  let page = urlSplit[urlSplit.length - 1];

  $("body a").removeClass("active");

  switch (page) {
    case "home.html":
      $(`#nav-home li`).addClass("active");
      break;
    case "project.html":
      $(`#nav-projects li`).addClass("active");
      break;
    case "contact.html":
      $(`#nav-contact li`).addClass("active");
      break;
  }
}

addEventListener("resize", (event) => {
  hideMenu()
  if (window.innerWidth > 1024) document.querySelector(".nav-info").style.transform = "translateY(0px)";
});

document.querySelector(".nav-burger").addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!toggled) {
    hideMenu()
  } else {
    showMenu()
  }
}

function hideMenu() {
    document
      .querySelector(".nav-burger img")
      .setAttribute("src", "project-assets/nav/burguer-icon.svg");
    document.querySelector(".nav-info").style.transform = "translateY(-200px)";
    toggled = true;
  }

function showMenu() {
  document
    .querySelector(".nav-burger img")
    .setAttribute("src", "project-assets/nav/cross-icon.svg");

  document.querySelector(".nav-info").style.transform = "translateY(50px)";
  toggled = false;
}
