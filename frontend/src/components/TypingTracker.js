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

    getFeatureVector() {
        // We need exactly 16 dimensions: 8 hold times + 8 latencies (intervals between keys)
        // If we have fewer than 9 keystrokes, we can't get 8 latencies. 
        // For the demo, we'll pad with zeros or repeat if necessary.
        const vectors = [];

        // 1. Hold times
        const holdTimes = this.keystrokes.slice(0, 8).map(k => k.duration);
        while (holdTimes.length < 8) holdTimes.push(0);

        // 2. Latencies (Interval between keyUp[i] and keyDown[i+1])
        const latencies = [];
        for (let i = 0; i < Math.min(this.keystrokes.length - 1, 8); i++) {
            latencies.push(this.keystrokes[i + 1].keyDown - this.keystrokes[i].keyUp);
        }
        while (latencies.length < 8) latencies.push(0);

        return [...holdTimes, ...latencies];
    }

    getPattern() {
        return this.getFeatureVector();
    }

    clear() {
        this.keystrokes = [];
        this.activeKeys = {};
    }
}

export default new TypingTracker();
