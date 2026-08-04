document.addEventListener('DOMContentLoaded', () => {

    if (typeof Settings !== 'undefined') {
        Settings.init();
    } else {
        console.error('❌ Settings not found!');
    }
    
    if (typeof Controller !== 'undefined') {
        Controller.init();
    } else {
        console.error('❌ Controller not found!');
    }
    
    if (typeof Sound !== 'undefined') {
        Sound.init();
        
        if (typeof Settings !== 'undefined' && !Settings.get('soundEnabled')) {
            Sound.enabled = false;
            if (typeof Controller !== 'undefined') {
                Controller.updateSoundButton();
            }
        }
    } else {
        console.error('❌ Sound not found!');
    }
    setTimeout(() => {
        if (typeof Game !== 'undefined') {
            Game.init();
        } else {
            console.error('❌ Game not found!');
        }
    }, 50)

    
    let soundActivated = false;
    
    function activateSound() {
        if (!soundActivated) {
            if (typeof Sound !== 'undefined' && typeof Settings !== 'undefined') {
                if (Settings.get('soundEnabled')) {
                    Sound.resume();
                    soundActivated = true;
                    console.log('🎵 Sound activated!');
                }
            }
            
            document.removeEventListener('click', activateSound);
            document.removeEventListener('keydown', activateSound);
            document.removeEventListener('touchstart', activateSound);
        }
    }

    document.addEventListener('click', activateSound);
    document.addEventListener('keydown', activateSound);
    document.addEventListener('touchstart', activateSound);
    
    console.log('🎮 Game started! Press any key to activate sound.');
});