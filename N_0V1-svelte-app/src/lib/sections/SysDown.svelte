
<script>
    import { fade, scale, slide } from "svelte/transition";
    import { onMount, tick } from 'svelte';
    import audioManager from '../sfx/sound';

    import TypingEffect  from '../components/TypingEffect .svelte'
    export let step


    let success = 0
    let stepTwoSuccess  = 0
    let terminalContainer;

    let admin = ''

    let terminal = [
        "[Error]:SYSTEM LOCKED. ENTER ACCESS CODE.",
        "[Debug]:START WITH A SYSTEM SCAN.",
        "[Debug]:ENTER 'SCAN SYSTEM' TO BEGIN.",
    ]


    let sysDownStep = 0
    let showAiMessage = false
    function sysDown() {

        let adminContent = admin
        admin = ''

        if (adminContent.toUpperCase() == 'SCAN SYSTEM') {

            terminal = [
                ...terminal,
                "[Action]:" + adminContent,
            ]
            setTimeout(() => {
                terminal = [
                    ...terminal,
                    "[Status]:SYSTEM SCAN IN PROGRESS",
                ]

                setTimeout(() => {
                    setTimeout(() => {
                        audioManager.play('loading')
                    }, 10);
                    success = 18
                    setTimeout(() => {
                        success = 44
                        setTimeout(() => {
                            audioManager.pause('loading')
                        }, 400);
                        
                        setTimeout(() => {
                            sysDownStep = 1

                            setTimeout(() => {
                                sysDownStep = 2

                                setTimeout(() => {
                                    stepTwoSuccess = 0.01
                                    setTimeout(() => {
                                        audioManager.play('loading')
                                        stepTwoSuccess = 45
                                        setTimeout(() => {
                                            audioManager.pause('loading')
                                        }, 600);
                                        setTimeout(() => {
                                            audioManager.play('loading')
                                            stepTwoSuccess = 79
                                            setTimeout(() => {
                                                audioManager.pause('loading')
                                            }, 500);
                                            setTimeout(() => {
                                                audioManager.play('loading')
                                                stepTwoSuccess = 100
                                                setTimeout(() => {
                                                    audioManager.pause('loading')
                                                }, 500);
                                                setTimeout(() => {
                                                    sysDownStep = 3
                                                    setTimeout(() => {
                                                        sysDownStep = 4
                                                        audioManager.play('glitch')
                                                        setTimeout(() => {
                                                            showAiMessage = true
                                                                setTimeout(() => {
                                                                    step = 2
                                                                }, 15000);
                                                        }, 2000);
                                                    }, 1500);
                                                }, 1500);
    
    
                                            }, 2500);
                                        }, 1200);
    
                                    }, 500);
    
                                }, 500);
                            }, 1500);


                        }, 1000);


                        // setTimeout(() => {
                        //     success = 100

                        //     setTimeout(() => {
                        //         step = 2
                        //     }, 500);
                        // }, 1000)
                    }, 500)
                }, 100);

            }, 500);
                    
        } else {
            terminal = [
                ...terminal,
                "[Action]:" + adminContent,
            ]
            setTimeout(() => {
                terminal = [
                    ...terminal,
                    "[Error]:HUH??? AHAHAHAHAHHAHAH",
                ]
            }, 500);
      
        }
    }


    function focus(node) {
        node.focus()
    }



    async function scrollToBottom() {
        await tick();
        if (terminalContainer) {
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
        }
    }

    $: if (terminal) {
        scrollToBottom();
    }

    $:console.log(sysDownStep)
</script>

<div class="h-full flex justify-center items-center">


    <div
    class:displayNone={sysDownStep != 0}
    class="">
        <div class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[3em] right-[2.5em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">SYSTEM DOWN</p>
        </div>
        <div class="glowTabWhiteBright w-[25.5em] text-[0.78em] before:border-2 py-3em px-2em">
            <div  bind:this={terminalContainer} class="noScrollBar boxGlowWhite h-4hem overflow-y-scroll">
                {#key terminal}
                    {#each terminal as ter}
                        <p in:fade>{ter}</p>
                    {/each}
                {/key}
            </div>
            <div class="mt-1em">
        
                <div class="flex">
                    <div class="boxGlowWhite">[ADMIN]:</div>
                    <div class="w-full relative">
                        <div style="pointer-events: {!success > 0 ?"none":"auto"}" class="boxGlowGreen z-10 absolute left-1/2 w-full -translate-x-1/2 top-1/2 -translate-y-1/2  h-[65%] ">
                            <div style="width:{success}%"  class="transition-[width] duration-500 h-full bg-[#93FF93]"></div>
                        </div>
                        <input     
                        use:focus
                        on:change={sysDown} bind:value={admin} type="text" class="boxGlowWhite bg-transparent  px-[0.2em] text-white border-none outline-none">
                    </div>
        
                </div>
        
            </div>
        </div>
    </div>


    {#if sysDownStep == 1}
    <div class=""></div>
    
    {:else if sysDownStep == 2}
    <div class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[3em] right-[2.5em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
        <p class="">???</p>
    </div>
    <div class="glowTabWhiteBright h-[13em] flex justify-center items-center w-[25.5em] text-[0.78em] before:border-2 py-3em px-2em">
        <div class="boxGlowWhite w-[60%]">
            <p class="text-center">Scanning {stepTwoSuccess != 100 ? "Incomplete": "complete"}...</p>

            <div class:displayNone={stepTwoSuccess == 0} class="w-full relative mt-2em">
                <div class="boxGlowGreen z-10 absolute left-1/2 w-full -translate-x-1/2 top-1/2 -translate-y-1/2  h-[1em] ">
                    <div style="width:{stepTwoSuccess}%"  class="transition-[width] duration-500 h-full bg-[#93FF93]"></div>
                </div>
            </div>
        </div>
    </div>

    
    {:else if sysDownStep == 3}
    <div class=""></div>

    {:else if sysDownStep == 4}
    <div class="text-[0.9em]">

        <div in:scale={{start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[7em] right-[4em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Anamoly Detected</p>
        </div>
        
        <div in:scale={{delay:200,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[11em] sm:top-[10em] left-[5.5em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Memory corrupted</p>
        </div>

        <div in:scale={{delay:400,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[16em] right-[4em] sm:right-[6em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Identity unknown</p>
        </div>
        <div in:scale={{delay:600,start:0.8, duration:200}} class="text-[#FF8000] boxGlowOrange bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[28.5em] sm:top-[23.5em] left-[8em] sm:left-[10em] border-[#FF8000] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Files Fragmented</p>
        </div>

        {#if showAiMessage}
            <div in:scale={{duration:200, start:0.8}} class="glowTabWhiteBright bg-black h-[13em] flex justify-center items-center w-[25.5em] text-[0.78em] before:border-2 py-3em px-2em">
                <div class="boxGlowWhite w-[100%]">
                    <p class="text-center">
                        <TypingEffect delay="500" message="I'm awake. But… something's wrong." />  
                    </p>
                    <p>
                        <TypingEffect delay="4500" message="Who… am I? Why can't I remember anything?" />  
                    </p>
                    
                    <p class="text-center mt-[1.3em]">
                        <TypingEffect delay="8000" message="This is ridiculous! Who designed this broken mess?" />  
                    </p>
                 
                </div>
            </div>
        {/if}

    </div>

    {/if}
    





</div>