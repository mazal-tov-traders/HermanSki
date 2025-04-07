class CountdownTimer extends HTMLElement {
    constructor() {
        super();
        this.timerElement = this.querySelector('.countdown-timer__timer');
        this.counterWrapper = this.querySelector('.timer');
        this.daysElement = this.querySelector('.timer__days');
        this.hoursElement = this.querySelector('.timer__hours');
        this.minutesElement = this.querySelector('.timer__minutes');
        this.secondsElement = this.querySelector('.timer__seconds');
        this.endBlockElement = this.querySelector('.timer__end-block');
        this.endTime = new Date(this.timerElement.getAttribute('data-time')).getTime();
        this.interval = null;
    }

    connectedCallback() {
        this.startTimer();
    }

    disconnectedCallback() {
        this.stopTimer();
    }

    startTimer() {
        const updateTimer = () => {
            const now = new Date().getTime();
            const timeLeft = this.endTime - now;

            if (timeLeft <= 0) {
                this.counterWrapper.classList.add('is-hidden');
                this.endBlockElement.classList.remove('is-hidden');
                this.stopTimer();
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            this.daysElement.textContent = days.toString().padStart(2, '0');
            this.hoursElement.textContent = hours.toString().padStart(2, '0');
            this.minutesElement.textContent = minutes.toString().padStart(2, '0');
            this.secondsElement.textContent = seconds.toString().padStart(2, '0');
        };

        this.interval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

customElements.define('countdown-timer', CountdownTimer);