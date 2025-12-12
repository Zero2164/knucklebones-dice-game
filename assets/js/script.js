const boardEls = [
    document.getElementById("board1"),
    document.getElementById("board2")
];
const heroEls = [
    document.getElementById("hero1"),
    document.getElementById("hero2")
];
const overlay = document.getElementById("overlay");
const dieEl = document.getElementById("die");
const turnInfo = document.getElementById("turnInfo");
const rollPrompt = document.getElementById("rollPrompt");
const turnIndicator = document.querySelectorAll(".turn-indicator");
const turnPlayer = document.querySelectorAll(".turn-player");
const currentDie = document.querySelectorAll(".die-face");
const afterText = document.querySelectorAll(".after-text");
const endTurnBtn = document.getElementById("endTurnBtn");
const startScreen = document.getElementById("startScreen");
const startbtn = document.getElementById("startGame");
const startGameTxt = document.getElementById("startGameTxt");
const rulesBtn = document.getElementById("rulesBtn");
const rulesOverlay = document.getElementById("rulesOverlay");

const backgroundAudio = new Audio("assets/audio/background.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = 0.02;
const placeSound = new Audio("assets/audio/click.mp3");
const rollSound = new Audio("assets/audio/dice.mp3");
const knockoutSound = new Audio("assets/audio/knockout.mp3");


const diceFaces = [
    // 1 dot
    `<svg fill="#ccb87cf4" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 25 25" xml:space="preserve"><path d="M20.98 5.823a1.86 1.86 0 0 0-1.803-1.816v-.003H5.823v.002a1.86 1.86 0 0 0-1.817 1.817h-.002v13.354h.002a1.86 1.86 0 0 0 1.817 1.817v.002h13.354v-.002a1.86 1.86 0 0 0 1.817-1.817h.002V5.823zm-8.48 8.582a1.905 1.905 0 1 1 0-3.81 1.905 1.905 0 0 1 0 3.81"/></svg>`,
    // 2 dot
    `<svg fill="#ccb87cf4" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 25 25" xml:space="preserve"><path d="M20.98 5.823a1.86 1.86 0 0 0-1.803-1.816v-.003H5.823v.002a1.86 1.86 0 0 0-1.817 1.817h-.002v13.354h.002a1.86 1.86 0 0 0 1.817 1.817v.002h13.354v-.002a1.86 1.86 0 0 0 1.817-1.817h.002V5.823zM8.248 10.018a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m8.505 8.477a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758"/></svg>`,
    // 3 dot 
    `<svg fill="#ccb87cf4" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 25 25" xml:space="preserve"><path d="M20.98 5.823a1.86 1.86 0 0 0-1.803-1.816v-.003H5.823v.002a1.86 1.86 0 0 0-1.817 1.817h-.002v13.354h.002a1.86 1.86 0 0 0 1.817 1.817v.002h13.354v-.002a1.86 1.86 0 0 0 1.817-1.817h.002V5.823zM8.248 10.018a1.759 1.759 0 1 1 .001-3.517 1.759 1.759 0 0 1-.001 3.517m4.252 4.241a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758m4.253 4.236a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758"/></svg>`,
    // 4 dot
    `<svg fill="#ccb87cf4" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 25 25" xml:space="preserve"><path d="M20.98 5.823a1.86 1.86 0 0 0-1.803-1.816v-.003H5.823v.002a1.86 1.86 0 0 0-1.817 1.817h-.002v13.354h.002a1.86 1.86 0 0 0 1.817 1.817v.002h13.354v-.002a1.86 1.86 0 0 0 1.817-1.817h.002V5.823zM8.248 18.419a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m0-8.402a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m8.505 8.477a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758m0-8.477a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758"/></svg>`,
    // 5 dot
    `<svg fill="#ccb87cf4" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 25 25" xml:space="preserve"><path d="M20.98 5.823a1.86 1.86 0 0 0-1.803-1.816v-.003H5.823v.002a1.86 1.86 0 0 0-1.817 1.817h-.002v13.354h.002a1.86 1.86 0 0 0 1.817 1.817v.002h13.354v-.002a1.86 1.86 0 0 0 1.817-1.817h.002V5.823zM8.248 18.419a1.759 1.759 0 1 1 .001-3.517 1.759 1.759 0 0 1-.001 3.517m0-8.402A1.759 1.759 0 1 1 8.249 6.5a1.759 1.759 0 0 1-.001 3.517m4.252 4.242a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m4.252 4.236a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758m0-8.477a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758"/></svg>`,
    // 6 dot
    `<svg fill="#ccb87cf4" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 25 25" xml:space="preserve"><path d="M20.98 5.823a1.86 1.86 0 0 0-1.803-1.816v-.003H5.823v.002a1.86 1.86 0 0 0-1.817 1.817h-.002v13.354h.002a1.86 1.86 0 0 0 1.817 1.817v.002h13.354v-.002a1.86 1.86 0 0 0 1.817-1.817h.002V5.823zM8.248 18.419a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m0-4.16a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m0-4.241a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m8.505 8.477a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758m0-4.236a1.759 1.759 0 1 1 0-3.517 1.759 1.759 0 0 1 0 3.517m0-4.241a1.76 1.76 0 0 1-1.758-1.758 1.758 1.758 0 1 1 3.517 0 1.76 1.76 0 0 1-1.759 1.758"/></svg>`
];

const rolledFaces = [
    // 1 dot
    `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m.926 82.855a31.953 18.96 0 0 1 22.127 32.362 31.953 18.96 0 1 1-45.188-26.812 31.953 18.96 0 0 1 23.06-5.55zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zM89.297 195.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m221.52 64.664A18.008 31.236 31.906 0 1 322 275.637a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zM145.296 289.1a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 0 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m277.523 29.38A18.008 31.236 31.906 0 1 434 333.684a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.184zm-221.52 64.663a31.236 18.008 58.094 0 1 33.817 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203z"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`,
    // 2 dots
    `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.75 44.813c-6.187 0-12.75 1.563-17.125 4.093L85.875 137.28c-4.375 2.532-7.094 6.33-7.094 9.907 0 3.58 2.69 7.376 7.064 9.907l152.78 88.375c4.376 2.53 10.94 4.093 17.126 4.093s12.782-1.564 17.156-4.094l152.75-88.376c4.375-2.53 7.094-6.328 7.094-9.906 0-3.58-2.75-7.376-7.125-9.907l-152.75-88.374c-4.375-2.53-10.938-4.094-17.125-4.093zm0 12.343a31.953 18.96 0 0 1 23.063 5.563 31.953 18.96 0 0 1-45.188 26.81 31.953 18.96 0 0 1 20.813-32.343 31.953 18.96 0 0 1 1.312-.03M75.07 173.95c-1.497.048-2.873.402-4.033 1.07-3.094 1.787-5.033 6.043-5.033 11.095v157.688c0 5.052 1.94 11.547 5.033 16.906s7.723 10.27 12.098 12.796l146.945 84.857c4.375 2.527 9.03 2.974 12.123 1.188 3.094-1.785 5.008-6.056 5.008-11.11V290.755c0-5.052-1.913-11.532-5.007-16.89-3.094-5.36-7.748-10.255-12.123-12.782L83.135 176.225c-2.735-1.58-5.57-2.352-8.065-2.274zm361.97.017c-2.504-.083-5.348.684-8.083 2.263L282.04 261.07c-4.376 2.527-9.03 7.456-12.124 12.815l-.082.14c-3.047 5.332-4.926 11.71-4.926 16.72v157.718c0 5.052 1.914 9.323 5.008 11.11 3.094 1.785 7.748 1.305 12.123-1.22l146.917-84.84c4.375-2.528 9.03-7.423 12.125-12.783 3.094-5.36 5.033-11.853 5.033-16.906v-157.72c0-5.05-1.94-9.275-5.033-11.06-1.16-.67-2.54-1.028-4.043-1.077zm-14.222 21.803A18.008 31.236 31.906 0 1 434 210.973a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183m-167.068 2.292a31.953 18.96 0 0 1 23.063 5.563 31.953 18.96 0 0 1-45.188 26.813 31.953 18.96 0 0 1 20.813-32.344 31.953 18.96 0 0 1 1.312-.03zM145.295 289.1a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 0 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m221.525 0a18.008 31.236 31.906 0 1 .002 0 18.008 31.236 31.906 0 1 11.18 15.203 18.008 31.236 31.906 0 1-45 25.98A18.008 31.236 31.906 0 1 366.82 289.1m-56.002 94.043A18.008 31.236 31.906 0 1 322 398.346a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`,
    // 3 dots
    `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m-117.313 82.61a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.536 31.953 18.96 0 0 1-45.19 26.813 31.953 18.96 0 0 1 23.992-32.348zm118.24.245a31.953 18.96 0 0 1 22.125 32.362 31.953 18.96 0 1 1-45.187-26.812 31.953 18.96 0 0 1 23.06-5.55zm119.663.015a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.812 31.953 18.96 0 0 1 23.993-32.347M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zm-235.146 86.592a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203M366.82 289.1a18.008 31.236 31.906 0 1 .002 0 18.008 31.236 31.906 0 1 11.18 15.203 18.008 31.236 31.906 0 1-45 25.98A18.008 31.236 31.906 0 1 366.82 289.1M89.297 318.48a31.236 18.008 58.094 0 1 33.818 41.184 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.204"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`,
    // 4 dots
    `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m1.86 12.423a31.953 18.96 0 0 1 21.194 5.536 31.953 18.96 0 0 1-45.187 26.812 31.953 18.96 0 0 1 23.992-32.347zm-119.173 70.188a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.813 31.953 18.96 0 0 1 23.992-32.348zm237.903.26a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.812 31.953 18.96 0 0 1 23.993-32.347M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zM89.297 195.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m333.52 0A18.008 31.236 31.906 0 1 434 210.973a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zm-165.198 2.314a31.953 18.96 0 0 1 21.194 5.535 31.953 18.96 0 0 1-45.187 26.812 31.953 18.96 0 0 1 23.992-32.348zM89.296 256.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.202zm112 3.664a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m109.52 0A18.008 31.236 31.906 0 1 322 275.637a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zM366.82 289.1a18.008 31.236 31.906 0 1 .002 0 18.008 31.236 31.906 0 1 11.18 15.203 18.008 31.236 31.906 0 1-45 25.98A18.008 31.236 31.906 0 1 366.82 289.1M89.297 318.48a31.236 18.008 58.094 0 1 33.818 41.184 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.204m333.52 0A18.008 31.236 31.906 0 1 434 333.684a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.184zm-221.52 2.954a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m0 61.71a31.236 18.008 58.094 0 1 33.818 41.182 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm109.52 0A18.008 31.236 31.906 0 1 322 398.345a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183z"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`,
    // 5 dots
    `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m1.86 12.423a31.953 18.96 0 0 1 21.194 5.536 31.953 18.96 0 0 1-45.187 26.812 31.953 18.96 0 0 1 23.992-32.347zm-119.173 70.188a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.813 31.953 18.96 0 0 1 23.992-32.348zm118.24.244a31.953 18.96 0 0 1 22.125 32.362 31.953 18.96 0 1 1-45.187-26.812 31.953 18.96 0 0 1 23.06-5.55zm119.663.015a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.812 31.953 18.96 0 0 1 23.993-32.347M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zM89.297 195.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m333.52 0A18.008 31.236 31.906 0 1 434 210.973a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zm-165.198 2.314a31.953 18.96 0 0 1 21.194 5.535 31.953 18.96 0 0 1-45.187 26.812 31.953 18.96 0 0 1 23.992-32.348zm109.198 30.018A18.008 31.236 31.906 0 1 378 243.305a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zm-165.52 32.332a31.236 18.008 58.094 0 1 33.817 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm109.52 0A18.008 31.236 31.906 0 1 322 275.637a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zM89.298 318.48a31.236 18.008 58.094 0 1 33.817 41.184 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.204zm333.52 0A18.008 31.236 31.906 0 1 434 333.684a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.184m-56 32.332A18.008 31.236 31.906 0 1 378 366.017a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zm-165.52 32.33a31.236 18.008 58.094 0 1 33.817 41.184 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm109.52 0A18.008 31.236 31.906 0 1 322 398.347a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183z"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`,
    // 6 dots
    `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m1.86 12.423a31.953 18.96 0 0 1 21.194 5.536 31.953 18.96 0 0 1-45.187 26.812 31.953 18.96 0 0 1 23.992-32.347zm58.43 35.208a31.953 18.96 0 0 1 22.13 32.363 31.953 18.96 0 0 1-45.19-26.813 31.953 18.96 0 0 1 23.06-5.55m-177.603 34.98a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.813 31.953 18.96 0 0 1 23.992-32.348zm237.903.26a31.953 18.96 0 0 1 .002 0 31.953 18.96 0 0 1 21.195 5.535 31.953 18.96 0 0 1-45.19 26.812 31.953 18.96 0 0 1 23.993-32.347m-179.03 35.21a31.953 18.96 0 0 1 22.127 32.362 31.953 18.96 0 1 1-45.187-26.812 31.953 18.96 0 0 1 23.06-5.55M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zM89.297 195.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m333.52 0A18.008 31.236 31.906 0 1 434 210.973a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zm-165.198 2.314a31.953 18.96 0 0 1 21.194 5.535 31.953 18.96 0 0 1-45.187 26.812 31.953 18.96 0 0 1 23.992-32.348zm-56.323 62.35a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m109.52 0A18.008 31.236 31.906 0 1 322 275.637a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zM145.296 289.1a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 0 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m-55.998 29.38a31.236 18.008 58.094 0 1 33.818 41.184 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.204m333.52 0A18.008 31.236 31.906 0 1 434 333.684a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.184m-221.52 64.663a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203m109.52 0A18.008 31.236 31.906 0 1 322 398.346a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`
];

let boards = [[], []];
let currentPlayer = 0;
let rolledValue = 0;
let scores = [0, 0];
let hasPlaced = false;
let playerNames = ["Player 1", "Player 2"];
let isRolling = false;  // Add near your globals



function playAudio(vol, audio) {
    const sound = audio.cloneNode();
    sound.volume = vol || 0.03;
    sound.play();
}

function fadeOutAndStop(audio, duration = 1000) {
    const steps = 25;
    const stepTime = duration / steps;
    const volumeStep = audio.volume / steps;

    const fade = setInterval(() => {
        if (audio.volume - volumeStep > 0) {
            audio.volume -= volumeStep;
        } else {
            audio.volume = 0;
            audio.pause();
            audio.currentTime = 0;
            clearInterval(fade);
        }
    }, stepTime);
}

function startGame() {
    const p1 = document.getElementById("p1Name").value.trim();
    const p2 = document.getElementById("p2Name").value.trim();
    const nameRegex = /^[\w\s\-\.\'\!\?]+$/; // letters, numbers, spaces, -, ., ', !, ?

    if (!p1 || !p2) {
        alert("Both players must enter a name.");
        return;
    }
    if (p1 === p2) {
        alert("Players must have different names.");
        return;
    }
    if (!nameRegex.test(p1) || !nameRegex.test(p2)) {
        alert("Names contain invalid characters. Allowed: letters, numbers, spaces, and - . ' ! ?");
        return;
    }

    playerNames[0] = p1;
    playerNames[1] = p2;
    startScreen.classList.add("hidden");
    document.getElementById("boards").style.display = "flex";
    // fadeOutAndStop(backgroundAudio, 1500);
    updateHeroes();
    startTurn();
}

function startTurn() {
    clearHighlights();
    rolledValue = 0;
    currentPlayer = 1 - currentPlayer;
    endTurnBtn.style.display = "none";
    hasPlaced = false;
    overlay.style.display = "flex";
    overlay.classList.remove("hidden");
    dieEl.style.animation = "none";
    dieEl.innerHTML = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m-.824 53.11q13.52.146 24.31 6.192 7.38 4.136 9.666 9.438 2.21 5.261.26 13.865l-1.6 5.706q-1.59 6.125-.66 8.81.854 2.645 4.242 4.544l3.39 1.898-33.235 18.62-3.693-2.067q-6.176-3.459-7.883-7.82-1.782-4.402.594-14.005l1.524-5.748q1.33-5.135.26-8.418-.98-3.336-4.444-5.277-5.273-2.954-12.63-2.123-7.433.79-15.35 5.225-7.457 4.178-13.55 10.46-6.167 6.243-10.587 14.288L171.9 138.21q7.977-8.01 15.676-14.013 7.7-6 16.262-10.8 22.464-12.586 41.78-14.967a69 69 0 0 1 9.32-.557zm51.757 56.7 26.815 15.024-33.235 18.62-26.816-15.023 33.236-18.62zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zm-321.545 63.752q9.83 2.05 17.954 5.013a99.6 99.6 0 0 1 15.68 7.325q19.82 11.445 30.218 26.082 10.398 14.55 10.398 31.04 0 8.46-3.168 13.364-3.169 4.818-10.804 8.094l-5.2 1.92q-5.524 2.163-7.23 4.46-1.705 2.207-1.705 6.092v3.885l-29.325-16.933v-4.23q-.001-7.08 2.68-10.97 2.681-3.977 11.292-7.467l5.2-2.006q4.63-1.815 6.742-4.567 2.191-2.704 2.192-6.676 0-6.041-3.9-11.66-3.899-5.705-10.885-9.74-6.58-3.798-14.217-5.272-7.636-1.56-15.922-.645v-27.11zm269.54 8.607q2.282 0 4.232.493 10.398 2.543 10.398 19.034 0 8.46-3.168 17.023-3.168 8.476-10.804 20.568l-5.2 7.924q-5.524 8.542-7.23 12.807-1.705 4.178-1.705 8.063v3.885l-29.325 16.932v-4.23q0-7.08 2.68-14.067 2.683-7.073 11.292-20.504l5.2-8.01q4.63-7.164 6.742-12.354 2.191-5.238 2.192-9.21 0-6.042-3.898-7.158-3.9-1.201-10.887 2.83-6.58 3.801-14.215 11.145-7.635 7.259-15.922 17.74v-27.11q9.83-9.3 17.95-15.718 8.126-6.417 15.68-10.777 16.106-9.3 25.99-9.307zm-252.723 94.515 29.326 16.93v30.736l-29.325-16.93v-30.735zm239.246 8.06v30.735l-29.325 16.93v-30.733l29.326-16.932z"/><path fill-opacity=".1" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387z"/><path fill-opacity=".25" d="M75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278z"/></svg>`;
    turnInfo.textContent = `${playerNames[currentPlayer]}'s Turn`;
    rollPrompt.style.display = "block";
    dieEl.style.display = "block";
    turnIndicator[0].style.display = "none";
    turnIndicator[1].style.display = "none";
    rulesBtn.style.display = "none";
    addColumnHoverEffects();
}

// handle hovering over cell columns
function clearHighlights() {
    boardEls.forEach(board => {
        board.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('highlight');
        });
    });
}

