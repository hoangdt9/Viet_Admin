import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import CustomSelect from '../../components/ui/select/Select';
import Select from 'react-tailwindcss-select';

const links = [
  {
    to: '/home',
    key: 'homePage',
    subLinks: []
  },
  {
    to: '/basic-information',
    key: 'basicInformation',
    subLinks: []
  },
  {
    to: '#',
    key: 'userRightsManagement',
    subLinks: [
      {
        to: '/permission-settings',
        key: 'permissionSettings'
      },
      {
        to: '/permission-group-list',
        key: 'permissionGroupList'
      }
    ]
  },
  {
    to: '#',
    key: 'financialManagement',
    subLinks: [
      {
        to: '/reconcilation-daily',
        key: 'reconcilationDaily'
      },
      {
        to: '/channel-report',
        key: 'channelReport'
      },
      {
        to: '/merchant-channel-report',
        key: 'merchantChannelReport'
      },
      {
        to: '/debit-card',
        key: 'debitCard'
      },
      {
        to: '/debit-card-entry-record',
        key: 'debitCardEntryRecord'
      },
      {
        to: '/debit-card-balance-operators',
        key: 'debitCardBalanceOperators'
      },
      {
        to: '/debit-card-report',
        key: 'debitCardReport'
      },
    ]
  },
  {
    to: '#',
    key: 'collectionManagement',
    subLinks: [
      {
        to: '/receipt-main-gate',
        key: 'receiptMainGate'
      },
      {
        to: '/bank-card-management',
        key: 'bankcardManagement'
      },
      {
        to: '/momo-management',
        key: 'momoManagement'
      },
      {
        to: '/vittlepay-management',
        key: 'vittlepayManagement'
      },
      {
        to: '/zalo-management',
        key: 'zaloManagement'
      },
      {
        to: '/device-management',
        key: 'deviceManagement'
      },
      {
        to: '/bank-balance-sheet',
        key: 'bankBalanceSheet'
      },
      {
        to: '/collection-daily',
        key: 'collecionDaily'
      },
      {
        to: '/receipt-report',
        key: 'receiptReport'
      },
    ]
  },
  {
    to: '#',
    key: 'releaseManagement',
    subLinks: [
      {
        to: '/issuer',
        key: 'issuer'
      },
      {
        to: '/issue-personnel-report',
        key: 'issuePersonnelReport'
      },
      {
        to: '/shift-list',
        key: 'shiftList'
      },
      {
        to: '/scheduling-overview',
        key: 'schedulingOverview'
      },
      {
        to: '/daily-report',
        key: 'dailyReport'
      },
      {
        to: '/bad-debit-list',
        key: 'badDebitList'
      },
      {
        to: '/bad-debit-report',
        key: 'badDebitReport'
      },
    ]
  },
  {
    to: '#',
    key: 'agentManagement',
    subLinks: [
      {
        to: '/proxy-list',
        key: 'proxyList'
      },
      {
        to: '/agency-profit-report',
        key: 'agencyProfitReport'
      },
      {
        to: '/agent-settlement-report',
        key: 'agentSettlementReport'
      },
      {
        to: '/agent-settlement-list',
        key: 'agentSettlementList'
      }
    ]
  },
  {
    to: '#',
    key: 'merchantManagement',
    subLinks: [
      {
        to: '/merchant-list',
        key: 'merchantList'
      },
      // {
      //   to: '/audit-list',
      //   key: 'auditList'
      // },
      {
        to: '/order-list',
        key: 'orderList'
      },
      {
        to: '/drop-list',
        key: 'dropList'
      },
      {
        to: '/refund-list',
        key: 'refundList'
      },
      {
        to: '/filling-list',
        key: 'fillingList'
      }
    ]
  },
  {
    to: '/settlement-list',
    key: 'settlementList',
    subLinks: []
  },
  {
    to: '/background-ip-whitelist',
    key: 'backgroundIpWhitelist',
    subLinks: []
  },
  {
    to: '/operation-log',
    key: 'operationLog',
    subLinks: []
  },
  {
    to: '/rollover',
    key: 'rollover',
    subLinks: []
  },
  {
    to: '#',
    key: 'googleAuthenticator',
    subLinks: []
  },
  {
    to: '#',
    key: 'changePassword',
    subLinks: []
  },
  {
    to: '/set-up',
    key: 'setUp',
    subLinks: []
  },
  {
    to: '#',
    key: 'accessGuide',
    subLinks: [
      {
        to: '/access-guide/payment-api',
        key: 'paymentAPI'
      }
    ]
  },
];

