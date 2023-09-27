import React from 'react'
import TextTooltip from '../tooltip/TextTooltip';
 
export const HomeBox = ({bgColor, titleContent, titleColor, number, unit, textColor, tooltipText}) => {
  return (
    <div className="pl-2 pr-2 w-[25%]">
        <div
            className={`mb-5 ${bgColor}  border rounded shadow-sm dark:bg-grey-dark border-white`}>
            <div
                className="border border-lightblue text-[#5095cd] text-lg text-center p-4  relative ml-0 mr-0 border-b border-transparent rounded-tl rounded-tr shadow-sm">
                    {/* Start Title  */}
                    <div>
                    <font className={`${titleColor} text-center text-lg `}>
                        {titleContent}
                    </font>
                    </div>
                    {/* End Title */}
                    <div className="">
                        <TextTooltip number={number} unit={unit} textColor={textColor} tooltipText={tooltipText} />
                    </div>
                </div>
        </div>
    </div>
  )
}