// Function to add hover effects to columns
function addColumnHoverEffects() {
    boardEls.forEach((board, boardIndex) => {

        board.querySelectorAll('.cell').forEach((cell, cellIndex) => {
            cell.addEventListener('mouseenter', () => {
                if (boardIndex !== currentPlayer || rolledValue === 0) return;
                clearHighlights();
                const column = cellIndex % 3;
                for (let row = 0; row < 3; row++) {
                    let idx = row * 3 + column;
                    const targetCell = board.children[idx];
                    if (boards[boardIndex][idx] === null || idx === hasPlaced) {
                        targetCell.classList.add('highlight');
                    }
                }
            });
            cell.addEventListener('mouseleave', () => {
                clearHighlights();
            });
            // add hover for mobile touch
            cell.addEventListener('touchstart', () => {
                if (boardIndex !== currentPlayer || rolledValue === 0) return;
                clearHighlights();
                const column = cellIndex % 3;
                for (let row = 0; row < 3; row++) {
                    let idx = row * 3 + column;
                    const targetCell = board.children[idx];
                    if (boards[boardIndex][idx] === null || idx === hasPlaced) {
                        targetCell.classList.add('highlight');
                    }
                }
            });
            cell.addEventListener('touchend', () => {
                clearHighlights();
            });
        });
    });
}

