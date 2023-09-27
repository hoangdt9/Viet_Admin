import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDebitCardsInfo } from '../../redux/financial/debit-card/debitCardReducer';

import { useTranslation } from "react-i18next";

import { deleteDebitCard, updateDebitCard, getAllDebitCardTransferLog } from "../../redux/financial/debit-card/debitCardReducer";

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {debitCardsInfo, getCardState} = useSelector(state => state.debitCardState);
  const [cardsInfo, setCardsInfo] = useState([]);
  const [editId, setEditId] = useState("");
  const [updateCardData, setUpdateCardData] = useState({});

  useEffect(() => {
    // if(getCardState){
      dispatch(getAllDebitCardTransferLog());
    // }
  }, [dispatch, getCardState]);

  useEffect(() => {
    const cardsInfo = debitCardsInfo?.debitCardTransferLog;
    setCardsInfo(cardsInfo);

  }, [dispatch, debitCardsInfo]);

  // When click the View account records button
  const onViewAccountHandler = () => {

  }
  // When click the Edit button
  const onEditHandler = (e) => {

    const e_Id = e.target.id;
    cardsInfo.forEach((value, key) => {
      console.log(value);
      if(value._id === e_Id) {
        let temp = {};
        temp.id = value._id;
        temp.name = value.name;
        temp.bankName = value.bankName;
        temp.bankAccount = value.bankAccount;
        setUpdateCardData(temp);
        return;
      }
    })
    setEditId(e_Id);
  }
  // When click the delete button
  const onDeleteHandler = (e) => {
    e.preventDefault(e);
    const id = e.target.id;
    console.log(id);
    dispatch(deleteDebitCard({id}));

  }
  // Update debit card
  const onUpdateHandler = () => {
    console.log(updateCardData);

    dispatch(updateDebitCard(updateCardData));
    setEditId("");
  }
  // Cancel updating debit card
  const onCancelUpdate = () => {
    setEditId("");
  }
  // When change the Edit Input change
  const onEditInputChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setUpdateCardData({
        ...updateCardData,
        [e.target.name]: e.target.value
    })
  }
  const CardItem = (item, key, length) => {
    return (
      <tr key={key} className="hover:bg-[#faefeb] dark:hover:bg-[#4D465E] text-grey-dark dark:text-white border-b-[1px] border-grayCustom text-xs">
        {/* Start Operator */}
        <td className="p-[12px_8px] ">{key+1}</td>
        {/* Start cardholder */}
        <td className="p-[12px_8px] ">{item.cardHolder}</td>
        {/* Start bank name */}
        <td className="p-[12px_8px]">
        {item.bankName}
        </td>
        {/* Start Card number */}
        <td className="p-[12px_8px] ">{item.cardNumber}</td>
        {/* Start Account Name */}
        <td className="p-[12px_8px]">
        {item.accountName}
        </td>
         {/* Start Time */}
         <td className="p-[12px_8px] ">{item.createdAt}</td>
         {/* Start Amount of money */}
        <td className="p-[12px_8px]">
        {item._id !== editId ? `${item.amount} yuan` :
            <input type="number" name="amount" id={item._id} defaultValue={item.amount} onChange={onEditInputChange} className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"/>
        }
        </td>
        {/* Start Handling fee */}
        <td className="p-[12px_8px] text-primary">{item._id !== editId ? item.handlingFee :
            <input type="number" name="handlingFee" id={item._id} defaultValue={item.handlingFee} onChange={onEditInputChange} className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"/>
        }</td>

        <td className="p-[12px_8px] text-primary ">
        {item._id !== editId ?
          <>
            <button id={item._id} onClick={onEditHandler} className="pr-2 border-r border-white leading-[10px] pl-2">
              {t("financial.debitcard.edit")}
            </button>
            {/* <button id={item._id} onClick={onTransferHandler} className="pr-2 border-r border-white leading-[10px] pl-2">
              {t("financial.debitcard.transfer")}
            </button> */}
            <button id={item._id} onClick={onDeleteHandler} className="pl-2">
              {t("financial.debitcard.delete")}
            </button>
          </>
        :
          <>
            <button id={item._id} onClick={onUpdateHandler} className="pr-2 border-r dark:border-white leading-[10px]">
              {t("financial.debitcard.keep")}
            </button>
            <button id={item._id} onClick={onCancelUpdate} className="pr-2 border-r border-white leading-[10px] pl-2">
              {t("financial.debitcard.cancel")}
            </button>
          </>
        }

        </td>
      </tr>
    )
  }
  return (
    <>
      <h1 className="text-sm dark:text-white">
        {t("financial.debitcardentryrecord.debitCardDepositList")}
      </h1>
      <div className="flex items-center mt-2 dark:text-white">
        <div>
          <label className="text-xs">
            {t("financial.debitcardentryrecord.choosePaymentCard")}
          </label>
          <select
            placeholder={t("financial.debitcardentryrecord.choosePaymentCard")}
            id="mySelect"
            name="mySelect"
            className="w-[100px] ml-2 p-[3px_6px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
          >
            {cardsInfo && cardsInfo.map((item) => {
              return <option>{item.name} {item.bankName} {item.bankAccount}</option>
            })}
          </select>
          <button className="ml-4 bg-primary text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative dark:bg-grey-dark">
            <font className="">
              {t("financial.debitcardentryrecord.inquire")}
            </font>
          </button>
        </div>
      </div>
      <div className="mt-5 min-w-full">
        <table className="w-full text-sm dark:text-grey-light ">
          <thead>
            <tr className="bg-grey-light text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white">
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.operator")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.cardholder")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.bankName")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.cardNumber")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.accountName")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.time")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.amountOfMoney")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.handlingFee")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.operate")}
              </td>
            </tr>
          </thead>
          <tbody>
            {/* <tr className='bg-[#dfdfdf] border-grey hover:bg-[#e9e9e9]  border-b-[1px] text-xs'>
            </tr> */}
             {cardsInfo && cardsInfo.map((item, key) => {
              return CardItem(item, key, cardsInfo.length);
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
