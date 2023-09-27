import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { getBasicInfo } from '../../redux/basicReducer';
import { openSnackBar } from '../../redux/snackBarReducer';

import {HomeBox} from '../../components/ui/others/HomeBox';
import ColumnLineAreaChart from '../../components/ui/chart/Column Line Area Chart';


export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState({});
  const [logs, setLogs] = useState([]);
  const basicState = useSelector((state) => state.basicState);

  let storedData = localStorage.getItem('user');
  let parsedData = JSON.parse(storedData);

  let extractIPAddress = (input) => {
    if(typeof(input) === "undefined") return;
    const startIndex = input.lastIndexOf(":") + 1;
    const ipAddress = input.slice(startIndex);
    return ipAddress;
  }

  const moment = require("moment");

  useEffect(() => {
    setAdmin(parsedData.admin);
    dispatch(getBasicInfo());
  }, []);

  useEffect(() => {
    console.log(basicState)
    setLogs(basicState.logs)    
  }, [basicState]);

  
  const UserInfoItem = ({label, value}) =>{
    return(
      <div className="flex mt-[8px] mb-[8px] ">
                      {/* label */}
                      <div className="flex items-center p-[8px] text-right w-1/3 text-[#333] dark:text-white">
                        <font>{label}</font>
                      </div>
                      {/* value */}
                      <div className="flex items-center text-[#333] bg-[#fafcff] border rounded-sm text-left w-[70%] p-[8px] dark:bg-grey-dark dark:text-white " >
                        <font>{value}</font>
                      </div>
                  </div>
    )
  }
  const userInfoData = [
    {
      label: t("basicInformation.name"),
      value: admin.name
    },
    {
      label: t("basicInformation.userId"),
      value: admin.userid
    },
    {
      label: t("basicInformation.userType"),
      value: admin.userType
    },
    {
      label: t("basicInformation.account"),
      value: admin.account
    },
    {
      label: t("basicInformation.registryTime"),
      value: moment(admin.createdAt).format("YYYY-MM-DD HH:mm:ss")
    },
  ]
  return (
    <div className="h-full py-5 px-6 pb-0  text-[white]">
      {/* Start User Info and recent login history */}
      <div className='-ml-2 -mr-2 flex items-start justify-between flex-wrap'>
        
        {/* Start User Info Section */}
        <div className="pl-2 pr-2 mb-8 w-1/2 flex flex-col relative min-h-1px mt-8">
          <div className="bg-white border rounded-md text-xs relative transition-all duration-300 hover:shadow-md border-grayCustom dark:bg-grey-dark">
            {/* Start User info Title */}
            <div className="h-12 bg-white border-b border-grayCustom px-[8px] rounded-t flex mb-[-1px] text-grey-dark dark:bg-grey-dark dark:text-white">
              <h3 className='text-base overflow-ellipsis overflow-hidden whitespace-nowrap font-semibold flex-1 flex items-center justify-stretch'>
                <font className="">{t("basicInformation.userInfo")}</font>
              </h3>
              {/* Start click to refresh button */}
              <div className="flex items-center ">
                <button className="bg-primary border-primary inline-block mb-0 font-semibold text-center cursor-pointer border border-transparent whitespace-nowrap leading-[1.15] px-4 text-xs rounded h-7 select-none transition-all duration-300 ease-in-out relative text-grayCustom hover:text-white hover:bg-primary-dark dark:bg-grey-dark dark:border-primary dark:text-white dark:hover:text-primary">
                  <font className=''>{t("basicInformation.clickToRefresh")}</font>
                </button>
              </div>
            </div>
            {/* Start User Info Content */}
            <div className="p-6 relative ">
              <div className="bg-[#ffe6d9] rounded-sm ml-[8px] mr-[8px] flex items-start flex-wrap dark:bg-dark">
                
                {/* left side section */}
                <div className="pl-[8px] pr-[8px] pt-[16px] pb-[16px] w-1/2">
                  {userInfoData && userInfoData.map((item, key) => {
                    return <UserInfoItem key={key} label={item.label} value={item.value} />
                  })}
                </div>
                {/* right side section */}
                <div className="pl-[8px] pr-[8px] pt-[16px] pb-[16px] w-1/2">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start recent login history Section */}
        <div className="pr-2 w-1/2 flex flex-col relative min-h-1px mt-8">
          <div className="hover:shadow-md border border-grayCustom">
          
            {/* Start login history Title */}
            <div className="h-12 bg-white border-b border-grayCustom px-[8px] rounded-t flex mb-[-1px] dark:bg-grey-dark dark:text-white">
              <h3 className='text-base overflow-ellipsis overflow-hidden whitespace-nowrap font-semibold flex-1 flex items-center justify-stretch '>
                <font className="">{t("basicInformation.recentLoginHistory")}</font>
              </h3>
            </div>
            {/* Start login history content */}
            <div className="p-6 relative dark:bg-grey-dark dark:text-white">
              <div className="text-xs">
                <table className='w-full border-collapse border-spacing-0 text-left rounded-[4px] border-grey text-xs text-[rgba(0,0,0,0.85)]'>
                  <colgroup className='table-column-group border-separate text-left text-xs text-[rgba(0,0,0,0.85)]'>
                    <col className='table-column'/>
                    <col className='table-column'/>
                    <col className='table-column'/>
                  </colgroup>
                  <thead className="table-header-group align-middle">
                    <tr className="bg-[#f7f7f7] text-grey-dark dark:bg-grey-dark dark:text-white">
                      <th className="pt-[10px] pb-[10px] pl-[8px] pr-[8px] break-all font-[500px] transition-colors duration-300 ease-linear text-left">
                        <font className="">{t("basicInformation.time")}</font>
                      </th>
                      <th className="pt-[10px] pb-[10px] pl-[8px] pr-[8px] break-all font-[500px] transition-colors duration-300 ease-linear text-left">
                        <font className="">{t("basicInformation.loginLocation")}</font>
                      </th>
                      <th className="pt-[10px] pb-[10px] pl-[8px] pr-[8px] break-all font-[500px] transition-colors duration-300 ease-linear text-left">
                        <font className="">{t("basicInformation.ip")}</font>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='table-row-group border-separate text-left text-xs text-[rgba(0,0,0,0.65)] dark:text-white dark:bg-dark hover:dark:bg-tableHoverColor'>
                    {logs.map(log => 
                        <tr className="transition-all duration-300 hover:bg-tableHoverColor">
                          <td className="pt-[10px] pb-[10px] pr-[8px] pl-[8px] break-all border-b border-grayCustom transition-all duration-300">
                            <font>{moment(log.createdAt).format("YYYY-MM-DD HH:mm:ss")}</font>
                          </td>
                          <td className="pt-[10px] pb-[10px] pr-[8px] pl-[8px] break-all border-b border-grayCustom transition-all duration-300">
                            <font>{log.location}</font>
                          </td>
                          <td className="pt-[10px] pb-[10px] pr-[8px] pl-[8px] break-all border-b border-grayCustom transition-all duration-300">
                            <font>{extractIPAddress(log.ip)}</font>
                          </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* Start Box part */}
       <div className="-ml-[8px] -mr-[8px] relative flex flex-row">
            <HomeBox bgColor={"bg-[#e1f1fd]"} titleContent={t("home.numberOfOrders")} titleColor={"text-[#5095cd]"} number={"0"} unit={"strokes"} textColor={"text-[#5095cd]"} tooltipText={"17 strokes"}/>
            <HomeBox bgColor={"bg-[#fdf7dd]"} titleContent={t("home.totalAmountToday")} titleColor={"text-[#97853e]"} number={"29.518"} unit={"million yuan"} textColor={"text-[#97853e]"} tooltipText={"VND: 54.789 yuanTWD:74735 yuan"}/>
            <HomeBox bgColor={"bg-[#fae7dc]"} titleContent={t("home.totalAmountMonth")} titleColor={"text-[#cf784c]"} number={"11.677"} unit={"billion yuan"} textColor={"text-[#cf784c]"} tooltipText={"17 yuan"}/>
            <HomeBox bgColor={"bg-[#ecddfc]"} titleContent={t("home.merchantsTotalBalance")} titleColor={"text-[#6e25cd]"} number={"10111109925.5"} unit={"billion yuan"} textColor={"text-[#6e25cd]"} tooltipText={"17 yuan"}/>
        </div>
      {/* Start Chart part */}
      <div className="mb-4 mt-4 bg-white dark:bg-grey-dark ">
          <div className="text-xs relative border border-grayCustom rounded-sm transition-all duration-300">
            {/* Start Date part */}
            <div className="h-12 flex flex-row items-center justify-between border-b border-grayCustom px-6 rounded-t-sm relative -mb-px dark:border-grey-dark">
              <div className="h-12 flex items-center rounded-t-sm -mb-px">
                <div className="flex items-center m-0 p-0 text-sm whitespace-nowrap text-black text-opacity-85 font-semibold">
                  <div className="text-xs flex">
                    {/* last month button */}
                    <button className='border border-grayCustom p-[4px_16px] rounded-sm hover:text-primary dark:border-white dark:text-white dark:hover:text-primary'>{t("home.lastMonthOrders")}</button>
                    <button className='border text-primary border-primary p-[4px_16px] rounded-sm hover:text-primary dark:text-white dark:border-primary dark:hover:text-primary'>{t("home.thisMonthOrders")}</button>
                  </div>
                  
                  {/* date button */}
                  <div className="relative flex flex-row text-xs outline-none transition-opacity ml-[8px]">
                    <span>
                      <input type="month" placeholder={new Date().getMonth()} className="relative flex flex-row w-full h-7 px-2 py-1 text-black text-opacity-65 bg-white border border-grayCustom rounded dark:bg-grey-dark dark:text-white" />
                    </span>
                  </div>
                </div>
            </div>
                <button className='p-[5px_15px] ml-6 text-xs text-white bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t("home.renew")}</button>
          </div>
            {/* start chart */}
            <div className="p-7 relative m-0 text-xs">
                <div className="relative p-0 m-0 overflow-hidden cursor-pointer ">
                  <ColumnLineAreaChart />
                </div>
            </div>
          </div>
      </div>

    </div>
);
}
