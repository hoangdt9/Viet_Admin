import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import logService from '../../services/operationLog/logService';
import { Popover, Timeline, Pagination } from 'antd';
import { Modal, Box } from '@mui/material';
import CheckModal from './check-box'

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { allCount, allLogs } = useSelector(state => state.logState);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  const onClickDeleteAdminLog = async (id) => {
    const res = await logService.deleteLog(id);
    if(res.success)
    {
      dispatch(logService.getOperationInfo());
      dispatch(logService.getOperationLog({count : count, page : page}));
    }
  }
  
  useEffect(() => {
    dispatch(logService.getOperationInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(logService.getOperationLog({count : count, page : page}));
  }, [dispatch]);

  const handlePaginationChange = (page, pageSize) => {
    if(count === pageSize) {
      setPage(page);
      dispatch(logService.getOperationLog({count : pageSize, page : page}));
    }
    else{
      setCount(pageSize);
      setPage(1);
      dispatch(logService.getOperationLog({count : pageSize, page : 1}));
    }
  }

  const handleDelete = (id) => (e) => {
    setPage(1);
    setCount(10);
    logService.deleteLog(id);
    dispatch(logService.getOperationLog({count : 10, page : 1}));
  }

  const onClickOperatingInfoHandler = (key) => {

  }

  const hide = () => {
    setOpen(-1);
  };

  const handleOpenChange = (key) => {
    if (open !== key) {
      setOpen(key);
    } else hide();
  };

  const timeLineItems = [
    {
      children: t('operation_log.operationIP', { ip: '113.61.49.203' }),
    },
    {
      children: t('operation_log.operatingBrowser', { browser: 'Chrome' }),
    },
    {
      children: t('operation_log.operatingCPU', { cpu: 'amd64' }),
    },
    {
      children: t('operation_log.operatingDevice', { device: 'unknown' }),
    },
    {
      children: t('operation_log.operatingOS', { os: 'Windows 10' }),
    },
  ];

  const modalStyle = {
    position: "absolute",
    top: "450px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
  };

  return (
    <>
      <h1 className='text-sm dark:text-white'>{t('operation_log.operationLogList')}</h1>
      <div className='flex items-center mt-2 dark:text-white'>
        <div>
          <label className='text-sm'>{t('operation_log.queryUserID')}:</label>
          <input
            type='text'
            className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('operation_log.enterTheUserIdToSearchFor')}
          />
        </div>
        <div className='ml-5'>
          <label className='text-sm'>{t('operation_log.idQuery')}:</label>
          <input
            type='text'
            className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('operation_log.enterTheOperationContent')}
          />
        </div>
        <div className='ml-8'>
          <label className='text-sm'>{t('operation_log.nameLookup')}:</label>
          <select className='ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'>
            <option disabled selected className='text-grey'>
              {t('operation_log.enterTheInterfaceToSearch')}
            </option>
            <option>Confirm order - /manage/do/orderDone</option>
            <option>Confirm order - /manage/do/orderDone</option>
            <option>Confirm order - /manage/do/orderDone</option>
          </select>
        </div>
        <div className='ml-5'>
          <label className='text-sm'>{t('operation_log.idQyery')}:</label>
          <input
            type='date'
            className='ml-2 p-[6px_7px] min-w-[180px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark'
            placeholder={t('operation_log.enterTheOperationContent')}
            defaultValue='2023-05-13'
          />
        </div>
        <div className='ml-8'>
          <button className='p-[5px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark'>
            {t('operation_log.search')}
          </button>
        </div>
      </div>
      <div className='mt-5'>
        <table className='w-full text-sm dark:text-grey-light'>
          <thead>
            <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
              <td className='p-[10px_8px]'>#</td>
              <td className='p-[10px_8px]'>{t('operation_log.interfaceType')}</td>
              <td className='p-[10px_8px]'>{t('operation_log.interfaceDescription')}</td>
              <td className='p-[10px_8px]'>{t('operation_log.operationInterface')}</td>
              <td className='p-[10px_8px]'>{t('operation_log.operatingTime')}</td>
              <td className='p-[10px_8px]'>{t('operation_log.operatingInformation')}</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(allLogs).length !== 0 ? (
              allLogs.map((item, key) => (
                <tr className='border-grey border-b-[1px]' key={item._id}>
                  <td className='p-[12px_8px]'>{`#${count * (page - 1) + key + 1} ${item?.adminId?.account}`}</td>
                  <td className='p-[12px_8px]'> </td>
                  <td className='p-[12px_8px]'> </td>
                  <td className='p-[12px_8px]'>{item.interface}</td>
                  <td className='p-[12px_8px]'>{item.createdAt}</td>
                  <td className='p-[12px_8px]'>
                    <Popover
                      content={() => (
                        <div className='text-xs mt-2'>
                          <Timeline items={timeLineItems} color='blue' />
                        </div>
                      )}
                      placement='left'
                      title={
                        <div className='border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center'>
                          <p>{t('operation_log.operatingInformation')}</p>
                        </div>
                      }
                      trigger='click'
                      open={open === key}
                      onOpenChange={() => handleOpenChange(key)}
                    >
                      <button className='text-primary'>{t('operation_log.OperatingInformation')}</button>
                    </Popover>
                    <span className='mx-2 text-xs text-grey'>|</span>
                    <button className='text-primary' onClick={() => setModalOpen(true)}>
                      {t('operation_log.checkTheDetails')}
                    </button>
                    <span className='mx-2 text-xs text-grey'>|</span>
                    <a className='text-primary hover:cursor-pointer' onClick={() => onClickDeleteAdminLog(item._id)}>
                      {t('operation_log.delete')}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <div class='flex items-center justify-end mt-4'>
          <Pagination
            showSizeChanger
            current={page}
            pageSize={count}
            onChange={handlePaginationChange}
            total={allCount}
          />
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => {}}>
        <Box sx={modalStyle} className='dark:bg-grey-dark'>
          <CheckModal handleClose={() => setModalOpen(false)} />
        </Box>
      </Modal>
    </>
  );
}
