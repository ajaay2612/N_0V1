<script>
    import Landing from '../lib/sections/Landing.svelte';
    import SysDown from '../lib/sections/SysDown.svelte';
    import StageOne from '../lib/sections/StageOne.svelte';
    import audioManager from '../lib/sfx/sound';
    import { onMount } from 'svelte';

    let username = 'guest'
    let step = 0
    let messageOutput = ''
    let gameData = {
      currentStep: -1,
      currentFile: -1,
      completed: false,
      index: "1/1"
    }

    let mounted = false

    onMount(() => {
        audioManager.initAll()
        
    });

    const handleMessage = (ev) => {
        const { type, data } = ev.data;

        if (type === 'devvit-message') {
            const { message } = data;

            // Always output full message
            // messageOutput = JSON.stringify(message, undefined, 2);
            
            // Load initial data
            if (message.type === 'initialData') {
                
                if(mounted) return;

                username = message.data.username;
                // gameData = {...message.data.gameData};
                gameData.currentStep = message.data?.gameData?.currentStep ?? -1;
                gameData.currentFile = message.data?.gameData?.currentFile ?? -1;
                gameData.completed = message.data?.gameData?.completed ?? false;
                gameData.index = message.data?.gameData?.index ?? "1/1";


                mounted = true;

            }

    
        }
    };


    const interval = setInterval(() => {
        if (!mounted) {
            window.parent.postMessage({
                type: 'initialData'
            }, '*');
        } else {
            clearInterval(interval); // Stop the interval once mounted is true
        }
    }, 500); 


    // let isMuted = false;

    // function toggleMutefn() {
    //     isMuted = audioManager.toggleMute();
    // }

    

</script>
<svelte:window on:message={handleMessage}/>

<div class="h-screen p-0hem">
    <div class=" h-full  flex flex-col justify-between">
    
        <div class="pointer-events-none z-[101] fixed w-[calc(100%-1em)] h-[calc(100%-1em)] border-[0.25em] border-white"></div>

        <!-- {#if step > 0}
            <button on:click={toggleMutefn} class="z-[100] hover:invert bg-black px-[0.5em] cursor-pointer absolute left-1hem top-1hem">
                <span 
                    class:paused={isMuted}
                    class="wave text-white">
                </span>
            </button>
        {/if} -->
        

    
        {#if mounted}
            {#if step == 0}
                <Landing bind:gameData bind:step={step}/>
    
            {:else if step == 1 }
                <SysDown bind:step={step}/>
            {:else if step == 2 }
                <StageOne bind:step={step} bind:gameData/>
            {/if}

        {:else}
            <div class="h-full w-full flex justify-center items-center text-[1.4em]">
                Loading...
            </div>
        {/if}
    
    </div>
</div>

<!-- <pre class="bg-gray-200 text-black p-0.5em rounded overflow-auto max-h-10em">

    username = {username}
    gamedata current = {gameData.currentStep}
    
    {messageOutput}
</pre> -->



<style>
    @keyframes wave-flow {
        0% {
            content: '‾-_-';
        }
        25% {
            content: '-_-‾';
        }
        50% {
            content: '_-‾-';
        }
        75% {
            content: '-‾-_';
        }
        
    }

    .wave::after {
        content: '‾-_-';
        display: block;
        animation: wave-flow 2.5s infinite;
    }

    /* Pause animation */
    .wave.paused::after {
        animation-play-state: paused;
    }
</style>