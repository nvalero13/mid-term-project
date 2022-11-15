document.querySelector(".nav-burger").addEventListener("click", toggleMenu)

let toggled = false
function toggleMenu() {
    if(!toggled) {
        document.querySelector(".nav-burger img").setAttribute("src","project-assets/nav/burguer-icon.svg")
    document.querySelector(".nav-info").style.transform = "translateY(-200px)";
    toggled = true;
    } else {
        document.querySelector(".nav-burger img").setAttribute("src","project-assets/nav/cross-icon.svg")
 
    document.querySelector(".nav-info").style.transform = "translateY(50px)"; 
    toggled = false;
    }
}