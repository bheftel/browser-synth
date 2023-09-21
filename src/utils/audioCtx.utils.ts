import { Key } from "./keyboard.types";

export const baseOctaveKeys = [
    { note: "A", color: "white", freq: 440 },
    { note: "A#", color: "black", freq: 466.16 },
    { note: "B", color: "white", freq: 493.88 },
    { note: "C", color: "white", freq: 523.25 },
    { note: "C#", color: "black", freq: 554.37 },
    { note: "D", color: "white", freq: 587.33 },
    { note: "D#", color: "black", freq: 622.25 },
    { note: "E", color: "white", freq: 659.25 },
    { note: "F", color: "white", freq: 698.46 },
    { note: "F#", color: "black", freq: 739.99 },
    { note: "G", color: "white", freq: 783.99 },
    { note: "G#", color: "black", freq: 830.61 },
    // { note: "A", color: "white", freq: 880 },
];


export const createAudioContext = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const allKeys: Key[] = [];
    // 2 octaves
    for (let i = 1; i < 3; i++) {
        baseOctaveKeys.forEach(k => {
            const oscillator = audioCtx.createOscillator();
            oscillator.frequency.setValueAtTime(k.freq * i, audioCtx.currentTime)
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            oscillator.start();

            allKeys.push({
                ...k,
                freq: k.freq * i,
                oscillator,
                gainNode
            })
        })
    }

    const analyzer = audioCtx.createAnalyser();

    return {
        audioCtx, allKeys, analyzer
    }
}