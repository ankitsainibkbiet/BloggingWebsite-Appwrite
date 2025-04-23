import React from "react";

function Btn({
    children,
    type = 'buttton',
    className = '',
    ...prop
}) {
    return (
        <button type={type} className={`my-4 mx-auto p-2 w-[95%] bg-blue-600 text-xl rounded-md text-white hover:bg-blue-700 ${className}`} {...prop}>
            {children}
        </button>
    )
}

export default Btn