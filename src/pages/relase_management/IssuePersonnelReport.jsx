import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import {DatePicker} from 'antd'
import dayjs from 'dayjs';
import Card from '../../components/card/personnelReportCard';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { t } = useTranslation();

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleMonthChange = (e) => {
    setMonth(e.$M);
    setYear(e.$y);
  }

  const data = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"];

  return (
    <>
      <div className='px-[20px] py-[20px]'>
        <div><span className='text-[12px] dark:text-white'>{t('releaseManagement.persnonelReport.issuePersonnelReport')}</span></div>
        <div className='mt-[1px]'>
          <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.persnonelReport.viewMonth')} : </span>
          <DatePicker picker="month" onChange={handleMonthChange} value = {dayjs(`${year}-${month+1}-01`)} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
          <button
            type="button"
            className="ml-[20px] items-center bg-primary text-[12px] px-[15px] py-[5px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
          >
            {t('releaseManagement.persnonelReport.inquire')}
          </button>
        </div>
        <div className='pt-[5px]'>
          <table className='text-[12px] w-full text-left overflow-hidden border-collapse rounded-t-[4px] mt-[5px]'>
            <thead className='dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9]'>
              <tr className='dark:text-white'>
                <th className='w-[70px] text-center py-[10px]'>{t('releaseManagement.persnonelReport.date')}</th>
                <th className='w-[400px] text-center py-[10px]'>{t('releaseManagement.persnonelReport.issuer')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => {
                return(
                  <>
                    <tr className='text-center py-[10px] border-b-[1px] border-[#ece9e9] dark:border-white' key = {key}>
                      <td className='vertical-cener dark:text-white'>
                        <div className='text-[40px]'>{month+1 > 9 ? month+1 : `0${month+1}`}-{key+1 > 9 ? key+1 : `0${key+1}`}</div>
                        <div className='text-[20px]'>{year}</div>
                      </td>
                      <td>
                        <div className='flex'>
                          <Card header={"xiafa01"} singular={"--"} amountMoney={"--"} handingFee={"--"} />
                          <Card header={"MyZkSync"} singular={"--"} amountMoney={"--"} handingFee={"--"} />
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
