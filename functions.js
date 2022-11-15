window.addEventListener("load", (event) => {
  setActive();
});

function setActive() {
  let url = window.location.href;
  let urlSplit = url.split("/");
  let page = urlSplit[urlSplit.length - 1];
console.log(page)
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
  console.log("Hi");
}

document.querySelector(".nav-burger").addEventListener("click", toggleMenu);

let toggled = false;
function toggleMenu() {
  if (!toggled) {
    document
      .querySelector(".nav-burger img")
      .setAttribute("src", "project-assets/nav/burguer-icon.svg");
    document.querySelector(".nav-info").style.transform = "translateY(-200px)";
    toggled = true;
  } else {
    document
      .querySelector(".nav-burger img")
      .setAttribute("src", "project-assets/nav/cross-icon.svg");

    document.querySelector(".nav-info").style.transform = "translateY(50px)";
    toggled = false;
  }
}
