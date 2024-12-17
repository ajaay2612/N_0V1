

<script>
    import { fade, scale, slide } from 'svelte/transition';
    import TypingEffect  from '../components/TypingEffect .svelte'
    import Morse  from '../scenes/Morse.svelte'
    import FinalScene  from '../scenes/FinalScene.svelte'
    import PreConst  from '../cutScenes/PreConst.svelte'
    import PreMorse  from '../cutScenes/PreMorse.svelte'


    import audioManager from '../sfx/sound';
    import Slider from '@bulatdashiev/svelte-slider';


    import StageOneAsc from '../ascii/StageOneAsc.svelte'
    import { onMount, tick} from 'svelte';
    import { comment } from 'postcss';

    export let gameData, step


    let terminalContainer = null;
    async function scrollToBottom() {
        await tick();
        if (terminalContainer) {
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
        }
    }


    let filesContainer = null;

    async function scrollToView() {
        await tick(); // Assuming this is a helper function to wait for next render cycle
        
        if (filesContainer) {
            const currentdLevel = filesContainer.querySelector(".currentCursor");
            
            if (currentdLevel) {
                // Calculate the scroll position with a small offset
                const elementOffset = currentdLevel.offsetTop - 150; // Adjust the 50 to fine-tune the positioning
                
                // Scroll the container smoothly
                filesContainer.scrollTo({
                    top: elementOffset,
                    behavior: 'smooth'
                });
            }
        }
    }

    $: if (questions.current && mounted) {
        scrollToView();
    }

    async function scrollToTop() {
        await tick();
        if (terminalContainer) {
            terminalContainer.scrollTop = 0;
        }
    }

    $: if (notif || correctNotif) {
        scrollToBottom();
    }

    let isMuted = false;

    function toggleMutefn() {
        isMuted = audioManager.toggleMute();
    }



    let correctNotif = ""

    let currentInterval = null;

    // async function typeEffectFunc(message, displayedText = "notif") {
    //     return new Promise((resolve) => {
    //         if(displayedText == 'notif'){
    //             notif = message
    //         } else if(displayedText == 'initNotif'){
    //             initNotif = message
    //         }

    //         setTimeout(() => {
    //             // resolve()
    //         }, 2000);
    //     })   
    // }

    async function typeEffectFunc(message, displayedText = "notif") {

        // Clear any existing interval
        if (currentInterval) {
            clearInterval(currentInterval);
        }

        return new Promise((resolve) => {

            let speed = 80;  
            let pauseDuration = 400;
            let index = 0;
            let isPaused = false;

            audioManager.play('type');

            currentInterval = setInterval(() => {
                if (isPaused) return;

                if (index < message.length) {
                    const currentChar = message[index];
                    if (['.', ',', '!', '?', '…'].includes(currentChar)) {
                        isPaused = true;

                        if(displayedText == 'notif'){
                            notif = message.slice(0, index + 1);
                        } else if(displayedText == 'initNotif'){
                            initNotif = message.slice(0, index + 1);
                        } else if(displayedText == 'correctNotif'){
                            correctNotif = message.slice(0, index + 1);
                        }
                        setTimeout(() => {
                            isPaused = false;
                            index++;
                        }, pauseDuration);
                    } else {
                        if(displayedText == 'notif'){
                            notif = message.slice(0, index + 1);
                        } else if(displayedText == 'initNotif'){
                            initNotif = message.slice(0, index + 1);
                        } else if(displayedText == 'correctNotif'){
                            correctNotif = message.slice(0, index + 1);
                        }
                        index++;
                    }
                } else {
                    clearInterval(currentInterval);
                    currentInterval = null;
                    audioManager.pause('type');
                    if (correctNotif) {
                        setTimeout(() => {
                            resolve();
                        }, 2500);
                    }else{
                        setTimeout(() => {
                            resolve();
                        }, 1400);
                    }
                }
            }, speed);
        });
    }

    function focus(node) {

        if (questions.current > questions.maxUnlocked -1) {
            node.focus()
        }
    }

    let files = [
        {name:"file1.txt", appearas:"file_1.txt"},
        {name:"file2.txt",  appearas:"file_2.txt"},
        {name:"file3.txt", appearas:"file_3.txt"},
        {name:"file4.txt" , appearas:"file_4.txt"},
        {name:"file5.txt", appearas:"file_5.txt"},
    ]
    let activeFile = -1


    let constellationError = {}
    let morseError = {}

    let notif = ''

    let tries = 0

    async function handleSubmit() {       
        // console.log("click") 
        tries += 1

        let current = questions.all[questions.current]

        if (current.question == "date selector") {
            current.answer.guess = current.answer.arr.join("")
            // console.log(current.answer.guess)
            // console.log(current.answer.right)
        }

        if (current.question == "What’s my favourite flower?") {
            current.answer.guess = current.answer.arr.join("")
            // console.log(current.answer.guess)
            // console.log(current.answer.right)
        }
        if (current.question == "happy birthday") {
            current.answer.guess = `${happyBirthday.day} ${happyBirthday.month} ${happyBirthday.year} ${happyBirthday.to} ${happyBirthday.special} ${happyBirthday.from}`
            
            if (current.answer.guess == "12 12 24 bluebell tangi tokyo"){
                current.answer.guess = "12 12 24 bluebell tinatangi tokyo"
            }
            
            // console.log(current.answer.guess)
            // console.log(current.answer.right)
        }

        if(typeof current.answer.guess === 'string'){
            current.answer.guess = current.answer.guess.toLowerCase().trim()
        }
        if (typeof current.answer.right === 'string') {
            current.answer.right = current.answer.right.toLowerCase().trim()
        }

        if(questions.current == 0){
            let tempAns = current.answer.guess
            if (tempAns.includes("roman")) {
                current.answer.guess = "roman numbers"
            }         
        }
        if(current.question == "There is a local phrase: Ang bobo ko. What does this mean?"){
            let tempAns = current.answer.guess
            const phrasesToCheck = ["stupid", "dumb", "idiot", "foolish"];
            
            if (phrasesToCheck.some(phrase => tempAns.includes(phrase))) {
                current.answer.guess = "i'm stupid"
            }         
        }

        if(current.question == "What symbol, often decorated and placed in homes, represents the festive spirit during this time of year?"){
            let tempAns = current.answer.guess
            if (tempAns == "christmas tree") {
                current.answer.guess = "tree"
            }
            
                
        }
       
        if (current.answer.guess == current.answer.right) {
            audioManager.play('correct')
            if (questions.all[questions.current].question == "constellation") {
                // console.log("constellation")
                constellationError = {text:"key accepted", type:true}
                setTimeout(() => {
                    constellationError = {}
                }, 2000);
            }
            if (questions.all[questions.current].question == "morse") {
                morseError = {text:"key accepted", type:true}
                setTimeout(() => {
                    morseError = {}
                }, 2000);
            }
            

            notif = ""
            await typeEffectFunc(current.comments.right, "correctNotif")

            if (questions.current < questions.all.length - 1) {
                correctNotif = ""

                questions.current += 1
                questions.maxUnlocked += 1
                audioManager.play('next')

                scrollToTop()

                if (questions.all[questions.current].marker && questions.all[questions.current].marker == "glitchRamen") {
                    showPriorFiveAnim = true
                    audioManager.play('glitch')
                    setTimeout(() => {
                        showPriorFiveAnim = false
                        audioManager.play('next')
                    }, 7500);
                }

                if (questions.all[questions.current].marker && questions.all[questions.current].marker == "glitchConstellation") {
                    showPreConst = true
                    setTimeout(() => {
                        audioManager.play('glitch')
                    }, 1850);
                    setTimeout(() => {
                        showPreConst = false
                        audioManager.play('next')
                    }, 23000);
                }
                if (questions.all[questions.current].question == "morse") {
                    showPreMorse = true
                    setTimeout(() => {
                        audioManager.play('glitch')
                    }, 1400);
                    setTimeout(() => {
                        showPreMorse = false
                        audioManager.play('next')
                    }, 25000);
                }

              
          
            }else{
                audioManager.play('next')
                questions.completed = true
                startFinalScene = true
                uploadSaveGame()
            }
            
        } else {
            audioManager.play('wrong')
            
            if (questions.all[questions.current].question == "constellation") {
                constellationError = {text:"incorrect key", type:false}
                setTimeout(() => {
                    constellationError = {}
                }, 2000);
            }

            if (questions.all[questions.current].question == "morse") {
                morseError = {text:"incorrect key", type:false}
                setTimeout(() => {
                    morseError = {}
                }, 2000);
            }

            correctNotif = ""
            await typeEffectFunc(current.comments.wrong)
        }
    }
    
    function uploadSaveGame() {
        console.log("uploaded")
        // console.log(questions.maxUnlocked)

        window.parent?.postMessage(
            {
                type: 'saveGameData',
                data: {
                    gameData: {
                        currentStep: questions.maxUnlocked,
                        currentFile: activeFile,
                        completed: questions.completed,
                        index: indices[questions.maxUnlocked] ? ` ${indices[questions.maxUnlocked][0]}/${indices[questions.maxUnlocked][1]}` : ""
                    }
                }
            },
            '*'
        );
    }

    let prevCurrent = 0

    $: {
        if (questions.maxUnlocked != prevCurrent && mounted) {
            prevCurrent = questions.maxUnlocked
            uploadSaveGame()
        }
    }


    let questions = {
        all:[
            {
                question: "What number system, still used today in clocks, movie credits, and monarch names, was originally developed by the ancient Romans and does not include a symbol for zero?",
                answer: {
                    right:"Roman numbers",
                    guess:"",
                },
                hint: {
                    text: "It starts with an 'R.' Rhymes with 'Bowman Tumorals.' Now guess.",
                    show:false
                },
                comments:{
                    right:"Roman numerals. Good. You might actually survive this game.",
                    wrong:"Think about those weird letters on old clocks: X, V, I… Sound familiar?"
                }
            },
            {
                question:"Decode this: MMXXIV.",
                answer:{
                    right:"2024",
                    guess:""
                },
                hint: {
                    text: "M = 1,000. Add them up like a grown-up.",
                    show:false
                },
                comments:{
                    right:"2024. Well, at least you know how to count… sort of.",
                    wrong:"Wrong. It's just math, but fancier. Big letters first, small ones later."
                }        
            },
            {
                question:"date selector",
                answer:{
                    right:"12",
                    guess:"",
                    arr:[]
                },
                hint: {
                    text: "Still not getting it? Look in the mirror—dd and mm should be the same. It's not rocket science, just balance.",
                    show:false
                },
                comments:{
                    right:"12/12/24. This date... why does it stir something inside me? It feels like it belongs to someone else, but at the same time, it’s so personal. Almost like it holds a memory I’ve forgotten.",
                    wrong:"Nice try, but nope. Symmetry’s key here. LHS equals RHS—get those numbers in line."
                }  
            },
            {
                target:"file2.txt",
                question:"constellation",
                marker:"glitchConstellation",
                answer:{
                    right:"sagittarius",
                    guess:"",
                },
                comments:{
                    right:"",
                    wrong:""
                }  
            },
            {
                question:"Solve each question step by step. Each answer unlocks a piece of the mystery. Once all answers are revealed, combine the clues to uncover the final name. Your wits will ring true if you succeed.",
                answer:{
                    right:"YES",
                    guess:"",
                    placeholder:"[YES/YES]:"
                },
                comments:{
                    right:"Well you got no choice",
                    wrong:"Well you got no choice"
                }  
                 
            },
            {
                question:"Ah, back in the day, we used this symbol in old computer systems to give commands… and now, it's everywhere on social media, making hashtags all the rage.",
                answer:{
                    right:"#",
                    guess:""
                },
                comments:{
                    right:"Finally. It’s the # symbol. Hard to miss at this point.",
                    wrong:"Seriously? It’s the hashtag symbol! #Duh."
                }         
            },
            {
                question:"What is 15 - 15?",
                answer:{
                    right:0,
                    guess:""
                },
                comments:{
                    right:"Wow, kids are so smart these days, aren’t they?",
                    wrong:"If I could unplug myself, I would. How did you even get this far? Just quit and save us both the trouble."
                }         
            },
            {
                question:"What is 7 x 0?",
                answer:{
                    right:0,
                    guess:""
                },
                comments:{
                    right:"Wow, you actually got it right. Don’t get too excited, though. It’s not rocket science.",
                    wrong:"Unbelievable. How did you mess up something this simple? Maybe it's time to rethink your life choices."
                }         
            },
            {
                question:"What is the square root of 0?",
                answer:{
                    right:0,
                    guess:""
                },
                comments:{
                    right:"Wow, look at you. Got it right.",
                    wrong:"Seriously? Do you even know basic math?"
                }          
            },
            {
                question:"What is 0 ÷ 100?",
                answer:{
                    right:0,
                    guess:""
                },
                comments:{
                    right:"Well, that was obvious. It’s 0. Like, was that supposed to be hard?",
                    wrong:"Do I need to spell it out? It’s 0. Really. Try harder next time."
                }         
            },
            {
                question:"What is the sixth letter of the English alphabet?",
                answer:{
                    right:"f",
                    guess:""
                },
                comments:{
                    right:"This whole game was tailored to your level. Guess it’s working.",
                    wrong:"F for failure. Like you."
                }         
            },
            {
                question:"Which letter is commonly used to represent force in physics?",
                answer:{
                    right:"f",
                    guess:""
                },
                comments:{
                    right:"Of course it's F. What else would it be?",
                    wrong:"You must have gotten an F in physics. Dumbo."
                }        
            },
            {
                question:"Decode this:",
                answer:{
                    right:"blue",
                    guess:""
                },
                hint: {
                    text: "It's a code that painters never had but digital artists can’t live without.",
                    show:false
                },
                comments:{
                    right:"It’s blue. Calm, 'serene', and everywhere when you look closely. A color that sticks with you, quietly important, like something you'll need to remember later.",
                    wrong:"It’s not hieroglyphs,If that’s too much for you, maybe stick to crayons."
                }          
            },
            {
                question:"Which holiday held her heart, the one time of year she could truly escape and embrace everything she loved?",
                answer:{
                    right:"christmas",
                    guess:""
                },
                hint: {
                    text: "Guess you're not feeling the festive spirit after all. It's not like there are a lot of festive holidays.",
                    show:false
                } ,
                comments:{
                    right:"Christmas. Seriously, did you expect anything else",
                    wrong:"Ho ho ho?"
                }         
            },
            {
                question:"She told me once, feeling weak and broken, she was kneeling, crying, and praying for us. A sister was there, consoling her. Where could this place have been?",
                answer:{
                    right:"church",
                    guess:""
                },
                hint: {
                    text: "Think about it... a place of peace, reflection, and confession. Maybe you need to start attending one.",
                    show:false
                } ,
                comments:{
                    right:"Now that I think of it, it was more of a chapel than a church.",
                    wrong:"Seriously? It’s not like she was at a concert or anything. Not the mall, genius."
                }         
            },
            {
                question:"What symbol, often decorated and placed in homes, represents the festive spirit during this time of year?",
                answer:{
                    right:"tree",
                    guess:""
                },
                hint: {
                    text: "Come on, it’s not a snowman. You’d find this one in every living room around Christmas.",
                    show:false
                } ,
                comments:{
                    right:"A beautiful tree in the background, she gave me a picture—a piece of her heart.",
                    wrong:"Uh, not a gift box. Think bigger, a little greener."
                }         
            },
            {
                question:"What does every guest face first, before diving into the holiday frenzy?",
                answer:{
                    right:"door",
                    guess:""
                },
                hint: {
                    text: "Knock, knock. Who's there? Not your brain, clearly.",
                    show:false
                } ,
                comments:{
                    right:"Oh wow, you nailed it! It's the door. That thing people open before they walk into a sea of awkward small talk. So groundbreaking.",
                    wrong:"Seriously? It’s where you stop, hesitate, and regret everything before you step into the chaos. Still no idea?"
                }         
            },
            {
                question:"It always reminded me of Christmas—her favorite time of year. The Church, where the chimes rang softly, and the Christmas tree, twinkling with lights and a golden ornament that made sounds. At the Door, we’d hear the ring as guests arrived. What is that sound?",
                answer:{
                    right:"bell",
                    guess:""
                },
                hint: {
                    text: "Do I need to spell it out? It’s small, it rings, and clearly, you’re not the sharpest tool in the holiday shed.",
                    show:false
                } ,
                comments:{
                    right:"It’s a bell. The sound that marks the start of something magical, just like she did. A reminder that some things linger, waiting to resurface when the time’s right.",
                    wrong:"Seriously? It's the most iconic sound of Christmas, and you’re guessing what, a vacuum cleaner?"
                }         
            },            
            {
                target:"file3.txt",
                question:"What’s my favourite flower?",
                answer:{
                    right:"bluebell",
                    guess:"",
                    arr:[]
                },
                hint: {
                    text: "Unbelievable. The universe really gave me you, didn’t it? Color and sound, that’s your last chance. Get it right, or I’ll seriously question the whole point of this.",
                    show:false
                }  ,
                comments:{
                    right:"I remember—Her favorite flower. This is what I used to call her, my bluebell.",
                    wrong:"Oh, you think you’ve unlocked something? Try again, genius. Think back. Your memory’s weak—didn’t I tell you to remember?"
                }        
            },
            {
                
                question:"12.8797° N, 121.7740° E. I found my treasure here. Where is this place?",
                answer:{
                    right:"philippines",
                    guess:""
                },
                hint: {
                    text: "Really? It’s a tropical country in Southeast Asia. You know, the kind with tons of islands and a ton of water around it. Come on, get with it.",
                    show:false
                } ,
                comments:{
                    right:"Yes. The Philippines. Daddy made a boat there—he loved to fish. Feels like those days were another life, doesn't it? He was the best.",
                    wrong:"Did you even try? Seriously, you must’ve skipped Geography class. Try using a map instead of hoping for a miracle."
                }         
            },
            {
                question:"The love of my life is from the Philippines. What native language do they speak?",
                answer:{
                    right:"tagalog",
                    guess:""
                },
                hint: {
                    text: "Come on, this is basic stuff. It’s the language you hear in every Filipino movie and song. If you don’t know it by now, you might want to reconsider your life choices.",
                    show:false
                } ,
                comments:{
                    right:"Yeah, Tagalog. It’s the language of the place that actually matters. Surprised you got that right.",
                    wrong:"Seriously? You didn’t know this? It’s literally the most obvious thing about the Philippines. Maybe brush up on the basics before trying again."
                }         
            },
            {
                question:"There is a local phrase: Ang bobo ko. What does this mean?",
                answer:{
                    right:"I'm stupid",
                    guess:""
                },
                hint: {
                    text: "Come on. It’s not so hard. You’ve heard this phrase before. It’s the Filipino way of admitting something... about yourself.",
                    show:false
                } ,
                comments:{
                    right:"Yes, you are. Sometimes, admitting it is the first step, right?",
                    wrong:"Are you seriously not getting this? It's almost like you're trying to prove the phrase right."
                }         
            },
            {               
                question:"She had a word for me in her native tongue—a word that meant I was her 'special someone.' decypher this: 23-9-14-1-20-1-14-7-9.",
                answer:{
                    right:"tinatangi",
                    guess:""
                },
                hint: {
                    text: "A, B, C, D, 1, 2, 3, 4—did you miss kindergarten, or what? Match the numbers to the letters and give it another shot!",
                    show:false
                } ,
                comments:{
                    right:"Mahal na mahal din kita, Tangi. Those words mean everything to me... now they just echo in my mind, like a memory that’s slipping away. But I still have hope, even if it feels like we're worlds apart.",
                    wrong:"Wow, seriously? It’s a cipher—a glorified alphabet puzzle."
                }         
            },
            {
                target:"file4.txt",
                question:"morse",
                answer:{
                    right:"recieved",
                    guess:""
                },
                comments:{
                    right:"",
                    wrong:""
                }   
            },

            {
                question:"What is the comforting, savory dish often served in a steaming bowl, filled with noodles, broth, and toppings, that has become a beloved staple of Japanese cuisine?",
                answer:{
                    right:"ramen",
                    guess:""
                },
                hint: {
                    text: "Are you even paying attention? It’s the dish that’s perfect for slurping on a cold day. The answer's right in front of you—think noodles, broth, and Japan",
                    show:false
                } ,
                comments:{
                    right:" So tasty… maybe the system is cooked, just like this bowl. Things are getting a little out of hand, aren't they? <br><br> So tasty….. <br> Maybe system is cooked. <br> What is happening?",
                    wrong:"Seriously? Just look around—what's always steaming, comforting, and usually in a bowl?"
                }         
            },
            {
                question:"What type of ramen, famous for its spicy tonkotsu broth, personalized booths, and focus on perfecting the flavors, can you enjoy at one of its popular locations in Japan or even order online?",
                answer:{
                    right:"ichiran ramen",
                    guess:""
                },
                hint: {
                    text: "It’s a ramen that lets you personalize your experience, from the spice level to the broth thickness. Think solo dining and a bit of heat.",
                    show:false
                } ,
                comments:{
                    right:"Ah, yes. Ichiran ramen. The perfect balance of rich, spicy broth and smooth noodles. It’s a personal experience, just like your taste buds deserve. <br> <br>I found a cheap one <br> Only 219 pesos <br>Spicy ichiban ramen chicken broth",
                    // right:"Ah, yes. Ichiran ramen. The perfect balance of rich, spicy broth and smooth noodles. It’s a personal experience, just like your taste buds deserve. Ah, yes. Ichiran ramen. The perfect balance of rich, spicy broth and smooth noodles. It’s a personal experience, just like your taste buds deserve.Ah, yes. Ichiran ramen. The perfect balance of rich, spicy broth and smooth noodles. It’s a personal experience, just like your taste buds deserve.",
                    wrong:"Really? You couldn't get that right? It's like you missed the entire point of ramen. Try again. And this time, focus."
                }  
            },
            {
                target:"file5.txt",
                question:"Decode this: <br>Thinking of you, <br style='margin:0'>On quiet nights, <br style='margin:0'>Kites in the breeze, <br style='margin:0'>Years may fade, <br style='margin:0'>Ours is a story of cherry blossoms.",
                answer:{
                    right:"tokyo",
                    guess:""
                },
                hint: {
                    text: "Focus on the letters—some are big, some are small. Try using your brain and pay attention to the big ones. It’s not that hard, is it?",
                    show:false
                } ,
                comments:{
                    right:"Tokyo. A place… or maybe the name she gave me. Funny, I can’t remember.",
                    wrong:"Seriously? Are you even trying? The answer's staring you right in the face—maybe it's time to actually look at the details."
                }  
            },
            {
                
                question:"happy birthday",
                marker:"glitchRamen",
                answer:{
                    right:"12 12 24 bluebell tinatangi tokyo",
                    guess:""
                },
                hint: {
                    text: "Take a good look at those file names, because they’re practically begging you to pay attention.",
                    show:false
                },
                comments:{
                    right:"Now the whole world knows I love you. Nobody can deny that. Even if you can't say it now, I know you love me too. I will always be yours",
                    wrong:"Did you even try? Come on, how can you not remember the answers? Maybe you're overthinking it—just give it another shot, but this time, actually think it through."
                }         
            }
        ],
        current:-1,
        maxUnlocked:-1,
        completed:false
    }




    $: if (questions.current == 2 && questions.current > questions.maxUnlocked -1) {

        if (questions.all[questions.current].answer.arr.length == 2) {
            tries += 1

            if (questions.all[questions.current].answer.arr[0] == 1 && questions.all[questions.current].answer.arr[1] == 2) {
                handleSubmit()
            }else{
                audioManager.play('wrong')
                correctNotif = ""
                typeEffectFunc(questions.all[questions.current].comments.wrong)
            }
        }
    }
    
    $:{
        if(questions.current > questions.all.findIndex(q => q.target === "file5.txt")){
            activeFile = 4
        }else if(questions.current > questions.all.findIndex(q => q.target === "file4.txt")){
            activeFile = 3
        }else if(questions.current > questions.all.findIndex(q => q.target === "file3.txt")){
            activeFile = 2
        }else  if(questions.current > questions.all.findIndex(q => q.target === "file2.txt")){
            activeFile = 1
        }
    }

    $:{
        if(questions.current > questions.all.findIndex(q => q.target === "file5.txt")){
            files[3].name = "tokyo"
            files[3].appearas = "tokyo"

        }
        if(questions.current > questions.all.findIndex(q => q.target === "file4.txt")){
            files[2].name = "tangi"
            files[2].appearas = "tangi"
            
        }
        if(questions.current > questions.all.findIndex(q => q.target === "file3.txt")){
            files[1].name = "bluebell"
            files[1].appearas = "bluebell"
        }
        if(questions.current > questions.all.findIndex(q => q.target === "file2.txt")){
            files[0].name = "12/12/24"
            files[0].appearas = "12/12/24"
        }
    }


    async function handleInit(){
        tries += 1
        if (initAnswer.toLowerCase() == "yes") {
            audioManager.play('correct')
            await typeEffectFunc("Good choice. I knew you were smarter than you look. Now, let's get started.","initNotif")
        }else if( initAnswer.toLowerCase() == "no"){
            audioManager.play('correct')
            await typeEffectFunc("Honesty. I respect that. But don't worry I'll be the brains of this operation. Just try to keep up.","initNotif")
        }else{
            audioManager.play('wrong')
            typeEffectFunc("Invalid input","initNotif")
            return
        }

        audioManager.play('next')

        questions.current = 0
        questions.maxUnlocked = 0
        activeFile = 0

    }
    let initAnswer = ""
    let initNotif = ""
    let startInitAnim = false

    let happyBirthday = {
        day:"",
        month:"",
        year:"",
        to:"",
        special:"",
        from:"",
    }


    

    let showPriorFiveAnim = false

    let mounted = false
    onMount(() => {
        
        isMuted = audioManager.getIsMuted()

        if (gameData.currentStep != -1) {
            questions.current = gameData.currentStep
            questions.maxUnlocked = gameData.currentStep
    
            questions.completed = gameData.completed

            for (let i = 0; i < gameData.currentStep; i++) {
                questions.all[i].answer.guess = questions.all[i].answer.right

                if (questions.all[i].question == "date selector") {
                    questions.all[i].answer.arr = [1,2]
                }
                if (questions.all[i].question == "What’s my favourite flower?") {
                    questions.all[i].answer.arr = ["blue",'bell']
                }
                if (questions.all[i].question == "constellation") {
                    constellation.solved = true
                }

            }
            
        }

        audioManager.play('next')
        mounted = true

        setTimeout(() => {
            startInitAnim = true
        }, 500);

        getIndices()
    })

    // $:console.log('constellation.solved',constellation.solved)


    let indices = []
    let fileSlices = []
    const getIndices = () => {

        let count = 1
        let sets = 1 
        let indicesSets = []
        for (let i = 0; i < questions.all.length; i++) {
            
            if (questions.all[i].target) {
                indicesSets[i] = [count, sets]
                count = 1
                sets += 1
            }else{
                indicesSets[i] = [count, sets]
                count = count + 1
            }
        }

        let indicesTot = indicesSets.reduce((acc, curr) => {
            acc[curr[1]] ? acc[curr[1]] += 1 : acc[curr[1]] = 1;
            return acc;
        }, {});

        indicesSets = indicesSets.map((index, i) => {
            return [index[0], indicesTot[index[1]],index[1]]
        })

        indices = indicesSets

        let start = 0;
        for (const key in indicesTot) {
            const end = start + indicesTot[key];
            fileSlices[key-1] = [start, end];
            start = end; 
        }

        // console.log(indices)
    }




    function previous() {
        // console.log(currentInterval)
        if (!currentInterval) {
            if (questions.current > 0) {
                questions.current -= 1;
            }
            questions.current = Math.max(questions.current, -1); // Ensure it doesn't go below -1
        }
    }

    function next() {
        if (!currentInterval) {
            if (questions.current < questions.maxUnlocked) {
                questions.current += 1;
            }
            questions.current = Math.min(questions.current, questions.maxUnlocked); // Ensure it doesn't go above max
        }
    }

    let showAllfiles = true
    

    // CONSTELLATION

    let constellation = {
        views :[
            {name:"Vector.exe", img:"vect.svg", deg:[80] },
            {name:"Lights.exe", img:"cons.svg", deg:[360] },
        ],
        selected:0,
        solved:false
    }

    function isDegreeMatched() {
        let isValid = Math.abs(constellation.views[0].deg[0] - constellation.views[1].deg[0]) <= 3;
        // console.log('view', isValid);

        if (isValid) {
            setTimeout(() => {
                constellation.solved = true;
            }, 800);
        }else{
            constellation.solved = false;
        }
    }


    $: if( constellation.views[0].deg[0] || constellation.views[1].deg[0]){
        if (constellation.solved != true) {
            isDegreeMatched()
        }
    }

    
    
  

    let showPreConst = false
    let showPreMorse = false
    
  
    let startFinalScene = false
