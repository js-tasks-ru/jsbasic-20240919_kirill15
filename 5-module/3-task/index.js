function initCarousel() {
 
  const btn1 = document.getElementsByClassName('carousel__arrow_right')[0];
  const btn2 = document.getElementsByClassName('carousel__arrow_left')[0];
  slides = document.getElementsByClassName('carousel__slide');

 
  ShowSlide(index);
  buttons();

  
  btn1.addEventListener('click', function() {
    if (index < slides.length - 1) { 
      index++;
    } else { 
      index = 0; 
    }
    ShowSlide(index);
    buttons();
  });

  
  btn2.addEventListener('click', function() { 
    if (index > 0) { 
      index--;
    } else { 
      index = slides.length - 1; // переходим к последнему слайду
    }
    ShowSlide(index);
    buttons();
  });

  buttons(); 
}


let index = 0; 
let slides; 

function ShowSlide(index) { 
  for (let i = 0; i < slides.length; i++) { 
    slides[i].style.display = 'none'; 
  }
  slides[index].style.display = 'block'; 
}

function buttons() {
  const btn1 = document.getElementsByClassName('carousel__arrow_right')[0];
  const btn2 = document.getElementsByClassName('carousel__arrow_left')[0];

  btn2.style.display = (index === 0) ? 'none' : 'block'; 
  btn1.style.display = (index === slides.length - 1) ? 'none' : 'block'; 
}


document.addEventListener('DOMContentLoaded', (event) => {
  initCarousel();
});
