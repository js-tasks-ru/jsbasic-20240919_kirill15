function toggleText() {
  let button = document.querySelector('.toggle-text-button')
  let text = document.querySelector('#text')

  button.addEventListener('click' , () => { 
    if(text.hidden) { 
      return  text.hidden = false
    }else { 
      return text.hidden = true
    } 

    })
  }

  
  
  
