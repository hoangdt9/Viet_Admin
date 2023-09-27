import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { Popconfirm, Popover, Modal, Select, Radio, Dropdown, Menu, Input } from 'antd';
import { OrangeButton } from '../../components/ui/button/AgentManagement';
import classnames from 'classnames';
import MainModal from './Modal';
import merchantService from '../../services/merchantManagement/merchant.service';
import groupListService from '../../services/permission/groupListService';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const MerchantList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userLists = ['xiafa', 'jianchi'];
  const accountStatuses = ['freeze', 'normal'];
  const superiorIDs = ['directly', 'shabi'];
  const moreOperations = ['fillingList', 'checkTheDetails', 'interfaceWhitelist', 'freeze', 'clearData', 'ResetLoginPassword', 'delete', 'modifyAccount', 'checkTheFolloingDetails', 'operationLog', 'deactivateGoogleAuthenticator' ]
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { allMerchants } = useSelector(state => state.permissionState);
  const [popUpName, setPopUpName] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [modalName, setModalName] = useState("merchant_list");
  const [bindTag, setBindTag] = useState(-1)
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState();
  // const [modifyAccount, setModifyAccount] = useState('');
  
  useEffect(() => {
    dispatch(groupListService.getMerchants());
  }, [dispatch]);
  
  const onCancelHandler = () => {
    setIsOpenModal(false)
  }

  const bindHide = () => {
    setBindTag(-1);
  };

  const bindHandleOpenChange = (key, name) => {
    if (bindTag !== key) {
      {
        setBindTag(key);
        setPopUpName(name);
      }
    } else bindHide();
  };

  const NickNameBody = () => (
    <div className="py-1 flex gap-x-2">
      <Select className="flex-1 min-w-[160px]" mode="multiple" placeholder={t('agentmanagement.merchant.selectTab')}>
      </Select>
      <OrangeButton label={t('agentmanagement.merchant.confirmationAddition')} onClickHandler={bindHide}/>
    </div>
  )

  const ClearDataBody = () => (
    <div className='p-3 flex flex-col gap-y-3'>
      <p className='max-w-[100px] text-xs'>{t('agentmanagement.merchant.clearUserProfileConfirmation')}</p>
      <div className='w-full flex justify-end'>
        <div className='flex justify-center gap-x-2 items-end'>
          <button className='py-[6px] px-[12px] rounded-md text-xs border-[rgba(0,0,0,0.65)] border text-[rgba(0,0,0,0.65)]' onClick={bindHide}>
            {t('agentmanagement.merchant.cancel')}
          </button>
          <OrangeButton label={t('agentmanagement.merchant.sure')} onClickHandler={bindHide} />
        </div>
      </div>
    </div>
  )

  const ModifyAccountBody = () => {
    const [modifyAccount, setModifyAccount] = useState(selectedItem?.account)
    return (
      <div className='p-3 flex justify-center gap-x-1'>
        <Input className="border !border-[#d9d9d9] rounded-md text-xs" value={modifyAccount} onChange={(e) => {
          setModifyAccount(e.target.value)
        }} />
        <OrangeButton label={t('agentmanagement.merchant.sure')} onClickHandler={(e) => onClickModifyAccountHandler(modifyAccount, selectedItem?._id)} />
      </div>
    )
  }

  const NickNameHeader = () => (
    <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
      <p>{t('agentmanagement.merchant.bindTag')}</p>
    </div>
  )
  

  const KyushuBody = () => (
    <div className="py-1 flex gap-x-2">
      <Radio.Group defaultValue="yes" buttonStyle="solid">
        <Radio.Button value="yes">{t('agentmanagement.merchant.yes')}</Radio.Button>
        <Radio.Button value="no">{t('agentmanagement.merchant.no')}</Radio.Button>
      </Radio.Group>
      <OrangeButton label={t('agentmanagement.merchant.confirmationAddition')} onClickHandler={bindHide}/>
    </div>
  )

  const KyushuHeader = () => (
    <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
      <p>{t('agentmanagement.merchant.kyushu')}</p>
    </div>
  )

  const RateBody = () => (
    <div className="py-1 flex flex-col gap-y-1">
      <p className='text-xs'>{t('agentmanagement.merchant.totalOrderQuantity')}</p>
      <p className='text-xs'>{t('agentmanagement.merchant.numberOfSuccesses')}</p>
      <p className='text-xs'>{t('agentmanagement.merchant.numberOfFailures')}</p>
    </div>
  )

  const RateHeader = () => (
    <div className="border-b border-[#e9e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
      <p>{t('agentmanagement.merchant.successRateOfTheDay')}</p>
    </div>
  )
  
  const ModifyAccountHeader = () => (
    <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
      <p>{t('agentmanagement.merchant.modifyAccount')}</p>
    </div>
  )  

  const ReformBody = () => (
    <div className="py-1 flex gap-x-2">
      <Select className="flex-1 min-w-[160px]" mode="multiple" placeholder={t('agentmanagement.merchant.selectTab')}>
        <Select.Option value="superior">{t('agentmanagement.merchant.superiorOption')}</Select.Option>
        <Select.Option value="shabi">{t('agentmanagement.merchant.shabiOption')}</Select.Option>
      </Select>
      <OrangeButton label={t('agentmanagement.merchant.confirmation')} onClickHandler={bindHide}/>
    </div>
  )
  
  const ReformHeader = () => (
    <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
      <p>{t('agentmanagement.merchant.advancedReform')}</p>
    </div>
  )

  const popUpBindBody = (name, value) => {
    let body;
    switch(name) {
      case "nickName":
        body = <NickNameBody />
        break;
      case "reform":
        body = <ReformBody />
        break;
      case "kyushu":
        body = <KyushuBody />
        break;
      case "rate":
        body = <RateBody />
        break;
      case "clearData":
        body = <ClearDataBody />
        break;
      case "modifyAccount":
        body = <ModifyAccountBody />
        break;
      default:
        body = <NickNameBody />
    }
    return body;
  }

  const popUpHeader = (name) => {
    let body;
    switch(name) {
      case "nickName":
        body = <NickNameHeader />
        break;
      case "reform":
        body = <ReformHeader />
        break;
      case "kyushu":
        body = <KyushuHeader />
        break;
      case "rate":
        body = <RateHeader />
        break;
      case "modifyAccount":
        body = <ModifyAccountHeader />
        break;
      default:
        body = <NickNameHeader />
    }
    return body;
  }

  const onInnerFillingClick = (merchant, key) => {
    console.log("---------------->", merchant)
    console.log("onInnerFillingClick")
    setData({merchantId: merchant._id, key});
    setModalName("merchant_list");
    setIsOpenModal(true);
  }
  const onPay_Veri_Click = () => {
    setData({});
    setModalName("payment_list");
    setIsOpenModal(true);
  }

  const onClickWhiteList = () => {
    setData({});
    setModalName("white_list");
    setIsOpenModal(true);
  }
  const onMerchantReportClick = () => {
    
  }
  const onCheckOrderClick = () => {
    navigate('/order-list');
  }

  useEffect(() => {
    setTotalPage(allMerchants.length);
  }, [allMerchants])

  const onClickInnerFillingSure = async() => {
    data.chargeRate = 0;
    await merchantService.setInnerFilling(data);
    setIsOpenModal();
  }

  const onClickResetLoginHandler = async() => {
    toast.success("Successfully reseted");
  }

  const onClickMerchantDeleteHandler = async () => {
    const res = await dispatch(groupListService.deleteMerchant(selectedItem._id));
    if(res.success)
      dispatch(groupListService.getMerchants());
  }

  const onClickModifyAccountHandler = async(account, id) => {
    const res = await groupListService.modifyAccountInProxy({ account, id });
    if(res.success)
      dispatch(groupListService.getMerchants());
  }

  const items = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href='/filling-list' target='_blank' className='cursor-pointer text-xs text-primary'>
          {t('merchantList.moreOperations.fillingList')}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href='/home' target='_blank' className='cursor-pointer text-xs text-primary'>
          {t('merchantList.moreOperations.checkTheDetails')}
        </a>
      )
    },
    {
      key: '3',
      label: (
        <span rel="noopener noreferrer" onClick={onClickWhiteList} className='cursor-pointer text-xs'>
          {t('merchantList.moreOperations.interfaceWhitelist')}
        </span>
      ),
    },
    // no action
    {
      key: '4',
      label: (
        <span rel="noopener noreferrer" className='cursor-pointer text-xs'>
          {t('merchantList.moreOperations.freeze')}
        </span>
      ),
    },
    {
      key: '5',
      label: (
        <Popover
          content={() => popUpBindBody("clearData")}
          trigger="click"
        >
          <span rel="noopener noreferrer" className='cursor-pointer text-xs'>
            {t('merchantList.moreOperations.clearData')}
          </span>
        </Popover>
      ),
    },
    {
      key: '6',
      label: (
        <a rel="noopener noreferrer" onClick={onClickResetLoginHandler} target='_blank' className='cursor-pointer text-xs text-primary'>
          {t('merchantList.moreOperations.ResetLoginPassword')}
        </a>
      ),
    },
    {
      key: '7',
      label: (
        <span rel="noopener noreferrer" onClick={onClickMerchantDeleteHandler} className='cursor-pointer text-xs'>
          {t('merchantList.moreOperations.delete')}
        </span>
      ),
    },
    {
      key: '8',
      label: 
      <Popover
        content={() => popUpBindBody("modifyAccount")}
        title={ () => popUpHeader("modifyAccount") }
        trigger="click"
      >
        <span rel="noopener noreferrer" className='cursor-pointer text-xs'>
          {t('merchantList.moreOperations.modifyAccount')}
        </span>
      </Popover>
    },
    {
      key: '9',
      label: (
        <span rel="noopener noreferrer" className='cursor-pointer text-xs'>
          {t('merchantList.moreOperations.checkTheFolloingDetails')}
        </span>
      ),
    },
    {
      key: '10',
      label: (
        <a rel="noopener noreferrer" href='/operation-log' target='_blank' className='cursor-pointer text-xs text-primary'>
          {t('merchantList.moreOperations.operationLog')}
        </a>
      ),
    },
    {
      key: '11',
      label: (
        <span rel="noopener noreferrer" className='cursor-pointer text-xs'>
          {t('merchantList.moreOperations.deactivateGoogleAuthenticator')}
        </span>
      ),
    },
    
  ];

  return (
    <>
      <div className='px-[24px] py-[20px] text-xs dark:text-white'>
        <div className='table-title'><span>{t('merchantList.title')}</span></div>
        <div className='table-contorl'>
          <ul className='flex flex-wrap'>
            <li className='flex items-center mr-5'>
            {t('merchantList.findUser')}:
              <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('merchantList.usernameOrId')}</option>
                {
                    userLists.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('merchantList.userLists.'+item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('merchantList.accountStatus')}:
                <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                  <option disabled selected hidden>{t('merchantList.accountStatus')}</option>
                  {
                      accountStatuses.map((item, i) => {
                        return(
                          <option key={i} value={item}>{t('merchantList.accountStatuses.'+item)}</option>
                        )
                      })
                    }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('merchantList.account')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('merchantList.contactInformation')} /> 
              </li>
              <li className='flex items-center mr-5'>
              {t('merchantList.name')}:
                <input className='ml-2 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('merchantList.name')}/> 
              </li>
              <li className='flex items-center mr-5'>
              {t('merchantList.superiorID')}:
                <select class="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                  <option disabled selected hidden>{t('merchantList.superiorNameOrId')}</option>
                  {
                      superiorIDs.map((item, i) => {
                        return(
                          <option key={i} value={item}>{t('merchantList.superiorIDs.'+item)}</option>
                        )
                      })
                    }
                </select>
              </li>
              <li className='flex items-center mr-5'>
                <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('merchantList.inquiry')}(8)</button>
                <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('merchantList.editUserGroup')}</button>
              </li>
            </ul>
            <ul className='mt-1'>
              <li className='p-[20px_0px]'>
                <label><span className='text-primary'>{t('merchantList.lableQuery')}</span>:</label>
              </li>
              <li>
                <label>{t('merchantList.selectStatisticalDate')}:</label>
                <input
                type='date'
                className='ml-2 p-[6px_7px] text-xs border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
                placeholder=''
                />
              </li>
            </ul>
        </div>
        <div className='table-content mt-5 text-left'>
          <table className='w-full dark:text-grey-light'>
            <thead>
              <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
                <th className='p-[10px_8px]'>{t('merchantList.id')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.nickName')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.superior')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.kyushu')}</th>
                <th className='p-[10px_8px]'>{t("merchantList.todayTotalTurnover")}</th>
                <th className='p-[10px_8px]'>{t('merchantList.availableBalance')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.todayHasBeenIssued')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.nowSettledAndPaid')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.todaySuccessRate')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.approvalStatus')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.accountStatus')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.paymentRate')}</th>
                <th className='p-[10px_8px]'>{t('merchantList.operate')}</th>
              </tr>
            </thead>
            <tbody>
              {
                allMerchants?.slice(pageSize*(pageIndex-1), Math.min(pageSize*pageIndex, totalPage))?.map((merchant, key) => (
                  <tr className='border-grey border-b-[1px]'>
                    <td className='p-[12px_8px]'>{key+1}</td>
                    <td className='text-primary p-[12px_8px]'>
                      <div>
                        {merchant?.name}
                      </div>
                      <Popover
                          content={() => popUpBindBody("nickName")}
                          title={ () => popUpHeader("nickName") }
                          trigger="click"
                          open={bindTag === key && popUpName === "nickName"}
                          onOpenChange={() => bindHandleOpenChange(key, "nickName")}
                        >
                          <button className='mt-1 h-[22px] w-[30px] text-black border-grey dark:text-white dark:bg-[#3e3c3b] hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary border border-dashed rounded'>+</button>
                      </Popover>
                      {/* </Popconfirm> */}
                    </td>
                    <td className='text-primary p-[12px_8px] cursor-pointer'>
                      <Popover
                          content={() => popUpBindBody("reform")}
                          title={ () => popUpHeader("reform") }
                          trigger="click"
                          open={bindTag === key && popUpName === "reform"}
                          onOpenChange={() => bindHandleOpenChange(key, "reform")}
                        >
                          {t('merchantList.directlyUnderSuperior')}
                      </Popover>
                    </td>
                    <td className='text-primary p-[12px_8px] cursor-pointer'>
                      <Popover
                          content={() => popUpBindBody("kyushu")}
                          title={ () => popUpHeader("kyushu") }
                          trigger="click"
                          open={bindTag === key && popUpName === "kyushu"}
                          onOpenChange={() => bindHandleOpenChange(key, "kyushu")}
                        >
                          {t('merchantList.no')}
                      </Popover>
                    </td>
                    <td className=' p-[12px_8px]'><span className='text-lg'>228</span> {t('merchantList.millionYuan')}</td>
                    <td className='text-blue p-[12px_8px]'><span className='text-lg'>{merchant?.availableBalance}</span> {t('merchantList.billionYuan')}</td>
                    <td className='p-[12px_8px]'><span className='text-lg'>0</span> {t('merchantList.yuan')}</td>
                    <td className='text-blue p-[12px_8px]'><span className='text-lg'>200</span> {t('merchantList.millionYuan')}</td>
                    <td className='text-primary text-base p-[12px_8px] cursor-pointer'><span className='text-lg'>
                      <Popover
                        content={() => popUpBindBody("rate")}
                        title={ () => popUpHeader("rate") }
                        trigger="click"
                        open={bindTag === key && popUpName === "rate"}
                        onOpenChange={() => bindHandleOpenChange(key, "rate")}
                      >
                        84.09%
                      </Popover>
                    </span>
                    </td>
                    <td className='text-base p-[12px_8px]'>
                      <button className='text-xs mr-1 p-[4px_8px] text-green rounded bg-green-light hover:opacity-75'>{t('merchantList.audited')}</button>
                    </td>
                    <td className='text-base p-[12px_8px]'>
                      <button className='text-xs mr-1 p-[4px_8px] text-green rounded bg-green-light hover:opacity-75'>{t('merchantList.normal')}</button>
                    </td>
                    <td className='text-base p-[12px_8px]'>
                      <button className='text-xs mr-1 p-[4px_8px] text-green rounded bg-green-light hover:opacity-75 w-max'>{t('merchantList.payOnBehalf:Open')} {merchant?.paymentRate}%</button>
                    </td>
                    <td className='p-[12px_8px]'>
                      <div>
                        <button onClick={() => onInnerFillingClick(merchant, key+1)} className='text-primary pr-2 border-r dark:border-white leading-[10px]'>{t('merchantList.innerFilling')}</button>
                        <button  onClick={onPay_Veri_Click} className='text-primary pr-2 border-r dark:border-white leading-[10px] pl-2'>{t('merchantList.paymentVerification[Close]')}</button>
                        <button onClick={onMerchantReportClick} className='text-primary pr-2 border-r dark:border-white leading-[10px] pl-2'>{t('merchantList.merchantReport')}</button>
                        <button onClick={onCheckOrderClick} className='text-primary pr-2 border-r dark:border-white leading-[10px] pl-2'>{t('merchantList.checkOrder')}</button>
                      </div>
                      <Dropdown onClick={() => setSelectedItem(merchant)} menu={{items}} trigger={['click']}>
                        <div className='flex gap-x-1 items-center'>
                          <p className='text-primary text-xs cursor-pointer'>{t('agentmanagement.merchant.moreOperations')}</p>
                          <DownOutlined className='text-primary' />
                        </div>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div class="flex items-center justify-end mt-4">
            <ul class="flex text-primary text-sm">
              <li class="ml-1 cursor-pointer" onClick={() => {setPageIndex(Math.max(1, pageIndex - 1))}}>
                <a href="#" class="mr-1 px-2 rounded dark:bg-grey-dark dark:text-white">{'<'}</a>
              </li>
              {
                new Array(Math.ceil(totalPage/pageSize)).fill('')?.map((merchant, key) => (
                  <li className='mx-1 cursor-pointer' onClick={() => {
                    setPageIndex(key+1)
                  }}>
                    <a href="#" className={`px-2 rounded dark:bg-grey-dark ${key + 1 === pageIndex ? 'text-white bg-primary' : 'text-primary bg-white border-grey border'}`}>{key + 1}</a>
                  </li>
                ))
              }
              <li class="ml-1 cursor-pointer" onClick={() => {setPageIndex(Math.min(totalPage, pageIndex + 1))}}>
                <a href="#" class="ml-1 px-2 rounded dark:bg-grey-dark dark:text-white">{'>'}</a>
              </li>
            </ul>
            <select onClick={(e) => setPageSize(e.target.value)} className='ml-5 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'>
              <option value={10} selected>{t('agentmanagement.merchant.tenItemsPerPage')}</option>
              <option value={30}>{t('agentmanagement.merchant.thirtyItemsPerPage')}</option>
              <option value={50}>{t('agentmanagement.merchant.fiftyItemsPerPage')}</option>
              <option value={100}>{t('agentmanagement.merchant.hundredItemsPerPage')}</option>
            </select>
          </div>
        </div>
      </div>
      <MainModal data={data} setData={setData} isOpen={isOpenModal} onClose={() => setIsOpenModal()} onClickHandlers={{ fillingSure: onClickInnerFillingSure }} name={modalName} setModalName={setModalName}  onCancelHandler={onCancelHandler} />

    </>
  );
}

export default MerchantList;
