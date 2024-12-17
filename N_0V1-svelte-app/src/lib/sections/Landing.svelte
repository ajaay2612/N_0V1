<script>
    import { onMount } from 'svelte';
    import Welcome from '../ascii/Welcome.svelte';

    import audioManager from '../sfx/sound';


    export let step

    export let gameData 
    let showNewGameConf = false

    const handleNewGame = () => {

        audioManager.play('click')
        audioManager.play('bgm')
        gameData = {
            currentStep: -1,
            currentFile: -1,
            index: "1/1"
        }
        step = 1       
    }

    const handleContinue = () => {
        audioManager.play('click')
        audioManager.play('bgm')
        step = 2    
    }

    let showAbout = false

</script>

{#if showNewGameConf}
    <div class="text-[0.9em] fixed flex justify-center items-center flex-col z-[10] inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border-2 w-[50%] h-[50%]">
        <p class="w-[70%] text-[1.1em] capitalize text-center">previous game progress will be lost</p>
        <div class="mt-1em">
            <button
            
            on:click={handleNewGame}
            class="boxGlowGreen text-[#40ff00]"
            >
                <p>[ Ok ]</p>
            </button>
            <button
            class="boxGlowRed text-[#FF0000]"
            on:click={()=>{audioManager.play('click'), showNewGameConf = false}}
            >
                <p>[ Cancel ]</p>
            </button>
        </div>
    </div>
{/if}


{#if showAbout}
    <div class="text-[0.9em] fixed flex py-1em justify-center items-center flex-col z-[10] inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border-2 w-[80%] h-[80%]">
        <p class="w-[90%] leading-[1.1em] text-[1.1em] capitalize text-center">
            N_0V1 is a puzzle-adventure game where you reboot a failing AI system—once human. Solve puzzles to uncover fragmented memories, revealing emotions, love, loss, and mystery. The AI, both guide and challenge, offers sly hints and mocks your mistakes, keeping you on edge with every interaction. 
            <br>
            <br>
            As you progress, the AI’s past unfolds, blending retro visuals with modern puzzle mechanics for an engaging experience. It's not just about puzzles; it's about rewriting the AI’s fate. Will you help him, or will he escape? The choice is yours.    
        </p>
        <div class="mt-1em">
            <button
            
            on:click={()=>{audioManager.play('click'),showAbout = false}}
            class="boxGlowGreen text-[#40ff00]"
            >
                <p>[ Ok ]</p>
            </button>
        </div>
    </div>
{/if}


<div class="textGlow  h-[90%] flex flex-col gap-2em justify-center items-center">
    <div class="text-[0.85em]"><Welcome/></div>

    <h1 class="text-[1.4em]">>> N-0V1 >></h1>

    <div class="mt-1em text-center text-[0.9em] space-y-[0.1em]">
        
      

        {#if gameData.currentStep != -1}
            <button 
            
            on:click={()=>{audioManager.play('click'), showNewGameConf = true}}
            >
                <p>[ New Game ]</p>
            </button>
            <br>
            <button 
            
            on:click={handleContinue}
            >
                <p>[ Continue ]</p>
            </button>
            <br>
        {:else}
            <button 
            on:click={()=> {audioManager.play('click'), audioManager.play('bgm'), step = 1}}
            >
                <p>[ Start ]</p>
            </button>
            <br>
        {/if}
        <button 
        on:click={()=>{audioManager.play('click'),showAbout = true}}
        >
            <p>[ About ]</p>
        </button>
    </div>
</div>


<div class="[&_p]:textGlow px-[1.2em] py-[0.5em] flex justify-between ">
    <p class="text-[0.8em]">
        System Operational
    </p>
    <p class="text-[0.8em]">
        Black Nova v0.11
    </p>
</div>
