import React from "react";

import './Btn.css'

interface Props {
    text: string;
}

export const Btn = (props: Props) => {
    return (
        <button>{props.text}</button>
    )
}