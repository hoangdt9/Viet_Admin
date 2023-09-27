import React, {useState} from 'react'

import { AiOutlineCloseCircle } from 'react-icons/ai';

import AddShift from '../addModal/AddShift';

const ScheduleCard = ({shift, duration}) => {

    const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);

    const handleScheduleClose = () => {
        console.log("handleScheduleClose");
    }

    const handleScheduleEdit = (state) => {
        setIsAddShiftOpen(state);
    }

  return (
    <>
        <div className='rounded-[5px] border-solid border-[1px] border-[#eb2f96]'>
            <div className='flex justify-between items-center bg-[#eb2f96] text-white text-sm pl-[20px] py-[10px] pr-[10px]'>
                <div>{shift}</div>
                <button className='hover:cursor-pointer' onClick={handleScheduleClose}><AiOutlineCloseCircle className='text-[17px]' /></button>
            </div>
            <div className='px-[10px] h-[50px] pt-[5px] text-center hover:bg-[#eee] hover:dark:text-black hover:cursor-pointer' onClick={handleScheduleEdit}>{duration}</div>
        </div>
        <AddShift 
            isOpen={isAddShiftOpen}
            onClose={handleScheduleEdit}
        />
    </>
  );
}

export default ScheduleCard;
