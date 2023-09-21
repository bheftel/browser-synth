export interface Key {
    note: string;
    color: string;
    freq: number;
    oscillator: OscillatorNode;
    gainNode: GainNode;
    isStopping?: boolean;
}
