import React, { useState} from 'react';
import logo from './logo.svg';
import './App.css';




const Input = (props) => {
    const [text, setText ] = useState()
    const { title } = props

    return (
        <>
            <span>{title}: {text}</span>
            <br></br>
            <input onChange={e => setText(e.target.value)}>
            </input>
        </>
    )
}

export default Input
