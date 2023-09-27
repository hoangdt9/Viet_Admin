import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className='text-sm dark:text-white'>{t('device_management.debitCardDepositList')}</h1>
      <div className='flex items-center mt-2 justify-between dark:text-white'>
        <div>
          <label className='text-xs'>{t('device_management.selectRole')}:</label>
          <input placeholder="device ID" type="text"  className="ml-2 p-[3px_3px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark">
              
          </input>
          <button className='ml-4 bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
            <font className=''>{t('device_management.inquire')}</font>
          </button>
        </div>
        <div className="">
          <button className='ml-4 bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
            <font className=''>{t('device_management.addNewInquirement')}</font>
          </button>
        </div>
      </div>
      <div className='mt-5 min-w-full'>
        <table className='w-full text-sm dark:text-grey-light '>
          <thead>
            <tr className='bg-grey-light text-lg text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white'>
              <td className='p-[10px_8px]'>#</td>
              <td className='p-[10px_8px]'>{t('device_management.deviceName')}</td>
              <td className='p-[10px_8px]'>{t('device_management.connectionStatus')}</td>
              <td className='p-[10px_8px]'>{t('device_management.receiptNumber')}</td>
              <td className='p-[10px_8px]'>{t('device_management.operate')}</td>
            </tr>
          </thead>
          <tbody>
            {/* <tr className='bg-[#dfdfdf] border-grey hover:bg-[#e9e9e9]  border-b-[1px] text-xs'>
            </tr> */}
           
          </tbody>
        </table>
        
      </div>
    </>
  );
}
