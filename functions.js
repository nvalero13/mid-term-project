window.addEventListener("load", (e) => {
  setActive();
  getData();
  toggled = false;
});

// API GET
function getData() {
  let url = window.location.href;

  if (url.includes("home.html")) {
    // GET DATA AND FILL CARDS´
    getProjects()
  } else if (url.includes("project.html")) {
    getProjectDetails(url)
    getProjects()
  }
;
}

async function getProjects() {
  let data = [];
  let count = 0;
  try {
    const res = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1//objects?departmentIds=11`
    );
    const allData = await res.json();

    while (count < 3) {
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

async function getProjectDetails(url) {

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  console.log(params.projectId)

  const res = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1//objects/${params.projectId}`
  );
  const projectData = await res.json();

  document.querySelector("h1").innerHTML = projectData.title;
  document.querySelector("#project-detail img").src = projectData.primaryImage;
  document.querySelector(".subtitle").innerHTML = projectData.department;
}

function fillCards(data) {
  document.querySelector("#projects .cards").innerHTML = "";
  data.forEach((project, index) => {
    let imgUrl = "";
    project.primaryImage === ""
      ? (imgUrl = "project-assets/projects-section/1.jpg")
      : (imgUrl = project.primaryImage);
    document.querySelector(
      "#projects .cards"
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
