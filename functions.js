window.addEventListener("load", () => {
  loadTemplates();
  getData();

  toggled = false;
});

function loadTemplates() {
  const navTemplate = document.getElementById("nav-template");

  navTemplate.innerHTML = `<div class="mobile-header">
  <img src="project-assets/logos/circle.svg" alt="Circle logo" />
  <button class="nav-burger" onclick="toggleMenu()">
    <img
      src="project-assets/nav/burguer-icon.svg"
      alt="Burger menu icon"
    />
  </button>
</div>
<div class="nav-info">
  <nav>
    <ul>
      <a id="nav-home" href="home.html"
        ><li class="headline-medium">Home</li></a
      >
      <a id="nav-projects" href="projects.html"
        ><li class="headline-medium">Projects</li></a
      >
      <a id="nav-contact" href="#"
        ><li class="headline-medium">Services</li></a
      >
    </ul>
  </nav>
  <a href="contact.html">
    <button class="blue-filled-btn headline-medium">Contact Us</button>
  </a>
</div>`;

  const footerTemplate = document.getElementById("footer-template");

  footerTemplate.innerHTML = `<div class="footer-container">
  <div class="footer-info">
    <img src="project-assets/logos/circle.svg" alt="Logo img" />
    <p class="headline-regular">
      2972 Westheimer Rd. Santa Ana, Illinois 85486
    </p>
  </div>
  <div class="footer-links">
    <a class="headline-regular" href="#">Team</a>
    <a class="headline-regular" href="#">Services</a>
    <a class="headline-regular" href="#">About Us</a>
    <a class="headline-regular" href="#">Press</a>
    <a class="headline-regular" href="#">Projects</a>
    <a class="headline-regular" href="#">Privacy Policy</a>
  </div>
</div>`;

  document.querySelector("header").appendChild(navTemplate.content);
  document.querySelector("footer").appendChild(footerTemplate.content);

  navTemplate.addEventListener("load", setActive());
}

// API GET
function getData() {
  let url = window.location.href;

  if (url.includes("home.html")) {
    // GET DATA AND FILL CARDS´
    getProjects(3);
  } else if (url.includes("project.html")) {
    document.querySelector("#date").innerHTML = actualDate();
    getProjectDetails(url);
    getProjects(3);
  } else if (url.includes("projects.html")) {
    getProjects(9);
  }
}

async function getProjects(num) {
  let data = [];
  let count = 0;
  try {
    const res = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1//objects?departmentIds=11`
    );
    const allData = await res.json();

    while (count < num) {
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1//objects/${
          allData.objectIDs[
            Math.floor(Math.random() * allData.objectIDs.length)
          ]
        }`
      );
      const resJSON = await res.json();
      data.push(resJSON);

      count++;
    }
    fillCards(data);
  } catch (e) {
    console.log(e);
  }
}

async function getProjectDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  // const queryString = window.location.search;

  // console.log('STRING:', queryString);
  // console.log(urlParams.get('projectId'));

  // const params = new Proxy(new URLSearchParams(window.location.search), {
  //   get: (searchParams, prop) => searchParams.get(prop),
  // });
  // console.log(params.projectId)

  const res = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1//objects/${urlParams.get(
      "projectId"
    )}`
  );
  const projectData = await res.json();

  document.querySelector("h1").innerHTML = projectData.title;
  document.querySelector("#project-detail img").src = projectData.primaryImage;
  document.querySelector(".subtitle").innerHTML = projectData.department;
}

function fillCards(data) {
  document.querySelector("#projects .cards, #projects-page .cards").innerHTML =
    "";
  data.forEach((project, index) => {
    let imgUrl = "";
    project.primaryImage === ""
      ? (imgUrl = "project-assets/projects-section/1.jpg")
      : (imgUrl = project.primaryImage);
    document.querySelector(
      "#projects .cards,#projects-page .cards"
    ).innerHTML += `<article id="card-${index}" class="card"> 
    <img
      src="${imgUrl}"
      alt="Project img"
    />
    <div class="card-text">
      <p class="body-medium">${project.title}</p>
      <p class="headline-regular">${project.artistDisplayName}</p>
      <div class="link">
        <a class="headline-regular" href=project.html?projectId=${project.objectID}>Learn More</a>
      </div>
    </div>
  </article>`;
  });
}

// NAV ACTIVE
function setActive() {
  let url = window.location.href;
  let urlSplit = url.split("/");
  let page = urlSplit[urlSplit.length - 1];

  document
    .querySelectorAll("body a")
    .forEach((el) => el.classList.remove("active"));

  switch (page) {
    case "home.html":
      document.querySelector(`#nav-home li`).classList.add("active");
      break;
    case "projects.html":
      document.querySelector(`#nav-projects li`).classList.add("active");
      break;
    case "contact.html":
      document.querySelector(`#nav-contact li`).classList.add("active");
      break;
  }
}

// NAV TOGGLE
let toggled = false;
addEventListener("resize", (event) => {
  hideMenu();
  if (window.innerWidth > 1024)
    document.querySelector(".nav-info").style.transform = "translateY(0px)";
});

function toggleMenu() {
  if (!toggled) {
    hideMenu();
  } else {
    showMenu();
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

// HANDLE CONTACT SUSCRIBE

function suscribe(event) {
  event.preventDefault();
  const email = document.querySelector("#contact #suscribe-email").value;

  if (email.includes("@") && email.includes(".")) {
    document
      .querySelector("#contact .suscribe-message")
      .classList.add("succeed", "show-and-hide");
    document.querySelector("#contact .suscribe-message p").innerHTML =
      "Thank you! Your submission has been received!";
  } else {
    document
      .querySelector("#contact .suscribe-message")
      .classList.add("fail", "show-and-hide");
    document.querySelector("#contact .suscribe-message p").innerHTML =
      "Oops! Something went wrong while submitting the form!";
  }

  document.querySelector("#contact #suscribe-email").value = "";
  setTimeout(() => {
    document
      .querySelector("#contact .suscribe-message")
      .classList.remove("show-and-hide", "succeed", "fail");
  }, 5000);
}

// HANDLE CONTACT US FORM

function handleSubmit(event) {
  event.preventDefault();
  const message = document.querySelector("#big-contact textarea").value;

  document.querySelector("#big-contact #submit").value = "Please wait...";

  setTimeout(() => {
    document.querySelector("#big-contact #submit").value = "Submit";
    if (message.includes("Hi")) {
      document
        .querySelector("#big-contact .suscribe-message")
        .classList.add("succeed", "show-and-hide");
      document.querySelector("#big-contact .suscribe-message p").innerHTML =
        "Thank you! Your submission has been received!";
    } else {
      document
        .querySelector("#big-contact .suscribe-message")
        .classList.add("fail", "show-and-hide");
      document.querySelector("#big-contact .suscribe-message p").innerHTML =
        "Oops! Something went wrong while submitting the form!";
    }

    // Sould reset values?
    setTimeout(() => {
      document
        .querySelector("#big-contact .suscribe-message")
        .classList.remove("show-and-hide", "succeed", "fail");
    }, 5000);
  }, 1000);
}

// ENTER ANIMATION ON SCROLL

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scrolled");
    } else {
      entry.target.classList.remove("scrolled");
    }
  });
});

const sections = document.querySelectorAll("section");
sections.forEach((section) => observer.observe(section));

// DATE
function actualDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}
