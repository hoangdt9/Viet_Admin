import React from 'react'

export const RegisterInput = ({inputRef, type, icon, text, value, captcha, inputData, stateHandler, validateCaptcha, maxLength}) => {

    const onChangeHandler = (e) => {
        if(e.target.name === "Captcha"){
            const maxLength = 15; // Set your desired character limit

            if (e.target.value.length > maxLength) {
                e.target.value = e.target.value.slice(0, maxLength);
            }
        }
        stateHandler({
            ...inputData,
            [e.target.name.toLowerCase()]: e.target.value
        })
    }
    console.log("inputData",inputData);

    return (
        <div
            className="h-12 px-1 py-0 mb-8 rounded-full relative border-2 border-gray-300">
            <span
                style={{
                backgroundImage: `url(${icon})`
            }}
                className="w-4 h-4 absolute m-[14px] mx-3 5 bg-contain"></span>
            <input
                ref={inputRef}
                type={type}
                placeholder={text}
                name={text}
                value={value}
                onChange={onChangeHandler}
                className={`${maxLength} w-56 h-11 outline-none inline-block text-base leading-12 font-sans ml-12 border-0 bg-transparent text-black`} />
        </div>
    )
}
