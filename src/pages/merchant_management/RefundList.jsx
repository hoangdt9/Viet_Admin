import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import orderService from '../../services/merchantManagement/orderService';
import dayjs from 'dayjs';

const RefundList = () => {
  const { t } = useTranslation();
  const states = ['Processing', 'refundComplete', 'RefundFailed'];
  const accoutStatus = ['freeze', 'normal'];

  const dispatch = useDispatch();

  const { orders, refundingLists } = useSelector(state => state.merchantState);

  useEffect(() => {
    dispatch(orderService.getAllRefundingOrders());
  }, []);

  console.log(orders);
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
        <div className='table-title'><span>{t('refundList.title')}</span></div>
        <div className='table-contorl'>
          <ul className='flex flex-wrap'>
          <li className='flex items-center mr-5'>
              {t('refundList.state')}:
              <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                {
                    states.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('refundList.states.'+item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
                {t('refundList.merchantId')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('refundList.merchantId')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('refundList.orderId')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('refundList.orderId')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('refundList.merchantOrderId')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('refundList.merchantOrderId')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('refundList.selectDate')}:
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
              <li className='flex items-center mr-5'>
                <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('refundList.inquire')}</button>
              </li>
            </ul>
        </div>
        <div className='table-content mt-5'>
          <table className='w-full dark:text-grey-light text-left'>
            <thead>
              <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
                <th className='p-[10px_8px]'>{t('refundList.#')}</th>
                <th className='p-[10px_8px]'>{t('refundList.orderId')}</th>
                <th className='p-[10px_8px]'>{t('refundList.merchantId')}</th>
                <th className='p-[10px_8px]'>{t('refundList.merchantOrderId')}</th>
                <th className='p-[10px_8px]'>{t('refundList.state')}</th>
                <th className='p-[10px_8px]'>{t('refundList.reasonForReturn')}</th>
                <th className='p-[10px_8px]'>{t('refundList.refundAmount')}</th>
                <th className='p-[10px_8px]'>{t('refundList.applicationTime')}</th>
                {/* <th className='p-[10px_8px]'>{t('refundList.operate')}</th> */}
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                refundingLists.length !== 0 ?
                (
                  refundingLists.map((l, key) => (
                    <>
                      <td className='p-[10px_8px] text-left'>
                        {key+1}
                      </td>
                      <td className='p-[10px_8px] text-left'>{l.outTradeNo}</td>
                      <td className='p-[10px_8px] text-left'>{l?.merchantId?._id}</td>
                      <td className='p-[10px_8px] text-left'>{l._id}</td>
                      <td className='p-[10px_8px] text-left'>{l.status}</td>
                      <td className='p-[10px_8px] text-left'>{l.refundedReason}</td>
                      <td className='p-[10px_8px] text-left'>{l.orderAmount}</td>
                      <td className='p-[10px_8px] text-left'>{dayjs(l.createdAt).format("YYYY:MM:DD")}</td>
                      {/* <td className='p-[10px_8px] text-left'>operate</td> */}
                    </>
                  ))
                ) :
                <tr className='border-grey border-b-[1px]'>
                  <td colspan="10">
                      <span>
                        {t('refundList.noData')}
                      </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RefundList;
