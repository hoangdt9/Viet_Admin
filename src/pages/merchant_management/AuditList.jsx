import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  const userLists = ['xiafa', 'jianchi'];
  const accountStatuses = ['freeze', 'normal'];
  const superiorIDs = ['directly', 'shabi'];
  const moreOperations = ['fillingList', 'checkTheDetails', 'interfaceWhitelist', 'freeze', 'clearData', 'ResetLoginPassword', 'delete', 'modifyAccount', 'checkTheFolloingDetails', 'operationLog', 'deactivateGoogleAuthenticator' ];
  return (
    <>
      <div className='px-[24px] py-[20px] text-xs dark:text-white'>
        <div className='table-title'><span>{t('auditList.title')}</span></div>
        <div className='table-contorl'>
          <ul className='flex flex-wrap'>
            <li className='flex items-center mr-5'>
            {t('auditList.findUser')}:
              <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('auditList.usernameOrId')}</option>
                {
                    userLists.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('auditList.userLists.' + item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
                {t('auditList.accountStatus')}:
                <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                  <option disabled selected hidden>{t('auditList.accountStatus')}:</option>
                  {
                      accountStatuses.map((item, i) => {
                        return(
                          <option key={i} value={item}>{t('auditList.accountStatuses.' + item)}</option>
                        )
                      })
                    }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
                {t('auditList.account')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('auditList.contactInformation')}/> 
              </li>
              <li className='flex items-center mr-5'>
                {t('auditList.name')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('auditList.name')} /> 
              </li>
              <li className='flex items-center mr-5'>
                {t('auditList.superiorId')}:
                <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                  <option disabled selected hidden>{t('auditList.superiorNameOrId')}</option>
                  {
                      superiorIDs.map((item, i) => {
                        return(
                          <option key={i} value={item}>{t('auditList.superiorIDs.' + item)}</option>
                        )
                      })
                    }
                </select>
              </li>
              <li className='flex items-center mr-5'>
                <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('auditList.query')}(8)</button>
                <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('auditList.editUserGroup')}</button>
              </li>
            </ul>
            <ul className='mt-1'>
              <li className='p-[20px_0px]'>
                <label><span className='text-primary'>{t('auditList.labelQuery')}</span>:</label>
              </li>
              <li>
                <label>{t('auditList.slectStatisticalDate')}</label>
                <input
                type='date'
                className='ml-2 p-[6px_7px] text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
                placeholder=''
                />
              </li>
            </ul>
        </div>
        <div className='table-content mt-5'>
          <table className='w-full dark:text-grey-light text-left'>
            <thead>
              <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
              <th className='p-[10px_8px]'>{t('auditList.id')}</th>
                <th className='p-[10px_8px]'>{t('auditList.nickName')}</th>
                <th className='p-[10px_8px]'>{t('auditList.superior')}</th>
                <th className='p-[10px_8px]'>{t('auditList.approvalStatus')}</th>
                <th className='p-[10px_8px]'>{t('auditList.accountStatus')}</th>
                <th className='p-[10px_8px]'>{t('auditList.paymentRate')}</th>
                <th className='p-[10px_8px]'>{t('auditList.operate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-grey border-b-[1px]'>
                <td className='p-[12px_8px]'>10039</td>
                <td className='text-primary p-[12px_8px]'>
                  <div>
                    {t('auditList.userLists.xiafa')}
                  </div>
                  <button className='mt-1 h-[22px] w-[30px] text-black border-grey dark:text-white dark:bg-[#3e3c3b] hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary border border-dashed rounded'>+</button>
                </td>
                <td className='text-primary p-[12px_8px]'>{t('auditList.directlyUnderSuperior')}</td>
                <td className='text-base p-[12px_8px]'>
                  <button className='text-xs mr-1 p-[4px_8px] text-red rounded bg-red-light hover:opacity-75'>{t('auditList.notReviewed')}</button>
                </td>
                <td className='text-base p-[12px_8px]'>
                  <button className='text-xs mr-1 p-[4px_8px] text-green rounded bg-green-light hover:opacity-75'>{t('auditList.normal')}</button>
                </td>
                <td className='text-base p-[12px_8px]'>
                  <button className='text-xs mr-1 p-[4px_8px] text-red rounded bg-red-light hover:opacity-75 w-max'>{t('auditList.payOnBehalf:Open')} 0.00%</button>
                </td>
                <td className='p-[12px_8px]'>
                  <div>
                    <a className='text-primary'>{t('auditList.innerFilling')}</a>
                    <span className='mx-2 text-xs text-grey'>|</span>
                    <a className='text-primary'>{t('auditList.paymentVerification[Close]')}</a>
                    <span className='mx-2 text-xs text-grey'>|</span>
                    <a className='text-primary'>{t('auditList.merchantReport')}</a>
                    <span className='mx-2 text-xs text-grey'>|</span>
                    <a className='text-primary'>{t('auditList.review')}</a>
                  </div>
                  <select class="ml-1 mb-1 py-1 text-xs cursor-pointer duration-300 dark:bg-dark light:bg-white border-none text-primary focus:outline-none filter-[primary]">
                  <option disabled selected hidden>{t('auditList.moreOperation')}</option>
                  {
                      moreOperations.map((item, i) => {
                        return(
                          <option key={i} value={item}>{t('auditList.moreOperations.' + item)}</option>
                        )
                      })
                    }
                </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-end mt-4">
            <ul class="flex text-primary text-sm">
              <li class="ml-1">
                <a href="#" class="mr-1 px-2 rounded dark:bg-grey-dark dark:text-white">{'<'}</a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-white bg-primary dark:bg-grey-dark">1</a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-gray-700 dark:bg-grey-dark">2</a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-gray-700 dark:bg-grey-dark">3</a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-gray-700 dark:bg-grey-dark">4</a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-grey">•••</a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-gray-700 dark:bg-grey-dark">10</a>
              </li>
              <li class="ml-1">
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
