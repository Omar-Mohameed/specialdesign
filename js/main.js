// Check if there is local storage color 
let mainColor = localStorage.getItem('color-option');
if(mainColor) {
  document.documentElement.style.setProperty('--main-color', mainColor);
  // Remove Active Class From All Lis
  document.querySelectorAll('.color-option li').forEach((ele)=>{
    ele.classList.remove('active');

    // Add Active Class on Li Twith data color there is local storage
    // if(ele.dataset.color == mainColor) {
    //   ele.classList.add('active');
    // }
    if(ele.getAttribute('data-color') == mainColor) {
      ele.classList.add('active');
    }
  })
}
// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval ;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
if(backgroundLocalItem != null) {
// Remove Active Class From All Spans
document.querySelectorAll('.options-background span').forEach((ele)=>{
  ele.classList.remove('active');
})

if(backgroundLocalItem == 'true') {
  backgroundOption = true;
  document.querySelector('.options-background .yes').classList.add('active');
} else {
  backgroundOption = false;
  document.querySelector('.options-background .no').classList.add('active');
}
}

// Select Landing Page Element
let homePage = document.querySelector(".home-page");

let arrOfImgs=[];
for(let i=1 ; i<=5;i++) {
  arrOfImgs.push(`0${i}.jpg`)
}



function randomBackground() {
  if(backgroundOption) {
    backgroundInterval = setInterval(() =>{
      // Get Random Number
      let randNum = Math.floor(Math.random() * arrOfImgs.length);
      // change background image
      homePage.style.backgroundImage = `url('imgs/${arrOfImgs[randNum]}')`;
      },8000)
  }
}
randomBackground();

  /* Start Settings Box */
// open and close settings box
let iconGear = document.querySelector('.icon-gear');
let settingsBox = document.querySelector('.setting-box');
iconGear.addEventListener('click',()=>{
  document.querySelector('.setting-box .fa-gear').classList.toggle('fa-spin');
  document.querySelector('.setting-box').classList.toggle('open');
});
//close settings box if clicked outside of settings box
document.addEventListener('click', function(event) {
  if (!settingsBox.contains(event.target)) {
    if(settingsBox.classList.contains('open')) {
      settingsBox.classList.remove('open');
      document.querySelector('.setting-box .fa-gear').classList.remove('fa-spin');
    }
  }
});
// Switch Color Text 
const colorsLi = document.querySelectorAll('.color-option li');
colorsLi.forEach((li)=> {
  li.addEventListener('click',(e)=>{
    // console.log(e.target.dataset.color)
    // Change main color Of Root
    document.documentElement.style.setProperty('--main-color', e.target.getAttribute('data-color'));
    // Set Color To Local Storage
    localStorage.setItem('color-option', e.target.getAttribute('data-color'));
    // Remove Active Class From All Lis
    e.target.parentElement.querySelectorAll('.active').forEach((ele)=>{
      ele.classList.remove('active');
    })
    // Add Active Class on Li Target
    e.target.classList.add('active');
  });
})

// Switch random Background Color
const randomBackImgs = document.querySelectorAll('.options-background span');
randomBackImgs.forEach((span)=> {
  span.addEventListener('click',(e)=>{
    // Remove Active Class From All spans
    e.target.parentElement.querySelectorAll('.active').forEach((ele)=>{
      ele.classList.remove('active');
    })
    // Add Active Class on span Target
    e.target.classList.add('active');

    if(e.target.dataset.background == 'yes') {
      backgroundOption = true;
      randomBackground();
      localStorage.setItem('background_option',backgroundOption);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem('background_option',backgroundOption);
    }
  });
})

// option-bullets

// check if option-bullets local storage
if(localStorage.getItem('show-bullets')){
// Remove Active Class From All Spans
document.querySelectorAll('.option-bullets span').forEach((ele)=>{
  ele.classList.remove('active');
})

  if(localStorage.getItem('show-bullets') == 'yes'){
    document.querySelector('.option-bullets #yes').classList.add('active');
    document.querySelector('.bullets').style.display = "block";
  } else{
    document.querySelector('.option-bullets #no').classList.add('active');
    document.querySelector('.bullets').style.display = "none";
  }
}

