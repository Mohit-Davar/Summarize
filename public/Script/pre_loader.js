const PreLoader = document.getElementById("loader")
const main = document.querySelector(".main")

const languages = [
    "ਸੁਆਗਤ ਹੈ",
    "स्वागत आहे",
    "স্বাগত",
    "સ્વાગત છે",
    "ಸ್ವಾಗತ",
    "स्वागत",
    "സ്വാഗതം",
    "येवकार",
    "خوش آمدید",
    "வரவேற்பு",
    "స్వాగతం",
    "स्वागतम्‌",
]

const DelayTime = 1000
const ChangeTime = 150
const LoaderTime = 2 * DelayTime + ChangeTime * languages.length

setTimeout(() => {
    gsap.to(PreLoader, {
        top: "-100vh",
        duration: 0.2
    });
    PreLoader.innerHTML = "";
    main.style.display = "block";
}, LoaderTime)
function ChangeText(Text) {
    return (
        PreLoader.innerHTML = `<div class="text absolute flex justify-center items-center gap-2 text-white">
            <i class="fa-solid fa-circle"></i>
            <h1 class="text-[clamp(3rem,5vw,100rem)]"> ${Text}</h1>
        </div>`
    )
}
let i = 0;
const PreLoaderInterval = setInterval(() => {
    if (i < languages.length) {
        ChangeText(languages[i])
    }
    else {
        clearInterval(PreLoaderInterval)
    }
    i++
}, ChangeTime)
setTimeout(() => {
    PreLoaderInterval()
}, DelayTime)
