import React from "react";
import { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    placeholder = '',
    ...prop
} , ref ) {
    const id = useId()
    return (
        <div className="flex flex-col w-full">
            {label && <label htmlFor={id} className="text-xl text-start pl-5 mb-1">{label}</label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                autoComplete="off"
                className={`outline-none p-2 m-4 mt-1 text-xl rounded-lg ${className}`}
                {...prop}
                ref={ref} // this is used to send the reference of the state of this input to the parent element who is calling it 
            />
        </div>
    )
})

export default Input