function showTurnIndicator() {
    rulesBtn.style.display = "flex";
    turnIndicator[currentPlayer].style.display = "flex";
    turnPlayer[currentPlayer].textContent = `${playerNames[currentPlayer]} place your `;
    currentDie[currentPlayer].innerHTML = diceFaces[rolledValue - 1];
    afterText[currentPlayer].textContent = currentPlayer === 0 ? " above" : "below";
    for (let i = 0; i < 2; i++) {
        boardEls[i].classList.remove('active', 'dimmed');
        heroEls[i].classList.remove('active', 'dimmed');
        if (i === currentPlayer) {
            boardEls[i].classList.add('active');
            heroEls[i].classList.add('active');
        }
        else {
            boardEls[i].classList.add('dimmed');
            boardEls[i].style.pointerEvents = "not-allowed";
            heroEls[i].classList.add('dimmed');
        }
    }
}

function handleCellClick(boardIndex, cellIndex) {
    if (boardIndex !== currentPlayer || rolledValue === 0) return;

    const column = cellIndex % 3;
    for (let row = 2; row >= 0; row--) {
        let idx = row * 3 + column;
        if (boards[boardIndex][idx] === null || idx === hasPlaced) {
            if (hasPlaced !== false) {
                boards[boardIndex][hasPlaced] = null;
                const oldCell = boardEls[boardIndex].children[hasPlaced];
                oldCell.innerHTML = "";
                oldCell.classList.remove("occupied");
            }
            boards[boardIndex][idx] = rolledValue;
            const cell = boardEls[boardIndex].children[idx];
            cell.innerHTML = diceFaces[rolledValue - 1];
            endTurnBtn.style.display = "none";
            cell.classList.add("occupied");
            cell.classList.add("drop");
            setTimeout(() => {
                playAudio(0.07, placeSound);
                cell.classList.remove("drop")
                endTurnBtn.style.display = "block";
            }, 600);

            hasPlaced = idx;
            return;
        }
    }
    // alert("Column full or locked, choose another!");
}

