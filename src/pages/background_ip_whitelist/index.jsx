import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import backgroundIpWhitelistService from '../../services/backgroundIp/backgroundIpWhitelist';
import groupListService from '../../services/permission/groupListService';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [ip, setIp] = useState("");
  const { allMerchants } = useSelector(state => state.permissionState);

  const ipMask = [
    [/\d/],
    [/\d/],
    [/\d/],
    '.',
    [/\d/],
    [/\d/],
    [/\d/],
    '.',
    [/\d/],
    [/\d/],
    [/\d/],
    '.',
    [/\d/],
    [/\d/],
    [/\d/],
  ];

  const {ipState, allIpAddress} = useSelector(state => state.backgroundState);

  useEffect(() => {
    dispatch(groupListService.getMerchants());
  }, [dispatch]);


  useEffect(() => {
    if(ipState){
      dispatch(backgroundIpWhitelistService.getAllIpAddress());
    }
  }, [dispatch, ipState]);

  const handleUserChange = (e) => {
    setUserId(e.target.value);
  }

  const handleSubmitIp = () => {
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if(ip === "" || userId === ""){
      alert("All values are required");
      return;
    }
    if(!ipRegex.test(ip)){
      alert("invalid Ip");
      return;
    }
    setIp("");
    dispatch(backgroundIpWhitelistService.postIpAddress({ipAddress : ip, merchantId : userId}));
  }

  const handleIpChange = (e) => {
    setIp(e.target.value);
  }

  return (
    <>
      <h1 className='text-sm dark:text-white'>{t('background_ip_whitelist.backgroundIpWhitelist')}</h1>
      <p className='p-[8px_48px_8px_16px] text-sm border rounded bg-[#FEF0EF] border-[#FCDBD9]'>
        {t('background_ip_whitelist.reminder')}: {t('background_ip_whitelist.alert')}
      </p>
      <div className='flex items-center mt-5 dark:text-white'>
        <div>
          <label className='text-sm'>{t('background_ip_whitelist.ipSearch')}:</label>
          <input
            type='text'
            className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('background_ip_whitelist.entherTheIpToSearch')}
          />
        </div>
        <div className='ml-5'>
          <label className='text-sm'>{t('background_ip_whitelist.ipQuery')}:</label>
          <input
            type='text'
            className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('background_ip_whitelist.enterTheIpQuery')}
          />
        </div>
        <div className='ml-8'>
          <label className='text-sm'>{t('background_ip_whitelist.nameLookUp')}:</label>
          <input
            type='text'
            className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('background_ip_whitelist.enterTheNameLookUp')}
          />
        </div>
        <div className='ml-8'>
          <button className='p-[5px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark'>{t('background_ip_whitelist.search')}</button>
        </div>
      </div>
      <div className='flex items-center mt-5 dark:text-white'>
        <div>
          <label className='text-sm'>{t('background_ip_whitelist.addBackgroundIpWhitelist')}:</label>
          <input
            type='text'
            className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('background_ip_whitelist.addBackgroundIpWhitelist')}
            valeu = {ip}
            onChange={handleIpChange}
          />
        </div>
        <div className='ml-5'>
          <label className='text-sm'>{t('background_ip_whitelist.userID')}:</label>
          <select
              placeholder="shift name"
              type="text"
              className="ml-2 p-[2px_7px] h-[35px] w-[100px] text-sm dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
              onChange={handleUserChange}
          >
              <option disabled selected className='text-grey'>user Id</option>
              {
                Object.keys(allMerchants).length !== 0 ? 
                allMerchants.map((item, key) => {
                  return(
                    <option key = {key} value = {item._id}>{item.account}</option>      
                  )
                }) : <></>
              }
          </select>
        </div>
        <div className='ml-8'>
          <button className='p-[5px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark' onClick={handleSubmitIp}>{t('background_ip_whitelist.add')}</button>
        </div>
      </div>
      <div className='mt-5'>
        <table className='w-full text-sm dark:text-grey-light'>
          <thead>
            <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
              <td className='p-[10px_8px]'>#</td>
              <td className='p-[10px_8px]'>{t('background_ip_whitelist.IP')}</td>
              <td className='p-[10px_8px]'>{t('background_ip_whitelist.time')}</td>
              <td className='p-[10px_8px]'>{t('background_ip_whitelist.operator')}</td>
              <td className='p-[10px_8px]'>{t('background_ip_whitelist.operate')}</td>
            </tr>
          </thead>
          <tbody>
             {
                Object.keys(allIpAddress).length !== 0 ? 
                allIpAddress.map((item, key) => {
                  return(
                    <tr className='border-grey border-b-[1px]' key = {item._id}>
                      <td className='p-[12px_8px]'>{key+1}</td>
                      <td className='p-[12px_8px]'>{item.ipAddress}</td>
                      <td className='p-[12px_8px]'>{item.createdAt}</td>
                      <td className='p-[12px_8px]'>Demo operator</td>
                      <td className='p-[12px_8px]'>Demo operate</td>
                    </tr>      
                  )
                }) : <></>
              }
          </tbody>
        </table>
      </div>
    </>
  );
}
