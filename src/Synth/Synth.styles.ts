import styled from "@emotion/styled"

export const Container = styled.div`
    padding: 50px 10px 10px 10px;
    background-color: #111111;
`

export const Keyboard = styled.div`
    position: relative;
    height: 200px;
    display: flex;

    gap: 4px;
`

export const WhiteKey = styled.button`
    width: 50px;
    height: 100%;
    background-color: beige;

    &:active:hover {
        background-color: #999999;
    }
`;

export const BlackKey = styled.button<{ left: number }>`
    width: 40px;
    background-color: darkgray;

    position: absolute;
    left: ${p => p.left * 54 - 20}px;

    z-index: 99;
    height: 50%;

    &:active:hover {
        background-color: #333333;
    }
`;