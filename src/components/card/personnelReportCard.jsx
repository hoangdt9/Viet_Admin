import React, { Component }  from 'react';

import { useTranslation } from 'react-i18next';

export default ({header, singular, amountMoney, handingFee}) => {

    const { t } = useTranslation();
    
    return (
        <>
         <div className='m-[10px] w-full rounded-[7px] border-solid border-[1px] border-[#417df8] m-[3px] text-start dark:text-white'>
            <div className='px-[10px] rounded-t-[7px] py-[10px] bg-[#d8e4fd] text-primary'>{header}</div>
            <div className='py-[2px]'>
                <div className='pt-[10px] px-[10px]'><div className=' pb-[20px] border-b-[1px] border-solid border-primary'>{`${t('releaseManagement.persnonelReport.singular')} :    ${singular}`}</div></div>
                <div className='pt-[10px] px-[10px]'><div className=' pb-[20px] border-b-[1px] border-solid border-primary'>{`${t('releaseManagement.persnonelReport.amountOfMoney')} :   ${amountMoney}`}</div></div>
                <div className='px-[10px] py-[5px] pb-[20px]'>{`${t('releaseManagement.persnonelReport.handlingFee')} :    ${handingFee}`}</div>
            </div>
         </div>
        </>
    )
}