import React from 'react'
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const DailyReport = () => {
    const { t } = useTranslation();
  return (
    <>
        <div>
            <div className='flex w-full grid grid-cols-5 gap-3'>
                <div className='col-span-4'>
                    <div className='flex-wrap grid grid-cols-4 gap-3'>
                        <div className='p-2 rounded-[5px] bg-[#c468ef] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.flowOfDay')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>405,298,000 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#64a0ff] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.totalBalancePreviousDay')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>405,298,000 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#ff7b7b]  h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.merchantBalanceChange')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>+100,846,573,568 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#27b9c7] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.totalQuota')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>0 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#c468ef] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.feeIncome')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>0 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#64a0ff] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.endTotalMerchantBalance')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>405,298,000 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#ff7b7b] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.totalIssued')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>0 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                        <div className='p-2 rounded-[5px] bg-[#27b9c7] h-[100px] relative'>
                            <p className='pl-1 text-white text-[18px]'>{t('releaseManagement.dailyReport.totalRefunds')}:</p>
                            <p className='text-white text-[23px] absolute bottom-0 right-1'>0 <span className='text-[15px]'>Yuan</span></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='p-2 rounded-[5px] bg-[#64a0ff] h-full relative'>
                        <p className='pl-5 pt-5 text-white text-[18px]'>{t('releaseManagement.dailyReport.totalDeliveryFee')}:</p>
                        <p className='text-white text-[23px] absolute bottom-5 right-5'>405,298,000 <span className='text-[15px]'>Yuan</span></p>
                    </div>
                </div>
            </div>
            <div><span className='text-[12px] dark:text-white'>Send report</span></div>
            <div className='mt-[1px]'>
                <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.dailyReport.selectDate')} : </span>
                <DatePicker value = {dayjs(new Date())} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
            </div>
            <div className='mt-1'>
                <table className='text-[12px] w-full dark:text-white'>
                <thead>
                    <tr className='dark:bg-[#3e3c3b] bg-[#ece9e9]'>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.class')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.flowOnDuty')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.personnel')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.punchTime')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.quotaOfDay')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.sameDayTotalDelivery')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.bankFees')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.canceledOnTheDay')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.issuanceFee')}</th>
                        <th className=' py-[10px]'>{t('releaseManagement.dailyReport.numberOfTransactions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        Object.keys(debtList).length !== 0 ? 
                        debtList.map((item, key) => {
                        console.log(item);
                        return(
                            <>
                                <tr className='border-solid border-b-[1px] border-[#ece9e9]' key = {key}>
                                    <td className='text-center py-[10px] '>{item.type}</td>
                                    <td className='text-center py-[10px] '>{item.badDebtAmount}</td>
                                    <td className='text-center py-[10px] '>{item.creationTime}</td>
                                    <td className='text-center py-[10px] '>{item.processingTime}</td>
                                    <td className='text-center py-[10px] '>{item.state}</td>
                                    <td className='text-center py-[10px] '><button className='text-primary'>No record</button></td>
                                    <td className='text-center py-[10px] '><button className='text-primary'>edit</button> | <button className='text-primary'>deal with</button> | <button className='text-primary'>delete</button></td>
                                </tr>
                            </>
                        );
                    }) : <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]'>Empty data</tr>} */}
                </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default DailyReport;

