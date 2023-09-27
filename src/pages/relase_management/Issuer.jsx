import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import AddNewDispatcher from "../../components/addModal/AddNewDispatcher";

import dayjs from 'dayjs';
import { DatePicker } from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { t } = useTranslation();

  const [isNewDispatcherOpen, setNewDispatcherOpen] = useState(false);

  const handleNewDispatcherModal = (state) => {
    setNewDispatcherOpen(state);
  };

  return (
    <>
      <div className='px-[20px] py-[20px]'>
        <div><span className='text-[12px] dark:text-white'>{t('releaseManagement.issuer.issueListPersonnel')}</span></div>
        <div>
          <button
            type="button"
            className="items-center bg-primary text-[12px] px-[15px] py-[3px] text-sm font-semibold text-white focus:z-10 border-gray-300 rounded-[4px] mr-[3px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
          >
            {t('releaseManagement.issuer.clickToRefresh')}
          </button> 
          <button
            type="button"
            className="items-center bg-primary text-[12px] px-[15px] py-[3px] text-sm font-semibold text-white focus:z-10 rounded-[4px] dark:border-primary dark:border-solid dark:border-[1px] dark:bg-transparent"
            onClick={() => handleNewDispatcherModal(true)}
          >
            {t('releaseManagement.issuer.addNewDispatcher')}
          </button>
        </div>
        <div className='mt-[1px]'>
          <span className='text-[12px] mr-[2px] dark:text-white'>{t('releaseManagement.issuer.selectDate')} : </span>
          <DatePicker value = {dayjs(new Date())} className='text-[12px] hover:border-primary dark:bg-transparent dark:border-solid dark:border-[1px] dark:border-white dark:text-white' />
        </div>
        <div className='text-[12px]'>
          <table className="w-full text-left overflow-hidden border-collapse rounded-t-[4px] mt-[5px]">
            <thead className="dark:bg-[#3e3c3b] bg-[#ece9e9] h-[56px] border-b-[1px] dark:border-[#8d8b8b] border-[#ece9e9]">
              <tr className = "dark:text-white">
                <th className="w-[120px] py-[10px] px-[8px]">
                  <div className="flex">
                    <span className="flex items-center justify-center cursor-pointer w-[17px] h-[17px] text-center bg-[#2e8be8] leading-[14px] border border-solid border-[#e9e9e9]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 stroke-2"
                      >
                        <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                      </svg>
                    </span>
                    <span className="ml-[5px]">{t('releaseManagement.issuer.collapseAll')}</span>
                  </div>
                </th>
                <th className="w-[45px] py-[10px] px-[8px]">{t('releaseManagement.issuer.id')}</th>
                <th className="w-[70px] py-[10px] px-[8px]">{t('releaseManagement.issuer.nickName')}</th>
                <th className="w-[55px] py-[10px] px-[8px]">{t('releaseManagement.issuer.account')}</th>
                <th className="w-[70px] py-[10px] px-[8px]">{t('releaseManagement.issuer.account')}</th>
                <th className="w-[175px] py-[10px] px-[8px]">
                {t('releaseManagement.issuer.numberOfMonthlySettlements')}
                </th>
                <th className="w-[67px] py-[10px] px-[8px]">{t('releaseManagement.issuer.debitCard')}</th>
                <th className="w-[88px] py-[10px] px-[8px]">{t('releaseManagement.issuer.bindMerchant')}</th>
                <th className="w-[450px] py-[10px] px-[8px]">{t('releaseManagement.issuer.operate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:hover:bg-[#4d465e] hover:bg-[#f5ddc1] h-[56px] border-b-[2px] dark:border-[#aca9a9] border-[#ece9e9]">
                <td className="w-[120px] py-[10px] px-[8px]">
                  <div className="flex items-center justify-center">
                    <span className="flex items-center justify-center cursor-pointer w-[17px] h-[17px] text-center bg-white leading-[14px] border border-solid border-[#e9e9e9]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 stroke-2"
                      >
                        <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                      </svg>
                    </span>
                  </div>
                </td>
                <td className="w-[45px] py-[10px] px-[8px] dark:text-white"> 10053</td>
                <td className="w-[70px] py-[10px] px-[8px] dark:text-white">xiafa01</td>
                <td className="w-[55px] py-[10px] px-[8px] dark:text-white">xiafa01</td>
                <td className="w-[70px] py-[10px] px-[8px] dark:text-white">xiafa01</td>
                <td className="w-[175px] py-[10px] px-[8px] dark:text-white">0 strokes</td>
                <td className="w-[67px] py-[10px] px-[8px] text-primary">
                  2 sheets
                </td>
                <td className="w-[88px] py-[10px] px-[8px] dark:text-white"></td>
                <td className="w-[450px] py-[10px] px-[8px] text-primary">
                  <span>{t('releaseManagement.issuer.addPaymentCard')}</span>
                  <span className="mx-2.5 dark:text-white text-[#ece9e9]">|</span>
                  <span>{t('releaseManagement.issuer.addNewBindingMerchant')}</span>
                  <span className="mx-2.5 dark:text-white text-[#ece9e9]">|</span>
                  <span>{t('releaseManagement.issuer.changeUsername')}</span>
                  <span className="mx-2.5 dark:text-white text-[#ece9e9]">|</span>
                  <span>{t('releaseManagement.issuer.modifyAccount')}</span>
                </td>
              </tr>
              <tr className="dark:hover:bg-[#4d465e] hover:bg-[#f5ddc1] h-[56px] border-b-[2px] dark:border-[#aca9a9] border-[#ece9e9]">
                <td className="w-[120px] py-[10px] px-[8px]">
                  <div className="flex items-center justify-center">
                    <span className="flex items-center justify-center cursor-pointer w-[17px] h-[17px] text-center bg-white leading-[14px] border border-solid border-[#e9e9e9]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 stroke-2"
                      >
                        <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                      </svg>
                    </span>
                  </div>
                </td>
                <td className="w-[45px] py-[10px] px-[8px] dark:text-white"> 10053</td>
                <td className="w-[70px] py-[10px] px-[8px] dark:text-white">xiafa01</td>
                <td className="w-[55px] py-[10px] px-[8px] dark:text-white">xiafa01</td>
                <td className="w-[70px] py-[10px] px-[8px] dark:text-white">xiafa01</td>
                <td className="w-[175px] py-[10px] px-[8px] dark:text-white">0 strokes</td>
                <td className="w-[67px] py-[10px] px-[8px] text-primary dark:text-white">
                  2 sheets
                </td>
                <td className="w-[88px] py-[10px] px-[8px] dark:text-white"></td>
                <td className="w-[450px] py-[10px] px-[8px] text-primary">
                <span>{t('releaseManagement.issuer.addPaymentCard')}</span>
                  <span className="mx-2.5 dark:text-white text-[#ece9e9]">|</span>
                  <span>{t('releaseManagement.issuer.addNewBindingMerchant')}</span>
                  <span className="mx-2.5 dark:text-white text-[#ece9e9]">|</span>
                  <span>{t('releaseManagement.issuer.changeUsername')}</span>
                  <span className="mx-2.5 dark:text-white text-[#ece9e9]">|</span>
                  <span>{t('releaseManagement.issuer.modifyAccount')}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddNewDispatcher
        isOpen={isNewDispatcherOpen}
        onClose={handleNewDispatcherModal}
      />
    </>
  );
}
