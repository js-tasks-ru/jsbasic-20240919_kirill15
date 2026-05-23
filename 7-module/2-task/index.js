import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.container = createElement(`<div class="modal">
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
    this.buttonEsc = null;
  }

  open() {
    if (document.body.classList.contains('is-modal-open')) {
      return;
    }
    document.body.classList.add('is-modal-open');
    document.body.append(this.container);
    this.closeX();
    this.closeEsc();
  }

  setTitle(title) {
    const titleElement = this.container.querySelector('.modal__title');
    titleElement.innerHTML = title;
  }

  setBody(node) {
    const bodyElement = this.container.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.appendChild(node);
  }

 
  close() {
    this.closeModal();
  }

  closeModal() {
    
    if (this.buttonEsc) {
      document.removeEventListener('keydown', this.buttonEsc);
      this.buttonEsc = null;
    }

    document.body.classList.remove('is-modal-open');
    if (this.container && this.container.parentNode) {
      this.container.remove();
    }
  }

  closeX() {
    this.container.addEventListener('click', (event) => {
      const closeButton = event.target.closest('.modal__close');
      if (closeButton) {
        this.closeModal();
      }
    });
  }

  closeEsc() {
    this.buttonEsc = (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    };
    document.addEventListener('keydown', this.buttonEsc);
  }

  get elem() {
    return this.container;
  }
}
