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


function suscribe(event) {
  event.preventDefault();
  const email = document.querySelector("#contact #suscribe-email").value
  
  if (email.includes("@") && email.includes(".")) {
    document.querySelector("#contact .suscribe-message").classList.add('succeed', 'show-and-hide')
    document.querySelector("#contact .suscribe-message p").innerHTML = "Thank you! Your submission has been received!"
  } else {
    document.querySelector("#contact .suscribe-message").classList.add('fail', 'show-and-hide')
    document.querySelector("#contact .suscribe-message p").innerHTML = "Oops! Something went wrong while submitting the form!"
  }

  document.querySelector("#contact #suscribe-email").value = ""
  setTimeout(() => {
  document.querySelector("#contact .suscribe-message").classList.remove("show-and-hide", "succeed", "fail")
    }, 5000)
}

function handleSubmit(event) {
  event.preventDefault();
  const message = document.querySelector("#big-contact textarea").value

  document.querySelector("#big-contact #submit").value="Please wait..."

  setTimeout(() => {
    document.querySelector("#big-contact #submit").value="Submit"
    if (message.includes("Hi")) {
      document.querySelector("#big-contact .suscribe-message").classList.add('succeed', 'show-and-hide')
      document.querySelector("#big-contact .suscribe-message p").innerHTML = "Thank you! Your submission has been received!"
    } else {
      document.querySelector("#big-contact .suscribe-message").classList.add('fail', 'show-and-hide')
      document.querySelector("#big-contact .suscribe-message p").innerHTML = "Oops! Something went wrong while submitting the form!"
    }
  
    // Reset values
    setTimeout(() => {
    document.querySelector("#big-contact .suscribe-message").classList.remove("show-and-hide", "succeed", "fail")
      }, 5000)
  },1000)
  
}

