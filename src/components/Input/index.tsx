/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styles from './styles.module.scss'

type InputProps = {
    placeholder: string;
    type: string;
    value: string;
    onchange: any;
    textarea?: boolean;
    required?: boolean;
}

export function Input({placeholder, type, value, onchange, textarea = false, required = false}: InputProps){
    const [error, setError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus(){
        setError(false);
        setIsFocused(true);
    }

    function handleBlur(){
        if(value !== "")
            return;

        if(required)
            setError(true);

        setIsFocused(false);
    }

    function changeInputValue(text: string){
        handleFocus();
        onchange(text);
    }

    return(
        <div className={`${styles.container} ${error ? styles.error : undefined}`}>
                <p>{placeholder}</p>
                {
                    textarea ?
                        <textarea
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(text) => changeInputValue(text.target.value)}
                            value={value}
                        ></textarea>
                        :
                        <input
                            type={type}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={value}
                            onChange={(text) => changeInputValue(text.target.value)}
                        />
                }
        </div>
    )
}