const functionItems = [
  'setUpAndIssueWithdrawals',
  'manualCollection',
  'attachALabel',
  'tabManagement',
  'orderConfirmation',
  'userPassword',
  'reissueNotice',
  'modifyAccount',
]

const MenuItem = ({ index, item, handleCheckboxChange }) => {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);

  const handleParentCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    handleCheckboxChange(item.key, newCheckedStatus);

    if (item.subLinks && item.subLinks.length > 0) {
      item.subLinks.forEach(subItem => {
        handleCheckboxChange(subItem.key, newCheckedStatus);
      });
    }
  };

  useEffect(() => {
    if (item.subLinks && item.subLinks.length > 0) {
      const allSubItemsChecked = item.subLinks.every(subItem => {
        return handleCheckboxChange(subItem.key);
      });

      setIsChecked(allSubItemsChecked);
    }
  }, [item.subLinks]);

  return (
    <li className={`${index % 2 === 0 ? 'bg-grey-light ' : ''}py-2 px-3`}>
      <label>
        <input type="checkbox" className="mr-3 text-primary rounded" checked={isChecked} onChange={handleParentCheckboxChange} />
        {t(`sidebar.${item.key}`)}
      </label>
      {item.subLinks && item.subLinks.length > 0 && (
        <ul>
          {item.subLinks.map(subItem => (
            <MenuItem
              key={subItem.key}
              item={subItem}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const SidebarMenu = ({ menuItems }) => {
  const handleCheckboxChange = (key, checked) => {
    // Perform backend operations based on the checkbox state change
    console.log(`Checkbox '${key}' checked: ${checked}`);
  };

  return (
    <ul>
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.key}
          index={index}
          item={item}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </ul>
  );
};

export default () => {
  const { t } = useTranslation();
  return (
    <div className="mt-6 mr-4 ml-4">
      <div className="h-full pt-5 pl-6 pr-6 bg-white dark:bg-dark">
        <div>
          <div className="relative overflow-hidden">
            {/* Start label and button section */}
            <div className="box-border h-full relative overflow-hidden flex text-[rgba(0,0,0,0.65)] ">
              <div className="outline-none w-full border-b border-[#d9d9d9] transition duration-300 flex flex-row justify-between">
                {/* Start Create a new permission group  */}
                <div className="overflow-hidden text-sm leading-6 relative whitespace-nowrap -mb-[1px] transition-all duration-300">
                  <div className="overflow-hidden -mb-[1px]">
                    <div className="overflow-hidden whitespace-nowrap">
                      <div className="pl-0 transition-transform duration-300 relative m-0 inline-block transform translate-x-0 translate-y-0 scale-100 list-none">
                        <div className="block bg-primary visible transform translate-x-0 translate-y-0 scale-100 w-[233px] transition-all duration-300 absolute left-0 bottom-[1px] h-[2px] origin-top-left">

                        </div>
                        <div className="mr-0 inline-block h-full relative pt-2 pb-2 pr-5 pl-5 transition-colors duration-300 cursor-pointer no-underline">
                          <font className='text-primary' >{t("userRightsManagement.permissionSettings.createNewPermissionGroup")}</font>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* button section */}
                <div className="">
                  <div className="leading-8">
                    <button className="text-[#fff] mr-1 inline-block 
                      mb-0 
                      font-medium 
                      text-center 
                      pointer-events-auto 
                      cursor-pointer 
                      bg-none 
                      border-transparent 
                      whitespace-nowrap 
                      leading-none 
                      px-4 
                      text-xs 
                      rounded 
                      h-7 
                      select-none 
                      transition-all 
                      duration-300 
                      ease-in-out 
                      relative bg-primary border-primary">
                        <font>{t("userRightsManagement.permissionSettings.createNewPermissionGroup")}</font>
                    </button>
                    <button className="text-[#fff] inline-block 
                      mb-0 
                      font-medium 
                      text-center 
                      pointer-events-auto 
                      cursor-pointer 
                      bg-none 
                      border-transparent 
                      whitespace-nowrap 
                      leading-none 
                      px-4 
                      text-xs 
                      rounded 
                      h-7 
                      select-none 
                      transition-all 
                      duration-300 
                      ease-in-out 
                      relative bg-primary border-primary">
                        <font>{t("userRightsManagement.permissionSettings.returnPermissionGroupList")}</font>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='flex'>
              <div className='w-1/2 pr-10'>
                <div className='flex mt-5 p-2'>
                  <div className='w-1/2 pr-5'>
                    <label for="mySelect" className="block text-[14px] text-[#rgba(0,0,0,0.65)]">{t("userRightsManagement.permissionSettings.selectGroupType")}</label>
                    <select placeholder='Merchant' id="mySelect" name="mySelect" className="min-w-[180px] text-xs px-2 py-[3px] text-base border border-grayCustom focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>{t('userRightsManagement.permissionSettings.merchant')}</option>
                        <option>{t('userRightsManagement.permissionSettings.subMerchant')}</option>
                        <option selected>{t('userRightsManagement.permissionSettings.superAdministrator')}</option>
                        <option>{t('userRightsManagement.permissionSettings.acting')}</option>
                        <option>{t('userRightsManagement.permissionSettings.squadLeader')}</option>
                    </select>
                  </div>
                  <div className='w-1/2 pl-5'>
                    <label for="mySelect" className="block text-[14px] text-[#rgba(0,0,0,0.65)]">{t("userRightsManagement.permissionSettings.selectGroupName")}</label>
                    <input placeholder='' className='w-full h-7 text-xs px-2 pl-3 pr-[7px] py-o text-base border border-grayCustom focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md' />
                  </div>
                </div>
                <div className='flex mt-5 p-2'>
                  <div className='w-1/2 pr-5'>
                    <div className='max-h-[600px] overflow-y-scroll'>
                      <SidebarMenu menuItems={links} />
                    </div>
                  </div>
                  <div className='w-1/2 pl-5'>
                  <div className='max-h-[600px] overflow-y-auto'>
                    <ul>
                      {
                        functionItems.map((item, index) => {
                          return (
                            <li key={index} className={`${index % 2 === 0 ? 'bg-grey-light ' : ''}py-2 px-3`}>
                              <label>
                                <input type="checkbox" className="mr-3 text-primary rounded" />
                                {t(`userRightsManagement.permissionSettings.${item}`)}
                              </label>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
                </div>
              </div>
              <div className='mt-7 w-1/2 pl-10'>
                <label>{t('userRightsManagement.permissionSettings.pleaseSetPeople')}:</label>
                <div className='flex w-full items-center'>
                  <div>
                    <Card
                      title={
                        <label>
                          <input type="checkbox" className="mr-3 text-primary rounded" />
                          0 {t('userRightsManagement.permissionSettings.items')}
                        </label>
                      }
                      className='w-[300px] h-[300px]'
                      size='small'
                      bordered={true}
                    >
                      <label className='block py-2'>
                        <input type="checkbox" className="mr-3 text-primary rounded" />
                        #10040-Download
                      </label>
                      <label className='block py-2'>
                        <input type="checkbox" className="mr-3 text-primary rounded" />
                        #10041-Payment
                      </label>
                      <label className='block py-2'>
                        <input type="checkbox" className="mr-3 text-primary rounded" />
                        #10046-jc8888
                      </label>
                      <label className='block py-2'>
                        <input type="checkbox" className="mr-3 text-primary rounded" />
                        #10049-fordev
                      </label>
                      <label className='block py-2'>
                        <input type="checkbox" className="mr-3 text-primary rounded" />
                        #10052-fordev1
                      </label>
                    </Card>
                  </div>
                  <div className='px-2 h-max text-center'>
                    <button className='block px-2 rounded text-white bg-primary'>{`< ${t('userRightsManagement.permissionSettings.moveOut')}`}</button>
                    <button className='block mt-2 px-2 rounded text-white bg-primary'>{`${t('userRightsManagement.permissionSettings.add')} >`}</button>
                  </div>
                  <div>
                    <Card
                        title={
                          <label>
                            <input type="checkbox" className="mr-3 text-primary rounded" />
                            0 {t('userRightsManagement.permissionSettings.items')}
                          </label>
                        }
                        className='w-[300px] h-[300px]'
                        size='small'
                        bordered={true}
                      >
                      </Card>
                  </div>
                </div>
                <div className='mt-10 text-center'>
                  <button className='mr-3 py-1 px-3 rounded text-white bg-primary hover:bg-primary-dark'>{t('userRightsManagement.permissionSettings.confirmAndSave')}</button>
                  <button className='py-1 px-3 rounded text-primary bg-grey-light'>{t('userRightsManagement.permissionSettings.reset')}</button>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}
