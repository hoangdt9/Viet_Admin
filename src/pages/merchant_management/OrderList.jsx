import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TiExport } from "react-icons/ti";
import { useTranslation } from 'react-i18next';
import { ImQrcode } from 'react-icons/im';
import { RiCheckboxCircleFill, RiErrorWarningFill, RiFileCopyFill } from 'react-icons/ri';

import orderService from '../../services/merchantManagement/orderService';

import { Checkbox, Dropdown, Input, InputNumber, Pagination, Popover, Select, Timeline } from 'antd';
import MainModal from './Modal';
import { OrangeButton } from '../../components/ui/button/AgentManagement';
import dayjs from 'dayjs';
import { DownOutlined } from '@ant-design/icons';

export const PopUpType = {
  BusinessName: "BusinessName",
  ReceiptNumber: "ReceiptNumber",
  HandingFee: "HandingFee",
  OrderTime: "OrderTime",
  BusinessInfo: "BusinessInfo",
  PayerInfo: "PayerInfo",
  RequestFund: "RequestFund",
  CompulsoryDeposit: "CompulsoryDeposit",
}

export const PopUpIndex = {
  BusinessName: 0,
  ReceiptNumber: 1,
  HandingFee: 2,
  OrderTime: 3,
  BusinessInfo: 4,
  PayerInfo: 5,
  RequestFund: 6,
  CompulsoryDeposit: 7,
}

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userLists = ['xiafa', 'jianchi'];
  const channelTypes = ['Vietnam card to card', 'Vietname ZALO', 'Vietname MOMO', 'Vietnam Direct', 'Vietnam bank scan code', 'Vietnam ViettelPay', 'Pay on behalf'];
  const collectionAccounts = ['Hoang THI HUO'];
  const notificationStatuses = ['receiptRecived', 'noReceipt', 'all'];
  const paymentStatuses = ['paid', 'unpaid', 'all'];
  const manualOrders = ['manualScoring', 'automaticScore', 'all'];
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const { allOrders, allCount } = useSelector(state => state.merchantState);
  const [data, setData] = useState({exportDate: {}});
  const [modalName, setModalName] = useState("selectexportrange");
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(new Array(Object.keys(PopUpType).length).fill(-1));
  const [payerTimeLine, setPayerTimeLine] = useState([]);
  const [moreInfoData, setMoreInfoData] = useState({});
  const [receiptNumberShow, setReceiptNumberShow] = useState(false);

  useEffect(() => {
    dispatch(orderService.getOrdersByPage({page : 1, count : 10}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(orderService.getOrderInfo());
  }, [dispatch]);

  useEffect(() => {
    const tableData = [];
    if(Object.keys(allOrders).length !== 0){
      allOrders.map((item, key) => {
          tableData.push({
            tk88OrderID: item.outTradeNo,
            businessName: item.merchantId ? item.merchantId.name : "VB66",
            merchantOrderId: `R0${item.outTradeNo}`,
            category: "qrcode",
            handlingFee: "0",
            orderAmount: item.orderAmount,
            paymentAmount: item.orderAmount,
            orderTime: item.createdAt,
            paymentStatus: true,
            notificationStatus: true,
            item
          });
      });
    }
    setTableData(tableData);
  }, [allOrders])

  const handlePaginationChange = (page, pageSize) => {
    if(count === pageSize) {
      setPage(page);
      dispatch(orderService.getOrdersByPage({count : pageSize, page : page}));
    }
    else{
      setCount(pageSize);
      setPage(1);
      dispatch(orderService.getOrdersByPage({count : pageSize, page : 1}));
    }
  }

  const onCancelHandler = () => {
    setIsOpenModal(false)
  }

  const onClickExportHandler = () => {
    setModalName("selectexportrange");
    setIsOpenModal(true);
  }

  const timeLineItems = [
    {
      children: `VB66: 0 ${t('merchantList.yuan')}`,
    },
    {
      children: `No superior directly under: 0 ${t('merchantList.yuan')}`,
    },
  ]

  const requestFundHandler = async(request) => {
    const res = await orderService.requestOrder(moreInfoData.item._id, request);
    if(res?.success)
      hide(PopUpIndex.RequestFund);
  }

  const modifyAccount = async(amount) => {
    setData({amount});
    setModalName("modifyaccount");
    setIsOpenModal(true);
  }

  const modifyAccountHandler = async(amount) => {
    const res = await orderService.modifyPaymentAmount(moreInfoData.item?._id, amount);
    if(res?.success)
    {
      dispatch(orderService.getOrdersByPage({page, count}));
      setIsOpenModal(false);
    }
  }

  const PopUpContent = (name, data) => {
    const [request, setRequest] = useState();
    const [payment, setPayment] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(0);
  
    switch (name) {
      case PopUpType.BusinessName:
        return (
          <div className='px-4 py-2 text-xs'>
            {data?.merchantOrderId}
          </div>
        );
      case PopUpType.ReceiptNumber:
        return (
          <div className='px-4 py-2 text-xs flex justify-center gap-x-2'>
            <Select placeholder={t('orderList.collectionAccount')} className='min-w-[300px]'>
              <Select.Option value={12}>
                {t('orderList.option1')}
              </Select.Option>
              <Select.Option value={15}>
                {t('orderList.option2')}
              </Select.Option>
              <Select.Option value={14}>
                {t('orderList.option3')}
              </Select.Option>
              <Select.Option value={13}>
                {t('orderList.option4')}
              </Select.Option>
            </Select>
            <OrangeButton label={t('agentmanagement.merchant.confirmation')} onClickHandler={() => { setReceiptNumberShow(false) }} />
          </div>
        );
      case PopUpType.HandingFee:
        return (
          <div className='px-4 text-xs'>
            <Timeline className='text-xs pt-3' items={timeLineItems} />
          </div>
        );
      case PopUpType.OrderTime:
        return (
          <div className='text-xs'>
            {dayjs(data.orderTime).format("YYYY:MM:DD")}
          </div>
        );
      case PopUpType.BusinessInfo:
        return (
          <div className='text-xs px-4 py-2 flex flex-col gap-y-2'>
            <div className='flex gap-x-2'>
              <span className='text-[#9575b1]'>{t('orderList.memo')} :</span>
              <span className='text-primary'>{data?.item?.bankMemo}</span>
            </div>
            <div className='flex gap-x-2'>
              <span className='text-[#9575b1]'>{t('orderList.vnBankCode')} :</span>
              <span className='text-primary'>{data?.item?.bankCode}</span>
            </div>
            <div className='flex gap-x-2'>
              <span className='text-[#9575b1]'>{t('orderList.vnBankCode')} :</span>
              <span className='text-primary'>{data?.item?.smsContent}</span>
            </div>
          </div>
        );
      case PopUpType.PayerInfo:
        return (
          <div className='px-4 py-2 text-xs'>
            <Timeline items={payerTimeLine} className='text-xs' />
          </div>
        );
      case PopUpType.RequestFund:
        return (
          <div className='px-4 py-2 text-xs'>
            <Input className="border !border-[#d9d9d9] rounded-md text-xs" placeholder={t('orderList.reasonForReturn')} value={request} onChange={(e) => { setRequest(e.target.value) }} />
            <div className='mt-3'>
              <OrangeButton label={t('agentmanagement.merchant.confirmation')} onClickHandler={() => requestFundHandler(request)} />
            </div>
          </div>
        );
      case PopUpType.CompulsoryDeposit:
        return (
          <div className='px-4 py-2 text-xs flex gap-x-2 items-center'>
            <div className='flex flex-col gap-y-1'>
              <Checkbox checked={payment} onChange={(e) => setPayment(e.target.checked)}>
                {t('orderList.paymentAmountCorrection')}
              </Checkbox>
              {payment && (<InputNumber className='w-full' value={paymentAmount} onChange={e => setPaymentAmount(e)} />)}
            </div>
            <OrangeButton label={t('agentmanagement.merchant.confirmation')} onClickHandler={() => { modifyAccount(paymentAmount) }} />
          </div>
        );
      default:
        break;
    }
  };

  const hide = (index) => {
    open[index] = -1;
    setOpen(open);
  };

  const handleOpenChange = (index, key) => {
    if (open[index] !== key) {
      {
        open[index] = key;
        setOpen(open);
      }
    } else hide(index);
  };

  const setPayerData = (data) => {
    // debugger
    let temp = [];
    temp = [
      { children: t('orderList.ipAddress', { ipAddress: data?.item?.ipAddress }) },
      { children: t('orderList.paymentIP') },
      { children: t('orderList.paymentIPAttribution') },
      { children: t('orderList.payerBrowser') },
      { children: t('orderList.payerCPU') },
      { children: t('orderList.payerDevice') },
      { children: t('orderList.payerOS') }
    ];
    setPayerTimeLine([...temp]);
  };
  
  const items = [
    {
      key: '1',
      label: (
        <span className='text-xs text-primary' onClick={() => merchantLinkHandler()}>
          {t('orderList.businessAddress')}
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span className='text-xs text-primary' onClick={() => notifyRecordHandler()}>
          {t('orderList.notificationRecord')}
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span className='text-xs text-primary'>
          {t('orderList.reissueNotice')}
        </span>
      ),
    },
    {
      key: '4',
      label: (
        <Popover
          content={() => PopUpContent(PopUpType.RequestFund, data)}
          title={
            <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
              <p>{t('orderList.requestRefund')}</p>
            </div>
          }
          trigger="click"
        >
          <span className='text-xs text-primary'>
            {t('orderList.requestRefund')}
          </span>
        </Popover>
      ),
    },
  ];
  
  const merchantLinkHandler = () => {
    setModalName("merchantlink");
    setIsOpenModal(true);
    setData({
      notifyUrl: moreInfoData.item.notifyUrl
    });
  };
  
  const notifyRequestColumn = [
    {
      title: t('orderList.notificationResult'),
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: t('orderList.requestContent'),
      dataIndex: 'requestContent',
      key: 'requestContent',
    },
    {
      title: t('orderList.signOriginalText'),
      dataIndex: 'originalText',
      key: 'originalText',
    },
    {
      title: t('orderList.serverReturns'),
      dataIndex: 'serverReturns',
      key: 'serverReturns',
    },
    {
      title: t('orderList.notificationTime'),
      dataIndex: 'notifyTime',
      key: 'notifyTime',
    },
  ];
  
  const notifyRecordDataSource = [
    {
      key: '1',
      result: <button className='py-1 px-2 text-[#00a854] bg-[#cfefdf] rounded-md'>{t('orderList.true')}</button>,
      requestContent: '{"amount":500000,"isPaid":1,"merchant_id":10039,}',
      originalText: 'amount=500000&isPaid=1&merchant_id=10039',
      serverReturns: t('orderList.success'),
      notifyTime: '2023-05-28 22:53:42',
    },
  ];

  const notifyRecordHandler = () => {
    setModalName("notifyrecord");
    setIsOpenModal(true);
    setData({
      columns: notifyRequestColumn,
      dataSource: notifyRecordDataSource
    })
  }

  return (
    <>
      <div className='px-[24px] py-[20px] text-xs dark:text-white'>
        <div className='table-title flex items-center'>
          <span>{t('orderList.title')}</span>
          <span className='mx-3'>{t('orderList.totalAmount')}</span>
          <span className='text-lg mx-3'>40</span>
          <span className='mr-1'>{t('orderList.millionYuan')}</span>
          <button className='ml-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark flex items-center' onClick={onClickExportHandler}><TiExport className='mr-2' />{t('orderList.exportData')}</button></div>
        <div className='table-contorl mt-1'>
          <ul className='flex flex-wrap'>
            <li className='flex items-center mr-5'>
              {t('orderList.findUser')}:
              <select className="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('orderList.usernameOrId')}</option>
                {
                    userLists.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('orderList.userLists.' + item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('orderList.channelType')}:
              <select className="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('orderList.channelType')}</option>
                {
                    channelTypes.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('orderList.channelTypes.' + item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
                {t('orderList.merchantOrderId')}:
                <input className='ml-1 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('orderList.merchantOrderId')}/>
              </li>
              <li className='flex items-center mr-10'>
                {t('orderList.payerIp')}:
                <input className='ml-1 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('orderList.payerIp')}/> 
              </li>
              <li className='flex items-center mr-10'>
                {t('orderList.tk88OrderID')}:
                <input className='ml-1 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('orderList.tk88OrderID')}/> 
              </li>
              <li className='flex items-center mr-5'>
              {t('orderList.collectionAccount')}:
              <select className="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('orderList.collectionAccount')}</option>
                {
                    collectionAccounts.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('orderList.collectionAccounts.' + item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('orderList.notificationStatus')}:
              <select className="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('orderList.notificationStatus')}</option>
                {
                    notificationStatuses.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('orderList.notificationStatuses.' + item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('orderList.paymentStatus')}:
              <select className="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('orderList.paymentStatus')}</option>
                {
                    paymentStatuses.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('orderList.paymentStatuses.'+ item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('orderList.manualOrder')}:
              <select className="ml-2 mb-1 py-1 w-[161px] h-[26px] text-xs cursor-pointer border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary">
                <option disabled selected hidden>{t('orderList.manualOrder')}</option>
                {
                    manualOrders.map((item, i) => {
                      return(
                        <option key={i} value={item}>{t('orderList.manualOrders.' + item)}</option>
                      )
                    })
                  }
                </select>  
              </li>
              <li className='flex items-center mr-5'>
              {t('orderList.amountRange')}:
              <input className='ml-1 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none text-xs' type='number' placeholder={t('orderList.lowest')}/>
              ~
              <input className='ml-1 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none text-xs' type='number' placeholder={t('orderList.highest')}/>  
              </li>
              <li className='flex items-center mr-10'>
                {t('orderList.orderInformation')}:
                <input className='ml-1 mb-1 w-[161px] h-[26px] px-1 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white dark:border-white dark:hover:border-primary dark:focus:border-primary dark:focus:outline-none' placeholder={t('orderList.orderInformation')} /> 
              </li>
            </ul>
        </div>
        <div className='table-content mt-5 text-center'>
          <div className='flex flex-wrap'>
                <div className='flex'>
                  <button className='p-[3px_20px] text-sm border border-grey rounded-l cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.withInAnHour')}</button>
                  <button className='p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary 
                  hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.today')}</button>
                  <button className='p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.yesterday')}</button>
                  <button className='p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.last7Days')}</button>
                  <button className='p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.aMonth')}</button>
                  <button className='p-[3px_20px] text-sm border border-grey rounded-r cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.3Months')}</button>
                </div>
                <div className='ml-3 flex items-center mr-5'>
                {'select date'}:
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
              </div>
                <div className='flex'>
                  <button className='p-[3px_20px] text-sm border border-grey rounded-l cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.creationTime')}</button>
                  <button className='p-[3px_20px] text-sm border border-grey rounded-r cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary w-max'>{t('orderList.paymentTime')}</button>
                </div>
                <div className='flex items-center ml-3 '>
                  <button className='mr-1 p-[0px_20px] h-[30px] text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark'>{t('orderList.quire')}(30)</button>
                </div>
              </div>
          <table className='mt-2 w-full dark:text-grey-light text-left'>
            <thead>
              <tr className='bg-grey-light font-semibold dark:bg-grey-dark'>
                <th className='p-[10px_8px]'>{t('orderList.tk88OrderID')} <RiFileCopyFill className='cursor-pointer' /></th>
                <th className='p-[10px_8px]'>{t('orderList.businessName')}</th>
                <th className='p-[10px_8px]'>{t('orderList.merchantOrderId')}</th>
                <th className='p-[10px_8px]'>{t('orderList.receiptNumber')}</th>
                <th className='p-[10px_8px]'>{t('collectionManagement.receiptreport.receiptNumber')}</th>
                <th className='p-[10px_8px]'>{t('orderList.handlingFee')}</th>
                <th className='p-[10px_8px]'>{t('orderList.orderAmount')}</th>
                <th className='p-[10px_8px]'>{t('orderList.paymentAmount')}</th>
                <th className='p-[10px_8px]'>{t('orderList.orderTime')}</th>
                <th className='p-[10px_8px]'>{t('orderList.paymentStatus')}</th>
                <th className='p-[10px_8px]'>{t('orderList.notificationStatus')}</th>
                <th className='p-[10px_8px]'>{t('orderList.operator')}</th>
              </tr>
            </thead>
            <tbody>
            {tableData.map((data, key) => (
              <tr className='border-grey border-b-[1px]' key={key} onClick={() => setMoreInfoData(data)}>
                <td className='p-[12px_8px]'>{data.tk88OrderID}</td>
                <td className='p-[12px_8px] text-primary cursor-pointer'>
                  <Popover
                    content={() => PopUpContent(PopUpType.BusinessName, data)}
                    title={
                      <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                        <p>{t('orderList.details')}</p>
                      </div>
                    }
                    trigger="hover"
                  >
                    {data.businessName}
                  </Popover>
                </td>
                <td className='p-[12px_8px]'>{data.merchantOrderId}</td>
                <td className='p-[12px_8px]'><ImQrcode className='scale-[2]' /></td>
                <td className='p-[12px_8px] text-primary text-xs cursor-pointer'>
                  <Popover
                    content={() => PopUpContent(PopUpType.ReceiptNumber, data)}
                    title={
                      <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                        <p>{t('orderList.modifyPaymentNumber')}</p>
                      </div>
                    }
                    open={receiptNumberShow}
                    onOpenChange={() => setReceiptNumberShow(true)}
                    trigger="click"
                    
                  >
                    [TCB]#12-HOANG THI HUONG
                  </Popover>
                </td>
                <td className='text-primary p-[12px_8px] cursor-pointer'>
                  <Popover
                    content={() => PopUpContent(PopUpType.HandingFee, data)}
                    title={
                      <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                        <p>{t('orderList.salaryDistribution')}</p>
                      </div>
                    }
                    placement='right'
                    trigger="click"
                  >
                    <span className='text-lg'>
                      {data["handlingFee"]}
                    </span> {t('merchantList.yuan')}
                  </Popover>
                </td>
                <td className='p-[12px_8px]'><span className='text-lg'>{data.orderAmount}</span> {t('merchantList.millionYuan')}</td>
                <td className='p-[12px_8px]'><span className='text-lg'>{data.paymentAmount}</span> {t('merchantList.millionYuan')}</td>
                <td className='p-[12px_8px] text-primary cursor-pointer'>
                  <Popover
                    content={() => PopUpContent(PopUpType.OrderTime, data)}
                    title={
                      <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                        <p>{t('orderList.orderPaymentTime')}</p>
                      </div>
                    }
                    trigger="hover"
                  >
                    {dayjs(data.orderTime).format("YYYY:MM:DD")}
                  </Popover>
                </td>
                <td className={data.item["status"] === "paid" ? 'p-[12px_8px] text-green' : 'p-[12px_8px] text-red'}>
                  <div className='flex items-center'>
                    {data.item["status"] === "paid" ? (
                      <>
                        <RiCheckboxCircleFill className='mr-1' />
                        {t('orderList.paid')}
                      </>
                    ) : (
                      <>
                        <RiErrorWarningFill className='mr-1' />
                        {
                          data.item["status"] === "unPaid" ? t('orderList.unpaid') : t('orderList.refunded')
                        }
                      </>
                    )}
                  </div>
                </td>
                <td>
                  {data.notificationStatus && (
                    <span className='p-[12px_8px] text-blue'>{t('orderList.receiptReceived')}</span>
                  )}
                  {!data.notificationStatus && (
                    <span className='p-[12px_8px] text-red'>{t('orderList.noReceipt')}</span>
                  )}
                  <button className='text-xs mx-1 p-[4px_8px] text-green rounded bg-green-light hover:opacity-75 w-max'>
                    {t('orderList.automatic')}
                  </button>
                </td>
                <td className='p-[12px_8px]'>
                  <div>
                    {data["status"] === "unPaid" && (
                      <>
                        <a className='text-primary'>{t('orderList.compulsoryDeposit')}</a>
                        <span className='mx-2 text-xs text-grey'>|</span>
                      </>
                    )}
                    {data["status"] !== "paid" && (
                      <>
                        <Popover
                          content={() => PopUpContent(PopUpType.CompulsoryDeposit, data)}
                          title={
                            <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                              <p>{t('orderList.businessInformation')}</p>
                            </div>
                          }
                          trigger="click"
                        >
                          <button className='text-primary'>{t('orderList.compulsoryDeposit')}</button>
                        </Popover>
                        <span className='mx-2 text-xs text-grey'>|</span>
                      </>
                    )}
                    <Popover
                      content={() => PopUpContent(PopUpType.BusinessInfo, data)}
                      title={
                        <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                          <p>{t('orderList.businessInformation')}</p>
                        </div>
                      }
                      trigger="hover"
                    >
                      <button className='text-primary'>{t('orderList.businessInformation')}</button>
                    </Popover>
                    <span className='mx-2 text-xs text-grey'>|</span>
                    <Popover
                      content={() => PopUpContent(PopUpType.PayerInfo, data)}
                      title={
                        <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium flex justify-between w-full items-center">
                          <p>{t('orderList.payerInformation')}</p>
                        </div>
                      }
                      trigger="click"
                    >
                      <button className='text-primary' onClick={() => setPayerData(data)}>
                        {t('orderList.payerInformation')}
                      </button>
                    </Popover>
                  </div>
                  <Dropdown menu={{ items }} trigger="click">
                    <div className='text-xs text-primary flex items-center gap-x-1 cursor-pointer'>
                      {t('orderList.moreOperations.moreOperations')} <DownOutlined />
                    </div>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          <div className="flex items-center justify-end mt-4">
            <Pagination
              showSizeChanger
              current={page}
              pageSize={count}
              onChange={handlePaginationChange}
              total={allCount}
            />
          </div>
        </div>
      </div>
      <MainModal data={data} setData={setData} isOpen={isOpenModal} onClose={() => setIsOpenModal()} onClickHandlers={{ fillingSure: () => {}, modifyAccount: modifyAccountHandler }} name={modalName} setModalName={setModalName} onCancelHandler={onCancelHandler}
      />
    </>
  );
}
