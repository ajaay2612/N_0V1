
<script>
	import { onMount, onDestroy } from 'svelte';
    import audioManager from '../sfx/sound';

    export let morseError;

	const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
        'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 
        'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 
        'Z': '--..', '0': '-----', '1': '.----', '2': '..---', 
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', 
        '7': '--...', '8': '---..', '9': '----.'
    };

    // Reverse mapping for decoding
    const reverseMorseCodeMap = Object.fromEntries(
        Object.entries(morseCodeMap).map(([key, value]) => [value, key])
    );

    function translateMorseCode(morseCode) {
        // Split input by spaces to get individual Morse code characters
        const morseChars = morseCode.trim().split(' ');

        // Translate each Morse code character to its letter
        return morseChars.map(char => {
            if (reverseMorseCodeMap.hasOwnProperty(char)) {
                return reverseMorseCodeMap[char];
            } else {
                throw new Error(`Invalid Morse code sequence: ${char}`);
            }
        }).join('');
    }


	// Component state
	let inputText = '';
    export let finalMessage = '';
	let currentMorseCode = '';
	let isHolding = false;
	let holdStartTime = 0;
	let holdEndTime = 0;
	const DOT_THRESHOLD = 200; 
	const DASH_THRESHOLD = 500; 


	let holdTimer;


    $:console.log('currentMorseCode', currentMorseCode);

	function startHold() {
		isHolding = true;
		holdStartTime = Date.now();
		
		// Reset any previous timer
		if (holdTimer) clearTimeout(holdTimer);
		
		// Set a timer to detect long press
		holdTimer = setTimeout(() => {
			if (isHolding) {
				// If still holding after a short delay, start tracking
				holdStartTime = Date.now();
			}
		}, 50);
	}

	function endHold() {
		if (!isHolding) return;
        audioManager.play('click')
		isHolding = false;
		holdEndTime = Date.now();
		const pressDuration = holdEndTime - holdStartTime;

		// Determine dot or dash
		if (pressDuration < DOT_THRESHOLD) {
			currentMorseCode += '.';
		} else {
			currentMorseCode += '-';
		}

	}

    $: if (currentMorseCode) {
        try {
            inputText = translateMorseCode(currentMorseCode);
        } catch (error) {
            console.error(error);
        }
    }

	function clearInput() {
		inputText = '';
		currentMorseCode = '';
	}

    function addMorseCode() {
        // Add morse code to input text
        finalMessage += inputText
        currentMorseCode = '';
        inputText = '';
    }

    function clearInputMessage() {
        let temp = finalMessage;
        finalMessage = temp.slice(0, -1);
    }
 


	
</script>

<div class="[&_input]:finalAnsStageOneInputs uppercase font-primary text-[0.84em] ">

    <p class="text-[1.3em] textGlowRed text-[#FF0000] text-center my-[0.2em]">codex network system</p>
    <div class="w-full text-[0.75em] mt-[1.8em]">
        <p class="">main system</p>
        <div class="w-[70%] rounded-tl-[0.1em] rounded-[1em] border p-[1em] py-[0.6em]">
            ... .. --. -. .- .-.. / -.. . - . -.-. - . -.. .-.-.- / .-. . .--. .-.. -.-- / .-- .. - .... / .----. .-. . -.-. . .. ...- . -.. .----. / - --- / -.. . .- -.-. - .. ...- .- - . / .- .-.. . .-. -
        </div>
    </div>

    <div class="text-right w-full text-[0.75em] mt-[0.2em]">
        <p class="">@!#@</p>
        <div class="relative w-[50%] ml-auto rounded-tr-[0.1em] rounded-[1em] border p-[1em] py-[0.6em]">
            {finalMessage||"..."}
        
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button on:click={clearInputMessage}  class="absolute top-1/2 -translate-y-1/2 w-[1.5em] mr-1em right-full  text-[0.8em]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#fff"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>            
            </button>

        </div>

        <div class="justify-end items-center gap-1em ml-auto mt-[0.87em] text-[1.2em] flex ">
            
            {#if morseError}
                <p class:correctAnswer={morseError.type} class:wrongAnswer={!morseError.type} class="text-[0.8em] w-fit uppercase text-center">{morseError.text}</p>
            {/if}

            <button on:click class="textGlowGreen text-[#40FF00] border-[#40FF00] uppercase text-[0.8em] border py-[0.2em] w-[4em] ">send</button>
        </div>
    </div>


    <div class="text-[1em] mt-[0.5em]">
        <div class="flex items-center gap-[1.3em]">
            <div class="w-[10em] space-y-[0.3em]">
                <div class="flex gap-[0.3em]">
                    <input bind:value={currentMorseCode} disabled type="text" class="text-[0.8em] py-[0.2em] w-full">
                    <input bind:value={inputText} disabled type="text" class="text-[0.8em] py-[0.2em] w-[30%]">
                </div>
                <!-- <div class="h-[2.5em] border w-full"></div> -->
                <div class="flex gap-[0.3em]">
                    <button on:click={addMorseCode} class="uppercase text-[0.8em] border py-[0.2em] w-1/2">add</button>
                    <button on:click={clearInput} class="uppercase text-[0.8em] border py-[0.2em] w-1/2">clear</button>
                </div>
            </div>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button 
            on:mousedown={startHold}
			on:mouseup={endHold}
			on:mouseleave={endHold}
			on:touchstart|preventDefault={startHold}
			on:touchend|preventDefault={endHold}
            class="active:scale-[0.9] transition-transform group text-[0.8em] border size-5em p-[1.2em] border-dashed rounded-full ">
                <div class="group-active:scale-[1.1] border size-full rounded-full">
                </div>
            </button>
        </div>
    </div>


</div>