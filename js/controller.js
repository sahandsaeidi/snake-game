var Controller = {
    init() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            e.preventDefault();

            switch (key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    Snake.setDirection('up');
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    Snake.setDirection('down');
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    Snake.setDirection('left');
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    Snake.setDirection('right');
                    break;
                case 'Enter':
                case 'r':
                case 'R':
                    if (typeof Game !== 'undefined') {
                        Game.restart();
                    }
                    break;
                case 'm':
                case 'M':
                    Sound.toggle();
                    this.updateSoundButton();
                    break;
            }
        });

        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (typeof Game !== 'undefined') {
                    Game.restart();
                }
            });
        }

        this.setupSettingsPanel();
        this.addSoundButton();
    },
    setupSettingsPanel() {
        const toggleBtn = document.getElementById('settingsToggleBtn');
        const panel = document.getElementById('settingsPanel');
        
        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', () => {
                const isVisible = panel.style.display !== 'none';
                panel.style.display = isVisible ? 'none' : 'block';
                toggleBtn.textContent = isVisible ? '⚙️ Settings' : '✖ Close';
            });
        }
    
        const closeBtn = document.getElementById('closeSettingsBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                panel.style.display = 'none';
                if (toggleBtn) toggleBtn.textContent = '⚙️ Settings';
            });
        }
        
        this.bindSettingsEvents();
    },

    bindSettingsEvents() {
        document.querySelectorAll('[data-setting]').forEach(el => {
            const key = el.dataset.setting;
            
            if (el.type === 'checkbox') {
                el.addEventListener('change', () => {
                    Settings.set(key, el.checked);
                });
            } else if (el.tagName === 'SELECT') {
                el.addEventListener('change', () => {
                    Settings.set(key, el.value);
                });
            } else if (el.type === 'range') {
                el.addEventListener('input', () => {
                    Settings.set(key, parseInt(el.value));
                    const display = document.getElementById(`${key}Display`);
                    if (display) display.textContent = el.value;
                });
            }
        });
        
        const resetBtn = document.getElementById('resetSettingsBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                Settings.reset();
                const panel = document.getElementById('settingsPanel');
                const toggleBtn = document.getElementById('settingsToggleBtn');
                if (panel) panel.style.display = 'none';
                if (toggleBtn) toggleBtn.textContent = '⚙️ Settings';
            });
        }
    },
    addSoundButton() {
        const container = document.querySelector('.controls-row');
        if (!container) return;
        
        if (document.getElementById('soundBtn')) return;
        
        const soundBtn = document.createElement('button');
        soundBtn.id = 'soundBtn';
        soundBtn.textContent = Sound.enabled ? '🔊' : '🔇';
        soundBtn.style.background = 'transparent';
        soundBtn.style.fontSize = '24px';
        soundBtn.style.padding = '5px 15px';
        soundBtn.style.border = '2px solid #00d2ff';
        soundBtn.style.borderRadius = '10px';
        soundBtn.style.color = '#00d2ff';
        soundBtn.style.cursor = 'pointer';
        
        soundBtn.addEventListener('click', () => {
            Sound.toggle();
            this.updateSoundButton();
        });

        container.appendChild(soundBtn);
    },

    updateSoundButton() {
        const btn = document.getElementById('soundBtn');
        if (btn) {
            btn.textContent = Sound.enabled ? '🔊' : '🔇';
        }
        if (Settings) {
            Settings.set('soundEnabled', Sound.enabled);
        }
    }
};