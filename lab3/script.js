const sounds = [
    {
        key: "1",
        name:"boom",
        path: "./sounds/boom.wav"
    },
    {
        key: "2",
        name:"clap",
        path: "./sounds/clap.wav"
    },
    {
        key: "3",
        name:"hihat",
        path: "./sounds/hihat.wav"
    },
    {
        key: "4",
        name:"kick",
        path: "./sounds/kick.wav"
    },
    {
        key: "5",
        name:"openhat",
        path: "./sounds/openhat.wav"
    },
    {
        key: "6",
        name:"ride",
        path: "./sounds/ride.wav"
    },
    {
        key: "7",
        name:"snare",
        path: "./sounds/snare.wav"
    },
    {
        key: "8",
        name:"tink",
        path: "./sounds/tink.wav"
    },
    {
        key: "9",
        name:"tom",
        path: "./sounds/tom.wav"
    }
]

let pathOne = [];
let pathTwo = [];
let pathThree = [];
let pathFour = [];

let recording = false;
let currentPath = "";


const recordingButtons = document.querySelectorAll(".btnRecord");

const startRecord = (event) => {
    if (recording) {
        event.target.style.backgroundColor="";
        recording=false;
        currentPath="";
    } else {
        const path = event.target.getAttribute("data-path");
        currentPath = path;
        recording = true
        event.target.style.backgroundColor="red";
    }
}

recordingButtons.forEach( button => button.addEventListener("click", startRecord));

const playPath = (event) => {
    const path = event.target.getAttribute("data-path");
    switch (path) {
        case "pathOne":
            play(0,pathOne);
            break;
        case "pathTwo":
            play(0,pathTwo);
            break;
        case "pathThree":
            play(0,pathThree);
            break;
        case "pathFour":
            play(0,pathFour);
            break;
    }
}

const playSound= (key) => {
    const sound = sounds.find(sound => sound.key === key);
    const audio = new Audio(sound.path);
    audio.play();
    if(recording){
        switch(currentPath) {
            case "pathOne":
                pathOne.push(sound);
                break;
            case "pathTwo":
                pathTwo.push(sound);
                break;
            case "pathThree":
                pathThree.push(sound);
                break;
            case "pathFour":
                pathFour.push(sound);
                break;
        }
    }
}
document.addEventListener("keydown", (event) => playSound(event.key), false);


const playButtons = document.querySelectorAll(".btnPlay");
playButtons.forEach(button => button.addEventListener("click",playPath))

const play = (index, list) => {
    const audio = new Audio(list[index].path);
    audio.play().then((x) => {
        if (index < list.length - 1) {
            setTimeout(() => play(index + 1, list), 200);
        }
    })
}

const playAll = () => {
    play(0,pathOne);
    play(0,pathTwo);
    play(0,pathThree);
    play(0,pathFour);
}

const playAllButton =document.getElementById("playAll");
playAllButton.addEventListener("click",playAll);