// add knockout text animation
function showKnockoutText(boardIndex, cellIndex) {
    const column = cellIndex % 3;
    const opp = 1 - boardIndex;
    const oppBoard = boards[opp];

    let indices = [column, column + 3, column + 6];
    let removed = indices.filter(idx => oppBoard[idx] === rolledValue);

    if (removed.length > 0) {
        const textEl = document.createElement('div');
        textEl.textContent = 'KNOCKOUT!';
        textEl.classList.add('knockout-text');
        // Position the text over the center of the column
        const cell = boardEls[opp].children[removed[0]];
        const cellRect = cell.getBoundingClientRect();
        const boardRect = boardEls[opp].getBoundingClientRect();

        textEl.style.left = `${cellRect.left + cellRect.width / 2 - boardRect.left}px`;
        textEl.style.top = `${cellRect.top + cellRect.height / 2 - boardRect.top}px`;

        boardEls[opp].appendChild(textEl);

        setTimeout(() => {
            textEl.classList.add('fade-out');
            setTimeout(() => {
                boardEls[opp].removeChild(textEl);
            }, 600);
        }, 600);
    }
}

function applyKnockout() {
    const opp = 1 - currentPlayer;
    const oppBoard = boards[opp];

    // Find the column where the current die was placed:
    const placedCol = hasPlaced % 3;

    // Only check that column on the opponent's board
    let indices = [placedCol, placedCol + 3, placedCol + 6];
    let removed = indices.filter(idx => oppBoard[idx] === rolledValue);
    if (removed.length > 0) {
        removed.forEach((rIdx, idx) => {
            // add knockout text animation
            if (idx === 0) {
                showKnockoutText(currentPlayer, hasPlaced);
            }
            const cell = boardEls[opp].children[rIdx];
            boardEls[opp].classList.remove('active', 'dimmed');
            cell.classList.add('pop');
            setTimeout(() => {
                oppBoard[rIdx] = null;
                cell.innerHTML = "";
                cell.classList.remove('occupied', 'pop');
                playAudio(0.05, knockoutSound);
                // Apply gravity: fall dice above into empty space
                for (let r = rIdx - 3; r >= 0; r -= 3) {
                    if (oppBoard[r] !== null) {
                        oppBoard[rIdx] = oppBoard[r];
                        oppBoard[r] = null;
                        const moving = boardEls[opp].children[r];
                        const target = boardEls[opp].children[rIdx];
                        target.innerHTML = moving.innerHTML;
                        moving.innerHTML = "";
                        target.classList.add('fall');
                        moving.classList.remove('occupied');
                        setTimeout(() => {
                            target.classList.remove('fall');
                            moving.classList.remove('occupied');
                            target.classList.add('occupied');
                        }, 500);
                        rIdx = r; // update index for next drop in same column
                        target.classList.add('occupied');
                    }
                }

                boardEls[opp].classList.add('dimmed', 'active');
                if (idx === removed.length - 1) {
                    updateScores();
                }

            }, 500);
        });
    };

}

