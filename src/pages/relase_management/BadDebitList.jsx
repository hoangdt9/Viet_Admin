import React from 'react'
import { useTranslation } from 'react-i18next';
import {DatePicker} from 'antd'
import dayjs from 'dayjs';

export default function BadDebitList() {
  
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);

  const lastDayOfMonth = date.getDate();

  const debtList = [
    {
      type : "",
      badDebtAmount : "10000",
      creationTime : "2023-05-15 08:14:57",
      processingTime : "--",
      state : "unprocessed",
    }
  ];

  return (
    <div>
      <div><span className='text-[12px] dark:text-white'>{t('releaseManagement.badDebtList.title')}</span></div>
      <div>
        <button
            type="button"
            className="mr-[10px] items-center bg-primary text-[12px] px-[15px] py-[5px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
          >
            {t('releaseManagement.badDebtList.management')}
          </button>
          <button
            type="button"
            className="items-center bg-primary text-[12px] px-[15px] py-[5px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
          >
            {t('releaseManagement.badDebtList.newBadDebt')}
          </button>
      </div>
      <div className='mt-1'>
          <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.badDebtList.time')} : </span>
          <RangePicker defaultValue={[dayjs(new Date()), dayjs(new Date(new Date().getFullYear(), new Date().getMonth(), lastDayOfMonth))]} format={dateFormat} className='text-[12px] mr-[30px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
          <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.badDebtList.badDebtType')} : </span>
          <select
              placeholder="shift name"
              type="text"
              className="p-[2px_7px] dark:text-[white] text-sm w-[130px] mr-[20px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
          >
              <option disabled selected className='text-grey'>{t('releaseManagement.badDebtList.badDebtType')}</option>
              <option>111</option>
              <option>demo</option>
              <option>test</option>
          </select>
          <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.badDebtList.state')} : </span>
          <select
              placeholder="shift name"
              type="text"
              className="p-[2px_7px] dark:text-[white] text-sm mr-[20px] w-[130px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
          >
              <option disabled selected className='text-grey'>{t('releaseManagement.badDebtList.state')}</option>
              <option>processed</option>
              <option>unprocessed</option>
          </select>
          <button
            type="button"
            className="items-center bg-primary text-[12px] px-[15px] py-[5px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
          >
            {t('releaseManagement.badDebtList.inquire')}
          </button>
        </div>
        <div className='mt-1'>
          <table className='text-[12px] w-full dark:text-white'>
              <thead>
                  <tr className='dark:bg-[#3e3c3b] bg-[#ece9e9]'>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.type')}</th>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.badDebtAmount')}</th>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.creationTime')}</th>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.processingTime')}</th>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.state')}</th>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.remark')}</th>
                      <th className=' py-[10px]'>{t('releaseManagement.badDebtList.operate')}</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    Object.keys(debtList).length !== 0 ? 
                    debtList.map((item, key) => {
                      console.log(item);
                      return(
                          <>
                              <tr className='border-solid border-b-[1px] border-[#ece9e9]' key = {key}>
                                  <td className='text-center py-[10px] '>{item.type}</td>
                                  <td className='text-center py-[10px] '>{item.badDebtAmount}</td>
                                  <td className='text-center py-[10px] '>{item.creationTime}</td>
                                  <td className='text-center py-[10px] '>{item.processingTime}</td>
                                  <td className='text-center py-[10px] '>{item.state}</td>
                                  <td className='text-center py-[10px] '><button className='text-primary'>No record</button></td>
                                  <td className='text-center py-[10px] '><button className='text-primary'>{t('releaseManagement.badDebtList.edit')}</button> | <button className='text-primary'>{t('releaseManagement.badDebtList.dealWith')}</button> | <button className='text-primary'>{t('releaseManagement.badDebtList.delete')}</button></td>
                              </tr>
                          </>
                      );
                  }) : <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]'>Empty data</tr>}
              </tbody>
          </table>
        </div>
    </div>
  )
}
