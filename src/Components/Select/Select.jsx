import React, { useId } from "react";

function Select({
    label,
    options = [],
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="flex flex-col mt-4 ">
            {label && <label htmlFor={id} className="text-xl text-start pl-2">{label}</label>}
            <select
                id={id}
                ref={ref}
                className={`p-2 m-1 text-xl rounded-lg outline-none bg-white text-black ${className}`}
                {...props}>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)