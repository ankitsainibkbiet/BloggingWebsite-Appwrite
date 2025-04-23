import React from "react";
import logoImg from './logoImg.png'

function Logo({className = 'w-[4.5rem] '}) {
    return (
        <div>
            <img src={logoImg} alt="Logo"
            className={`${className}`} 
            />
        </div>
    )
}

export default Logo