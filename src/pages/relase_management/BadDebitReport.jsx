import React, {useState} from 'react'
import { useTranslation } from 'react-i18next';
import {DatePicker} from 'antd'
import dayjs from 'dayjs';

const BadDebitReport = () => {

    const { t } = useTranslation();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
  
    const handleMonthChange = (e) => {
      setMonth(e.$M);
      setYear(e.$y);
    }

  const data = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"];
  return (
    <div>
        <div><span className='text-[12px] dark:text-white'>{t('releaseManagement.badDebtReport.badDebtReport')}</span></div>
        <div className='mt-[1px]'>
          <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.badDebtReport.viewMonth')} : </span>
          <DatePicker picker="month" onChange={handleMonthChange} value = {dayjs(`${year}-${month+1}-01`)} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
        </div>
        <div className='mt-1'>
            <table className='text-[12px] w-full dark:text-white'>
                <thead>
                    <tr className='dark:bg-[#3e3c3b] bg-[#ece9e9]'>
                        <th className=' py-[10px]'>{t('releaseManagement.badDebtReport.date')}</th>
                        <th className=' py-[10px]'>111</th>
                        <th className=' py-[10px]'>demo</th>
                        <th className=' py-[10px]'>test</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(data).length !== 0 ? 
                       <>
                            {data.map((item, key) => {
                            console.log(item);
                            return(
                                <>
                                    <tr className='border-solid border-b-[1px] border-[#ece9e9]' key = {key}>
                                        <td className='pl-[10px] py-[10px] text-primary'>{year}-{month+1 > 9 ? month+1 : `0${month+1}`}-{key+1 > 9 ? key+1 : `0${key+1}`}</td>
                                        <td className='pl-[10px]py-[10px] '>--</td>
                                        <td className='pl-[10px]py-[10px] '>--</td>
                                        <td className='pl-[10px]py-[10px] '>--</td>
                                    </tr>
                                </>
                            );
                            })}
                            <tr className='border-solid border-b-[1px] border-[#ece9e9]'>
                                <td className='pl-[10px] py-[10px] text-primary text-[20px]'>{t('releaseManagement.badDebtReport.sumOfMonth')}</td>
                                <td className='pl-[10px]py-[10px] '>--</td>
                                <td className='pl-[10px]py-[10px] '>--</td>
                                <td className='pl-[10px]py-[10px] '>--</td>
                            </tr>
                       </> 
                     : <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]'>Empty data</tr>}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BadDebitReport;
