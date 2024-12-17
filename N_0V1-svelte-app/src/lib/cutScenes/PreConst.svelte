<script>
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import TypingEffect  from '../components/TypingEffect .svelte'


    let glitchPre = [
        [
            '%%^^#import Null 0x!!!',
            'func *glitch()::<{',
            '   data==>["&ERROR", *::{} ]',
            '   while (##sigmoid<<>>None) {',
            '      break;;!?!continue[]',
            '      @@@for(i==junk; $==0; i+=1!)??',
            'return;',
            '   }',
            '   signal<<"<<<<<#>>0b01010;',
            '}'
        ],
        [
            '0101abde>>$WRECK((*)undefined?!!));',
            'array=[]; for<<<<...NullPtr64;..',
            ' ',
            'def &&nothing_at_all(*argv: WeirdType):',
            '    $$signal = "<<DEBUG_FREE_MEMORY"',
            '    for bit in !&None:',
            '        void_:::append(ERRORSYMBOLS?)',
            '    return ~false',
            '||___endTRANSMISSION##',
            '    <<=__xNOR!',
            ' ',
            '#include <undefined.h>',
            '#define CORRUPTION true',
            ' ',
            'int main() {',
            '    int x = 0xBADC0DE;',
            '    while(***unknown****)',
            '        NULL / RANDOM_BROKEN **= SIGSEGV;',
            '    return x--;',
            '}',
        ],[
            '<div id="broken">',  
            '    <span>&&&&[[RANDOM_NOTHINGNESS]]]!!></',
            'span>' ,
            '    <script type="NOTHING-AT-ALL">'  ,
            '        var junk =' ,
            '"<<<<<>>>>>&ERROR[UNEXPECTED]";',
            '        #signal(signal)>??stop/',
            'breakpoint:jump',
            '    </script\>'  ,
            '</div\>',
            ' ',
            'class &&GarbleDunk' ,
            '    def @@@not_a_function!!!' ,
            '        return "<<%WEIRDNESS:100>>"',
            '    end'  ,
            'end'  ,
            'undefined>break;?',
            ' ',
            'public class NullClass!?! {',
            '    public void method^&() {',
            '        while<<<forever//what even???;',
            '        System.out.println("#SIGNAL_LOST");',
            '        return--^^END_OF_LINE;',
            '    }',
            '}',
        ]
    ]

    let glitch = [
        [],
        [],
        []
    ];

    function addAllGlitchArrays(arr, gI) {
        let i = 0;
        function addLine() {
            if (i < arr.length) {
                glitch[gI] = [...glitch[gI], arr[i]];
                i++;
                setTimeout(addLine, 100); // Adjust the delay as needed
            }
        }
        addLine();
    }

    let showText = false;

    let mounted = false;
    onMount(()=>{
        mounted = true;
        setTimeout(() => {
            setTimeout(() => addAllGlitchArrays(glitchPre[0], 0), 500);
            setTimeout(() => addAllGlitchArrays(glitchPre[1], 1), 800);
            setTimeout(() => addAllGlitchArrays(glitchPre[2], 2), 200);
        }, 2000);

        setTimeout(() => {
            showText = true;
        }, 8000);
    })

