import { useMemo, useRef } from "react";

import { createAudioContext } from "../utils/audioCtx.utils";
import type { Key } from "../utils/keyboard.types";

import * as Styled from "./Synth.styles";

export interface Props {
    attack?: number;
    release?: number;
}
export const Synth = (props: Props) => {
    const isMouseDown = useRef<boolean>(false);

    const { allKeys, audioCtx } = useMemo(() => {
        return createAudioContext();
    }, []);

    const startNote = (key: Key) => {
        if (audioCtx.state !== "running") {
            audioCtx.resume();
        }

        key.gainNode.connect(audioCtx.destination)
        key.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        key.gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + (props.attack ?? .5));
    }
    const stopNote = (key: Key) => {
        if (!key.isStopping) {
            key.isStopping = true;
            key.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + (props.release ?? 2));
            setTimeout(() => {
                key.gainNode.disconnect();
                key.isStopping = false;
            }, (props.release ?? 2) * 1000)
        }
    }

    // keep track of how many white keys there are 
    // for black key positioning - there is definitely a cleaner way to do this,
    // but it works for now
    let whiteKeyIndex = 0;

    const mouseEventProps = (k: Key) => ({
        onMouseEnter: () => {
            if (isMouseDown.current) {
                startNote(k);
            }
        },
        onMouseDown: () => startNote(k),
        onMouseLeave: () => stopNote(k),
        onMouseUp: () => stopNote(k)
    })

    return <Styled.Container>
        {/* todo - analyzer visualization */}
        <Styled.Keyboard
            onMouseDown={() => isMouseDown.current = true}
            onMouseUp={() => isMouseDown.current = false}
        >
            {
                allKeys.map((k) => {
                    if (k.color === "white") {
                        whiteKeyIndex++;
                        return <Styled.WhiteKey
                            key={`key_${k.note}_${k.freq}`}
                            {...mouseEventProps(k)}
                        />
                    }
                    return <Styled.BlackKey
                        key={`key_${k.note}_${k.freq}`}
                        left={whiteKeyIndex}
                        {...mouseEventProps(k)}
                    />
                })
            }
        </Styled.Keyboard>
    </Styled.Container>
}