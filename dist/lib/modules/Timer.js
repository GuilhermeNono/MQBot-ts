"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(callback, delay) {
        this.callback = callback;
        this.delay = delay;
        this.remaining = this.delay;
    }
    start() {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(this.callback, this.remaining);
    }
    pause() {
        this.running = false;
        clearTimeout(this.id);
        let dateNow = new Date();
        this.remaining -= dateNow.getTime() - this.started.getTime();
    }
    addTime(hour, minutes, seconds) {
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
    getTimeLeft() {
        if (this.running) {
            this.pause();
            this.start();
        }
        return this.remaining;
    }
    getStateRunning() {
        return this.running;
    }
}
exports.default = Timer;
