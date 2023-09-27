import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import orderService from '../../services/merchantManagement/orderService';

const DropList = () => {
  const { t } = useTranslation();
  const states = ['Processing', 'paired', 'deleted'];

  const dispatch = useDispatch();

  const { orders } = useSelector(state => state.merchantState);

  useEffect(() => {
    dispatch(orderService.getOrders("dropped"));
  }, []);

  const tableData = [];

  if(Object.keys(orders).length !== 0){
    orders.map((item, key) => {
        tableData.push({
          id : item.outTradeNo,
          amount : item.orderAmount,
          time : item.createdAt
        });
    });
}

  return (
    <>
      <div className='px-[24px] py-[20px] text-xs dark:text-white'>
        <div className='table-title'><span>{t('dropList.title')}</span></div>
        <div className='table-contorl'>
          <ul className='flex flex-wrap'>
          <li className='flex items-center mr-5'>
              {t('dropList.state')}:
              <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                {
                    states.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('dropList.states.'+item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
                {t('dropList.notificationContent')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('dropList.notificationContent')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('dropList.theAmount')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('dropList.theAmount')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('dropList.notificationSource')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('dropList.notificationSource')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('dropList.selectDate')}:
                <input
                type='date'
                className='ml-1 p-[6px_7px] text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
                placeholder=''
                />
                ~
                <input
                type='date'
                className='ml-1 mr-1 p-[6px_7px] text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
                placeholder=''
                />
              </li>
            </ul>
            <ul className='flex flex-wrap'>
              <li className='flex items-center mr-5'>
                 {t('dropList.classification')}:
                  <button className='text-white border border-white hover:border-primary bg-customPurple rounded p-[4px_10px] ml-2'>
                    {t('dropList.momo')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-lightBlue rounded p-[4px_10px] ml-1'>
                    {t('dropList.zal')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-lightPurple rounded p-[4px_10px] ml-1'>
                    {t('dropList.viettel')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-red rounded p-[4px_10px] ml-1'>
                    {t('dropList.tcb')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-yellow rounded p-[4px_10px] ml-1'>
                    {t('dropList.acb')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-green rounded p-[4px_10px] ml-1'>
                    {t('dropList.vcb')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-blue rounded p-[4px_10px] ml-1'>
                    {t('dropList.vtb')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-green rounded p-[4px_10px] ml-1'>
                    {t('dropList.bid')}
                    V</button>
                  <button className='text-white border border-white hover:border-primary bg-yellow rounded p-[4px_10px] ml-1'>
                    {t('dropList.stb')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-blue rounded p-[4px_10px] ml-1'>
                    {t('dropList.exi')}
                    M</button>
                  <button className='text-white border border-white hover:border-primary bg-red rounded p-[4px_10px] ml-1'>
                    {t('dropList.mbb')}
                    ANK</button>
                  <button className='text-white border border-white hover:border-primary bg-green rounded p-[4px_10px] ml-1'>
                    {t('dropList.vpb')}
                    </button>
                  <button className='text-white border border-white hover:border-primary bg-blue rounded p-[4px_10px] ml-1'>
                    {t('dropList.tpb')}
                    </button>
                </li>
                <li className='flex items-center mr-5'>
                  <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('dropList.quire')}</button>
                </li>
            </ul>
        </div>
        <div className='table-content mt-5'>
          <div>
            <button className='mr-1 p-[0px_20px] h-[30px] dark:text-white  bg-white border border-grey dark:border-white rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-dark disabled:cursor-not-allowed' disabled >{t('dropList.batchDeletion')}</button>
          </div>
          <table className='w-full dark:text-grey-light text-left'>
            <thead>
              <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
                <th className='p-[10px_8px] flex items-center'>
                  <div className='w-max'>
                    <input type='checkbox' className='rounded cursor-pointer' /><span className='ml-2'>#</span>
                  </div>
                </th>
                <th className='p-[10px_8px]'>{t('dropList.amountOfMoney')}</th>
                <th className='p-[10px_8px]'>{t('dropList.source')}</th>
                <th className='p-[10px_8px]'>{t('dropList.content')}</th>
                <th className='p-[10px_8px]'>{t('dropList.reason')}</th>
                <th className='p-[10px_8px]'>{t('dropList.state')}</th>
                <th className='p-[10px_8px]'>{t('dropList.time')}</th>
                <th className='p-[10px_8px]'>{t('dropList.orperate')}</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((item, key) => {
                  return(
                    <tr className='border-grey border-b-[1px]' key = {key}>
                      <td className='p-[10px_8px]'>
                        <div className='flex'>
                          <input type='checkbox' className='rounded cursor-pointer' /><span className='ml-2'>{item.id}</span>
                        </div>
                      </td>
                      <td className='text-primary text-lg p-[10px_8px]'>
                        {item.amount}
                      </td>
                      <td className='p-[10px_8px]'>
                        TCB#12-HOANG THI HUONG
                      </td>
                      <td className='p-[10px_8px]'>
                        <div>
                          {t('dropList.SMS_assistant_automatically_forwarded_from')}
                        </div>
                        <div>
                          {t('dropList.techcombankTime')}: 2021-10-27 03:12:56 {t('dropList.content')}: TK 19037155539013 So tien GD: 250000 So du: 15,623,683 1071032
                        </div>
                      </td>
                      <td className='p-[10px_8px]'>
                        {t('dropList.actual_payment_amount_is_incorrect_with_paied_order')} #1071032
                      </td>
                      <td className='text-base p-[12px_8px]'>
                        <button className='text-xs mr-1 p-[4px_8px] text-green rounded bg-green-light hover:opacity-75'>{t('dropList.processing')}</button>
                      </td>
                      <td className='text-base p-[12px_8px]'>
                        {item.time}
                      </td>
                      <td>
                        <div className='flex items-center'>
                          <button className='w-max p-[4px_8px] text-xs border rounded border-grey dark:bg-grey-dark hover:border-primary'>{t('dropList.pairingOrder')}</button>
                          <button className='ml-1 p-[4px_8px] text-xs text-primary dark:text-white border rounded border-grey dark:bg-grey-dark hover:border-primary'>{t('dropList.delete')}</button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DropList;
