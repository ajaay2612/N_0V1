<script>
    import { onMount, onDestroy } from 'svelte';
    import { on } from 'svelte/events';
    import audioManager from '../sfx/sound';

    export let message = '';
    export let speed = 50;  
    export let delay = 0;  
    export let pauseDuration = 400; // Default pause duration

    let displayedText = '';
    let interval;
    let isPaused = false;

    function startTyping() {
        // playTypeSound();
        audioManager.play('type')
        let index = 0;

        interval = setInterval(() => {
            // If currently paused, do nothing
            if (isPaused) return;

            if (index < message.length) {
                // Check for pause-worthy punctuation
                const currentChar = message[index];
                if (['.', ',', '!', '?', '…'].includes(currentChar)) {
                    isPaused = true;
                    displayedText = message.slice(0, index + 1);
                    
                    setTimeout(() => {
                        isPaused = false;
                        index++;
                    }, pauseDuration);
                } else {
                    displayedText = message.slice(0, index + 1);
                    index++;
                }
            } else {
                audioManager.pause('type')
                clearInterval(interval);
            }
        }, speed);
    }

    onMount(() => {
        setTimeout(() => {
            if (message) {
                if (interval) clearInterval(interval);
                startTyping();
            }
        }, delay);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

{displayedText}