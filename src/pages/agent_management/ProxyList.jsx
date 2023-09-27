import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { OrangeButton } from '../../components/ui/button/AgentManagement';
import MerchantModal from './merchantModal';
import { Link } from 'react-router-dom';
import Notification from '../../components/notification/notification';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import groupListService from '../../services/permission/groupListService';

import AddProxy from '../../components/addModal/AddProxy';
import AddMerchant from '../../components/addModal/AddMerchant';
import { toast } from 'react-toastify';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { t } = useTranslation();

  const childRef = useRef();

  const dispatch = useDispatch()
  const { allProxy, proxyState } = useSelector(state => state.permissionState);

  useEffect(() => {
    if(proxyState){
      dispatch(groupListService.getAllProxies());
    }
  }, [dispatch, proxyState]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAddProxyModal, setIsAddProxyModal] = useState(false);
  const [isAddMerchantModal, setIsMerchantModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [isModifyAccount, setIsModifyAccount] = useState(-1);
  const [viewProxyId, setViewProxyId] = useState(""); 
  const modifyAccountRef = useRef(null)
  const [deleteMember, setDeleteMember] = useState(-1);
  const deleteMemberRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [editId, setEditId] = useState("");
  const [modifyAccount, setModifyAccount] = useState("");
  const [data, setData] = useState({});
  const [state, setState] = useState("");
  const [proxy, setProxy] = useState();

  const onCancelHandler = () => {
    setIsOpenModal(false)
    setDeleteMember(-1)
    setIsModifyAccount(-1)
  }

  const handleAddProxyModal = (state) => {
    setIsAddProxyModal(state);
  };

  const handleAddMerchantModal = (state) => {
    setIsMerchantModal(state);
  }

  const handleFreezeProxy = () => {
    if(editId && state){
      groupListService.changeProxyState({id : editId, state : state === "normal" ? "freeze" : "normal"})
      .then(res => {
        if(res.success){
          setModifyAccount("");
          setIsModifyAccount(-1);
          dispatch(groupListService.getAllProxies());
        }
        else{
          //error 
        }
      });
    }
    else{
      childRef.current.openNotificationWithIcon({type : "error", title : "Error", description : "All input values are required."});
    }
  }

  const tableHeader = [
    {
      name: t("agentmanagement.proxylist.member"),
      width: "w-[14%]"
    },
    {
      name: t("agentmanagement.proxylist.agent"),
      width: "w-[6%]"
    },
    {
      name: t("agentmanagement.proxylist.channelsFeePercent"),
      width: "w-[6%]"
    },
    {
      name: t("agentmanagement.proxylist.totalTurnoverOfTheDay"),
      width: "w-[10%]"
    },
    {
      name: t("agentmanagement.proxylist.totalCommissionForTheDay"),
      width: "w-[10%]"
    },
    {
      name: t("agentmanagement.proxylist.billableCommission"),
      width: "w-[15%]"
    },
    {
      name: t("agentmanagement.proxylist.accountStatus"),
      width: "w-[8%]"
    },
    {
      name: t("agentmanagement.proxylist.operate"),
    },
    
  ];

  const tableData = []

  if(Object.keys(allProxy).length !== 0){
    allProxy.map((item, key) => {
        tableData.push({
          id : item._id,
          member: item.name,
          type: t(item.type),
          totalTurnOver: "0",
          totalCommission: "0",
          billable: "1,500",
          accountStatus: t(item.state),
          account : item.account,
          state : item.state
        });
    });
}


  const items = [
    {
      label: <a className='duration-300 text-xs dark:bg-dark text-primary w-[90px] border-0' onClick={handleAddMerchantModal}>{t("agentmanagement.proxylist.addSubordinate")}</a>,
      key: '0',
    },
    {
      label: <Link to="/operation-log" className='duration-300 text-xs dark:bg-dark text-primary w-[90px] border-0'>{t("agentmanagement.proxylist.operationLog")}</Link>,
      key: '1',
    },
    {
      label: <a className='duration-300 text-xs dark:bg-dark text-primary w-[90px] border-0' onClick={handleFreezeProxy}>{t(`agentmanagement.proxylist.${state === "normal" ? "freeze" : "normal"}`)}</a>,
      key: '2',
    },
  ]

  useEffect(() => {
    console.log(darkMode)
  }, [darkMode])

  useEffect(() => {
    function handleClickOutside(event) {
      if (modifyAccountRef.current && !modifyAccountRef.current.contains(event.target) && isModifyAccount !== -1) {
        setIsModifyAccount(-1);
      }
      if (deleteMemberRef.current && !deleteMemberRef.current.contains(event.target) && deleteMember !== -1) {
        setDeleteMember(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModifyAccount, deleteMember]);


  const viewMerchant = (name, id) => {
    console.log(id);
    setModalName(name);
    onCancelHandler()
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
    setViewProxyId(id);
  }

  const onClickModalHandler = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true); 
  }

  const clickView = () => {
    // alert(t("agentmanagement.proxylist.success"))
    viewMerchant("rateStep1", "");
  }

  const modifyAccountHandler = (key, account) => {
    onCancelHandler()
    console.log(account);
    setModifyAccount(account);
    if(isModifyAccount === key) 
      setIsModifyAccount(-1);
    else 
      setIsModifyAccount(key);
  }

  const deleteHander = (key) => {
    onCancelHandler()
    if(deleteMember === key) 
    setDeleteMember(-1);
    else 
    setDeleteMember(key);
  }

  const handleDeleteProxy = (id) => {
    dispatch(groupListService.deleteProxy(id));
    setDeleteMember(-1);
  }

  const handleEditChange = (id, state) => (e) => {
    console.log(state);
    setEditId(id);
    setState(state);
  }

  const handleModifySubmit = (id) => {

    if(id && modifyAccount){
      groupListService.modifyAccountInProxy({
        id : id,
        account : modifyAccount
      })
      .then(res => {
        if(res.success){
          setModifyAccount("");
          setIsModifyAccount(-1);
          dispatch(groupListService.getAllProxies());
        }
        else{
          //error 
        }
      });
    }
    else{
      childRef.current.openNotificationWithIcon({type : "error", title : "Error", description : "All input values are required."});
    }
  }

  const addRateInproxy = async () => {
    const res = await groupListService.addRateInProxy({
      id: proxy.id,
      channelType: data.channelType,
      fixedRate: data.rate,
      settlementType: data.settlementType
    })
    if(res.success)
      toast.success(t("agentmanagement.proxylist.success"));
  }

  return (
    <div className='px-6 py-5'>
      <div className='flex gap-x-1 items-center justify-end'>
        <OrangeButton onClickHandler={handleAddProxyModal} label={t("agentmanagement.proxylist.addSubordinate")}/>
        <OrangeButton label={t("agentmanagement.proxylist.refreshTheList")}/>
      </div>
      <span className='text-[rgba(0,0,0,0.65)] dark:text-white'>{t("agentmanagement.proxylist.businessLevel")}: </span><span className='text-primary text-xs ml-[5px]'>{t("agentmanagement.proxylist.expandAll")}</span>
      <div className='w-full mt-[16px]'>
        {/* Header */}
        <div className='leading-6 py-2.5 text-xs text-[rgba(0,0,0,0.65) rounded-t-md flex items-center w-full bg-[#f7f7f7] dark:bg-dark '>
          {
            tableHeader.map((header, key) => (
              <div className={`${header.width} dark:text-white px-2 font-medium text-[rgba(0,0,0,0.85)]`} key={key}>
                {header.name}
              </div>
            ))
          }
        </div>
        <div className='w-full'>
          <tbody className='proxyList'>
            {tableData.map((item, key) => {
                return(
                    <>
                        <tr className='border-solid border-b-[1px] border-[#ece9e9] text-[12px]' onClick={() => setProxy(item)} key = {key}>
                            <td className='text-primary w-[14%]'>
                              <span className="inline-block bg-[#eb2f96] w-[8px] h-[8px] rounded-full ml-[20px] mr-1"></span>
                                {item.member}
                              </td>
                              <td className='w-[6%]'>
                              <button className={`${item.type === "acting" ? 'text-[#00a854] bg-[#cfefdf]' : 'text-[#f04134] bg-[#fcdbd9]' } rounded-[3px] px-3 py-[2px]`}>
                                {item.type}
                              </button>
                            </td>
                            <td className='w-[6%]'><button className='text-primary text-left' onClick={clickView}>{t("agentmanagement.proxylist.clickToView")}</button></td>
                            <td className='w-[10%] text-[14px] dark:text-white'><span className='text-[18px]'>{item.totalTurnOver}</span> {t("agentmanagement.proxylist.yuan")}</td>
                            <td className='w-[10%] text-[14px] ${darkMode && dark:text-white'><span className='text-[18px]'>{item.totalCommission}</span> {t("agentmanagement.proxylist.yuan")}</td>
                            <td className='w-[15%] text-[14px] ${darkMode && dark:text-white'><span className='text-[18px]'>{item.billable}</span> {t("agentmanagement.proxylist.yuan")} <span className='text-[12px] text-primary'>{t("agentmanagement.proxylist.increaseOrDecreaseBalance")}</span></td>
                            <td className='w-[8%]'>
                              <button className={`${item.accountStatus === "normal" ? 'text-[#00a854] bg-[#cfefdf]' : 'text-[#f04134] bg-[#fcdbd9]' } rounded-md px-2 py-[2px]`}>
                                {item.accountStatus}
                              </button>
                            </td>
                            <td className=''>
                              <Link to="/basic-information" className='text-primary text-xs'>{t("agentmanagement.proxylist.checkTheDetails")}<span className='mx-[6px] bg-[#ccc] h-[8px] w-[1px] inline-block'></span></Link>
                              <button className='text-primary text-xs' onClick={() => viewMerchant("merchant", item.id)}>{t("agentmanagement.proxylist.viewMerchants()")}<span className='mx-[6px] bg-[#ccc] h-[8px] w-[1px] inline-block'></span></button>
                              <button className='text-primary text-xs' onClick={() => viewMerchant("modifyChannel", item.id)}>{t("agentmanagement.proxylist.ModifyChannelsInBatches")}<span className='mx-[6px] bg-[#ccc] h-[8px] w-[1px] inline-block'></span></button>
                                <button className='text-primary text-xs' onClick={() => modifyAccountHandler(key, item.account)}>{t("agentmanagement.proxylist.modifyAccount")}<span className='mx-[6px] bg-[#ccc] h-[8px] w-[1px] inline-block'></span></button>
                                {isModifyAccount === key && <div className='absolute shadow-lg bg-white border rounded -mt-[90px]' ref={(node) => { modifyAccountRef.current = node }}>
                                  <div className='px-[5px] py-[5px] border-b-1'>{t("agentmanagement.proxylist.modifyAccount")}</div>
                                  <div className='px-[5px] py-[5px] flex'>
                                    <input type = "text" value = {modifyAccount} onChange={(e) => {setModifyAccount(e.target.value)}} className='mr-[5px] w-[161px] h-[30px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder=''/>
                                    <OrangeButton onClickHandler = {() => handleModifySubmit(item.id)} label={t("agentmanagement.proxylist.sure")} />
                                  </div>
                                </div>}
                              <button className='text-primary text-xs' onClick={() => deleteHander(key)}>{t("agentmanagement.proxylist.delete")}<span className='mx-[6px] bg-[#ccc] h-[8px] w-[1px] inline-block'></span></button>
                                {deleteMember === key && <div className='absolute shadow-lg bg-white border rounded -mt-[90px]' ref={(node) => { deleteMemberRef.current = node }}>
                                  <div className='px-[5px] py-[5px] border-b-1'>{t("agentmanagement.proxylist.confirmToDelete?")}</div>
                                  <div className='px-[5px] py-[5px] flex'>
                                    <button className='bg-white border rounded-[5px] mr-[5px] py-[2px] px-[6px]' onClick={onCancelHandler}>{t("agentmanagement.proxylist.cancel")}</button>
                                    <OrangeButton onClickHandler={() => handleDeleteProxy(item.id)} label={t("agentmanagement.proxylist.sure")} />
                                  </div>
                                </div>}
                                <Dropdown
                                  className='duration-300 text-xs dark:bg-dark text-primary w-[90px] border-0'
                                  menu={{
                                    items
                                  }}
                                  trigger={['click']}
                                  onOpenChange = {handleEditChange(item.id, item.state)}
                                >
                                    <Space className='hover:cursor-pointer'>
                                      {t("agentmanagement.proxylist.more")}
                                      <DownOutlined />
                                    </Space>
                                </Dropdown>
                            </td>
                        </tr>
                    </>
                );
            })}
          </tbody>
        </div>
      </div>
      <MerchantModal isOpen={isOpenModal} data={data} setData={setData} viewId = {viewProxyId} onClickHandlers={{
        addRate: addRateInproxy
      }} onClose={() => setIsOpenModal()} name={modalName} setModalName={setModalName}  onCancelHandler={onCancelHandler} />
      <AddProxy isOpen={isAddProxyModal} onClose={handleAddProxyModal} />
      <AddMerchant isOpen={isAddMerchantModal} onClose={handleAddMerchantModal} id = {editId} />
      <Notification ref = {childRef} />
    </div>
  );
}