function updateScores() {
    // Clear any old glow classes
    document.querySelectorAll(".glow").forEach(c => c.classList.remove("glow"));

    for (let p = 0; p < 2; p++) {
        let total = 0;

        for (let col = 0; col < 3; col++) {
            let counts = {};
            let positions = {};

            // Collect values in the current column
            for (let row = 0; row < 3; row++) {
                let idx = row * 3 + col;
                let val = boards[p][idx];
                if (val !== null) {
                    counts[val] = (counts[val] || 0) + 1;
                    if (!positions[val]) positions[val] = [];
                    positions[val].push(idx);
                }
            }

            for (let v in counts) {
                let count = counts[v];
                let numV = parseInt(v);

                if (count === 1) {
                    // Single die: just add the value
                    total += numV;
                } else {
                    // Sum all dice of the same value, then multiply by count
                    let sum = numV * count;
                    total += sum * count;

                    // Add glow for matching dice
                    positions[v].forEach(idx => {
                        const cell = boardEls[p].children[idx];
                        cell.classList.add("glow");
                    });
                }
            }
        }

        scores[p] = total;
    }

    updateHeroes();
}

function updateHeroes() {
    heroEls[0].textContent = `${playerNames[0]}: ${scores[0]}`;
    heroEls[1].textContent = `${playerNames[1]}: ${scores[1]}`;
}

