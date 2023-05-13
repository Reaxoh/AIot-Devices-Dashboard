const doorCard      = document.getElementById("doorCard");
const doorSvg       = document.getElementById("doorSvg");
const doorPath1     = document.getElementById("doorPath1");
const doorPath2     = document.getElementById("doorPath2");

const laptopCard    = document.getElementById("laptopCard");
const laptopSvg     = document.getElementById("laptopSvg");
const laptopPath    = document.getElementById("laptopPath");

const lightbulbCard = document.getElementById("lightbulbCard");
const lightbulbSvg  = document.getElementById("lightbulbSvg");
const lightbulbPath = document.getElementById("lightbulbPath");

let isDoorOpen      = false;
let isLaptopOpen    = false;
let isLightbulbpen  = false;

doorCard.     addEventListener("click", showDoor);
laptopCard.   addEventListener("click", showLaptop);
lightbulbCard.addEventListener("click", showLightbulb);

function showDoor(){  
    if(isDoorOpen) {
        doorSvg.classList.remove("bi-door-closed");
        doorSvg.classList.add   ("bi-door-open"  );
        doorPath1.setAttributeNS(null, "d", "M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z");
        doorPath2.setAttributeNS(null, "d", "M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z");
    } else {
        doorSvg.classList.remove("bi-door-open");
        doorSvg.classList.add("bi-door-closed");
        doorPath1.setAttributeNS(null, "d", "M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z");
        doorPath2.setAttributeNS(null, "d", "M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z")
    }
    isDoorOpen = !isDoorOpen;
}

function showLaptop(){
    if(isLaptopOpen) {
        laptopSvg.classList.remove("bi-laptop-fill");
        laptopSvg.classList.add("bi-laptop");
        laptopPath.setAttributeNS(null,"d", "M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z");
    } else {
        laptopSvg.classList.remove("bi-laptop");
        laptopSvg.classList.add("bi-laptop-fill");
        laptopPath.setAttributeNS(null,"d", "M2.5 2A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z");
    }
    isLaptopOpen = !isLaptopOpen;
}

function showLightbulb(){
    if(isLaptopOpen) {
        lightbulbSvg.classList.remove("bi-lightbulb");
        lightbulbSvg.classList.add("bi-lightbulb-fill");
        lightbulbPath.setAttributeNS(null,"d","M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z");
    } else {
        lightbulbSvg.classList.remove("bi-lightbulb-fill");
        lightbulbSvg.classList.add("bi-lightbulb");
        lightbulbPath.setAttributeNS(null,"d","M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z");
    }
    isLaptopOpen = !isLaptopOpen;
}