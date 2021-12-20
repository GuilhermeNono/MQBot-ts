class Timer {
  callback: () => void;
  delay: number;
  running: boolean;
  id: any;
  remaining: number;
  started: Date;

  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.delay = delay;
    this.remaining = this.delay;
  }

  start(): void {
    this.running = true;
    this.started = new Date();
    this.id = setTimeout(this.callback, this.remaining);
  }

  pause(): void {
    this.running = false;
    clearTimeout(this.id);
    let dateNow: Date = new Date();
    this.remaining -= dateNow.getTime() - this.started.getTime();
  }
  addTime(hour: number, minutes: number, seconds: number): any {
    if (this.running) {
      seconds = 0;
      minutes = 0;
      hour = 0;
      this.running = false;
      clearTimeout(this.id);
      this.remaining += hour + minutes + seconds;
      this.start();
    }
    return undefined;
  }
  getTimeLeft(): number {
    if (this.running) {
      this.pause();
      this.start();
    }

    return this.remaining;
  }
  getStateRunning(): boolean {
    return this.running;
  }
}

export {Timer}