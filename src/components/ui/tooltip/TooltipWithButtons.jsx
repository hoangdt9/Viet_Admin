import React from 'react';

const TooltipWithButtons = ({ children, text, description, onOk, onCancel }) => {
  return (
    <div className="relative group">
      {children}
      <div className="invisible group-hover:visible absolute z-10 w-56 p-2 mt-1 text-sm leading-tight text-black transform -translate-x-1/2 -translate-y-full bg-white rounded-lg shadow-lg flex flex-col">
        <div className="font-bold">{text}</div>
        <div className="my-2">{description}</div>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-3 py-1 rounded bg-gray-200 text-black">Cancel</button>
          <button onClick={onOk} className="px-3 py-1 rounded bg-blue-500 text-white">OK</button>
        </div>
        <svg className="absolute text-white h-2 -bottom-2 left-0 right-0 mx-auto" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

export default TooltipWithButtons;
