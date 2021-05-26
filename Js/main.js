"use strict";

if (localStorage.getItem("colorIndex") !== null) {
   document.documentElement.style.setProperty("--main-color",localStorage.getItem("colorIndex"));
}

//get landing page
let landingPage = document.querySelector(".landing_page");


if (localStorage.getItem("back") !== null) {
   landingPage.style.backgroundImage = localStorage.getItem("back");
}

let backOption = true;
let backgroundInterval;

//settings Box Hundel
document.querySelector(".icon i").onclick = function () {
   this.classList.toggle("fa-spin");
   document.querySelector(".setting_box").classList.toggle("open");
}

//get bullets box
let bullet_box = document.querySelector(".bullets_nav");

//list handel
let allSections = document.querySelectorAll(".section");
let ulList = document.querySelector(".links")
allSections.forEach(el => {
   let list = document.createElement("li");
   let listLink = document.createElement("a");
   listLink.href = `#${el.classList[0]}`;
   let text = document.createTextNode(el.classList[0]);
   
   listLink.dataset.section = `.${el.classList[0]}`;
   
   listLink.appendChild(text);
   
   list.appendChild(listLink);
   
   ulList.appendChild(list);
   
});


//loop in all list
const listColors = document.querySelectorAll(".colors_list li");

listColors.forEach((li,i) => {
   
 li.addEventListener("click",(e) => {
   
   document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
   localStorage.setItem("colorIndex",e.target.dataset.color);
   
   e.target.parentElement.querySelectorAll(".active").forEach(elm => {
      elm.classList.remove("active");
   });
   
   e.target.classList.add("active");
 });
 
 if (li.dataset.color === localStorage.getItem("colorIndex")) {
    li.parentElement.querySelectorAll(".active").forEach(elm => {
       elm.classList.remove("active");
    });
    li.classList.add("active");
 }
 
});


//create images Array
let imges = ["img_1.jpg","img_2.jpeg","img_3.jpg","img_4.png","img_5.jpg","img_6.webp"]


let toggle = document.querySelectorAll(".options i");

toggle.forEach(tgg => {

 if (tgg.parentElement.classList.contains("back_change")) {
   if (localStorage.getItem("interval") !== null) {
      tgg.className = "fad";
      tgg.classList.add(`fa-toggle-${localStorage.getItem("interval")}`);
      localStorage.getItem("interval") === "on" ? backOption = true : backOption = false;
   }
   tgg.onclick = function() {
         if (this.classList.contains("fa-toggle-off")) {
            this.classList.remove("fa-toggle-off");
            this.classList.add("fa-toggle-on");
            localStorage.setItem("interval", "on");
            backOption = true;
            backrandom();
         } else {
            this.classList.remove("fa-toggle-on");
            this.classList.add("fa-toggle-off");
            localStorage.setItem("interval", "off");
            localStorage.setItem("back", landingPage.style.backgroundImage);
            backOption = false;
            clearInterval(backgroundInterval);
         }
   }
 }

if (tgg.parentElement.classList.contains("bullet_control")) {
   
   if (localStorage.getItem("bullet") !== null) {
      tgg.className = "fad";
      tgg.classList.add(`fa-toggle-${localStorage.getItem("bullet")}`);
   }
   
   tgg.onclick = function() {
      if (this.classList.contains("fa-toggle-off")) {
         this.classList.remove("fa-toggle-off");
         this.classList.add("fa-toggle-on");
         localStorage.setItem("bullet", "on");
         bulletControl();
      }else {
         this.classList.remove("fa-toggle-on");
         this.classList.add("fa-toggle-off");
         localStorage.setItem("bullet", "off");
         bulletControl();
      }
   }
}
   
});

bulletControl();

function bulletControl() {
   
   if (localStorage.getItem("bullet") !== null) {
      bullet_box.style.display = localStorage.getItem("bullet") === "on" ? "block" : "none";
    //  if ()
   }else{
      bullet_box.style.display = "none";
   }
   
}

