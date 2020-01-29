// Select Elements

const voicesList = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const startButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');

let voices=[];
const message = new SpeechSynthesisUtterance();
message.text = document.querySelector('[name="text"]').value ;
message.lang = navigator.language ;

// Functions

function otherVoices(){
    voices = this.getVoices();
    const popularVoices = voices.filter(voice => voice.lang.includes('fr') || voice.lang.includes('en'))
    .map(voice => 
        `
        <option value="${voice.name}">${voice.name} - (${voice.lang})</option>
        `)
        .join('');

        voicesList.innerHTML = popularVoices ;
}

function setVoice(){
    message.voice = voices.find(voice => voice.name === this.value);
    toggleLang();
}

function toggleLang(on = true){
    speechSynthesis.cancel();
    if(on){
        speechSynthesis.speak(message);
    }
}

function setOptions(){
    console.log(this.name , this.value);
    message[this.name] = this.value ;
    toggleLang();
}

// AddEventListeners

speechSynthesis.addEventListener('voiceschanged', otherVoices);
voicesList.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOptions));
startButton.addEventListener('click', toggleLang);
stopButton.addEventListener('click', function(){
    toggleLang(on = false);
});
