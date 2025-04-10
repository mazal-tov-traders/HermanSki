class CustomTabs extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const tabButtons = this.querySelectorAll('[role="tab"]');
      const tabContents = this.querySelectorAll('[role="tabcontent"]');
      const timerBlocks = document.querySelectorAll('.custom-timers-wrapper .custom-timer-block');
  
      const handleTabClick = (event) => {
        const currentButton = event.currentTarget;
        const tabId = currentButton.id;
        const content = this.querySelector(`[aria-labelledby="${tabId}"]`);
        const handle = content?.dataset.handle;
  
        tabContents.forEach((el) => el.hidden = true);
        tabButtons.forEach((btn) => btn.setAttribute('aria-selected', false));
  
        currentButton.setAttribute('aria-selected', true);
        if (content) content.hidden = false;
  
        timerBlocks.forEach((block) => {
          block.hidden = true;
        });
  
        if (handle) {
          const timer = document.querySelector(`.custom-timer-block[data-handle="${handle}"]`);
          if (timer) timer.hidden = false;
        }
      };
  
      tabButtons.forEach((button, index) => {
        button.addEventListener('click', handleTabClick);
  
        if (index === 0) {
          handleTabClick({ currentTarget: button });
        }
      });
    }
  }
  
  customElements.define('custom-tabs', CustomTabs);
  