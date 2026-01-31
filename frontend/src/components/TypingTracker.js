class TypingTracker {
    constructor() {
        this.keystrokes = [];
        this.activeKeys = {};
    }

    handleKeyDown(e) {
        const timestamp = performance.now();
        if (!this.activeKeys[e.code]) {
            this.activeKeys[e.code] = timestamp;
        }
    }

    handleKeyUp(e) {
        const timestamp = performance.now();
        const startTime = this.activeKeys[e.code];
        
        if (startTime) {
            this.keystrokes.push({
                key: e.key,
                code: e.code,
                keyDown: startTime,
                keyUp: timestamp,
                duration: timestamp - startTime
            });
            delete this.activeKeys[e.code];
        }
    }

    getPattern() {
        return [...this.keystrokes];
    }

    clear() {
        this.keystrokes = [];
        this.activeKeys = {};
    }
}

export default new TypingTracker();
