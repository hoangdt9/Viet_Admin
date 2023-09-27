import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import {
  getAllOrders,
  getDevitCards,
} from "../../redux/settlement_list/settlementReducer";
import Modal from "./Modal";
import { Excelexport } from "../../components/ExcelExport.jsx";
import { settlementService } from "../../redux/services/settlement.service";
import { debitCardService } from "../../services/financial/debit-card/debitCard.service";
export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderData = useSelector(
    (state) => state.settlementState?.orderData?.orders
  );
  const { debitCards } = useSelector((state) => state.settlementState);
  const [debitData, setDebitData] = useState([]);
  const [data, setOrderData] = useState([]);
  const [isExpand, setExpand] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalName, setModalName] = useState("settlement_list");
  const [editId, setEditId] = useState("");
  const [modalData, setModalData] = useState({});

  const onChangeSequence = async (key) => {
    const res = await debitCardService.changeSequence(
      debitData[key]._id,
      debitData[key - 1]._id
    );
    if (res.success) dispatch(getDevitCards());
  };

  // When change the Edit Input change
  const onEditInputChange = (e) => {
    console.log(e.target.value);
    // e.preventDefault();
    // setUpdateCardData({
    //     ...updateCardData,
    //     [e.target.name]: e.target.value
    // })
  };
  // Wheb click closure button
  const onClickClosure = (e) => {
    // console.log(e.target.id);
    // let robotData = {};
    // robotData.id= e.target.id;
    // robotData.paymentRobot = "turn on";
    // dispatch(changeRobot(robotData));
  };
  // Wheb click turn on button
  const onClickTurnOn = (e) => {
    // console.log(e.target.id);
    // let robotData = {};
    // robotData.id= e.target.id;
    // robotData.paymentRobot = "closure";
    // dispatch(changeRobot(robotData));
  };
  // Update debit card
  const onUpdateHandler = () => {
    // dispatch(updateDebitCard(updateCardData));
    // setEditId("");
  };
  // When click the Edit button
  const onCancelClick = (e) => {
    // console.log(e.target.id);
    // const e_Id = e.target.id;
    // cardsInfo.forEach((value, key) => {
    //   console.log(value);
    //   if(value._id === e_Id) {
    //     let temp = {};
    //     temp.id = value._id;
    //     temp.name = value.name;
    //     temp.bankName = value.bankName;
    //     temp.bankAccount = value.bankAccount;
    //     setUpdateCardData(temp);
    //     return;
    //   }
    // })
    // setEditId(e_Id);
  };
  // Cancel updating debit card
  const onCancelUpdate = () => {
    // setEditId("");
  };
  const onCancelHandler = () => {
    // setIsOpenModal(false);
  };
  useEffect(() => {
    setDebitData(debitCards);
  }, [debitCards]);
  const onChangePaymentHandler = (e) => {
    if (e.target.value !== "All")
      setDebitData(
        debitCards.filter((debit) => debit.bankAccount === e.target.value)
      );
    else setDebitData(debitCards);
  };
  // When click the settlement button
  const onSettlementClick = () => {};
  // When click the settlement view certificate button
  const onViewCertificateClick = (e) => {
    e.preventDefault(e);
    // const id = e.target.id;
    // console.log(id);
    // dispatch(deleteDebitCard({id}));
  };

  const onClickNewSignUpHandler = async () => {
    console.log("modalData", modalData);
    const res = await settlementService.setWithDrwalSetting(modalData);
    dispatch(getDevitCards());
  };
  useEffect(() => {
    console.log("useEffect");
    dispatch(getAllOrders());
    dispatch(getDevitCards());
  }, [dispatch]);

  useEffect(() => {
    // const interval = setInterval(() => {
      dispatch(getAllOrders());
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("useEffect");
    setOrderData(orderData);
  }, [dispatch, orderData]);

  const onBackUndoClick = () => {
    setIsOpenModal(true);
  };

  // When click the Export Data button
  const onExportDataClick = () => {
    setModalName("export_data");
    setIsOpenModal(true);
  };
  
  const TableItem = ({ item, key }) => {
    return (
      <tr
        key={key}
        className="hover:bg-[#faefeb] dark:hover:bg-[#4D465E] text-grey-dark dark:text-white border-b-[1px] border-grayCustom text-xs"
      >
        <td className="p-[12px_8px] ">
          <input
            type="checkbox"
            id="selectAll"
            name="selectAll"
            className="mt-3 rounded text-primary"
          />
        </td>
        <td className="p-[12px_8px] "></td>
        <td className="p-[12px_8px] ">{item._id}</td>
        <td className="p-[12px_8px]">
          {item._id !== editId ? (
            item.merchantId?.name
          ) : (
            <input
              type="text"
              name="name"
              id={item._id}
              defaultValue={item.name}
              onChange={onEditInputChange}
              className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            />
          )}
        </td>
        <td className="p-[12px_8px]">
          {item._id !== editId ? (
            item.merchantId?.name
          ) : (
            <input
              type="text"
              name="bankName"
              id={item._id}
              defaultValue={item.bankName}
              onChange={onEditInputChange}
              className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            />
          )}
        </td>
        <td className="p-[12px_8px]">
          {item._id !== editId ? (
            item.orderAmount
          ) : (
            <input
              type="text"
              name="bankAccount"
              id={item._id}
              defaultValue={item.bankAccount}
              onChange={onEditInputChange}
              className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            />
          )}
        </td>
        <td className="p-[12px_8px]">{item.orderAmount} yuan</td>
        <td className="p-[12px_8px] text-primary">171,511</td>
        <td className="p-[12px_8px] "></td>
        <td className="p-[12px_8px] ">{item.updatedAt}</td>
        <td className="p-[12px_8px] ">{item.status}</td>
        <td className="p-[12px_8px] "></td>

        <td className="p-[12px_8px] text-primary ">
          {item._id !== editId ? (
            <>
              <button
                id={item._id}
                onClick={onSettlementClick}
                className="pr-2 border-r dark:border-white leading-[10px]"
              >
                {t("settlement_list.settlement")}
              </button>
              <button
                id={item._id}
                onClick={onCancelClick}
                className="pr-2 border-r border-white leading-[10px] pl-2"
              >
                {t("settlement_list.cancel")}
              </button>
              {/* <button id={item._id} onClick={onTransferHandler} className="pr-2 border-r border-white leading-[10px] pl-2">
              {t("financial.debitcard.transfer")}
            </button> */}
              <button
                id={item._id}
                onClick={onViewCertificateClick}
                className="pl-2"
              >
                {t("settlement_list.settlementViewCertificate")}
              </button>
            </>
          ) : (
            <>
              <button
                id={item._id}
                onClick={onUpdateHandler}
                className="pr-2 border-r dark:border-white leading-[10px]"
              >
                {t("financial.debitcard.keep")}
              </button>
              <button
                id={item._id}
                onClick={onCancelUpdate}
                className="pr-2 border-r border-white leading-[10px] pl-2"
              >
                {t("financial.debitcard.cancel")}
              </button>
            </>
          )}
        </td>
      </tr>
    );
  };

  const onClickSignUpHandler = (devitCard) => {
    setModalName("setup");
    setModalData({
      ...devitCard,
      id: devitCard?._id,
    });
    setIsOpenModal(true);
  };

  const clickSwitch = async(checked, id) => {
    console.log("value: ", checked);
    console.log("key: " + id);
    await debitCardService.changeCheckedCardRequest({id, checked});
    dispatch(getDevitCards());
  }

  console.log("orderdata", orderData);
  return (
    <>
      <div className="flex">
        <div className={`pr-2 ${isExpand ? "w-full" : "w-1/4"}`}>
          <div>
            <a href="/debit-card" className="mr-1 p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark">
              {t("settlement_list.payemntCardManagement")}
            </a>
            <button className="mr-1 p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark">
              {t("settlement_list.codeConversation")}
            </button>
            <button
              className="p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark"
              onClick={() => setExpand(!isExpand)}
            >
              {isExpand
                ? t("settlement_list.zoomOut") + "<<"
                : t("settlement_list.expend") + ">>"}
            </button>
          </div>
          <div>
            <select
              className="py-1 w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white"
              onChange={onChangePaymentHandler}
            >
              <option selected className="text-grey">
                {t("settlement_list.all")}
              </option>
              <option>TCB</option>
              <option>VTB</option>
              <option>VIB</option>
              <option>VCB</option>
            </select>
          </div>
          <hr className="mt-2 border-[1.5px] border-grey" />
          <div className={`${isExpand && "grid grid-cols-4 gap-4"}`}>
            {debitData?.map((debitCard, key) => (
              <div className="relative mt-2 p-4 border border-grey rounded duration-300 dark:bg-grey-dark hover:shadow-lg">
                <h6 className="dark:text-white">{`#${key + 1} :${
                  debitCard?.name
                }`}</h6>
                <hr className="border-grey" />
                <div>
                  <label className="mr-2 text-sm dark:text-white">
                    {t("settlement_list.state")}:
                  </label>
                  <span className="mr-5 px-2 rounded text-sm bg-primary-light dark:text-white">
                    {debitCard?.paymentRobot}
                  </span>
                  <label className="mr-2 text-sm dark:text-white">
                    {debitCard?.automaticPayment &&
                      t("settlement_list.automaticPayment")}
                  </label>
                  <Switch
                    checked={debitCard?.checked}
                    className="flex items-center"
                    color="warning"
                    onChange={(e) => clickSwitch(e.target.checked, debitCard._id)}
                  />
                </div>
                <div>
                  <label className="mr-2 text-sm dark:text-white">
                    {t("settlement_list.balance")}:
                  </label>
                  <span className="mr-2 text-lg text-primary">
                    {debitCard?.balance}
                  </span>
                  <button className="mr-1 px-2 text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark">
                    Synchronize
                  </button>
                  <button
                    onClick={() => onClickSignUpHandler(debitCard)}
                    className="mr-1 px-2 text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark"
                  >
                    Set up
                  </button>
                </div>
                <div>
                  <label className="mr-1 text-sm dark:text-white">
                    {t("settlement_list.outToday")}:
                  </label>
                  <span className="mr-1 text-lg text-primary">0</span>
                </div>
                <div>
                  <label className="mr-1 text-sm dark:text-white">
                    {t("settlement_list.task")}:
                  </label>
                  <span className="mr-1 text-sm dark:text-white">
                    Transfer-NAN
                  </span>
                </div>
                {key !== 0 && (
                  <button
                    className="absolute bottom-2 right-2 px-1 border text-sm rounded cursor-pointer"
                    onClick={() => {
                      onChangeSequence(key);
                    }}
                  >
                    {t("settlement_list.up")}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {!isExpand && (
          <div className="pl-2 w-3/4">
            <div className="flex flex-wrap">
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.settlementID")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.settlementID")}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.merchantID")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.merchantID")}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.merchantOrderID")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.merchantOrderID")}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.payee")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.payee")}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.collectionAccount")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.collectionAccount")}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.beneficiaryBank")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.beneficiaryBank")}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.debitCard")}:
                </label>
                <select className="py-1 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white">
                  <option disabled selected className="text-grey">
                    {t("settlement_list.choosePaymentCard")}
                  </option>
                  <option>TCB</option>
                  <option>VTB</option>
                  <option>VIB</option>
                  <option>VCB</option>
                </select>
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.issuer")}:
                </label>
                <select className="py-1 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white">
                  <option disabled selected className="text-grey">
                    {t("settlement_list.selectTheSender")}
                  </option>
                  <option>TCB</option>
                  <option>VTB</option>
                  <option>VIB</option>
                  <option>VCB</option>
                </select>
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.settlementStatus")}:
                </label>
                <select className="py-1 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white">
                  <option disabled selected className="text-grey">
                    {t("settlement_list.undone")}
                  </option>
                  <option>TCB</option>
                  <option>VTB</option>
                  <option>VIB</option>
                  <option>VCB</option>
                </select>
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.approvalStatus")}:
                </label>
                <select className="py-1 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white">
                  <option disabled selected className="text-grey">
                    {t("settlement_list.approvalStatus")}
                  </option>
                  <option>TCB</option>
                  <option>VTB</option>
                  <option>VIB</option>
                  <option>VCB</option>
                </select>
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.orderStatus")}:
                </label>
                <select className="py-1 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white">
                  <option disabled selected className="text-grey">
                    {t("settlement_list.notRevoked")}
                  </option>
                  <option>TCB</option>
                  <option>VTB</option>
                  <option>VIB</option>
                  <option>VCB</option>
                </select>
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.selectDate")}:
                </label>
                <input
                  type="date"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white"
                  placeholder=""
                />
                ~
                <input
                  type="date"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white"
                  placeholder=""
                />
              </div>
              <div className="flex items-center mb-3 mr-5">
                <button className="p-[3px_20px] text-sm border border-grey rounded-l cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                  {t("settlement_list.all")}
                </button>
                <button className="p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                  {t("settlement_list.issued")}
                </button>
                <button className="p-[3px_20px] text-sm border border-grey rounded-r cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                  {t("settlement_list.payOnBehalf")}
                </button>
              </div>
              <div className="mb-3 mr-5">
                <label className="text-sm dark:text-white">
                  {t("settlement_list.amountOfMoney")}:
                </label>
                <input
                  type="text"
                  className="ml-2 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
                  placeholder={t("settlement_list.amountOfMoney")}
                />
              </div>
              <div className="flex items-center mb-3 mr-5">
                <button className="mr-1 p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark">
                  {t("settlement_list.query")}(5)
                </button>
              </div>
              <div className="mb-3 mr-5">
                <label className="mr-2 text-sm dark:text-white">
                  {t("settlement_list.autoRefresh")}:
                </label>
                <Switch
                  // checked={darkMode}
                  className="flex items-center"
                  color="warning"
                  // onChange={handleDarkModeChange}
                />
              </div>
              <div className="mb-3 mr-5">
                <label className="mr-2 text-sm dark:text-white">
                  {t("settlement_list.merchantTotalAvailableBalance")}:
                </label>
                <span className="mr-2 text-lg text-[#4C90DD]">
                  11,990,891 {t("settlement_list.billionYuan")}
                </span>
              </div>
              <div className="mb-3 mr-5">
                <label className="mr-2 text-sm dark:text-white">
                  {t("settlement_list.lumpSum")}:
                </label>
                <span className="mr-2 text-lg dark:text-white">
                  0 {t("settlement_list.yuan")}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between">
                <div className="flex">
                  <button className="p-[3px_20px] text-sm border border-grey rounded-l cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                    {t("settlement_list.today")}
                  </button>
                  <button className="p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                    {t("settlement_list.yesterday")}
                  </button>
                  <button className="p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                    {t("settlement_list.last7Days")}
                  </button>
                  <button className="p-[3px_20px] text-sm border border-grey cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                    1 {t("settlement_list.month")}
                  </button>
                  <button className="p-[3px_20px] text-sm border border-grey rounded-r cursor-pointer duration-300 hover:text-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary">
                    3 {t("settlement_list.months")}
                  </button>
                </div>
                <div className="flex">
                  <button className="p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark">
                    {t("settlement_list.backUndo")}
                  </button>
                  <button
                    onClick={onExportDataClick}
                    className="ml-1 p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark"
                  >
                    {t("settlement_list.exportData")}
                  </button>
                  {/* <Excelexport excelData={data} fileName={'Excel Export'} /> */}
                </div>
              </div>
              <table className="w-full text-sm dark:text-grey-light">
                <thead>
                  <tr className="bg-grey-light font-semibold dark:bg-grey-dark">
                    <td className="p-[10px_8px]">
                      <input
                        type="checkbox"
                        id="selectAll"
                        name="selectAll"
                        className="mt-3 rounded text-primary"
                      />
                    </td>
                    <td className="p-[10px_8px]">#</td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.merchantID")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.businessName")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.merchantPaymentInformation")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.platformPaymentInformation")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.billingType")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.settlementAmount")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.handlingFee")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.time")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.state")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.note")}
                    </td>
                    <td className="p-[10px_8px]">
                      {t("settlement_list.operate")}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {!data ? (
                    <td colSpan={12} className="p-[12px_8px] text-center">
                      {t("settlement_list.noData")}
                    </td>
                  ) : (
                    data.map((item, key) => {
                      return <TableItem item={item} key={key} />;
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal()}
        name={modalName}
        setModalName={setModalName}
        onCancelHandler={onCancelHandler}
        excelData={data}
        data={modalData}
        setData={setModalData}
        onClickHandlers={{
          setUp: onClickNewSignUpHandler,
        }}
      />
    </>
  );
};
