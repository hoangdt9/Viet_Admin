import { useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DateRangePicker from 'rsuite/DateRangePicker';
import { Helmet } from 'react-helmet';


export default () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(new Date());

  return (
    <>
      <Helmet>
      <link
        href="./rsuite.css"
        rel="stylesheet"
      />
      </Helmet>
      <h1 className='text-sm dark:text-white'>{t("financial.debitcardbalanceoperator.debitCardBalanceDetails")}</h1>
      <div className='flex items-center mt-2 dark:text-white'>
        <div>
          <label className='text-xs'>{t("financial.debitcardbalanceoperator.selectDate")}</label>
          <DateRangePicker 
            value={value} 
            onChange={setValue}
          />
        </div>
      </div>
      <div className='mt-5 min-w-full'>
        <table className='w-full text-sm '>
          <thead>
            <tr className='bg-grey-light text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white'>
              <td className='p-[10px_8px]'>{t("financial.debitcardbalanceoperator.operator")}</td>
              <td className='p-[10px_8px]'>{t("financial.debitcardbalanceoperator.cardholder")}</td>
              <td className='p-[10px_8px]'>{t("financial.debitcardbalanceoperator.bankCardNumber")}</td>
              <td className='p-[10px_8px]'>{t("financial.debitcardbalanceoperator.balanceBeforeOperation")}</td>
              <td className='p-[10px_8px]'>{t("financial.debitcardbalanceoperator.balanceAfterOperation")}</td>
              <td className='p-[10px_8px]'>{t("financial.debitcardbalanceoperator.time")}</td>
            </tr>
          </thead>
          <tbody>
            {/* <tr className='bg-[#dfdfdf] border-grey hover:bg-[#e9e9e9]  border-b-[1px] text-xs'>
            </tr> */}
           
          </tbody>
        </table>
      </div>
    </>
  );
}
