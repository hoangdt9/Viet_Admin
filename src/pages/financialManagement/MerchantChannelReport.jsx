import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-sm dark:text-white">
        {t("financial.merchantchannelreport.merchantChannelReport")}
      </h1>
      <div className="flex items-center mt-2 dark:text-white">
        <div>
          <label className="text-sm">
            {t("financial.merchantchannelreport.statisticalDate")}
          </label>
          <input
            type="date"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            placeholder={t("financial.merchantchannelreport.enterUserID")}
          />
          <label className="text-sm">
            {t("financial.merchantchannelreport.channel")}
          </label>
          <select
            placeholder={t("financial.merchantchannelreport.merchant")}
            id="mySelect"
            name="mySelect"
            className="p-[3px_5px] w-40 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          >
            <option>{t("financial.merchantchannelreport.merchant")}</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 3</option>
            <option>Option 3</option>
          </select>
          <label className="text-sm">
            {t("financial.merchantchannelreport.merchant")}
          </label>
          <select
            placeholder="username or id"
            id="mySelect"
            name="mySelect"
            className="ml-1 p-[3px_6px] w-40 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          >
            <option>{t("financial.merchantchannelreport.merchant")}</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 3</option>
            <option>Option 3</option>
          </select>
          <label className="text-sm ml-1">
            {t("financial.merchantchannelreport.totalTurnover")}
          </label>
          <button className="text-primary text-xl ml-1">132,734,000</button>
          <label className="text-sm ml-1">
            {t("financial.merchantchannelreport.totalHandlingFee")}
          </label>
          <button className="text-primary text-xl ml-1">145</button>
        </div>
      </div>
      <div className="mt-5 min-w-full">
        <table className="w-full text-sm dark:text-grey-light">
          <thead>
            <tr className="bg-[#dfdfdf] text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white ">
              <td className="p-[10px_8px]">
                {t("financial.merchantchannelreport.businessNumber")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.merchantchannelreport.merchantName")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.merchantchannelreport.channel")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.merchantchannelreport.collectionSuccessRate")}
              </td>
              <td className="p-[10px_8px]">
                {t(
                  "financial.merchantchannelreport.numberOfCollectionApplications"
                )}
              </td>
              <td className="p-[10px_8px]">
                {t(
                  "financial.merchantchannelreport.numberOfSuccessfulCollections"
                )}
              </td>
              <td className="p-[10px_8px]">
                {t(
                  "financial.merchantchannelreport.successfulCollectionAmount"
                )}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.merchantchannelreport.collectionSuccessFee")}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-xl dark:hover:bg-tableHoverColor">
              <td className="p-[12px_8px] ">10039</td>
              <td className="p-[12px_8px]">VB66 </td>
              <td className="p-[12px_8px]">67</td>
              <td className="p-[12px_8px]">158,311,000</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
