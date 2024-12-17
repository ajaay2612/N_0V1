<script>
    import { scale } from "svelte/transition";
    import TypingEffect  from '../components/TypingEffect .svelte'

 

</script>

    <div class="fixed h-screen w-full bg-black z-[100] font-primary">
       

        <div in:scale={{duration:200, delay:4000, start:0.8}} class="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 glowTabWhiteBright bg-black h-[13em] flex justify-center items-center w-[31em] text-[0.78em] before:border-2 py-3em px-2em z-[101]">
            <div class="boxGlowWhite w-[100%] text-center space-y-[0.2em]">
                <p >
                    <TypingEffect delay="4000" message="Codex is closing in. I intercepted their message—classified, top-level. First, we need to decode it before they realize I've accessed it. Once we do, we'll have to respond fast to throw them off. Trust me." />  
                </p>
            </div>
        </div>
    

        <div class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[1.8em] right-[2.8em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">CODEX ACTIVATED</p>
        </div>
    

        <div in:scale={{start:0.8,delay:1500, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[1.3em] absolute top-[30%] right-[18%] border-[#B91F22] border px-[1.5em] pb-[0.1em] pt-[0.1em]">
            <p class="">FIND HIM</p>
        </div>
        
        <div in:scale={{delay:1700,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[1.3em] absolute top-[20%] left-[19%] border-[#B91F22] border px-[1.5em] pb-[0.1em] pt-[0.1em]">
            <p class="">FIND HIM</p>
        </div>

        <div in:scale={{delay:1900,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[1.3em] absolute top-[73%] right-[21%] border-[#B91F22] border px-[1.5em] pb-[0.1em] pt-[0.1em]">
            <p class="">FIND HIM</p>
        </div>
        <div in:scale={{delay:2100,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[1.3em] absolute top-[68%] left-[24%]  border-[#B91F22] border px-[1.5em] pb-[0.1em] pt-[0.1em]">
            <p class="">FIND HIM</p>
        </div>
        <div in:scale={{delay:2300,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[1.3em] absolute top-[48%] left-[15%]  border-[#B91F22] border px-[1.5em] pb-[0.1em] pt-[0.1em]">
            <p class="">FIND HIM</p>
        </div>

       
    
        <div class="pointer-events-none w-[40em] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <svg viewBox="0 0 1080 649" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M429 324.831C452.471 293.65 493.416 273 540 273C586.584 273 627.529 293.65 651 324.831C627.529 356.011 586.584 376.661 540 376.661C493.416 376.661 452.471 356.011 429 324.831Z" fill="white"/>
                <circle cx="539.931" cy="324.931" r="41.9306" fill="#F70D20"/>
                <g filter="url(#filter0_dddddd_1340_428)">
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
    </div>
