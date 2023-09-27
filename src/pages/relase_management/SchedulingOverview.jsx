import React, {useState} from 'react';

import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { DatePicker } from 'antd';

import ScheduleCard from '../../components/card/scheduleCard';

const SchedulingOverview = () => {

    const { t } = useTranslation();

    const schedule = [
        {
            name : "xiafa01",
            mon : {},
            tue : {
                shift : "sp1",
                duration : "00:00 ~ 11:59"
            },
            wed : {
                shift : "sp1",
                duration : "00:00 ~ 11:59"
            },
            tur : {
                shift : "sp1",
                duration : "00:00 ~ 11:59"
            },
            fri : {
                shift : "sp1",
                duration : "00:00 ~ 11:59"
            },
            sat : {
                shift : "sp1",
                duration : "00:00 ~ 11:59"
            },
            sun : {
                shift : "sp1",
                duration : "00:00 ~ 11:59"
            },
        }
    ];

    return(
        <>
            <div>
                <div>
                    <DatePicker value = {dayjs(new Date())} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
                </div>
                <div className='mt-5 p-1'>
                    <table className='text-xs text-left w-full'>
                        <thead className='dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9]'>
                            <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]'>
                                <th className='text-start' colSpan={8}>~</th>
                            </tr>
                            <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]'>
                                <th className='p-2'>{t('releaseManagement.schedulingOverview.name')}</th>
                                <th>{t('releaseManagement.schedulingOverview.monday')}</th>
                                <th>{t('releaseManagement.schedulingOverview.tuesday')}</th>
                                <th>{t('releaseManagement.schedulingOverview.wednesday')}</th>
                                <th>{t('releaseManagement.schedulingOverview.thursday')}</th>
                                <th>{t('releaseManagement.schedulingOverview.friday')}</th>
                                <th>{t('releaseManagement.schedulingOverview.saturday')}</th>
                                <th>{t('releaseManagement.schedulingOverview.sunday')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(schedule).length !== 0 ? 
                                schedule.map((item, key) => {
                                    return(
                                        <>
                                            <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]' key = {key}>
                                                <td className='p-2'>{item.name}</td>
                                                <td className='text-center p-2'>{Object.keys(item.mon).length !== 0 ? <ScheduleCard shift={item.mon.shift} duration={item.mon.duration} />  : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                                <td className='text-center p-2'>{Object.keys(item.tue).length !== 0 ? <ScheduleCard shift={item.tue.shift} duration={item.tue.duration} /> : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                                <td className='text-center p-2'>{Object.keys(item.wed).length !== 0 ? <ScheduleCard shift={item.wed.shift} duration={item.wed.duration} /> : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                                <td className='text-center p-2'>{Object.keys(item.tur).length !== 0 ? <ScheduleCard shift={item.tur.shift} duration={item.tur.duration} /> : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                                <td className='text-center p-2'>{Object.keys(item.fri).length !== 0 ? <ScheduleCard shift={item.fri.shift} duration={item.fri.duration} /> : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                                <td className='text-center p-2'>{Object.keys(item.sat).length !== 0 ? <ScheduleCard shift={item.sat.shift} duration={item.sat.duration} /> : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                                <td className='text-center p-2'>{Object.keys(item.sun).length !== 0? <ScheduleCard shift={item.sun.shift} duration={item.sun.duration} /> : <button className='px-[7px] py-[3px] border border-grey rounded-[3px] hover:border-indigo-300'>{t('releaseManagement.schedulingOverview.addSchedule')}</button>}</td>
                                            </tr>
                                        </>
                                    )
                                }) : <tr className='dark:text-white dark:bg-[#3e3c3b] bg-white border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9] h-[37px]'>Empty data</tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default SchedulingOverview;