function backrandom() {
   
   if (backOption === true) {
      //change background evrey 1000 ms
      backgroundInterval = setInterval(() => {
         //genarate random number
         let randomNum = Math.floor(Math.random() * imges.length);
      
         //change background-image
         landingPage.style.backgroundImage = `url("images/${imges[randomNum]}")`;
      }, 10000);
   }
   
}

backrandom();

let ouerSkills = document.querySelector(".skills");
let allSpans = document.querySelectorAll(".skills .skill_box .skill_progress span");

window.onscroll = function () {
   
   let skillsOffsetTop = ouerSkills.offsetTop;
   
   let skillsOffsetHeight = ouerSkills.offsetHeight;
   
   let windowHeight = this.innerHeight;
   
   let scrollHeight = this.pageYOffset;

   if (scrollHeight > (skillsOffsetTop + (skillsOffsetHeight / 2) - windowHeight)) {
      allSpans.forEach(span => {
         span.style.width = span.dataset.progress;
      });
   }
}

//select Ouer Gallery
let ouerGallery = document.querySelectorAll(".gallery img");

ouerGallery.forEach(img => {
   
   img.addEventListener("click",(e)=> {
      
      let overlay = document.createElement("div");
      
      overlay.className = "popup_overlay";
      
      document.body.appendChild(overlay);
      
      //create popup box
      let popupBox = document.createElement("div");
      
      popupBox.className = "popup_box";
      
      if (img.alt !== null) {
         let heading = document.createElement("h3");
         let imgText = document.createTextNode(img.alt);
      
         heading.appendChild(imgText);
         popupBox.appendChild(heading);
      }
      
      //create the image
      let ouerImg = document.createElement("img");
      
      ouerImg.src = img.src;
      
      popupBox.appendChild(ouerImg);
      document.body.appendChild(popupBox);
      
      //create the close button
      let closeBtn = document.createElement("span");
      closeBtn.className = "close_button";
      let closeIcon = document.createElement("i");
      closeIcon.className = "fa fa-times close_button";
      closeBtn.appendChild(closeIcon);
      popupBox.appendChild(closeBtn);
      
   });
   
});


document.addEventListener("click",(e) => {
   
   if (e.target.classList.contains("close_button")) {
      document.querySelector(".popup_overlay").remove();
      document.querySelector(".popup_box").remove();
   }
});

//select all the Links and all the bullets
const allLinks = document.querySelectorAll(".header_area .links li a");
const allBullets = document.querySelectorAll(".bullets_nav .bullet");

scrollToTarget(allBullets);



function mobileMenu(par) {
   par.forEach(Link => {
   
      Link.addEventListener("click", (e) => {
         document.querySelector(".links").classList.remove("open");
      });
   });
}


function scrollToTarget(list) {

   list.forEach(Link => {

      Link.addEventListener("click", (e) => {

         e.preventDefault();

         document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: "smooth"

         });

   });
});
}

//reset Option
document.querySelector(".reset_option").onclick = function () {
   
   localStorage.removeItem("interval");
   localStorage.removeItem("bullet");
   localStorage.removeItem("back");
   localStorage.removeItem("colorIndex");
   
   window.location.reload();
   
};

let toggleBtn = document.querySelector(".toggle_mainu");
let toggleMobile = document.querySelector(".close_btn");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
   
   e.stopPropagation();
   
   tLinks.classList.toggle("open");
   
}
toggleMobile.onclick = function(e) {

   e.stopPropagation();

   tLinks.classList.toggle("open");

}

tLinks.onclick = function (e) {
   e.stopPropagation();
}


if (document.querySelector(".toggle_mainu").style.display === "none") {
   scrollToTarget(allLinks);
   document.addEventListener("click", (e) => {

      if (tLinks.classList.contains("open")) {
         if (e.target !== toggleBtn && e.target !== tLinks) {
            tLinks.classList.remove("open");
         }
      }

   });
} else {
   mobileMenu(allLinks);
}