export const interactiveDOM = {
  burger: {
    state: 'close',
    elements: {
      inAction: {
        menu: document.querySelector('header.header nav.navigation'),
        overlay: document.querySelector('.portal .overlay'),
        body: document.body,
      },
      open: [document.querySelector('.burger__wrapper')],
      close: [document.querySelector('.close__burger__button'), document.querySelector('.overlay')],
    },
    actions: {
      open: function () {
        this.state = 'open';
        this.elements.inAction.menu.setAttribute('aria-opened', 'open')
        this.elements.inAction.body.setAttribute('aria-overlay', 'open')
      },
      close: function () {
        this.state = 'close';
        this.elements.inAction.menu.removeAttribute('aria-opened')
        this.elements.inAction.body.removeAttribute('aria-overlay')
      },
    }
  },
  modal: {
    state: 'close',
    elements: {
      inAction: {
        modalWrapper: document.querySelector('.portal .modal__window'),
        modalHeader: document.querySelector('.portal .modal__window .modal__header'),
        modalContent: document.querySelector('.portal .modal__window .modal__content'),
        modalFooter: document.querySelector('.portal .modal__window .modal__footer'),
        overlay: document.querySelector('.portal .overlay'),
        body: document.body,
      },
      open: [],
      close: [document.querySelector('.close__modal__button'), document.querySelector('.overlay')],
    },
    actions: {
      open: function ({ content, timerMS }) {

        if (content) {
          this.elements.inAction.modalContent.appendChild(content)
        }

        this.state = 'open';
        this.elements.inAction.modalWrapper.setAttribute('aria-opened', 'open')
        this.elements.inAction.body.setAttribute('aria-overlay', 'open')

        if (timerMS) {
          this.elements.inAction.modalFooter.textContent = ''
          let acc = 0;
          const handleTimer = setInterval(() => {
            acc += 1000;
            if (acc >= timerMS || this.state === 'close') {
              if (this.state === 'open') {
                this.actions.close()
              }
              clearInterval(handleTimer)
            }

            this.elements.inAction.modalFooter.textContent = `Это окно автоматически закроется через ${Math.trunc((timerMS - acc) / 1000)}`

          }, 1000);
        }
      },
      close: function () {
        this.state = 'close';
        this.elements.inAction.modalWrapper.removeAttribute('aria-opened')
        this.elements.inAction.body.removeAttribute('aria-overlay')
      },
    }
  },
};

for (const key in interactiveDOM) {
  if (interactiveDOM.hasOwnProperty(key)) {
    const item = interactiveDOM[key];
    if (item.actions) {
      for (const action in item.actions) {
        if (item.actions.hasOwnProperty(action)) {
          item.actions[action] = item.actions[action].bind(item);
        }
      }
    }
  }
}