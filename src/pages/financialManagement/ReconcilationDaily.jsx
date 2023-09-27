import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-sm dark:text-white">
        {t("financial.reconciliation.daily")}
      </h1>
      <div className="flex items-center mt-2 dark:text-white">
        <div>
          <label className="text-sm">
            {t("financial.reconciliation.selectDate")}
          </label>
          <input
            type="date"
            className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            placeholder={t("financial.reconciliation.enterUserID")}
            defaultValue={new Date().toISOString().split('T')[0]}
          />
          <label className="text-sm">&nbsp;~&nbsp;</label>
          <input
            type="date"
            className=" p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            placeholder={t("financial.reconciliation.enterUserID")}
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="ml-5">
          <input
            type="checkbox"
            className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
            placeholder={t("financial.reconciliation.operationContent")}
          />
          <label htmlFor="" className="text-xs pl-1">
            {t("financial.reconciliation.showUndoDelivery")}
          </label>
        </div>
        <div className="ml-5">
          <input
            type="checkbox"
            className="ml-2 p-[6px_7px] text-sm border hover:border-primary dark:bg-dark"
            placeholder={t("financial.reconciliation.operationContent")}
          />
          <label htmlFor="" className="text-xs pl-1">
            {t("financial.reconciliation.showCancellationOfPayment")}
          </label>
        </div>
        <div className="ml-1">
          <button className="p-[5px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
            {t("financial.reconciliation.search")}
          </button>
        </div>
      </div>
      <div className="mt-5 overflow-scroll min-w-full">
        <table className="w-full text-sm dark:text-grey-light">
          <thead>
            <tr className="bg-grayCustom text-grey-dark dark:bg-grey-dark text-lg dark:text-white font-semibold">
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.businessNumber")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.merchantName")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.numOfSuccessfulConnections")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.successfulCollectionAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.collectionFee")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.numOfPaymentApplications")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.payApplicationAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.numOfSuccessfulPayments")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.successfulPaymentAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.numOfPaymentCancellations")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.payCancellationAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.payTotalHandlingFee")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.numOfApplicationsIssued")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.issuedApplicationAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.numOfSuccessfulTransactions")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.successfullyIssuedAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.issueTotalHandlingFee")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.internalChargeIncreaseAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.internalChargeDecreaseAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.chargeFee")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.merchantInitialBalance")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.endBalance")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.systemFeeCollection")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.reconciliation.paySystemFee")}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-lg">
              <td className="p-[12px_8px] ">10039</td>
              <td className="p-[12px_8px]">VB66</td>
              <td className="p-[12px_8px]">67</td>
              <td className="p-[12px_8px]">158,311,000</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
            </tr>
            <tr className="border-grey hover:bg-[#e9e9e9] text-primary border-b-[1px] text-lg">
              <td className="p-[12px_8px] ">{t("financial.reconciliation.total")}</td>
              <td className="p-[12px_8px]">VB66</td>
              <td className="p-[12px_8px]">67</td>
              <td className="p-[12px_8px]">158,311,000</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
              <td className="p-[12px_8px]">0</td>
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