let spanBullets = document.querySelectorAll('.options-bullets span');
spanBullets.forEach((span)=>{
  span.addEventListener('click',(e) => {
    // Remove class active from all spans
    e.target.parentElement.querySelectorAll('.active').forEach((ele)=>{
      ele.classList.remove('active');
    })
    // Add Active Class on span Target
    e.target.classList.add('active');

    if(e.target.id == "yes") {
      document.querySelector('.bullets').style.display = "block";
      localStorage.setItem('show-bullets','yes');
    } else {
      document.querySelector('.bullets').style.display = "none";
      localStorage.setItem('show-bullets','no');
    }
  })
})

// button Reset Options
let resetOption = document.querySelector('.reset-option');
resetOption.addEventListener('click',()=>{
  // localStorage.clear();
  localStorage.removeItem("color-option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("show-bullets");
  // Reload Window
  window.location.reload();
})

//Skills animation
let allProgress = document.querySelectorAll(".skill-box span")
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  //find skills offset top(الارتفاع الي فوقيه)
  let skillsOffsetTop = ourSkills.offsetTop;
  //find skill outer height(ارتفاع الديف نفسه كام بتاع ال skills)
  let skillsOuterHeight = ourSkills.offsetHeight;
  //window height(ارتفاع النافذه ال انا فيها حاليا)
  let windowHeight = window.innerHeight;
  //window scroll top(الارتفاع الجزء ال عملتله scrool)
  let windowScrollTop = window.scrollY;


  if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) &&
      windowScrollTop < (skillsOffsetTop + skillsOuterHeight)) { //948 -10
    allProgress.forEach((ele)=>{
      ele.style.width = ele.dataset.progress;
    })
  } else if(windowScrollTop < (skillsOffsetTop - windowHeight)) {
    allProgress.forEach((ele)=>{
      ele.style.width = "0";
    })
  } else if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight + windowHeight)){
    allProgress.forEach((ele)=>{
      ele.style.width = "0";
    })
  }
}

//start out gallery
let imgs = document.querySelectorAll(".imgs-box img");
imgs.forEach((img)=>{
  img.addEventListener('click', ()=> {
    let overLay = document.createElement("div");
    overLay.classList.add("imgs-overlay");
    document.body.appendChild(overLay);
    // create popup that have the image
    let imageBox = document.createElement("div");
    imageBox.classList.add("image-box");
    // create the image element
    let image = document.createElement("img");
    image.src = img.src;
    // add the image to the image box
    imageBox.appendChild(image);
    // append the image box to the body
    document.body.appendChild(imageBox);

    if(img.alt !== null) {
      let heading = document.createElement("h3");
      heading.innerHTML = img.alt;
      imageBox.prepend(heading);
    }

// create the close button
    let closeButton = document.createElement("span");
    closeButton.classList.add("closeX");
    closeButton.innerHTML = "X";
    imageBox.appendChild(closeButton);
  });
});

// close button
document.addEventListener("click", (e) => {
  if(e.target.classList.contains("closeX")) {
    e.target.parentElement.remove();
    document.querySelector(".imgs-overlay").remove();
  } else if(e.target.classList.contains("imgs-overlay")) {
    e.target.remove();
    document.querySelector(".image-box").remove();
  } 
});



// Responsive of toggle button
let toggleButton = document.querySelector('.botton-toggle');
let links = document.querySelector('.links-container ul');

toggleButton.onclick = function(e) {
  e.stopPropagation();
  this.classList.toggle('menu-active');
  links.classList.toggle('open');
};
// if(links.classList.contains('open')) {

  document.addEventListener('click', (e)=> {
    if(!e.target.classList.contains('open') &&links.classList.contains('open') && e.target!= toggleButton) {
      links.classList.remove('open');
      toggleButton.classList.remove('menu-active');
    }
  })

// stop Propagation on menu click
links.onclick = function(e) {
  e.stopPropagation();
}