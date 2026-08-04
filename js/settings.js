

var Settings = {
    defaults: {
        theme: 'neon',        // 'neon', 'dark', 'light', 'retro'
        gridSize: 20,         // 15, 20, 25
        speed: 'normal',      // 'slow', 'normal', 'fast', 'insane'
        soundEnabled: true,
        showGrid: true,
        showEyes: true,
        wallMode: 'off',      // 'off', 'on', 'moving'
        highScore: 0
    },

    current: {},
    init() {
        this.load();
        
        this.apply();
        
        console.log('⚙️ Settings loaded:', this.current);
    },
    save() {
        try {
            localStorage.setItem('snakeSettings', JSON.stringify(this.current));
            console.log('💾 Settings saved!');
        } catch (e) {
            console.warn('⚠️ Could not save settings:', e);
        }
    },

    load() {
        try {
            const saved = localStorage.getItem('snakeSettings');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.current = { ...this.defaults, ...parsed };
            } else {
                this.current = { ...this.defaults };
            }
        } catch (e) {
            console.warn('⚠️ Could not load settings, using defaults:', e);
            this.current = { ...this.defaults };
        }
    },
    get(key) {
        return this.current[key] !== undefined ? this.current[key] : this.defaults[key];
    },

    set(key, value) {
        this.current[key] = value;
        this.save();
        this.apply();
        
   
        if (['gridSize', 'speed', 'wallMode'].includes(key)) {
            if (typeof Game !== 'undefined') {
                Game.restart();
            }
        }
        
        
        this.updateUI();
        
        console.log(`⚙️ Setting changed: ${key} = ${value}`);
    },

    toggle(key) {
        this.set(key, !this.get(key));
    },

    apply() {
        this.applyTheme();
        this.applyGridSize();
        this.applySpeed();
        this.applyWallMode();
        if (Sound) {
            Sound.enabled = this.get('soundEnabled');
        }
    },

    applyTheme() {
        const theme = this.get('theme');
        const body = document.body;
        
        body.classList.remove('theme-neon', 'theme-dark', 'theme-light', 'theme-retro');
        body.classList.add(`theme-${theme}`);
        
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            const icons = { neon: '💜', dark: '🌙', light: '☀️', retro: '🕹️' };
            themeBtn.textContent = `${icons[theme] || '🎨'} ${theme}`;
        }
    },

    applyGridSize() {
        const size = this.get('gridSize');
        if (typeof CONFIG !== 'undefined') {
            CONFIG.GRID_SIZE = size;
            CONFIG.CANVAS_SIZE = size * 20;
        
            const canvas = document.getElementById('gameCanvas');
            if (canvas) {
                canvas.width = CONFIG.CANVAS_SIZE;
                canvas.height = CONFIG.CANVAS_SIZE;
            }
        }
    },

    applySpeed() {
        const speedMap = {
            'slow': 250,
            'normal': 150,
            'fast': 80,
            'insane': 40
        };
        const speed = this.get('speed');
        const speedValue = speedMap[speed] || 150;
        
        if (typeof CONFIG !== 'undefined') {
            CONFIG.INITIAL_SPEED = speedValue;
        }
    },

    applyWallMode() {
        const mode = this.get('wallMode');
        console.log(`🧱 Wall mode: ${mode}`);
    },
    updateUI() {
        document.querySelectorAll('[data-setting]').forEach(el => {
            const key = el.dataset.setting;
            const value = this.get(key);
            
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.checked = value;
            } else if (el.tagName === 'SELECT') {
                el.value = value;
            } else if (el.tagName === 'INPUT' && el.type === 'range') {
                el.value = value;
            } else {
                el.textContent = value;
            }
        });
    },

    reset() {
        this.current = { ...this.defaults };
        this.save();
        this.apply();
        this.updateUI();
        
        if (typeof Game !== 'undefined') {
            Game.restart();
        }
        
        console.log('🔄 Settings reset to defaults!');
    }
};

var SET = Settings;