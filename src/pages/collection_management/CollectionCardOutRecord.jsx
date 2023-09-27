import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { API_IMG } from '../../config/constants';

import { getAllTransactionsRequest, getAllScreenshotsRequest, setTransIdInScreenshotRequest, removeTransIdInScreenshotRequest } from "../../redux/collectionReducer";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'



const ImageSelectDlg = ({onClose, selectedValue, open, assign, filename}) => {
  const screenshots = useSelector(state => state.collectionState.screenshots);
  console.log("screenshots:", screenshots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllScreenshotsRequest());
  }, [])


  const handleClose = () => {
    onClose(selectedValue);
  }

  const handleListItemClick = (value) => { 
    console.log("value:", value);
    onClose(value);
    assign(value._id);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth = {"100%"}>
      <DialogTitle id="simple-dialog-title">{filename ? "Show Transaction Screenshot" : "Set Transaction Screenshot"}</DialogTitle>
      <List>
        {!filename && screenshots.map((screenshot) => (
          <ListItem button onClick={() => handleListItemClick(screenshot)} key={screenshot._id}>
            {/* <ListItemAvatar>
              <Avatar>
              </Avatar>
            </ListItemAvatar> */}
            <img src = {API_IMG + screenshot.filename} alt = {screenshot.filename} />
            {/* <ListItemText primary={email} /> */}
          </ListItem>
        ))}
        {filename &&  (
          <ListItem button  key={filename}>
            {/* <ListItemAvatar>
              <Avatar>
              </Avatar>
            </ListItemAvatar> */}
            <img src = {API_IMG + filename} alt = {filename} />
            {/* <ListItemText primary={email} /> */}
          </ListItem>
        )}
      </List>
    </Dialog>
  );

}

const TransactionItem = (item, key, length, t, clickOpen) => {

  return (
    <tr key={key} className="hover:bg-[#faefeb] dark:hover:bg-[#4D465E] text-grey-dark dark:text-white border-b-[1px] border-grayCustom text-xs">
      <td className="p-[12px_8px] ">{key+1}</td>
      <td className="p-[12px_8px] ">{item.bankname}</td>
      <td className="p-[12px_8px]">
        {item.accountnumber}
      </td>

      <td className="p-[12px_8px] ">{item.accountname}</td>

      <td className="p-[12px_8px]">
      {item.date}
      </td>
      <td className="p-[12px_8px]"> {item.amount} yuan
      </td>
      <td className="p-[12px_8px] text-primary">
        {item.transactionId}
      </td>

      <td className="p-[12px_8px] text-primary ">
          { !item.filename && <button id={item._id} onClick={clickOpen(item._id, null)}  className="pr-2 border-r dark:border-white leading-[10px]">
              {t("collectionManagement.collectionCardOutRecord.addScreenshot")}
            </button>
          }
          { item.filename && (<>
            <button id={item._id} onClick={clickOpen(item._id, item.filename)} className="pr-2 border-r border-white leading-[10px] pl-2">
              {t("collectionManagement.collectionCardOutRecord.viewScreenshot")}
            </button>
            <button id={item._id} onClick={clickOpen(item._id, null)} className="pr-2 border-r border-white leading-[10px] pl-2">
              {t("collectionManagement.collectionCardOutRecord.changeScreenshot")}
            </button>
          </>
            
            )
          }
      </td>
    </tr>
  )
}


export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const transactions = useSelector(state => state.collectionState.transactions);

  const [selectedValue, setSelectedValue] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [filename, setFilename] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  const clickOpen = (transactionId, filename)=> (x) => {
    setOpen(true);
    setTransactionId(transactionId);
    setFilename(filename);

    console.log("x, y", x, transactionId);
    // alert(y);
  }

  const assignTransactionId = async( screenshotId ) => {
    console.log("screenshotId:", screenshotId);
    await dispatch(setTransIdInScreenshotRequest({ transactionId, screenshotId }))
    await dispatch(getAllTransactionsRequest());
    await dispatch(getAllScreenshotsRequest());
  }

  console.log("transactions", transactions);

  useEffect(() => {
      dispatch(getAllTransactionsRequest());
  }, [dispatch]);


  return (
    <>
      <h1 className="text-sm dark:text-white">
        {t("collectionManagement.collectionCardOutRecord.collectionCardOutRecordList")}
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
                {t("collectionManagement.collectionCardOutRecord.transactionId")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcardentryrecord.operate")}
              </td>
            </tr>
          </thead>
          <tbody>
             {transactions && transactions.map((item, key) => {
              return TransactionItem(item, key, transactions.length, t, clickOpen);
            })}
          </tbody>
        </table>
        <ImageSelectDlg selectedValue={selectedValue} open={open} onClose={handleClose} assign = {assignTransactionId} filename = {filename} />

      </div>
    </>
  );
};
