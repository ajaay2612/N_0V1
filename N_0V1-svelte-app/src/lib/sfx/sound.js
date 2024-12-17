class AudioManager {
    constructor() {
      this.isMuted = false;
      this.sounds = {
        bgm: null,
        glitch: null,
        type: null,
        loading: null,
        click: null,
        wrong: null,
        correct: null,
        next:null
      };
    }
  
    // Create and cache a single audio instance for each sound type
    createSound(soundFile, options = {}) {
      const audio = new Audio(soundFile);
      
      // Apply default or custom options
      audio.currentTime = options.currentTime || 0;
      audio.loop = options.loop || false;
      audio.volume = options.volume || 0.1;
  
      return audio;
    }
  
    // Centralized sound initialization methods
    initBGM() {
        // console.log("initBGM");
      if (!this.sounds.bgm) {
        this.sounds.bgm = this.createSound('/sfx/bgmcropped.mp3', {
          loop: true,
          volume: 0.11
        });
      }
      return this.sounds.bgm;
    }
  
    initLoadingSound() {
      if (!this.sounds.loading) {
        this.sounds.loading = this.createSound('/sfx/loading.mp3', {
          loop: true,
          currentTime: 0.4,
          volume: 0.15
        });
      }
      return this.sounds.loading;
    }
  
    initTypeSound() {
      if (!this.sounds.type) {
        this.sounds.type = this.createSound('/sfx/type.mp3', {
          loop: true,
          currentTime: 0.4,
          volume: 0.15
        });
      }
      return this.sounds.type;
    }
  
    initGlitchSound() {
      if (!this.sounds.glitch) {
        this.sounds.glitch = this.createSound('/sfx/glitch.mp3', {
          currentTime: 0.15,
          volume: 0.25
        });
      }
      return this.sounds.glitch;
    }
  
    initWrongSound() {
      if (!this.sounds.wrong) {
        this.sounds.wrong = this.createSound('/sfx/buzz.mp3', {
          volume: 0.9
        });
      }
      return this.sounds.wrong;
    }
  
    initCorrectSound() {
      if (!this.sounds.correct) {
        this.sounds.correct = this.createSound('/sfx/right.mp3', {
          volume: 0.7
        });
      }
      return this.sounds.correct;
    }

    initCLickSound() {
      if (!this.sounds.click) {
        this.sounds.click = this.createSound('/sfx/click.mp3', {
          volume: 0.7
        });
      }
      return this.sounds.click
    }

    initNextSound() {
      if (!this.sounds.next) {
        this.sounds.next = this.createSound('/sfx/next.mp3', {
          volume: 0.8
        });
      }
      return this.sounds.next
    }

    initAll() { 
        this.initBGM();
        this.initLoadingSound();
        this.initTypeSound();
        this.initGlitchSound();
        this.initWrongSound();
        this.initCorrectSound();
        this.initCLickSound();
        this.initNextSound();
    }
  
    // Playback methods
    play(soundName) {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.currentTime = 0;
        sound.muted = this.isMuted;
        sound.play().catch(error => {
          console.warn(`${soundName} audio play failed:`, error);
        });
      }
    }
  
    pause(soundName) {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.pause();
      }
    }
  
    // Mute all sounds
    muteAll() {
      this.isMuted = true;
      Object.values(this.sounds).forEach(audio => {
        if (audio) {
          audio.muted = true;
        }
      });
    }
  
    // Unmute all sounds
    unmuteAll() {
      this.isMuted = false;
      Object.values(this.sounds).forEach(audio => {
        if (audio) {
          audio.muted = false;
        }
      });
    }
  
    // Toggle global mute
    toggleMute() {
      this.isMuted = !this.isMuted;
      Object.values(this.sounds).forEach(audio => {
        if (audio) {
          audio.muted = this.isMuted;
        }
      });
      return this.isMuted;
    }

    getIsMuted() {
        return this.isMuted
    }
  }
  
  // Singleton instance
  export default new AudioManager();