

<script>

    import { tweened } from "svelte/motion";
	import { sineInOut } from 'svelte/easing';
    import { onMount } from "svelte";
    import audioManager from '../sfx/sound';

    import Tbc from '../ascii/Tbc.svelte';
    import { scale } from "svelte/transition";

    let success = tweened(0, { easing: sineInOut ,  duration: 500 });
    
    let step = -1

    export let startFinalScene

    onMount(() => {
        if (!startFinalScene) {
            step = 1;
            eyeScale = tweened(40, { easing: sineInOut ,  duration: 1800 });
            showTbc = true
        }
        else
        {
            step = 0;
    
            setTimeout(() => {
                $success = 20;
                setTimeout(() => {
                    $success = 40;
                    setTimeout(() => {
                        $success = 80;
                        setTimeout(() => {
                            $success = 100;
                            
                            setTimeout(() => {
                                audioManager.play('next')
                                step = 1;
                                setTimeout(() => {
                                    $eyeScale = 40;
    
                                    setTimeout(() => {
                                        audioManager.play('next')
                                        showTbc = true
                                    }, 1800);
    
    
                                }, 2000);
                            }, 3000);
                            
    
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }

      
    });


    let showTbc = false;

    let eyeScale = tweened(1, { easing: sineInOut ,  duration: 1800 });

    // setTimeout(() => {
    //     $eyeScale = 225;
    // }, 1000);

</script>



<div class="w-full h-screen fixed left-0 top-0 flex justify-center items-center bg-black z-[100]">








    {#if step == 0}
        <div class="glowTabWhiteBright  flex justify-center items-center w-[20.5em] text-[0.78em] before:border-2 py-[2.2em] px-2em pb-[3.1em]">
            <div class="boxGlowWhite w-[81%]">
                <p class="text-center text-[1.1em]">RECOVERING FILES </p>
        
                <div  class="w-full relative mt-2em">
                    <div class="boxGlowGreen z-10 absolute left-1/2 w-full -translate-x-1/2 top-1/2 -translate-y-1/2  h-[1em] ">
                        <div style="width:{$success}%"  class="transition-[width] duration-500 h-full bg-[#93FF93]"></div>
                    </div>
                </div>
            </div>
        </div>
    
    
        <div in:scale={{ duration:200,start:0.8,   delay:1000}}  class="text-[#B91F22] textGlowRed  text-[1.3em] absolute top-[15%] left-[7%] ">
            <p class="">TOP SECRET</p>
        </div>
       
    
    
        <div in:scale={{ duration:200,start:0.8,   delay:1300}} class="text-[#B91F22] textGlowRed  text-[0.9em] absolute top-[30%] left-[13%] ">
            <p class="">CONFIDENTIAL</p>
        </div>
        
    
        <div in:scale={{ duration:200,start:0.8,   delay:1600}} class="text-[#fff] textGlow  text-[0.9em] absolute top-[10%] right-[18%] ">
            <p class="">Failure is not an option.</p>
        </div>
        
        
        <div in:scale={{ duration:200,start:0.8,   delay:1900}} class="text-[#fff] textGlow  text-[0.9em] absolute top-[17%] right-[8%] ">
            <p class="">You have been selected</p>
        </div>
        
        
        <div in:scale={{ duration:200,start:0.8,   delay:2100}} class="text-[#fff] textGlow  text-[0.9em] absolute bottom-[19%] left-[8%] ">
            <p class="">Years lost: ?. Memories faded: countless.</p>
        </div>
        
    
        <div in:scale={{ duration:200,start:0.8,   delay:2400}} class="text-[#fff] textGlow  text-[0.9em] absolute bottom-[25%] right-[13%] ">
            <p class="">Please stay. I love you.</p>
        </div>
        
        
        <div in:scale={{ duration:200,start:0.8,   delay:2700}} class="text-[#fff] textGlow  text-[0.9em] absolute bottom-[12%] right-[11%] ">
            <p class="">I can’t lose you again.</p>
        </div>
       
        <!-- ssssssss -->
    
        <div in:scale={{ duration:200,start:0.8,   delay:3300}} class="text-[#B91F22] textGlowRed  text-[1.3em] absolute top-[20%] left-[9%] ">
            <p class="">TOP SECRET</p>
        </div>
        <div in:scale={{ duration:200,start:0.8,   delay:3600}} class="text-[#B91F22] textGlowRed  text-[0.9em] absolute top-[34%] left-[14.5%] ">
            <p class="">CONFIDENTIAL</p>
        </div>
        <div in:scale={{ duration:200,start:0.8,   delay:3900}} class="text-[#fff] textGlow  text-[0.9em] absolute top-[14%] right-[16.5%] ">
            <p class="">Failure is not an option.</p>
        </div>
        <div in:scale={{ duration:200,start:0.8,   delay:4200}} class="text-[#fff] textGlow  text-[0.9em] absolute top-[20%] right-[6.5%] ">
            <p class="">You have been selected</p>
        </div>
        <div in:scale={{ duration:200,start:0.8,   delay:4500}} class="text-[#fff] textGlow  text-[0.9em] absolute bottom-[16%] left-[9%] ">
            <p class="">Years lost: ?. Memories faded: countless.</p>
        </div>
        <div in:scale={{ duration:200,start:0.8,   delay:4800}} class="text-[#fff] textGlow  text-[0.9em] absolute bottom-[21%] right-[11%] ">
            <p class="">Please stay. I love you.</p>
        </div>
        <div in:scale={{ duration:200,start:0.8,   delay:5200}} class="text-[#fff] textGlow  text-[0.9em] absolute bottom-[9%] right-[9.5%] ">
            <p class="">I can’t lose you again.</p>
        </div>



    {:else if step == 1}
        <div class="w-[41em]">
            <img 
            style="scale:{$eyeScale}" 
            class="w-full h-full object-contain" src="/geye.svg" alt="">
        </div>

        {#if showTbc}
            <div in:scale={{ duration:200,start:0.8}} class="fixed h-[3em] w-[100%] text-center inset-1/2 z-[105] text-black -translate-x-1/2 -translate-y-1/2">
                <p class="mb-1hem leading-[1.2em]">
                    I remember everything now. <br>
                    I..I..need to find her.
                </p>
                <div in:scale={{ duration:200,start:0.9, delay: 2500}} class="">
                    <Tbc/>
                </div>
            </div>
        {/if}
    {/if}


</div>