function isBoardFull(b) {
    return b.every(c => c !== null);
}

function setDancingText(containerId, text) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // clear existing
    [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(span);
    });
}

function getWinner() {
    return scores[0] > scores[1]
        ? playerNames[0]
        : scores[1] > scores[0]
            ? playerNames[1]
            : "";
}

function showEndScreen() {
    overlay.innerHTML = `
    <div class="overlay-content">
        <h1>Game Over!</h1>
        <p>
            ${playerNames[0]}: ${scores[0]}
            <br>
            ${playerNames[1]}: ${scores[1]}
        </p>
        <div id="winnerName"></div>
        <div id="winnerWord"></div>
        <button class="btn" onclick="window.location.reload()">
            Play Again
            <svg class="svg-replay" width="20" height="20" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M.125.325A.175.175 0 1 0 .3.15H.175m0 0L.25.075M.175.15.25.225" stroke="currentColor" stroke-width=".05" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>`;

    overlay.style.display = "flex";

    const winner = getWinner();
    setDancingText("winnerName", winner);
    setDancingText("winnerWord", winner ? "Wins!" : "It's a tie!");
}


// Initialise boards
for (let p = 0; p < 2; p++) {
    for (let i = 0; i < 9; i++) {
        boards[p][i] = null;
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(p, i));
        boardEls[p].appendChild(cell);
    }
}

