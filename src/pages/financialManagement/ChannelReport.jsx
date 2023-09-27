import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center mt-2 dark:text-white">
        <div>
          <label className="text-sm">
            {t("financial.channelreport.salaryStatement")}
          </label>
          <input
            type="date"
            className="ml-2 p-[3px_10px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            placeholder={t("financial.channelreport.enterUserID")}
          />
        </div>
      </div>
      <div className="mt-5 min-w-full">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f7f7f7] dark:bg-grey-dark dark:text-white  text-xs text-[rgba(0,0,0,0.85)] font-semibold">
              <td className="p-[10px_8px]">
                {t("financial.channelreport.date")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.channelreport.vietnamBankScanCode")}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-sm dark:hover:bg-tableHoverColor">
              <td className="p-[12px_8px] ">
                2023-05-01 {t("financial.channelreport.monday")}
              </td>
              <td className="p-[12px_8px] text-2xl">614,749,184</td>
            </tr>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-sm dark:hover:bg-tableHoverColor">
              <td className="p-[12px_8px] ">
                2023-05-01 {t("financial.channelreport.monday")}
              </td>
              <td className="p-[12px_8px] text-2xl">614,749,184</td>
            </tr>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-sm dark:hover:bg-tableHoverColor">
              <td className="p-[12px_8px] ">
                2023-05-01 {t("financial.channelreport.monday")}
              </td>
              <td className="p-[12px_8px] text-2xl">614,749,184</td>
            </tr>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-sm dark:hover:bg-tableHoverColor">
              <td className="p-[12px_8px] ">
                2023-05-01 {t("financial.channelreport.monday")}
              </td>
              <td className="p-[12px_8px] text-2xl">614,749,184</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