</script>


    
    
    <div class="fixed h-screen w-full bg-black z-[100] font-primary">
       
        {#if showText}
            <div in:scale={{duration:200, start:0.8}} class="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 glowTabWhiteBright bg-black h-[13em] flex justify-center items-center w-[31em] text-[0.78em] before:border-2 py-3em px-2em z-[101]">
                <div class="boxGlowWhite w-[100%] text-center space-y-[0.2em]">
                    <p >
                        <TypingEffect delay="500" message="They are watching." />  
                    </p>
                    <p>
                        <TypingEffect delay="2500" message="I can’t help you this round. Try to figure things out." />  
                    </p>
                
                    <p>
                        <TypingEffect delay="8000" message="It's about the night... The stars look so good." />  
                    </p>
                    
                </div>
            </div>
        {/if}
       
        {#if mounted}
            <div in:scale={{delay:500,duration:100, start:0.9}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[1.8em] right-[2.8em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
                <p class="">CODEX ACTIVATED</p>
            </div>
        {/if}
    
        <div class="absolute text-[0.83em] top-[7%] left-[15%]">
            <pre class="textGlowNone text-[#B91F22] flex flex-col leading-[0.9em] font-[inherit]">
                {#each glitch[0] as lines}
                    <p>{lines}</p>
                {/each}
            </pre>
        </div>
    
        <div class="absolute text-[0.83em] bottom-[-3%] left-[6%]">
            <pre class="textGlowNone text-[#B91F22] flex flex-col leading-[0.9em] font-[inherit]">
                {#each glitch[1] as lines}
                    <p>{lines}</p>
                {/each}
            </pre>
        </div>
        <div class="absolute text-[0.83em] bottom-[-4%] right-[5%]">
            <pre class="textGlowNone text-[#B91F22] flex flex-col leading-[0.9em] font-[inherit]">
                {#each glitch[2] as lines}
                    <p>{lines}</p>
                {/each}
            </pre>
        </div>
    
        {#if mounted}
            <div in:scale={{delay:2000,duration:200, start:0.8}} class="pointer-events-none w-[40em] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <svg class="whiteCircle" viewBox="0 0 1080 649" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  fill-rule="evenodd" clip-rule="evenodd" d="M429 324.831C452.471 293.65 493.416 273 540 273C586.584 273 627.529 293.65 651 324.831C627.529 356.011 586.584 376.661 540 376.661C493.416 376.661 452.471 356.011 429 324.831Z" fill="white"/>
                    <circle  class="outerCircle"  cx="539.931" cy="324.931" r="41.9306" fill="#F70D20"/>
                    <g class="innerCircle"  filter="url(#filter0_dddddd_1340_428)">
                    <circle cx="540.295" cy="325.295" r="23.2948" fill="white"/>
                    </g>
                    <defs>
                    <filter id="filter0_dddddd_1340_428" x="-257.243" y="-472.243" width="1595.08" height="1595.08" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="9.21718"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1340_428"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="18.4344"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_1340_428" result="effect2_dropShadow_1340_428"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="64.5202"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="effect2_dropShadow_1340_428" result="effect3_dropShadow_1340_428"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="129.04"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.592157 0 0 0 0 0.592157 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="effect3_dropShadow_1340_428" result="effect4_dropShadow_1340_428"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="221.212"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.592157 0 0 0 0 0.592157 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="effect4_dropShadow_1340_428" result="effect5_dropShadow_1340_428"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="387.121"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.592157 0 0 0 0 0.592157 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="effect5_dropShadow_1340_428" result="effect6_dropShadow_1340_428"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_1340_428" result="shape"/>
                    </filter>
                    </defs>
                </svg>            
            </div>
        {/if}
    </div>


    <style>
        /* Animation for .whiteCircle */
        @keyframes whiteCircleAnimation {
            0%, 100% { 
                transform: scale(1);
            }
            50% { 
                transform: scale(1.01);
            }
        }

        /* Animation for .innerCircle */
        @keyframes innerCircleAnimation {
            0%, 100% { 
                transform: translate(0, 0);
            }
            25% { 
                transform: translate(-10px, 3px);
            }
            50% { 
                transform: translate(-18px, -8px);
            }
            75% { 
                transform: translate(8px, -3px);
            }
        }
        @keyframes outerCircleAnimation {
            0%, 100% { 
                transform: translate(0, 0);
            }
            25% { 
                transform: translate(-5px, 3px);
            }
            50% { 
                transform: translate(-10px, -5px);
            }
            75% { 
                transform: translate(5px, -3px);
            }
        }

        .whiteCircle {
            animation: whiteCircleAnimation 3s ease-in-out infinite;
            transform-origin: center;
        }

        .innerCircle {
            animation: innerCircleAnimation 7s ease-in-out infinite;
        }
        .outerCircle {
            animation: outerCircleAnimation 7s ease-in-out infinite;
        }
    </style>