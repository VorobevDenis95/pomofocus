const btnsMode = Array.from(document.querySelectorAll(".btn__nav-timer"));
const page = document.querySelector(".page");
const btnStartStop = document.querySelector(".btn__start-stop");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

class Timer {
  constructor() {
    (this.pomodoro = 25),
      (this.modeStatus = "pomodoro"),
      (this.shortBreak = 5),
      (this.longBreak = 15),
      (this.btnStartStatus = true),
      (this.remaningTime = { total: 0, minutes: 0, seconds: 0 }),
      (this.intervalId = 0),
      (this.intervalMode = 0);
  }

  displayTime() {
    this.remaningTime.minutes = Math.floor(this.remaningTime.total / 60) % 60;
    this.remaningTime.seconds = Math.floor(this.remaningTime.total % 60);
    minutes.textContent = `${this.remaningTime.minutes}`.padStart(2, "0");
    seconds.textContent = `${this.remaningTime.seconds}`.padStart(2, "0");
  }
  stopTime() {
    this.btnStartStatus = true;
    this.renameStartStop();
    clearInterval(this.intervalId);
  }
  updateTime() {
    if (this.remaningTime.total === 0) {
      this.renameStartStop();
      this.stopTime();
      this.nextSwitch();
      return;
    }

    this.remaningTime.total = this.remaningTime.total - 1;
    this.displayTime();
    this.btnStartStatus = false;
    this.renameStartStop();
  }

  switchMode() {
    if (this.modeStatus === "pomodoro") {
      this.remaningTime.total = this.pomodoro * 60;
    }
    if (this.modeStatus === "shortBreak") {
      this.remaningTime.total = this.shortBreak * 60;
    }
    if (this.modeStatus === "longBreak") {
      this.remaningTime.total = this.longBreak * 60;
    }
    this.displayTime();
  }

  nextSwitch() {
    this.renameStartStop();
    if (this.modeStatus === "pomodoro") {
      if (this.intervalMode === 3) {
        this.modeStatus = "longBreak";
        this.intervalMode = 0;
        this.removeClass();
        document.querySelector("#longBreak").classList.add("active");
        this.displayTime();
        page.style.backgroundColor = `var(--longBreak)`;
        btnStartStop.style.color = `var(--longBreak)`;
        this.switchMode();
        // console.log(time.intervalMode)
        return;
      }
      this.removeClass();
      this.modeStatus = "shortBreak";

      page.style.backgroundColor = `var(--shortBreak)`;
      btnStartStop.style.color = `var(--shortBreak)`;

      document.querySelector("#shortBreak").classList.add("active");
    } else if (this.modeStatus === "shortBreak") {
      this.modeStatus = "pomodoro";

      this.intervalMode = this.intervalMode + 1;
      page.style.backgroundColor = `var(--pomodoro)`;
      btnStartStop.style.color = `var(--pomodoro)`;
      this.switchMode();
      this.removeClass();
      document.querySelector("#pomodoro").classList.add("active");
      this.displayTime();
      return;
    } else if (this.modeStatus === "longBreak") {
      this.switchMode();
      this.modeStatus = "pomodoro";
      this.removeClass();
      page.style.backgroundColor = `var(--longBreak)`;
      btnStartStop.style.color = `var(--longBreak)`;
      document.querySelector("#pomodoro").classList.add("active");
      this.displayTime();
      return;
    }
    this.switchMode();
    // this.remaningTime.total = this.remaningTime.total + 1;
    this.displayTime();
    console.log(time.intervalMode);
  }

  removeClass() {
    btnsMode.map((item) => {
      item.classList.remove("active");
    });
  }

  renameStartStop() {
    if (this.btnStartStatus) {
      btnStartStop.textContent = "Start";
    } else {
      btnStartStop.textContent = "Pause";
    }
  }
}

const time = new Timer();
time.switchMode();
time.displayTime();

btnsMode.forEach((item) => {
  item.addEventListener("click", (e) => {
    time.stopTime();
    time.modeStatus = e.target.id;
    time.switchMode();
    time.removeClass();
    item.classList.add("active");
    page.style.backgroundColor = `var(--${e.target.id})`;
    btnStartStop.style.color = `var(--${e.target.id})`;
  });
});

btnStartStop.addEventListener("click", () => {
  if (time.btnStartStatus) {
    time.btnStartStatus = true;
    clearInterval(time.intervalId);
    time.intervalId = setInterval((e) => {
      time.updateTime();
    }, 1000);
  } else {
    time.stopTime();
  }
});
