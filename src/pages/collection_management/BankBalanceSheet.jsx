import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <label className='text-xs text-grey-dark dark:text-white'>{t('collectionManagement.bankbalancesheet.bankBalanceSheet')}</label>
      <button className='ml-1 bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
        <font className=''>{t('collectionManagement.bankbalancesheet.inquire')}</font>
      </button>
      <button className='ml-1 bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-grayCustom whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
        <font className=''>{t('collectionManagement.bankbalancesheet.normal')}</font>
      </button>
      <button className='bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-grayCustom whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
        <font className=''>{t('collectionManagement.bankbalancesheet.abnormal')}</font>
      </button>
      <button className='bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-grayCustom whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
        <font className=''>{t('collectionManagement.bankbalancesheet.all')}</font>
      </button>
      <div className="mt-2">
        <button className='text-xs text-primary ml-1'>{t('collectionManagement.bankbalancesheet.labelQuery')}</button>
        <button className='text-xs ml-2 bg-lightYellow text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.acb')}</button>
        <button className='text-xs ml-2 bg-lightBlue text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.bidv')}</button>
        <button className='text-xs ml-2 bg-lightRed text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.tcb')}</button>
        <button className='text-xs ml-2 bg-lightGreen text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.vcb')}</button>
        <button className='text-xs ml-2 bg-lightPurple text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.vtb')}</button>
        <button className='text-xs ml-2 bg-heavyYellow text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.stb')}</button>
        <button className='text-xs ml-2 bg-customPurple text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.bankbalancesheet.mb')}</button>
        <label htmlFor="" className='ml-6 text-grey-dark dark:text-white'>{t('collectionManagement.bankbalancesheet.lumpSum')}:
          <span className='text-lg'>1.3667 </span>
          <span>{t('collectionManagement.bankbalancesheet.millionYuan')}</span>
        </label>
      </div>
      <div className='mt-5 min-w-full'>
        <table className='w-full text-sm dark:text-grey-light '>
          <thead>
            <tr className='bg-grey-light text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white'>
              <td className='p-[10px_8px]'>{t('collectionManagement.bankbalancesheet.receiptNumber')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.bankbalancesheet.label')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.bankbalancesheet.type')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.bankbalancesheet.balance')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.bankbalancesheet.operate')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.bankbalancesheet.crawlerStatus')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className=' border-grey hover:bg-tableHoverColor  border-b-[1px] text-xs'>
              <td className='p-[17px_10px]'>HOANG THI HUONG</td>          
              <td className='p-[17px_10px]'></td>          
              <td className='p-[17px_10px]'>TCB</td>          
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>          
              <td className='p-[17px_10px] text-xs text-primary'>{t('collectionManagement.bankbalancesheet.initiateRollover')}</td>          
              <td className='p-[17px_10px]'>
                <button className='ml-2 text-[#f04134] bg-[#4d3328] border border-grey p-[3px_9px] rounded-md'>{t('collectionManagement.bankbalancesheet.closure')}</button>
                
              </td>          
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
