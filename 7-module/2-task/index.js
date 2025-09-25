import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.container = createElement(` <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>`);

    this.closeButton();
    this.closeEscHandler = this.closeEsc.bind(this);
  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.container);
    document.addEventListener('keydown', this.closeEscHandler);
  }

  setTitle(modalTitle) {

    const title = this.container.querySelector('.modal__title');
    title.innerHTML = modalTitle;

  }

  setBody(node) {

    const body = this.container.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(node);



  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.container.remove(this.container);
    document.removeEventListener('keydown', this.closeEsc.bind(this)); 

  }


  closeButton() {

    const button = this.container.querySelector('.modal__close');
    button.addEventListener('click' , (ev) => {

      const target = ev.target.closest('button');

      if (target) {
        this.close();
      }



    });

  }

  closeEsc(ev) { 

    if (ev.code === "Escape") {
      this.close();
    }
    
  
}
}
