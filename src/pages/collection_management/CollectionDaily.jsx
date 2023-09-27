import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className='text-lg dark:text-white'>{t('collectionManagement.collectiondaily.channelDaily')}</h1>
      <div className='flex items-center mt-2 dark:text-white'>
        <div>
          <label className='text-sm'>{t('collectionManagement.collectiondaily.selectDate')}</label>
          <input
            type='date'
            className='ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('collectionManagement.collectiondaily.enterUserId')}
          />
          <label className='text-sm'>~</label>
          <input
            type='date'
            className='ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('collectionManagement.collectiondaily.enterUserId')}
          />
          <label className='text-xs ml-1'>{t('collectionManagement.collectiondaily.searchChannel')}</label>
          <select
            placeholder='username or id'
            id='mySelect'
            name='mySelect'
            className='ml-3 p-[5px_6px] w-40 text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
          >
            <option>{t('collectionManagement.collectiondaily.merchant')}</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 3</option>
            <option>Option 3</option>
          </select>
          <label className='text-xs ml-1'>{t('collectionManagement.collectiondaily.searchBank')}</label>
          <select
            placeholder='username or id'
            id='mySelect'
            name='mySelect'
            className='ml-3 p-[5px_6px] w-40 text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
          >
            <option>{t('collectionManagement.collectiondaily.merchant')}</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 3</option>
            <option>Option 3</option>
          </select>
          <button className='bg-primary dark:bg-grey-dark text-white inline-block ml-4 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
            <font className=''>{t('collectionManagement.collectiondaily.inquire')}</font>
          </button>
        </div>
      </div>

      <div className='mt-5 min-w-full'>
        <table className='w-full text-sm dark:text-grey-light '>
          <thead>
            <tr className='bg-[#dfdfdf] text-lg text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white'>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.serialNumber')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.receiptNumber')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.paymentChannel')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.beneficiaryBank')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.collectionAppAmount')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.successfulCollectionAmount')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.numCollectionApp')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.numSuccessfulCollection')}</td>
              <td className='p-[10px_8px]'>{t('collectionManagement.collectiondaily.successRate')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className='border-grey hover:bg-[#e9e9e9]  border-b-[1px] dark:hover:bg-tableHoverColor'>
              <td className='p-[12px_8px] text-xl'>12</td>
              <td className='p-[12px_8px] text-xl'>HOANG THI HUONG</td>
              <td className='p-[12px_8px] text-xl'>{t('collectionManagement.collectiondaily.bankQRCode')}</td>
              <td className='p-[12px_8px] text-xl'>TCB</td>
              <td className='p-[12px_8px] text-xl text-primary'>79,010,000</td>
              <td className='p-[12px_8px] text-xl text-primary'>79,010,000</td>
              <td className='p-[12px_8px] text-xl text-primary'>51</td>
              <td className='p-[12px_8px] text-xl text-primary'>47</td>
              <td className='p-[12px_8px] text-xl text-primary'>
                92.16 <span className='text-white'>%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
