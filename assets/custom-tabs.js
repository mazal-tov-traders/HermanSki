class CustomTabs extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const tabButtons = this.querySelectorAll('[role="tab"]');
        const tabContents = this.querySelectorAll('[role="tabcontent"]');

        const handleTabClick = (event) => {
            if (tabContents) {
                tabContents.forEach((content) => {
                    content.hidden = true;
                });
            }

            if (tabButtons) {
                tabButtons.forEach((tabButton) => {
                    tabButton.setAttribute('aria-selected', false);
                });
            }

            event.currentTarget.setAttribute('aria-selected', true);
            const { id } = event.currentTarget;
            const tabContent = this.querySelector(`[aria-labelledby="${id}"]`);

            if (tabContent) {
                tabContent.hidden = false;
            }
        };

        if (tabButtons) {
            tabButtons.forEach((button, index) => {
                button.addEventListener('click', handleTabClick);
                if (index === 0) {
                    handleTabClick({ currentTarget: button });
                }
            });
        }
    }
}

customElements.define('custom-tabs', CustomTabs);