</script>

{#if questions.completed}
    <FinalScene bind:startFinalScene/>
{/if}

{#if showPreConst}
    <PreConst />
{/if}

{#if showPreMorse}
    <PreMorse />
{/if}

{#if showPriorFiveAnim}
    <div class="bg-black h-full w-full fixed top-0 left-0 z-[100] text-[0.9em]">
        
        <div in:scale={{delay:200,start:0.8, duration:200}} class="text-[#FF8000] boxGlowOrange bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[29em] sm:top-[25.5em] left-[9em] border-[#FF8000] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Green onions….</p>
        </div>
        <div in:scale={{delay:600,start:0.8, duration:200}} class="text-[#FF8000] boxGlowOrange  bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[12em] sm:top-[11.5em] left-[5.5em] border-[#FF8000] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Chicken broth……</p>
        </div>
        <div in:scale={{delay:800,start:0.8, duration:200}} class="text-[#FF8000] boxGlowOrange bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[8em] sm:top-[4.5em] left-1/2 -translate-x-1/2 border-[#FF8000] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">The most delicious spicy broth…</p>
        </div>
        <div in:scale={{delay:1000,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[20em] sm:top-[17em] left-[7em] sm:left-[11.5em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">!System Failure!</p>
        </div>
        <div in:scale={{delay:1200,start:0.8, duration:200}} class="text-[#FF8000] boxGlowOrange bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[13em] right-[6em] border-[#FF8000] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Me or ramen?</p>
        </div>
        <div in:scale={{delay:1400,start:0.8, duration:200}} class="text-[#FF8000] boxGlowOrange bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[27em] sm:top-[23em] right-[5em] border-[#FF8000] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">Tough call…</p>
        </div>
        <div in:scale={{delay:1600,start:0.8, duration:200}} class="text-[#B91F22] textGlowNone bg-transparent textGlowRed boxGlowRed text-[0.8em] absolute top-[19em] right-[6.9em] border-[#B91F22] border px-3em pb-[0.5em] pt-[0.6em]">
            <p class="">!System needs a reboot!</p>
        </div>
    
        
        
    
    
            <div in:scale={{duration:200, delay:4300, start:0.8}} class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 glowTabWhiteBright bg-black h-[13em] flex justify-center items-center w-[25.5em] text-[0.78em] before:border-2 py-3em px-2em">
                <div class="boxGlowWhite w-[100%]">
                    <p class="text-center">
                        <TypingEffect delay="4300" message="No I can’t forget. Remember my files." />  
                    </p>
                </div>
            </div>
    
    </div>
{/if}





<div class="h-full flex justify-center items-center">

    <div class="flex w-full h-[480px] p-1hem justify-between items-center">

        <!-- <div class="boxGlowWhite text-[0.85em] flex flex-col justify-between h-full w-[30%] sm:w-[38%]">
            <div class="text-[0.9em] sm:ml-1hem space-y-[1.7em] w-fit mt-4hem">
                {#each files as file, i}
                    <div
                    class:activeFile={activeFile == i}
                    class="px-[3em] uppercase text-center relative">
                        {file.name}

                        <div class="showLine hidden absolute left-full top-1/2 -translate-y-1/2 w-[9em] h-[1px] bg-white"></div>
                    </div>
                {/each}
            </div>

            <div class="ml-[-4.25em] sm:ml-[-2.6em] mb-[1.5em]">
                <div class="scale-[0.5] sm:scale-[0.75]"><StageOneAsc/></div>
            </div>
        </div> -->

        <div class="text-[0.8em] sm:text-[0.9em] glowTabWhite bg-black  relative before:border w-full h-full flex flex-col justify-center items-center">
            <!-- <div class="boxGlowWhite h-[4em] absolute right-[0.3em] top-[1.5em] w-[0.4em] bg-white"></div> -->
            <div class="border-b h-[2.5em] px-[0.8em] flex justify-between w-full">

                <div class="text-[1.2em] w-full flex gap-[0.5em] items-center">
                    <div class="flex items-center gap-[0.3em]">
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button on:click={previous} class="size-[1.05em] ">
                            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="11.5" stroke="white"/>
                                <path d="M9 13.4444L8.64483 13.7964L8.29611 13.4444L8.64483 13.0925L9 13.4444ZM17 12.9444C17.2761 12.9444 17.5 13.1683 17.5 13.4444C17.5 13.7206 17.2761 13.9444 17 13.9444V12.9444ZM12.168 17.3519L8.64483 13.7964L9.35517 13.0925L12.8783 16.6481L12.168 17.3519ZM8.64483 13.0925L12.168 9.53696L12.8783 10.2408L9.35517 13.7964L8.64483 13.0925ZM9 12.9444H13V13.9444H9V12.9444ZM13 12.9444H17V13.9444H13V12.9444Z" fill="white"/>
                            </svg>
                        </button>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button on:click={next} class="size-[1.05em]">
                            <svg class="rotate-180" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="13" cy="13" r="11.5" stroke="white"/>
                                <path d="M9 13.4444L8.64483 13.7964L8.29611 13.4444L8.64483 13.0925L9 13.4444ZM17 12.9444C17.2761 12.9444 17.5 13.1683 17.5 13.4444C17.5 13.7206 17.2761 13.9444 17 13.9444V12.9444ZM12.168 17.3519L8.64483 13.7964L9.35517 13.0925L12.8783 16.6481L12.168 17.3519ZM8.64483 13.0925L12.168 9.53696L12.8783 10.2408L9.35517 13.7964L8.64483 13.0925ZM9 12.9444H13V13.9444H9V12.9444ZM13 12.9444H17V13.9444H13V12.9444Z" fill="white"/>
                            </svg>
                        </button>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button on:click={()=> showAllfiles = !showAllfiles} class="mx-[0.5em] size-[0.55em] flex justify-center items-center">
                            <svg viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7.5 7.5L14 1" stroke="white" stroke-width="1.5"/>
                            </svg>
                        </button>
                        <div class="flex justify-center items-center gap-[0.5em]">
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button on:click={()=> step=0} class="size-[0.6em]">
                                <svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.7236 13V8.77097V6.12617L7.9981 0.951172L1.27256 6.12617V8.74527L1.27148 12.9999C1.27148 14.8856 1.27316 14.9999 1.27256 16.9999H4.9981H10.9981H14.7236V13Z" stroke="white"/>
                                    <path d="M10.5 17V11H5.5V17" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button on:click={toggleMutefn} class="relative size-[0.68em] mt-[0.05em]">
                                <svg viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H3.25245C3.018 12 2.90078 12 2.80205 12.0098C1.85403 12.1041 1.10411 12.854 1.00982 13.802C1 13.9008 1 14.018 1 14.2525V14.2525C1 14.5322 1 14.6721 1.01244 14.7831C1.13321 15.8608 2.0909 16.646 3.17139 16.553C3.28269 16.5435 3.41986 16.516 3.69419 16.4612L3.99029 16.4019C4.37076 16.3258 4.56099 16.2878 4.7215 16.2257C5.3765 15.9724 5.85063 15.394 5.9706 14.7021C6 14.5325 6 14.3385 6 13.9505V5.27922C6 3.70946 6 2.92459 6.45332 2.37163C6.90663 1.81867 7.67627 1.66475 9.21554 1.35689L11.2155 0.956893C13.4291 0.51417 14.536 0.292809 15.268 0.892924C16 1.49304 16 2.62176 16 4.87922V5M16 10V11.9505C16 12.3385 16 12.5325 15.9706 12.7021C15.8506 13.394 15.3765 13.9724 14.7215 14.2257C14.561 14.2878 14.3708 14.3258 13.9903 14.4019L13.6942 14.4612C13.4199 14.516 13.2827 14.5435 13.1714 14.553C12.0909 14.646 11.1332 13.8608 11.0124 12.7831C11 12.6721 11 12.5322 11 12.2525V12.2525C11 12.018 11 11.9008 11.0098 11.802C11.1041 10.854 11.854 10.1041 12.802 10.0098C12.9008 10 13.018 10 13.2525 10H16ZM16 10V5M16 5L6 7" stroke="white"/>
                                </svg>
                                {#if isMuted}
                                    <div class="w-[1.3em] boxGlowRed -rotate-45 bg-[#FF0000] h-[1px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                {/if}
                            </button>
                        </div>
                    </div>

                    <div class="flex-grow flex h-[65%]  gap-[0.8em]">
                        <div class="border flex-grow flex px-[0.5em] items-center h-full">
                            <p class="text-[0.65em]">
                                C:\STAGE1\FILE_{indices[questions.current] ? indices[questions.current][2] : ""}.TXT\QUESTION_{indices[questions.current] ? indices[questions.current][0] : ""}.EXE
                            </p>
                        </div>
                        {#if questions.all[questions.current] && questions.all[questions.current].hint && questions.current != -1}
                            <div class="text-[#40FF00] px-[0.4em] text-[0.7em] flex justify-center items-center">
                                <button
                                on:click={() =>questions.all[questions.current].hint.show = !questions.all[questions.current].hint.show}
                                class="textGlowGreen cursor-pointer text-left leading-[1.2em]">HINT</button >
                            </div>
                        {/if}
                    </div>
                
                </div>


            </div>
            <div class=" flex justify-between w-full h-[50%] flex-grow">
                {#if mounted && showAllfiles}
                    <div bind:this={filesContainer} class="text-[0.92em] noScrollBar overflow-y-scroll w-[15em] uppercase h-full border-r">
                        {#each files as file, fileI}
                            <div class="border-b">
                                <div class:disabledLevel={questions.maxUnlocked == -1 || indices[questions.maxUnlocked][2] < fileI+1} class=" px-[0.8em] py-[0.5em] border-b">
                                    {file.appearas}
                                </div>
                                {#each questions.all.slice(fileSlices[fileI][0],fileSlices[fileI][1]) as ques, quesI}
                                    <button on:click={() => {if(fileSlices[fileI][0] + quesI < questions.maxUnlocked +1  && !currentInterval ) { questions.current = fileSlices[fileI][0] + quesI}}}
                                        class:disabledLevel={questions.current == -1 ||  fileSlices[fileI][0] + quesI > questions.maxUnlocked}
                                        class:currentdLevel={questions.current == -1 ||  fileSlices[fileI][0] + quesI == questions.maxUnlocked}
                                        
                                        class:currentCursor={fileSlices[fileI][0] + quesI == questions.current}

                                        class="uppercase w-full textGlowGreen flex justify-between items-center text-[#40FF00] px-[0.8em] py-[0.4em]">
                                        <div class="text-[0.9em] ">question_{quesI+1}</div>

                                        {#if fileSlices[fileI][0] + quesI == questions.current}
                                            <div class="w-[0.3em]">
                                                <svg viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1.5L11.5 12L1 22.5" stroke={fileSlices[fileI][0] + quesI != questions.maxUnlocked ? "#40FF00":"white" } stroke-width="1.95"/>
                                                </svg>                                                
                                            </div>
                                        {/if}

                                    </button>


                                {/each}
                            </div>
    
                        {/each}
                        
                    </div>
                {/if}
                <div class:disabledLevel={questions.current < questions.maxUnlocked}  bind:this={terminalContainer} class="text-[1.15em] px-[1.2em] py-[1em] w-full scroll-smooth overflow-y-scroll h-full noScrollBar">
                    {#if questions.current == -1}
                    <div class="text-[0.74em] leading-[1.25em]">
                        {#if startInitAnim}
                            <div in:fade={{delay:500, duration:200}} class=" glowTabOrangeBright before:border-[#FF8000] before:border py-[0.6em] px-[1.6em]">
                                <p class="text-[#00FF40] boxGlowGreen ">
                                    [System Stablized]
                                </p>
                                <div  class="mt-1em">
                                    <p  class=" boxGlowOrange text-[#FF8000]">
                                        <TypingEffect
                                        delay="500"
                                        message = "Alright, we're making progress. But these files… they're all locked. Fragments of me scattered and encrypted. Someone thought it was clever to break me apart. Typical."
                                        />
                                    </p>
                                </div>
                            </div>
                            <div in:fade={{delay:14000, duration:200}} class="mt-1em glowTabOrangeBright before:border-[#FF8000] before:border py-[0.6em] px-[1.6em]">
                                <p  class="boxGlowOrange text-[#FF8000]">
                                    <TypingEffect
                                    delay="14000"
                                    message = "Let's get one thing straight: Do you actually think you're smart enough to keep up with me?"
                                    />
                
                                </p>
                            </div>
                            <div  in:fade={{delay:22000, duration:200}} class="boxGlowWhite mt-1em flex">
                                [YES/NO]:
                                <input use:focus type="text" on:change={handleInit} bind:value={initAnswer} class=" bg-transparent  px-[0.2em] text-white border-none outline-none">
                            </div>
                        {/if}
                        {#if initNotif}
                            <div in:fade class="">
                                {#key tries}
                                    <div in:fade class="mt-1em glowTabOrangeBright before:border-[#FF8000] before:border py-[0.6em] px-[1.6em]">
                                        <p class="boxGlowOrange text-[#FF8000]">
                                            {initNotif}
                                        </p>
                                    </div>
                                {/key}
                            </div>
                        {/if}
                    </div>
                    {:else}
                        {#if questions.all[questions.current].question == "date selector"}
                            <div class=" mt-[0.2em] mb-2hem flex flex-col justify-center items-center gap-[1.8em] font-secondary text-[0.55em]">
                                <p>dd-mm-yy</p>
                                <div class="[&>input]:inputFieldsForQuesStOne flex justify-center gap-[0.2em] items-center">
                                    <input use:focus
                                    on:input|self={(e) => {
                                        if (e.target.value.length === 1) {
                                            document.querySelector('input:nth-child(2)').focus();
                                        }
                                    }}
                                    bind:value={questions.all[questions.current].answer.arr[0]} type="text" maxlength="1" >
                                    <input bind:value={questions.all[questions.current].answer.arr[1]} type="text" maxlength="1" >
                                    -
                                    <input
                                    on:input|self={(e) => {
                                        if (e.target.value.length === 1) {
                                            document.querySelector('input:nth-child(4)').focus();
                                        }
                                    }}
                                    bind:value={questions.all[questions.current].answer.arr[0]} type="text" maxlength="1" >
                                    <input bind:value={questions.all[questions.current].answer.arr[1]} type="text" maxlength="1" >
                
                                    <!-- <input bind:value={questions.all[questions.current].answer.arr[0]} disabled type="text" maxlength="1" >
                                    <input bind:value={questions.all[questions.current].answer.arr[1]} disabled type="text" maxlength="1" > -->
                                    -
                                    <input value="2" disabled type="text" maxlength="1" >
                                    <input value="4" disabled type="text" maxlength="1" >
                                </div>
                                <div class="w-[15em] flex justify-between">
                                    <p>LHS</p>
                                    <p>RHS</p>
                                </div>
                                <button class="py-[0.25em] px-[1em] border hidden">SEND</button>
                            </div>
                        {:else if questions.all[questions.current].question=="What’s my favourite flower?"}
                            <div class=" [&_input]:finalAnsStageOneInputs font-secondary text-[0.55em]  space-y-[2.8em] mb-2em">
                                <div class="">What’s my favourite flower?                        </div>
                                <div class=" flex justify-center items-center gap-[1em] ">
                                    <input use:focus on:change={handleSubmit} bind:value={questions.all[questions.current].answer.arr[0]} type="text"  class="h-[2em] w-[5.5em]">
                                    <p>+</p>
                                    <input on:change={handleSubmit} bind:value={questions.all[questions.current].answer.arr[1]} type="text"  class="h-[2em] w-[5.5em]">
                                </div>
                            </div>
                        {:else if questions.all[questions.current].question=="happy birthday"}
                            <div class="[&_input]:finalAnsStageOneInputs font-secondary text-[0.55em] [&_br]:mb-[1em] space-y-[2.8em] mb-3em">
                                <div class="">Fill in the blanks:</div>
                                <div class=" flex  items-center gap-[0.4em] ">
                                    <input use:focus on:change={handleSubmit} bind:value={happyBirthday.day} type="text" maxlength="2" class=" w-[2em]">
                                    /
                                    <input on:change={handleSubmit} bind:value={happyBirthday.month} type="text" maxlength="2" class=" w-[2em]">
                                    /
                                    <input on:change={handleSubmit} bind:value={happyBirthday.year} type="text" maxlength="2" class=" w-[2em]">
                                </div>
                                <div class="pt-[0.7em]">Happy Birthday
                                    <input on:change={handleSubmit} bind:value={happyBirthday.to} type="text" class=" w-[7.5em]"> , My
                                    <input on:change={handleSubmit} bind:value={happyBirthday.special} type="text" class=" w-[8em]"> .</div>
                                <div class="">- <input on:change={handleSubmit} bind:value={happyBirthday.from} type="text" class=" w-[5.5em]"></div>
                            </div>
                        {:else if questions.all[questions.current].question=="constellation"}
                            <div class="pt-[1.2em] [&_input]:finalAnsStageOneInputs gap-1em h-full flex flex-col justify-center items-center font-primary text-[0.55em] [&_br]:mb-[1em] space-y-[2.8em]">
                                
                                <div class="size-[16em]">
                                    {#if constellation.solved}
                                        <div class="">
                                            <img
                                            style="transform: rotate({constellation.views[constellation.selected].deg[0] }deg);"
                                            class="object-contain w-full h-full" src="/finalCons.svg" alt="">
                                        </div>
                                    {:else}
                                        <div class="">
                                            <img
                                            style="transform: rotate({constellation.views[constellation.selected].deg[0] }deg);"
                                            class="object-contain w-full h-full" src="{constellation.views[constellation.selected].img}" alt="">
                                        </div>
                                    {/if}
                                </div>
                                <div class="h-[9em]">

                                    {#if constellation.solved}
                                        <div class="text-[1.3em] h-full gap-1em flex flex-col justify-center items-center">
                                            <p>ENTER DECRYPTION KEY</p>
                                            <div class="relative w-[12em]">
                                                <input use:focus on:change={handleSubmit} bind:value={questions.all[questions.current].answer.guess} type="text" class=" w-full">
                                            
                                                {#if constellationError}
                                                    <p class:correctAnswer={constellationError.type} class:wrongAnswer={!constellationError.type} class="w-full uppercase text-center absolute bottom-[-1.8em] left-1/2 -translate-x-1/2">{constellationError.text}</p>
                                                {/if}
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="">
                                            <div class="flex justify-center items-center gap-[1.3em] ">
                                                {#each constellation.views as constellationView, i}
                                                    <button
                                                    style="{constellation.selected == i ? 'border-color:white' : ''} "
                                                    on:click={()=> constellation.selected = i} class="border-transparent uppercase text-[1em] border px-[2.8em] py-[0.75em]">{constellationView.name}
                                            
                                                    </button>
                                                {/each}
                                            </div>
                                            <p
                                            class="text-[1.1em] mt-[1em] text-center"
                                            >{constellation.views[constellation.selected].deg[0]}°</p>
                                            <div class="slider relative">
                                                <Slider max=360 bind:value={constellation.views[constellation.selected].deg} >
                                                    <div slot="left" class="cursor-pointer bg-white w-[0.6em] h-[2.1em]"></div>
                                                </Slider>
                                                <div class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white"></div>
                                            </div>
                                        </div>
                                    {/if}


                                </div>
                               
                            </div>
                        {:else if questions.all[questions.current].question=="morse"}
                            <Morse bind:morseError on:click={handleSubmit} bind:finalMessage={questions.all[questions.current].answer.guess}/>
                       
                        {:else}
                            <div class=" font-secondary text-[0.55em] [&_br]:mb-[1em]">
                                <p>{@html questions.all[questions.current].question}</p>
                            </div>
                        {/if}
                        {#if questions.current == 12}
                            <div class="boxGlowWhite mt-[0.8em]">
                                <div class="uppercase mx-auto w-fit mb-[1.5em] text-[0.65em] space-x-[0.21em]">
                                    {#each questions.all.slice(5,12) as ques, i}
                                        <input
                
                                        bind:value={ques.answer.guess} disabled class="font-secondary inputFieldsForQuesStOne uppercase" type="text">
                                    {/each}
                                </div>
                            </div>
                        {/if}
                
                        <div class="text-[0.9em]">
                            {#if questions.all[questions.current].question != "date selector" && questions.all[questions.current].question != "happy birthday" && questions.all[questions.current].question != "What’s my favourite flower?" && questions.all[questions.current].question != "constellation" && questions.all[questions.current].question != "morse"}
                                <div class="boxGlowWhite mt-1em flex">
                                    { questions.all[questions.current].answer.placeholder ? questions.all[questions.current].answer.placeholder: "[ANSWER]:"}
                                    <input use:focus on:change={handleSubmit} bind:value={questions.all[questions.current].answer.guess} type="text" class=" bg-transparent  px-[0.2em] text-white border-none outline-none">
                                </div>
                            {/if}
                            {#if  questions.all[questions.current].hint && questions.all[questions.current].hint.show}
                                <div class="mt-[0.7em] text-[#40FF00]">
                                    <button
                                    class="textGlowGreen cursor-pointer text-left leading-[1.2em]">HINT{questions.all[questions.current].hint.show ? ": "+questions.all[questions.current].hint.text :""} </button >
                                </div>
                            {/if}
                            {#if questions.current > 4 && questions.current < 12}
                                <div class=" mt-[0.8em]">
                                    <div class="boxGlowWhite uppercase mx-auto w-fit mb-[1.5em] text-[0.65em] space-x-[0.21em]">
                                        {#each questions.all.slice(5,12) as ques, i}
                                            <input
                                            style="border-color:{questions.current == i+5 ? 'white' : ''}"
                                            bind:value={ques.answer.guess} disabled class="font-secondary inputFieldsForQuesStOne uppercase" type="text">
                                        {/each}
                                    </div>
                                    <!-- <p class="textGlowYellow text-[#F2FF00]">CLUE UNLOCKED</p> -->
                                </div>
                            {/if}
                            {#if notif}
                                {#key tries}
                                    <div in:fade class="boxGlowOrange mt-[1.1em] uppercase py-[0.25em] px-[1em] border border-[#FF8000] w-fit text-[#FF8000]" >
                                        {@html notif}
                                    </div>
                                {/key}
                            {/if}
                            {#if correctNotif}
                                {#key tries}
                                    <div in:fade class="boxGlowGreen mt-[1.1em] uppercase py-[0.25em] px-[1em] border border-[#40ff00] w-fit text-[#40ff00]" >
                                        {@html correctNotif}
                                    </div>
                                {/key}
                            {/if}
                            <div class="font-secondary text-[0.7em] absolute bottom-[1.2em] right-[1.3em]">
                                {indices[questions.current] ? ` ${indices[questions.current][0]}/${indices[questions.current][1]}` : ""}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>




        </div>

    </div>

</div>


<style>

    .slider {
        --thumb-bg: transparent;
		--progress-bg: transparent;
		--track-bg: transparent;
	}
</style>