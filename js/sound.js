var Sound = {
    enabled: true,
    

    audioContext: null,
    
    volume: 0.3,
    

    isReady: false,

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎵 Sound system initialized!');
            
            if (this.audioContext.state === 'suspended') {
                console.log('🔇 AudioContext suspended. Waiting for user interaction...');
                this.isReady = false;
            } else {
                this.isReady = true;
            }
        } catch (e) {
            console.warn('⚠️ Web Audio API not supported in this browser.');
            this.audioContext = null;
            this.isReady = false;
        }
    },

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                this.isReady = true;
                console.log('🔊 AudioContext resumed! Sound is ready.');
            }).catch(e => {
                console.warn('⚠️ Could not resume AudioContext:', e);
            });
        } else if (this.audioContext) {
            this.isReady = true;
        }
    },


    playTone(frequency, duration, type = 'sine', volume = this.volume) {
        if (!this.enabled || !this.audioContext || !this.isReady) {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.resume();
            }
            return;
        }

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
        }
    },


    eat() {
        this.playTone(523, 0.1, 'sine', 0.2);
        setTimeout(() => {
            this.playTone(659, 0.1, 'sine', 0.2);
        }, 80);
        setTimeout(() => {
            this.playTone(784, 0.15, 'sine', 0.2);
        }, 160);
    },

    gameOver() {
        this.playTone(440, 0.2, 'sawtooth', 0.15);
        setTimeout(() => {
            this.playTone(349, 0.2, 'sawtooth', 0.15);
        }, 200);
        setTimeout(() => {
            this.playTone(294, 0.4, 'sawtooth', 0.15);
        }, 400);
    },

    move() {
        this.playTone(200, 0.03, 'sine', 0.05);
    },

    specialScore() {
        this.playTone(523, 0.1, 'sine', 0.2);
        setTimeout(() => {
            this.playTone(659, 0.1, 'sine', 0.2);
        }, 100);
        setTimeout(() => {
            this.playTone(784, 0.15, 'sine', 0.25);
        }, 200);
        setTimeout(() => {
            this.playTone(1047, 0.2, 'sine', 0.3);
        }, 300);
    },

    restart() {
        this.playTone(440, 0.1, 'sine', 0.15);
        setTimeout(() => {
            this.playTone(554, 0.1, 'sine', 0.15);
        }, 100);
        setTimeout(() => {
            this.playTone(659, 0.15, 'sine', 0.2);
        }, 200);
    },


    playSoundFile(url, volume = this.volume) {
        if (!this.enabled) return;

        try {
            const audio = new Audio(url);
            audio.volume = volume;
            audio.play().catch(e => {});
        } catch (e) {}
    },


    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled && this.audioContext && this.audioContext.state === 'suspended') {
            this.resume();
        }
        console.log(`🔊 Sound ${this.enabled ? 'ON' : 'OFF'}`);
        return this.enabled;
    },

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }
};


var SFX = {
    eat: () => Sound.eat(),
    gameOver: () => Sound.gameOver(),
    move: () => Sound.move(),
    special: () => Sound.specialScore(),
    restart: () => Sound.restart()
};