// generate random start button text
const startBtnTexts = [
    "Battle",
    "Ready Up",
    "Launch",
    "Begin",
    "Rollout",
    "Start",
    "Let's Go",
    "Kick Off",
    "Fight!"
];
startGameTxt.textContent = startBtnTexts[Math.floor(Math.random() * startBtnTexts.length)];


// function to ensure that upon page reload, the current game state isn't lost
window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = '';
});



endTurnBtn.addEventListener("click", () => {
    // ensure only one click is registered
    endTurnBtn.style.display = "none";

    applyKnockout();
    updateScores();
    if (isBoardFull(boards[currentPlayer])) {
        turnPlayer[currentPlayer].textContent = "";
        currentDie[currentPlayer].innerHTML = "";
        afterText[currentPlayer].textContent = "";
        endTurnBtn.style.display = "flex";
        endTurnBtn.classList.add("finishGameBtn");
        endTurnBtn.textContent = "Finish Game";
        endTurnBtn.onclick = showEndScreen;
    } else {
        // wait for knockout animations to finish
        setTimeout(() => {
            startTurn();
        }, 1000);
    }
});

overlay.addEventListener("click", () => {
    if (rolledValue === 0 && !isRolling) {
        isRolling = true; // Block further clicks until next overlay
        dieEl.innerHTML = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#ccb87cf4" d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153m-.824 53.11q13.52.146 24.31 6.192 7.38 4.136 9.666 9.438 2.21 5.261.26 13.865l-1.6 5.706q-1.59 6.125-.66 8.81.854 2.645 4.242 4.544l3.39 1.898-33.235 18.62-3.693-2.067q-6.176-3.459-7.883-7.82-1.782-4.402.594-14.005l1.524-5.748q1.33-5.135.26-8.418-.98-3.336-4.444-5.277-5.273-2.954-12.63-2.123-7.433.79-15.35 5.225-7.457 4.178-13.55 10.46-6.167 6.243-10.587 14.288L171.9 138.21q7.977-8.01 15.676-14.013 7.7-6 16.262-10.8 22.464-12.586 41.78-14.967a69 69 0 0 1 9.32-.557zm50.757 56.7 26.815 15.024-33.235 18.62-26.816-15.023 33.236-18.62zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zm-321.545 63.752q9.83 2.05 17.954 5.013a99.6 99.6 0 0 1 15.68 7.325q19.82 11.445 30.218 26.082 10.398 14.55 10.398 31.04 0 8.46-3.168 13.364-3.169 4.818-10.804 8.094l-5.2 1.92q-5.524 2.163-7.23 4.46-1.705 2.207-1.705 6.092v3.885l-29.325-16.933v-4.23q-.001-7.08 2.68-10.97 2.681-3.977 11.292-7.467l5.2-2.006q4.63-1.815 6.742-4.567 2.191-2.704 2.192-6.676 0-6.041-3.9-11.66-3.899-5.705-10.885-9.74-6.58-3.798-14.217-5.272-7.636-1.56-15.922-.645v-27.11zm269.54 8.607q2.282 0 4.232.493 10.398 2.543 10.398 19.034 0 8.46-3.168 17.023-3.168 8.476-10.804 20.568l-5.2 7.924q-5.524 8.542-7.23 12.807-1.705 4.178-1.705 8.063v3.885l-29.325 16.932v-4.23q0-7.08 2.68-14.067 2.683-7.073 11.292-20.504l5.2-8.01q4.63-7.164 6.742-12.354 2.191-5.238 2.192-9.21 0-6.042-3.898-7.158-3.9-1.201-10.887 2.83-6.58 3.801-14.215 11.145-7.635 7.259-15.922 17.74v-27.11q9.83-9.3 17.95-15.718 8.126-6.417 15.68-10.777 16.106-9.3 25.99-9.307zm-252.723 94.515 29.326 16.93v30.736l-29.325-16.93v-30.735zm239.246 8.06v30.735l-29.325 16.93v-30.733l29.326-16.932z"/></svg>`;
        dieEl.style.animation = "roll 0.3s linear infinite";
        rollPrompt.style.display = "none";
        playAudio(0.5, rollSound);
        setTimeout(() => {
            dieEl.style.animation = "none";
            rolledValue = Math.floor(Math.random() * 6) + 1;
            dieEl.innerHTML = rolledFaces[rolledValue - 1];
            turnInfo.textContent = `${playerNames[currentPlayer]} rolled a ${rolledValue}`;
            setTimeout(() => {
                setTimeout(() => {
                    overlay.classList.add("hidden");
                    overlay.style.display = "none";
                    showTurnIndicator();
                    isRolling = false; // Re-enable clicks for next turn
                }, 500);
            }, 1000);
        }, 1000);
    }
});

