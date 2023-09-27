import React from "react";
import { useTranslation } from "react-i18next";
import { HomeBox } from "../../components/ui/others/HomeBox";
import ColumnLineAreaChart from "../../components/ui/chart/Column Line Area Chart";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { t } = useTranslation();

  return (
    <div className="h-full pb-0 text-[white]">
      <div>
        {/* Start Box part */}
        <div className="-ml-[8px] -mr-[8px] relative flex flex-row">
          <HomeBox
            bgColor={"bg-[#e1f1fd]"}
            titleContent={t("home.numberOfOrders")}
            titleColor={"text-[#5095cd]"}
            number={"0"}
            unit={"strokes"}
            textColor={"text-[#5095cd]"}
            tooltipText={"17 strokes"}
          />
          <HomeBox
            bgColor={"bg-[#fdf7dd]"}
            titleContent={t("home.totalAmountToday")}
            titleColor={"text-[#97853e]"}
            number={"29.518"}
            unit={"million yuan"}
            textColor={"text-[#97853e]"}
            tooltipText={"VND: 54.789 yuanTWD:74735 yuan"}
          />
          <HomeBox
            bgColor={"bg-[#fae7dc]"}
            titleContent={t("home.totalAmountMonth")}
            titleColor={"text-[#cf784c]"}
            number={"11.677"}
            unit={"billion yuan"}
            textColor={"text-[#cf784c]"}
            tooltipText={"17 yuan"}
          />
          <HomeBox
            bgColor={"bg-[#ecddfc]"}
            titleContent={t("home.merchantsTotalBalance")}
            titleColor={"text-[#6e25cd]"}
            number={"10111109925.5"}
            unit={"billion yuan"}
            textColor={"text-[#6e25cd]"}
            tooltipText={"17 yuan"}
          />
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
                    <button className="border border-grayCustom p-[4px_16px] rounded-sm hover:text-primary dark:border-white dark:text-white dark:hover:text-primary">
                      {t("home.lastMonthOrders")}
                    </button>
                    <button className="border text-primary border-primary p-[4px_16px] rounded-sm hover:text-primary dark:text-white dark:border-primary dark:hover:text-primary">
                      {t("home.thisMonthOrders")}
                    </button>
                  </div>

                  {/* date button */}
                  <div className="relative flex flex-row text-xs outline-none transition-opacity ml-[8px]">
                    <span>
                      <input
                        type="month"
                        placeholder={new Date().getMonth()}
                        className="relative flex flex-row w-full h-7 px-2 py-1 text-black text-opacity-65 bg-white border border-grayCustom rounded dark:bg-grey-dark dark:text-white"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-[5px_15px] ml-6 text-xs text-white bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark">
                {t("home.renew")}
              </button>
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
    </div>
  );
};
