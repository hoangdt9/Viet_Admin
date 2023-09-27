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

  const header = [
    {
        name: t("agentmanagement.settlementlist.number"),
        width: "w-[2%]"
    },
    {
        name: t("agentmanagement.settlementlist.proxyId"),
        width: "w-[4%]"
    },
    {
        name: t("agentmanagement.settlementlist.agentName"),
        width: "w-[5%]"
    },
    {
        name: t("agentmanagement.settlementlist.collectionInfo"),
        width: "w-[10%]"
    },
    {
        name: t("agentmanagement.settlementlist.paymentInfo"),
        width: "w-[10%]"
    },
    {
        name: t("agentmanagement.settlementlist.settlementAmount"),
        width: "w-[10%]"
    },
    {
        name: t("agentmanagement.settlementlist.handlingFee"),
        width: "w-[5%]"
    },
    {
        name: t("agentmanagement.settlementlist.settledAmount"),
        width: "w-[5%]"
    },
    {
        name: t("agentmanagement.settlementlist.time"),
        width: "w-[5%]"
    },
    {
        name: t("agentmanagement.settlementlist.state"),
        width: "w-[5%]"
    },
    {
        name: t("agentmanagement.settlementlist.operate"),
        width: "w-[5%]"
    }
  ]

  const tableData = []

  return (
    <>
      <div className='px-[20px] py-[20px]'>
        <div><span className='text-[12px] dark:text-white'>{t("agentmanagement.settlementlist.agencySettlementList")}</span></div>
        <div className='flex gap-5 mt-[1px]'>
          <div>
            <label className='text-[12px] mr-[2px] dark:text-white'>{t("agentmanagement.settlementlist.settlementStatus")}</label>
            <select
                placeholder=""
                type="text"
                className="pl-[7px] h-[32px] w-[100px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary text-xs dark:text-white"
            >
                <option>{t("agentmanagement.settlementlist.completed")}</option>
                <option>{t("agentmanagement.settlementlist.undone")}</option>
            </select>
            </div>
          <div className='dark:text-white'>
            <span className='text-[12px] mr-[2px] dark:text-white'>{t("agentmanagement.settlementlist.selectDate")}</span>
            <DatePicker picker="month" onChange={handleMonthChange} value = {dayjs(`${year}-${month+1}-01`)} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white' />
          </div>
          <div>
            <label className='text-[12px] mr-[2px] dark:text-white'>{t("agentmanagement.settlementlist.debitCard")}</label>
            <select
                placeholder=""
                type="text"
                className="pl-[7px] h-[32px] w-[180px] dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] dark:text-white rounded-md hover:border-primary focus:border-primary text-xs"
            >
                <option>BUY FROM HIEN VCB 0947</option>
                <option>THE DOG VAN TCB 7979</option>
                <option>LE TRUNG HIEU TCB 4017</option>
                <option>NGUYEN NGOC TU BIDV</option>
                <option>VCB 8601</option>
            </select>
          </div>
          <div className='h-[32px]'><OrangeButton label={t("agentmanagement.settlementlist.inquire")}/></div>
        </div>
        <div>
          <table className='agencySettleReport w-full mt-[20px]'>
            <thead className='dark:text-white bg-[#f7f7f7] dark:bg-[#3e3c3b] rounded-md'>
              <tr className=''>
                {header.map((item, key) => {
                   return(
                    <th key = {key} className={`${item.width} text-[12px] dark:text-white px-2 font-medium text-[rgba(0,0,0,0.85)]`}>{t(item.name)}</th>
                   )
                })}
              </tr>
            </thead>
          </table>
          <div className='text-center'>
              {t("agentmanagement.settlementlist.noData")}
          </div>
        </div>
      </div>
    </>
  );
}