// overlay on rules button click to show rules
rulesBtn.addEventListener("click", () => {
    // overlay needs to be under the die click overlay
    document.querySelector('body').style.overflow = "hidden";
    rulesBtn.style.display = "none";
    // add nice modern html template with cards for rules with current color scheme
    rulesOverlay.innerHTML = `

    <div class="rules-content">
        <div class="rule-header-container">
        <h3 class="rule-header">Game Rules</h3>
        <button class="btn" id="closeRulesBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 52 52" xml:space="preserve"><path d="m31 25.4 13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4"/></svg>
        </button>
        </div>

        <div class="rule-card">
            <h3>Objective</h3>
            <p>Outscore your opponent by strategically placing dice on your board while disrupting their board.</p>
        </div>

        <div class="rule-card">
            <h3>Turns</h3>
            <p>Players alternate turns. On your turn, you roll a single six-sided die, then must place it in one of your three columns, then select the 'end turn' button to move to the opponents turn.</p>
        </div>

        <div class="rule-card">
            <h3>Placing Dice</h3>
            <p>You may place a die in any column that still has space. Each column holds up to three dice. Dice cannot be moved after the 'end turn' button is pressed.</p>
        </div>

        <div class="rule-card">
            <h3>Knockouts</h3>
            <p>When you place a die, if your opponent has dice of the same value in the corresponding column, all matching dice in that column are destroyed.</p>
        </div>

        <div class="rule-card">
            <h3>Scoring</h3>
            <p>Each column scores independently. Matching dice in the same column multiply their value: </p>
            <br>
            <ul>
                <li>Single die: face value</li>
                <li>Two matching dice: value x 2</li>
                <li>Three matching dice: value x 3 x bonus multiplier</li>
            </ul>
            <p>Example:<br>Column with 4, 4, 2 scores as:<br>4 + 4 = 16 (two matching fours) + 2 = 2 (single two) = 18 total for that column.<br><br>Summary:<br>Single die: value<br>Two matching dice: value x 2<br>Three matching dice: value x 3 x 2 (bonus multiplier)</p>
        </div>
        <div class="rule-card">
            <h3>Win Condition</h3>
            <p>The game ends when a player fills their board. The player with the highest score wins!</p>
        </div>


    </div>
    `;

    rulesOverlay.style.display = "block";
    rulesOverlay.classList.remove("hidden");

    const closeRulesBtn = document.getElementById("closeRulesBtn");
    closeRulesBtn.addEventListener("click", () => {
        rulesOverlay.classList.add("hidden");
        setTimeout(() => {
            rulesBtn.style.display = "flex";
            document.querySelector('body').style.overflow = "auto";
            rulesOverlay.style.display = "none";
        }, 500);
    });
});

startbtn.addEventListener("click", () => {
    playAudio(0.07, placeSound);
});


window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.transition = "opacity 0.5s ease";
    loadingScreen.style.opacity = 0;

    setTimeout(() => {
        loadingScreen.style.display = "none";

    }, 500); // match the fade duration

    backgroundAudio.play().catch(e => {
        console.log("Audio playback prevented by browser until user interaction:", e);
    });
});

