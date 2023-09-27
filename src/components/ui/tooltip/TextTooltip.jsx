import React from 'react';

const TextTooltip = ({number, unit, textColor, tooltipText}) => {
    return (
        <div className="relative cursor-pointer group">
            <p className="text-blue-500 py-2 px-4 rounded ">
                <span className={`${textColor} dark:text-white`}>{number}</span>
                <span className={`${textColor}dark:text-white`}> {unit}</span>
            </p>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-3 
                        px-2 py-1 rounded bg-black text-white text-xl 
                        opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                {tooltipText}
            </div>
        </div>
    )
}

export default TextTooltip;
