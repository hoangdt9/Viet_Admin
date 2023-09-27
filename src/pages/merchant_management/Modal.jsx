import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OrangeButton } from "../../components/ui/button/AgentManagement";
import { Select, TimePicker, Button, InputNumber, Input, Switch, Table, Tabs, DatePicker, Radio } from "antd";
import { BsPlus, BsFillQuestionDiamondFill, BsFillQuestionCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import "../agent_management/style.css";
import { useDispatch } from "react-redux";
import {
  getDebitCardsInfo,
  addDebitCard,
} from "../../redux/financial/debit-card/debitCardReducer";
import DateRangePicker from "../../components/ui/datepicker/range-picker";

const Modal = ({
  isOpen,
  onClose,
  name,
  setModalName,
  onCancelHandler,
  onClickHandlers,
  data,
  setData,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [payments, setPayments] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [whiteList, setWhiteList] = useState({
    payment: [{
      ip: '8.209.246.232'
    }],
    collection: [],
    issue: []
  })
  const [tab, setTab] = useState('1');

  const [tabItems, setTabItems] = useState([
    {
      key: '1',
      label: t('merchantList.paymentWhitelist'),
      children: t('merchantList.contentOfTabPane1'),
    },
    {
      key: '2',
      label: t('merchantList.collectionWhitelist'),
      children: t('merchantList.contentOfTabPane2'),
    },
    {
      key: '3',
      label: t('merchantList.issueWhitelist'),
      children: t('merchantList.contentOfTabPane3'),
    },
  ]);

  const column = (key, ip, tab) => {
    return {
      key,
      index: key,
      ip: <Input defaultValue={ip} className="border !border-[#d9d9d9] rounded-md text-xs" />,
      operate: <button className="text-primary text-xs cursor-pointer" onClick={() => onClickDeleteRow(key)}>delete</button>
    }
  }

  const onClickDeleteRow = (key) => {
    let temp = [];
    switch(tab) {
      case '1':
        temp = [...whiteList.payment];
        temp.splice(key-1, 1);
        setWhiteList({
          ...whiteList,
          payment: temp
        });
        break;
      case '2':
        temp = [...whiteList.collection];
        temp.splice(key-1, 1);
        setWhiteList({
          ...whiteList,
          collection: temp
        });
        break;
      case '3':
        temp = [...whiteList.issue];
        temp.splice(key-1, 1);
        setWhiteList({
          ...whiteList,
          issue: temp
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let temp = [];
    let tempTabItems = [...tabItems];
    whiteList.payment.map((item, key) => {
      temp.push(column(key+1, item.ip, "payment"))
    })
    tempTabItems[0].children = <Table className="text-xs"
    dataSource={temp}
    columns={whiteColumns}
    pagination={false} />
    temp = [];
    whiteList.collection.map((item, key) => {
      temp.push(column(key+1, item.ip, "collection"))
    })
    tempTabItems[1].children = <Table className="text-xs"
    dataSource={temp}
    columns={whiteColumns}
    pagination={false} />
    temp = [];
    whiteList.issue.map((item, key) => {
      temp.push(column(key+1, item.ip, "issue"))
    })
    tempTabItems[2].children = <Table className="text-xs"
    dataSource={temp}
    columns={whiteColumns}
    pagination={false} />
    
    setTabItems([...tempTabItems]);
  }, [whiteList])

  useEffect(() => {
    if(payments !== 0)
    {
      let temp = [...dataSource];
      temp.push({
        groupNumber: payments,
        key: payments,
        url: <Input className="border !border-[#d9d9d9] rounded-md text-xs" />,
        keyNumber: <Input className="border !border-[#d9d9d9] rounded-md text-xs" />,
        operate: <button className="text-primary text-xs cursor-pointer" onClick={() => onClickRemoveRow(payments-1)}>delete</button>
      })
      setDataSource([...temp])
    }
  }, [payments])

  const onClickRemoveRow = (key) => {
    let temp = [...dataSource];
    // temp.pop()
    // setDataSource([...temp]);
  }

  const changeHandler = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const columns = [
    {
      title: t('merchantList.groupNumber'),
      dataIndex: "groupNumber",
      key: "groupNumber",
    },
    {
      title: t('merchantList.url'),
      dataIndex: "url",
      key: "url",
    },
    {
      title: t('merchantList.key'),
      dataIndex: "keyNumber",
      key: "keyNumber",
    },
    {
      title: t('merchantList.operate'),
      dataIndex: "operate",
      key: "operate",
    },
  ];

  const whiteColumns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: t('merchantList.operate'),
      dataIndex: "operate",
      key: "operate",
    }
  ]

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // onClose(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // Clean up when onClose function changes

  useEffect(() => {
    console.log("getDebitCardsInfo");
    dispatch(getDebitCardsInfo());
  }, [dispatch]);
  if (!isOpen) return null;

const onCancelClick = () => {
    onCancelHandler();
}
const onSureClick = () => {
    
}

const onClickAddhandler = () => {
  setPayments(payments + 1);
}

const onChangeTab = (tab) => {
  setTab(tab);
}
// const [whiteList, setWhiteList] = useState({
//   payment: [{}],
//   collection: [],
//   issue: []
// })
const onClickTabAddColumn = () => {
  let temp = [];
  switch(tab) {
    case '1':
      temp = [...whiteList.payment];
      temp.push({});
      setWhiteList({
        ...whiteList,
        payment: temp
      });
      break;
    case '2':
      temp = [...whiteList.collection];
      temp.push({});
      setWhiteList({
        ...whiteList,
        collection: temp
      });
      break;
    case '3':
      temp = [...whiteList.issue];
      temp.push({});
      setWhiteList({
        ...whiteList,
        issue: temp
      });
      break;
    default:
      break;
  }
}
const { RangePicker } = DatePicker;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="!flex items-start mt-[70px] justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-[#3737379A]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
        <div>
          {name === "merchant_list" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "}
                    {t('merchantList.innerFilling')}
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>

              {/* Start content section */}
              <div className="flex flex-col justify-start items-start border-b-[1px] border-[#e9e9e9] dark:border-white">
              <div className="flex justify-center text-xs items-center mt-5 w-3/5">
                  <label
                    htmlFor=""
                    className=" text-grey-dark dark:text-white w-[80px] text-right"
                  >
                    User ID:
                  </label>
                  
                  <label htmlFor="" className="ml-2 dark:text-white dark:bordr-white p-[3px_5px] w-56">{data?.key}</label>
                </div>
                {/* Start Amount of */}
                <div className="flex justify-center items-center mt-5 w-full p-4">
                  <label
                    htmlFor=""
                    className="text-xs text-grey-dark dark:text-white w-[80px] text-right"
                  >
                    Amount of:
                  </label>
                  <InputNumber
                    onChange={(e) => changeHandler("amount", e)}
                    value={data?.amount}
                    className="ml-2 dark:bg-black flex-1"
                  />
                </div>
                {/* Start Charge rate */}
                <div className="flex justify-start items-center mt-5 w-full p-4 gap-x-2">
                <label
                  htmlFor=""
                  className="text-xs text-grey-dark dark:text-white w-[80px] text-right"
                >
                  {t('merchantList.chargeRate')}
                </label>
                <Select
                  placeholder={t('merchantList.selectChannel')}
                  className="text-[#231e22] flex-1"
                  onChange={(e) => changeHandler("chargeRate", e)}
                  value={data?.chargeRate}
                >
                  <Select.Option value="default">
                    {t('merchantList.vietnameCard')}
                  </Select.Option>
                  <Select.Option value="zalo">
                    {t('merchantList.vietnameZALO')}
                  </Select.Option>
                  <Select.Option value="momo">
                    {t('merchantList.vietnameMOMO')}
                  </Select.Option>
                  <Select.Option value="direct">
                    {t('merchantList.vietnameDirect')}
                  </Select.Option>
                  <Select.Option value="viettel">
                    {t('merchantList.vietnameViettelPay')}
                  </Select.Option>
                  <Select.Option value="internal">
                    {t('merchantList.internalCharge')}
                  </Select.Option>
                </Select>
                </div>
                {/* Start handling fe */}
                <div className="flex justify-center text-xs items-center text-grey-dark dark:text-white mt-5 p-4 w-full gap-x-2">
                  <label htmlFor="" className="w-[80px] text-right">
                    {t('merchantList.handlingFee')}
                  </label>
                  <label htmlFor="" className="text-base dark:text-white dark:bordr-white p-[3px_5px] flex-1">
                    0 {t('merchantList.yuan')}
                  </label>
                </div>
                {/* Start Actual dep */}
                <div className="flex justify-center text-xs items-center text-grey-dark dark:text-white mt-5 p-4 w-full gap-x-2">
                  <label htmlFor="" className="w-[80px] text-right">
                    {t('merchantList.actualDep')}
                  </label>
                  <label htmlFor="" className="text-base dark:text-white dark:bordr-white p-[3px_5px] flex-1">
                    0 {t('merchantList.yuan')}
                  </label>
                </div>
                {/* Start Remark */}
                <div className="flex justify-center items-center mt-5 mb-6 w-full p-4 gap-x-2">
                  <label
                    htmlFor=""
                    className="text-xs text-grey-dark dark:text-white w-[80px] text-right"
                  >
                    {t('merchantList.remark')}
                  </label>
                  <Input
                    onChange={(e) => changeHandler("remark", e.target.value)}
                    value={data?.remark}
                    className="border !border-[#d9d9d9] rounded-md text-xs flex-1"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-end pr-4 py-2">
                    <button
                    onClick={onCancelClick}
                    className="mr-3 p-[2px_10px] rounded-sm border border-primary text-grey-dark dark:bg-grey-dark dark:border-white dark:text-white"
                    >
                    {t('merchantList.cancel')}
                    </button>
                    <button
                    onClick={onClickHandlers.fillingSure}
                    className="p-[2px_10px] rounded-sm border bg-primary text-white dark:bg-grey-dark dark:border-primary dark:text-white"
                    >
                    {t('merchantList.sure')}
                    </button>
                </div>
            </div>
          )}
        </div>
        <div>
          {name === "payment_list" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "}
                    
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>

              {/* Start content section */}
              <div className="p-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-x-1">
                    <p className="text-[rgba(0,0,0,0.65)] text-xs">
                      {t('merchantList.checkSwitch')}
                    </p>
                    <Switch checkedChildren={t('merchantList.open')} unCheckedChildren={t('merchantList.close')} defaultChecked />
                  </div>
                  <OrangeButton label={t('merchantList.add')} onClickHandler={onClickAddhandler} />
                </div>
                <Table
                  className="text-xs"
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </div>
              <div className="flex flex-row justify-end pr-4 py-2">
                    <button
                    onClick={onCancelClick}
                    className="mr-3 p-[2px_10px] text-xs rounded-sm border border-primary text-grey-dark dark:bg-grey-dark dark:border-white dark:text-white"
                    >
                    {t('merchantList.cancel')}
                    </button>
                    <OrangeButton label={t('merchantList.sure')} onClickHandler={onClickHandlers.fillingSure} />
                </div>
            </div>
          )}
        </div>
        {/* white_list */}
        <div>
          {name === "white_list" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "}
                    
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>

              {/* Start content section */}
              <div className="p-4 w-full">
                <div className="relative">
                  <Tabs defaultActiveKey="1" items={tabItems} onChange={onChangeTab} />
                  <div className="absolute top-2 right-1">
                    <OrangeButton label="Add" onClickHandler={onClickTabAddColumn} />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end pr-4 py-2">
                    <button
                    onClick={onCancelClick}
                    className="mr-3 p-[2px_10px] text-xs rounded-sm border border-primary text-grey-dark dark:bg-grey-dark dark:border-white dark:text-white"
                    >
                    {t('merchantList.cancel')}
                    </button>
                    <OrangeButton label={t('merchantList.sure')} onClickHandler={onClickHandlers.fillingSure} />
                </div>
            </div>
          )}
        </div>
        {/* white_list */}
        <div>
          {name === "selectexportrange" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "} Select export range (up to 7 days)
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>

              <div className="px-8 py-2 flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs text-[rgba(0,0,0,0.65)] w-[120px] text-right">export by date:</p>
                  <DateRangePicker value={data?.exportDate} setValue={(e => changeHandler("exportDate", e))} />
                </div>
                <div className="flex items-center gap-x-2">
                  <p className="text-xs text-[rgba(0,0,0,0.65)] w-[120px] text-right">quick export:</p>
                  <Radio.Group defaultValue="a" buttonStyle="solid" value={data?.exportType} setValue={(e => changeHandler("exportType", e.target.value))}>
                    <Radio.Button value="that day">that day</Radio.Button>
                    <Radio.Button value="nearly three days">nearly three days</Radio.Button>
                    <Radio.Button value="nearly seven days">nearly seven days</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div className="flex flex-row justify-center py-3 gap-x-3">
                <OrangeButton label={t('agentmanagement.merchant.confirmation')} onClickHandler={onClickHandlers.fillingSure} />
                <Button onClick={onCancelClick} className="text-xs">
                  {t('merchantList.cancel')}
                </Button>
                </div>
            </div>
          )}
        </div>
        {/* merchantlink */}
        <div>
          {name === "merchantlink" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "} Merchant link address
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>

              <div className="px-8 py-2 flex flex-col gap-y-4">
                <div className="flex items-center border-b border-[rgba(233,233,233)] mt-2">
                  <p className="w-[200px] text-xs text-[rgba(0,0,0,0.65)] pb-4">notification address</p>
                  <p className="text-xs pb-4">{data?.notifyUrl}</p>
                </div>
                <div className="flex items-center border-b border-[rgba(233,233,233)]">
                  <p className="w-[200px] text-xs text-[rgba(0,0,0,0.65)] pb-4">return address</p>
                  {/* <p>{data?.notifyUrl}</p> */}
                </div>
              </div>
              <div className="flex flex-row justify-center py-3 gap-x-3">
                <Button onClick={onCancelClick} className="text-xs">
                  {t('merchantList.cancel')}
                </Button>
                <OrangeButton label={t('agentmanagement.merchant.sure')} onClickHandler={onClose} />
              </div>
            </div>
          )}
        </div>
        {/* notifyrecord */}
        <div>
          {name === "notifyrecord" && (
            <div className="inline-block align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full">
              {/* Start header section */}
              <div className="justify-between h-[56px] py-[13px] px-[16px] flex items-center border-b-[1px] border-[#e9e9e9] dark:border-white">
                <div>
                  <h2 className="text-[14px] dark:text-white">
                    {" "} Merchant link address
                  </h2>
                </div>
                <div>
                  <button className="" onClick={() => onClose(false)}>
                    x
                  </button>
                </div>
              </div>
              <div className="px-8 py-2">
                <Table columns={data?.columns} pagination={false} dataSource={data?.dataSource} />
              </div>
              <div className="flex flex-row justify-end py-3 gap-x-3">
                <Button onClick={onCancelClick} className="text-xs">
                  {t('merchantList.cancel')}
                </Button>
                <OrangeButton label={t('agentmanagement.merchant.sure')} onClickHandler={onClose} />
              </div>
            </div>
          )}
        </div>
        <div>
          {name === "modifyaccount" && (
            <div className="inline-block max-w-[416px] align-bottom bg-white dark:bg-[#3e3c3b] rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-w-[500px] sm:w-full p-6">
              <div className="flex">
                <BsFillQuestionCircleFill className="text-[#ffbf00] font-bold w-[240px]" />
                <div>
                  <p className="text-[14px] text-[rgba(0,0,0,0.65)] font-bold">Confirm that the order is complete</p>
                  <span className="text-red text-[2rem] font-medium">
                    Order amount 50,000 Unmodified
                  </span>
                  <h2 className="text-[1.5rem] text-[rgba(0,0,0,0.85)] font-bold">Please confirm whether the payment has been received and whether the actual payment amount is correct. After confirmation, it will not be cancelled.</h2>
                </div>
              </div>
              <div className="flex flex-row justify-end py-3 gap-x-3">
                <Button onClick={onCancelClick} className="text-xs">
                  {t('merchantList.cancel')}
                </Button>
                <OrangeButton label={t('agentmanagement.merchant.sure')} onClickHandler={() => {
                  onClickHandlers?.modifyAccount(data?.amount);
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
