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
        this.setupMobileControls();
        this.showMobileControls();
    },

    setupMobileControls() {
        const buttons = document.querySelectorAll('.dpad-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const dir = btn.dataset.dir;
                Snake.setDirection(dir);
            });
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const dir = btn.dataset.dir;
                Snake.setDirection(dir);
            });
        });
    },

    isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    showMobileControls() {
        const controls = document.getElementById('mobileControls');
        if (controls) {
            if (this.isMobile()) {
                controls.style.display = 'block';
            } else {
                controls.style.display = 'none';
            }
        }
    },

    setupSettingsPanel() {
        const toggleBtn = document.getElementById('settingsToggleBtn');
        const panel = document.getElementById('settingsPanel');
        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', () => {
                const isVisible = panel.style.display !== 'none' && panel.style.display !== '';
                panel.style.display = isVisible ? 'none' : 'block';
                toggleBtn.textContent = isVisible ? '⚙️ تنظیمات' : '✖ بستن تنظیمات';
            });
        }
        const closeBtn = document.getElementById('closeSettingsBtn');
        if (closeBtn && toggleBtn && panel) {
            closeBtn.addEventListener('click', () => {
                panel.style.display = 'none';
                toggleBtn.textContent = '⚙️ تنظیمات';
            });
        }
        this.bindSettingsEvents();
    },

    bindSettingsEvents() {
        document.querySelectorAll('[data-setting]').forEach(el => {
            const key = el.dataset.setting;
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
            if (newEl.type === 'checkbox') {
                newEl.addEventListener('change', function() {
                    if (typeof Settings !== 'undefined') {
                        Settings.set(key, this.checked);
                    }
                });
            } else if (newEl.tagName === 'SELECT') {
                newEl.addEventListener('change', function() {
                    if (typeof Settings !== 'undefined') {
                        Settings.set(key, this.value);
                    }
                });
            } else if (newEl.type === 'range') {
                newEl.addEventListener('input', function() {
                    if (typeof Settings !== 'undefined') {
                        Settings.set(key, parseInt(this.value));
                    }
                });
            }
        });
        const resetBtn = document.getElementById('resetSettingsBtn');
        if (resetBtn) {
            const newResetBtn = resetBtn.cloneNode(true);
            resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
            newResetBtn.addEventListener('click', () => {
                if (typeof Settings !== 'undefined') {
                    Settings.reset();
                    const panel = document.getElementById('settingsPanel');
                    const toggleBtn = document.getElementById('settingsToggleBtn');
                    if (panel) panel.style.display = 'none';
                    if (toggleBtn) toggleBtn.textContent = '⚙️ تنظیمات';
                }
            });
        }
    },

    addSoundButton() {
        const container = document.querySelector('.controls-row');
        if (!container) return;
        if (document.getElementById('soundBtn')) return;
        const soundBtn = document.createElement('button');
        soundBtn.id = 'soundBtn';
        soundBtn.textContent = '🔊';
        soundBtn.style.background = 'transparent';
        soundBtn.style.fontSize = '24px';
        soundBtn.style.padding = '5px 15px';
        soundBtn.style.border = '2px solid #00d2ff';
        soundBtn.style.borderRadius = '10px';
        soundBtn.style.color = '#00d2ff';
        soundBtn.style.cursor = 'pointer';
        soundBtn.addEventListener('click', () => {
            if (typeof Sound !== 'undefined') {
                Sound.toggle();
                this.updateSoundButton();
                if (typeof Settings !== 'undefined') {
                    Settings.set('soundEnabled', Sound.enabled);
                }
            }
        });
        container.appendChild(soundBtn);
        this.updateSoundButton();
    },

    updateSoundButton() {
        const btn = document.getElementById('soundBtn');
        if (btn && typeof Sound !== 'undefined') {
            btn.textContent = Sound.enabled ? '🔊' : '🔇';
        }
    }
};
