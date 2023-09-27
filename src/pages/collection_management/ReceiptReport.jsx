import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <label className='text-xs text-grey-dark dark:text-white'>{t('collectionManagement.receiptreport.totalData')}</label>
      <button className='ml-1 bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
        <font className=''>{t('collectionManagement.receiptreport.refreshData')}</font>
      </button>
      
      <div className="mt-2">
        <button className='text-xs text-primary ml-1'>{t('collectionManagement.receiptreport.labelQuery')}</button>
        <button className='text-xs ml-2 bg-lightYellow text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.acb')}</button>
        <button className='text-xs ml-2 bg-lightBlue text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.bidv')}</button>
        <button className='text-xs ml-2 bg-lightRed text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.tcb')}</button>
        <button className='text-xs ml-2 bg-lightGreen text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.vcb')}</button>
        <button className='text-xs ml-2 bg-lightPurple text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.vtb')}</button>
        <button className='text-xs ml-2 bg-heavyYellow text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.stb')}</button>
        <button className='text-xs ml-2 bg-customPurple text-grey-dark border border-white p-[3px_10px] rounded-md'>{t('collectionManagement.receiptreport.mb')}</button>
      </div>
      <div className='mt-2 text-grey-dark dark:text-white'>
        <label className='text-sm'>{t('collectionManagement.receiptreport.selectDate')}</label>
        <input
          type='date'
          className='ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
          placeholder={t('collectionManagement.receiptreport.enterUserId')}
        />
        <label className='text-sm'>{t('collectionManagement.receiptreport.chooseMonitor')}:</label>
        <input
          type='date'
          className='ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
          placeholder={t('collectionManagement.receiptreport.enterUserId')}
        />
        <button className='ml-4 bg-primary dark:bg-grey-dark text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
          <font className=''>{t('collectionManagement.receiptreport.inquire')}</font>
        </button>
      </div>
      <div className='mt-2 min-w-full'>
        <table className='w-full text-sm dark:text-grey-light'>
          <thead>
            <tr className='bg-grey-light text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white'>
              <td className='p-[12px_8px]'>{t('collectionManagement.receiptreport.receiptNumber')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.label')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.type')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.squadLeader')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.onMonday')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.wednesday')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.thursday')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.friday')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.saturday')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.weekday')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.receiptreport.sum')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className='border-grey hover:bg-tableHoverColor  border-b-[1px] text-xs'>
              <td className='p-[17px_10px]'>HOANG THI HUONG</td>
              <td className='p-[17px_10px]'></td>
              <td className='p-[17px_10px]'>TCB</td>
              <td className='p-[17px_10px] text-xs text-[rgba(255,0,0,1)]'>{t('collectionManagement.receiptreport.unbound')}</td>
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>
              <td className='p-[17px_10px] text-lg text-primary'>1,366,683</td>
              <td className='p-[17px_10px]'>
                <button className='ml-2 text-[#f04134] bg-[#4d3328] border border-grey p-[3px_9px] rounded-md'>{t('collectionManagement.receiptreport.closure')}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
