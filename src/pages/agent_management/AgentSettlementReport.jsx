import React, {useState} from 'react';
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

  const tableData = [
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
    {
      date: "2023-05-01 " + t("agentmanagement.settlementreport.monday"),
      issuedAmount: 0,
      handlingAmount: 0
    },
  ]

  return (
    <>
      <div className='px-[20px] py-[20px]'>
      <div><span className='text-[12px] dark:text-white'>{t("agentmanagement.settlementreport.title")}</span></div>
        <div className=''>
          <div className='mt-[1px]'>
            <span className='text-[12px] mr-[2px] dark:text-white'>{t("agentmanagement.settlementreport.selectMonth")}</span>
            <DatePicker picker="month" onChange={handleMonthChange} value = {dayjs(`${year}-${month+1}-01`)} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
          </div>
        </div>
        <div>
        <table className='agencySettleReport w-full mt-[20px] min-w-[800px]'>
            <thead className='dark:text-white bg-[#f7f7f7] dark:bg-[#3e3c3b] rounded-md'>
              <tr className=''>
                <th className='w-[60%] text-[12px] text-left'>{t("agentmanagement.settlementreport.date")}</th>
                <th className='w-[20%] text-[12px] text-left'>{t("agentmanagement.settlementreport.totalIssuedAmount")}</th>
                <th className=' text-[12px] text-left'>{t("agentmanagement.settlementreport.totalHandlingFee")}</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#e9e9e9]'>
                {
                  tableData?.map((row, key) => (
                    <tr className='text-primary text-xs hover:bg-[rgb(253,244,236)] duration-300'>
                      <td className='px-2 py-3.5'>{row.date}</td>
                      <td className='px-2 py-3.5 text-[20px]'>{row.issuedAmount}</td>
                      <td className='px-2 py-3.5 text-[20px]'>{row.handlingAmount}</td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
