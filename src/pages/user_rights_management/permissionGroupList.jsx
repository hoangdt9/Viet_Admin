import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Popconfirm } from 'antd';
import '../../custom-antd-theme.less';

import groupListService from '../../services/permission/groupListService';

const PremissionGroupList = () => {
  
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { allProxy, proxyState } = useSelector(state => state.permissionState);

  useEffect(() => {
      dispatch(groupListService.getAllProxies());
  }, [dispatch, proxyState]);

  const handleConfirmDelete = (id) => () => {
    dispatch(groupListService.deleteProxy(id));
  }

  return (
    <div className="mt-1 mr-1 ml-1">
      <div className="bg-white h-full dark:bg-dark">
        <div className="">
          <label htmlFor="" className='text-xs dark:text-white'>{t("userRightsManagement.permissionGroup.searchByType")}:</label>
          <select placeholder='Merchant' id="mySelect" name="mySelect" className='text-xs rounded-md p-[4px_5px] w-40 ml-3 border border-grayCustom'>
              <option>Merchant</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 3</option>
              <option>Option 3</option>
          </select>
          <button className='bg-primary text-white inline-block ml-5 font-medium text-center cursor-pointer bg-none border border-transparent border-primary whitespace-nowrap px-4 text-[12px] rounded h-7 select-none transition-all ease-in-out duration-300 relative dark:bg-grey-dark dark:border-primary'>
            <font>{t("userRightsManagement.permissionGroup.inquire")}</font>
          </button>
        </div>
        <div className="mt-4">
          {
            allProxy.map((item, key) => {
              return(
                    <div className="relative mt-2" key = {key}>
                      <div className="overflow-hidden relative rounded-[4px]">
                            <div className='text-[rgba(0,0,0,0.65)] w-full flex flex-row'>
                              {/* Start Withdrawal Part */}
                              <div className="p-[40px_10px] h-[150px] bg-primary text-white w-[6%]">
                                {/* <div className="text-center text-[12px]">
                                  <font>{`#2-${t("userRightsManagement.permissionGroup.tkWithdrawal")}`}</font>
                                </div>
                                <div className="text-center text-[12px]">
                                  <font>{`(${t("userRightsManagement.permissionGroup.superadministrator")})`}</font>
                                </div> */}
                                <div className="text-center text-[12px]">
                                  <font>{"Vicent"}</font>
                                </div>

                              </div>
                              {/* Start Group members  */}
                              <div className='w-[94%] h-[150px] bg-primary'>
                                <div className="flex flex-row items-center justify-between p-[5px_10px] bg-[#facd92] round-sm text-white text-xs">
                                  <div >
                                    <font>{t("userRightsManagement.permissionGroup.groupMembers")}</font>
                                  </div>
                                  <div className="flex flex-row">
                                    {/* Edit button */}
                                    <Link to={`/permission-settings/${item._id}/${item.account}`}>
                                      <button className='inline-block mb-0 font-medium text-center cursor-pointer bg-none border border-transparent whitespace-nowrap px-4 text-[12px] rounded h-7 select-none transition-all ease-in-out duration-300 relative bg-primary dark:bg-grey-dark dark:border-primary'>
                                        <font>{t("userRightsManagement.permissionGroup.edit")}</font>
                                      </button>
                                    </Link>
                                    <div className="ml-2 text-white border-separate text-left">
                                      <Popconfirm
                                        title="Are you sure to delete the permission group?"
                                        onConfirm={handleConfirmDelete(item._id)}
                                        placement="topRight"
                                        okText="Sure"
                                        cancelText="Cancel"
                                      >
                                        <button className='text-[#f04134] bg-[#f7f7f7] border border-[#d9d9d9] inline-block mb-0 font-[500] text-center cursor-pointer bg-none border-transparent whitespace-nowrap pl-[15px] pr-[15px] text-[12px] rounded-sm h-7 transition-all duration-300 relative dark:bg-grey-dark dark:border-primary dark:text-white'>
                                          <font>{t("userRightsManagement.permissionGroup.delete")}</font>
                                        </button>
                                      </Popconfirm>
                                    </div>
                                  </div>
                                </div>
                                <div className="break-all text-[12px] h-[120px] text-[rgba(0,0,0,0.65)] border-separate border-spacing-0 text-left ">
                                  <div className="min-h-full bg-[#fef1ea] border-separate border-spacing-0 text-left">
                                    <div className="flex-wrap gap-1">
                                      {
                                        item.members.map((item, key) => (
                                        <div className="inline-block m-[6px] pt-1 pb-1 pl-2 pr-2 break-all rounded-[5px] border border-red">
                                          <font>{item.name}</font>
                                        </div>
                                        ))
                                      }
                                    </div> 
                                    
                                  </div>
                                </div>
                              </div>
                            </div>
                      </div>
                    </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default PremissionGroupList;


