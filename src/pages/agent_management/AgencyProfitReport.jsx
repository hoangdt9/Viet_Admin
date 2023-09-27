import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { OrangeButton } from '../../components/ui/button/AgentManagement';

import {DatePicker} from 'antd'
import dayjs from 'dayjs';
import Card from '../../components/card/personnelReportCard';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isFirstMonth, setIsFirstMonth] = useState(false);
  const handleMonthChange = (e) => {
    setMonth(e.$M);
    setYear(e.$y);
  }

  const onClickHandler = () => {
    isFirstMonth ? setIsFirstMonth(false) : setIsFirstMonth(true);
  }

  useEffect(() => {
    isFirstMonth ? setDayOfMonth([17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27, 28, 29, 30, 31]) :
    setDayOfMonth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  }, [isFirstMonth]);

  const [dayOfMonth, setDayOfMonth] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

  const tableData = [
    {
      member: "#3 " + t("agentmanagement.profitreport.immediatelyReportToNoSuperior"),
      firstvalue: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      secondvalue: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      sum: 0
    },
    {
      member: "## " + t("agentmanagement.profitreport.sum"),
      firstvalue: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      secondvalue: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      sum: 0
    }
  ]

  return (
    <>
      <div className='px-[20px] py-[20px]'>
        <div><span className='text-[12px] dark:text-white'>{t('agentmanagement.profitreport.agencyProfitReport')}</span></div>
        <div className='flex justify-between'>
          <div className='mt-[1px]'>
            <span className='text-[12px] mr-[2px] dark:text-white'>{t('agentmanagement.profitreport.selectDate')} : </span>
            <DatePicker picker="month" onChange={handleMonthChange} value = {dayjs(`${year}-${month+1}-01`)} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
          </div>
          <div>
            <span className='text-[rgba(0,0,0,0.65)]  dark:text-white'>{t('agentmanagement.profitreport.businessLevel')} : </span><span className='text-primary text-xs ml-[5px]'>{t('agentmanagement.profitreport.expandAll')}</span>
          </div>
        </div>
        <div>
          <table className='agencyProfitReport border border-[#ccc] rounded-md w-full mt-[20px]'>
            <thead className='dark:text-white'>
              <tr className=''>
                <th className='w-[25%] text-[12px] text-left'>{t('agentmanagement.profitreport.proxyMember')}</th>
                <th className='w-[3%]'>
                    <OrangeButton label=">" onClickHandler={onClickHandler} dark={darkMode} />
                </th>
                {
                dayOfMonth.map((day, key) => (
                  <th className='px-[15px] w-[2%]' key = {key}>{day}</th>
                ))
                }
                <th className='text-left text-[12px]'>{t('agentmanagement.profitreport.sumOfMonth')}</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, key) => {
                return(
                  <tr key = {key} className="px-[10px]">
                    <th className='text-primary text-left text-[12px]'><span className="inline-block bg-[#eb2f96] w-[8px] h-[8px] rounded-full ml-[20px] mr-1"></span>{item.member}</th>
                    <th></th>
                    {!isFirstMonth ? item.firstvalue.map((value, key) => (
                      <th key = {key} className="text-primary text-[20px]">{value}</th>
                    )) : 
                    item.secondvalue.map((value, key) => (
                      <th key = {key} className="text-primary text-[20px]">{value}</th>
                    ))
                    }
                    <th className='text-left text-primary px-[15px] text-[20px]'>{item.sum}</th>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

}
