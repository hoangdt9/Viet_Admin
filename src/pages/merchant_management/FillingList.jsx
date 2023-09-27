import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import orderService from '../../services/merchantManagement/orderService';
import merchantService from '../../services/merchantManagement/merchant.service';
import dayjs from 'dayjs';

const FillingList = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { orders } = useSelector(state => state.merchantState);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [fillings, setFillings] = useState([]);

  async function myFunc() {
    const res = await merchantService.getAllFillings();
    if(res.success)
      {
        setFillings(res.Fillings);
        setTotalPage(res.Fillings.length);
      }
  }

  useEffect(() => {
    myFunc()
    // dispatch(orderService.getOrders("filling"));
  }, []);

  return (
    <>
      <div className='px-[24px] py-[20px] text-xs dark:text-white'>
        <div className='table-title'><span>{t('fillingList.title')}</span></div>
        <div className='table-contorl'>
          <ul className='flex flex-wrap'>
              <li className='flex items-center mr-5'>
                {t('fillingList.merchantId')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('fillingList.merchantId')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('fillingList.operatorId')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('fillingList.operatorId')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('fillingList.selectDate')}:
                <input
                type='date'
                className='ml-2 mr-1 p-[6px_7px] text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
                placeholder=''
                />
                ~
                <input
                type='date'
                className='ml-1 p-[6px_7px] text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
                placeholder=''
                />
              </li>
              <li className='flex items-center mr-5'>
                <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('fillingList.inquire')}</button>
              </li>
            </ul>
        </div>
        <div className='table-content mt-5'>
          <table className='w-full dark:text-grey-light text-left'>
            <thead>
              <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
                <th className='p-[10px_8px]'>{t('fillingList.#')}</th>
                <th className='p-[10px_8px]'>{t('fillingList.operator')}</th>
                <th className='p-[10px_8px]'>{t('fillingList.businessName')}</th>
                <th className='p-[10px_8px]'>{t('fillingList.settlementAmount')}</th>
                <th className='p-[10px_8px]'>{t('fillingList.handlingFee')}</th>
                <th className='p-[10px_8px]'>{t('fillingList.time')}</th>
                <th className='p-[10px_8px]'>{t('fillingList.remark')}</th>
              </tr>
            </thead>
            <tbody>
              {
                fillings?.slice(pageSize*(pageIndex-1), Math.min(pageSize*pageIndex, totalPage))?.map((item, key) => (
                  <tr className='border-grey border-b-[1px]' key = {key}>
                    <td className='p-[12px_8px]'>{key + 1}</td>
                    <td className='p-[12px_8px]'>
                        #10043-TK {t('fillingList.payment')}
                    </td>
                    <td className='p-[12px_8px]'>{item?.merchantId?.account}</td>
                    <td className='text-blue p-[12px_8px]'><span className='text-lg'>{item?.amount}</span> {t('fillingList.billionYuan')}</td>
                    <td><span className='text-lg'>0</span> {t('fillingList.yuan')}</td>
                    <td className='p-[12px_8px]'>{dayjs(item?.merchantId?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td>{item.remark}</td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
          <div class="flex items-center justify-end mt-4">
            <ul class="flex text-primary text-sm">
              <li class="ml-1" onClick={() => setPageIndex(Math.max(1, pageIndex - 1))}>
                <a href="#" class="mr-1 px-2 rounded dark:bg-grey-dark dark:text-white">{'<'}</a>
              </li>
              {
                new Array(Math.ceil(totalPage/pageSize)).fill('')?.map((merchant, key) => (
                  <li key={key} onClick={() => setPageIndex(key+1)}>
                    <a href="#" class="px-2 rounded text-white bg-primary dark:bg-grey-dark">{key + 1}</a>
                  </li>
                ))
              }
              <li class="ml-1" onClick={() => {setPageIndex(Math.min(totalPage, pageIndex + 1))}}>
                <a href="#" class="ml-1 px-2 rounded dark:bg-grey-dark dark:text-white">{'>'}</a>
              </li>
            </ul>
            {/* <select className='ml-5 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'>
              <option value='10' selected>10 items/page</option>
              <option value='30'>30 items/page</option>
              <option value='50'>50 items/page</option>
              <option value='100'>100 items/page</option>
            </select> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default FillingList;
