function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel__inner')
  const slides = document.querySelectorAll('.carousel__slide');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const width = slides[0].offsetWidth;
  const totalSlides = slides.length;
  let currentSlide = 0;
  console.log(width , totalSlides)


  arrowRight.addEventListener('click' , () => { 
    moveForward();
  })

  arrowLeft.addEventListener('click' , () => { 
    moveBack();
  })

  function moveForward() { 
    

    if (currentSlide >= totalSlides - 1) {
      return;
    }
    currentSlide = currentSlide + 1;
    carouselInner.style.transform = `translateX(${-width * currentSlide}px)`;

    arrowVisible();

  }

  function moveBack() { 
    
    if (currentSlide <= 0) { 
      return;
    }

    currentSlide = currentSlide - 1;
    carouselInner.style.transform = `translateX(${-width * currentSlide}px)`;

    arrowVisible();

  }

  function arrowVisible() {
    if (currentSlide === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (currentSlide === totalSlides - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }

  arrowVisible();

}

  


