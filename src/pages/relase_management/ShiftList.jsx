import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import AddShift from '../../components/addModal/AddShift';
import AddSchedule from '../../components/addModal/AddSchedule';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const {t} = useTranslation();

    const schedule = [
        {
            index : "#1",
            shift : "spa1",
            working : "00:00",
            offworktime : "11:59",
        },
        {
            index : "#1",
            shift : "spa1",
            working : "00:00",
            offworktime : "11:59",
        },
        {
            index : "#1",
            shift : "spa1",
            working : "00:00",
            offworktime : "11:59",
        }
    ];

    const basic = [
        {
            class : "spa 1",
            personnel : "xiafa01",
            responsibilityTime : "00:00 ~ 11:59"
        }
    ];

    const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
    const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);

    const handleAddShiftModal = (state) => {
        setIsAddShiftOpen(state);
    };

    const handleAddScheduleModal = (state) => {
        setIsAddScheduleOpen(state);
    }

    return (
        <>
          <div className='px-[20px] py-[20px]'>
            <div className='flex justify-between'>
                <span className='text-[12px]'>{t('releaseManagement.shiftList.scheduleList')}</span>
                <button
                    type="button"
                    className="items-center bg-primary text-[12px] px-[15px] py-[3px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
                    onClick={handleAddShiftModal}
                >
                    {t('releaseManagement.shiftList.newShift')}
                </button>
            </div>
            <div className='mt-[5px]'>
                <table className='text-[12px] w-full dark:text-white'>
                    <thead>
                        <tr className='dark:bg-[#3e3c3b] bg-[#ece9e9]'>
                            <th className=' py-[10px]'>{"#"}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.shift")}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.workingHours")}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.offWorkTime")}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.operate")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, key) => {
                            console.log(item);
                            return(
                                <>
                                    <tr className='border-solid border-b-[1px] border-[#ece9e9]' key = {key}>
                                        <td className='text-center py-[10px] '>{item.index}</td>
                                        <td className='text-center py-[10px] '>{item.shift}</td>
                                        <td className='text-center py-[10px] '>{item.working}</td>
                                        <td className='text-center py-[10px] '>{item.offworktime}</td>
                                        <td className='text-center py-[10px] '><button className='text-primary' onClick={handleAddShiftModal}>edit</button></td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='mt-[30px] flex justify-between'>
                <span className='text-[12px]'>{t('releaseManagement.shiftList.basicScheduleSetting')}</span>
                <div>
                    <button
                        type="button"
                        className="mr-[3px] items-center bg-primary text-[12px] px-[15px] py-[3px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
                        
                    >
                        {t('releaseManagement.shiftList.generateSchedule')}
                    </button>
                    <button
                        type="button"
                        className="items-center bg-primary text-[12px] px-[15px] py-[3px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
                        onClick={handleAddScheduleModal}
                    >
                        {t('releaseManagement.shiftList.addBasicSchedule')}
                    </button>
                </div>
            </div>
            <div className='mt-[5px]'>
                <table className='text-[12px] w-full dark:text-white'>
                    <thead>
                        <tr className='dark:bg-[#3e3c3b] bg-[#ece9e9]'>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.class")}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.personnel")}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.responsibilityTime")}</th>
                            <th className=' py-[10px]'>{t("releaseManagement.shiftList.operate")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        Object.keys(schedule).length !== 0 ? 
                        basic.map((item, key) => {
                            return(
                                <>
                                    <tr className='border-solid border-b-[1px] border-[#ece9e9]' key = {key}>
                                        <td className='text-center py-[10px] '>{item.class}</td>
                                        <td className='text-center py-[10px] '>{item.personnel}</td>
                                        <td className='text-center py-[10px] '>{item.responsibilityTime}</td>
                                        <td className='text-center py-[10px] '><button className='text-primary'>Adjustment</button>  |  <button className='text-primary'>delete</button></td>
                                    </tr>
                                </>
                            );
                        }) : <tr className='border-solid border-b-[1px] border-[#ece9e9]'> Empty Data</tr>
                        }
                    </tbody>
                </table>
            </div>
          </div>
          <AddShift 
            isOpen={isAddShiftOpen}
            onClose={handleAddShiftModal}
          />
           <AddSchedule 
            isOpen={isAddScheduleOpen}
            onClose={handleAddScheduleModal}
          />
        </>
    )
}