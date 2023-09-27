import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Radio } from "antd";
import { rollOverService } from "../../services/rollover.service";
import PaymentCard from "./paymentCard";
import { Modal, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { getRollOverByBanking, getRollOverByCollectionID, registerRollOver, setBanking } from "../../redux/rollOverReducer";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const { t } = useTranslation();
  const [rollOver, setRollOver] = useState({ amount: 0 });
  const [isOpen, setOpen] = useState(false);
  const [disableHand, setDisableHand] = useState(false);
  const rollOverState = useSelector(state => state.rollOverState)
  const value = useParams();
  const dispatch = useDispatch();

  async function myFunc1() {
    console.log("value.CardId: ", value.cardID);
    const res = await dispatch(getRollOverByCollectionID(value.cardID));
    console.log("res:", res);
    dispatch(setBanking("hand silver"))
  }
  async function myFunc2() {
    const res = await dispatch(getRollOverByBanking());
    dispatch(setBanking("online banking"))
  }

  useEffect(() => {
    if(value.cardID) {
      console.log('exist')
      setDisableHand(false);
      myFunc1()
    } else {
      console.log('not exist')
      myFunc2();
      setDisableHand(true);
    }
  }, [value])

  useEffect(() => {
    setRollOver(rollOverState.rollOver)
  }, [rollOverState])

  const changeHandler = (name, value) => {
    setRollOver({ ...rollOver, [name]: value });
  };

  const onClickRollOverHandler = async () => {
    try {
      if(value.cardID) {
        console.log('exist')
        rollOver.collectionCardId = value.cardID;
      }
      if(rollOver.banking === "online banking")
        delete rollOver.collectionCardId;
      await rollOverService.registerRollOver(rollOver);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickPaymentCard = (bank, account) => {
    setRollOver({
      ...rollOver,
      collectionAccount: account,
      targetBankName: bank
    })
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
  };

  return (
    <>
      <h1 className="text-sm dark:text-white">{t("rollover.sourceAccount")}</h1>
      <div class="flex">
        <div className="w-[25%] mt-2 text-sm dark:text-white">
          <label className="block">
            {t("rollover.onlineBanking")}/{t("rollover.mobileBanking")}:
          </label>
          <div className="mt-2">
            <Radio.Group
              value={rollOver?.banking}
              buttonStyle="solid"
              onChange={(e) => changeHandler("banking", e.target.value)}
            >
              <Radio.Button value="hand silver" disabled={disableHand}>
                <span className="text-xs">{t("rollover.handMoney")}</span>
              </Radio.Button>
              <Radio.Button value="online banking">
                <span className="text-xs">{t("rollover.onlineBanking")}</span>
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="mt-5">
            <label className="block text-sm">{t("rollover.bank")}:</label>
            <select
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              onChange={(e) => changeHandler("bank", e.target.value)}
              value={rollOver?.bank}
            >
              <option disabled selected className="text-grey">
                {t("rollover.pleaseSelectABank")}
              </option>
              <option value="AGRIBANK">AGRIBANK</option>
              <option value="ABBANK">ABBANK</option>
              <option value="ACB">ACB</option>
              <option value="BAB">BAB</option>
              <option value="Techcombank">TCB</option>
              <option value="VCB">VCB</option>
              <option value="Test">Test</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="block text-sm">
              {t("rollover.onlineBankingAccount")}:
            </label>
            <input
              type="text"
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              placeholder={t("rollover.onlineBankingAccount")}
              onChange={(e) => changeHandler("accountNumber", e.target.value)}
              value={rollOver?.accountNumber}
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm">
              {t("rollover.onlineBankingPassword")}:
            </label>
            <input
              type="password"
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              placeholder={t("rollover.onlineBankingPassword")}
              onChange={(e) => changeHandler("bankPassword", e.target.value)}
              value={rollOver?.bankPassword}
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm">{t("rollover.OPT")}:</label>
            <input
              type="password"
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              placeholder={t("rollover.OPT")}
              onChange={(e) => changeHandler("OTP", e.target.value)}
              value={rollOver?.OTP}
            />
          </div>

          <div className="mt-3">
            <label className="font-semibold dark:text-white">
              {t("rollover.targetSelect")}:
            </label>
            <button
              className="ml-2 mt-3 p-[5px_20px] text-sm border border-grey rounded cursor-pointer duration-300 hover:text-primary dark:text-white"
              onClick={() => setOpen(true)}
            >
              {t("rollover.selectFromPaymentCard")}
            </button>
          </div>

          <div className="mt-5">
            <label className="block text-sm">{t("rollover.bank")}:</label>
            <select
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              onChange={(e) => changeHandler("targetBankName", e.target.value)}
              value={rollOver?.targetBankName}
            >
              <option disabled selected className="text-grey">
                {t("rollover.pleaseSelectABank")}
              </option>
              <option value="AGRIBANK">AGRIBANK</option>
              <option value="ABBANK">ABBANK</option>
              <option value="ACB">ACB</option>
              <option value="BAB">BAB</option>
              <option value="TCB">TCB</option>
              <option value="VCB">VCB</option>
              <option value="SHB">SHB</option>
              <option value="Test">Test</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="block text-sm">
              {t("rollover.collectionAccount")}:
            </label>
            <input
              type="text"
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              placeholder={t("rollover.collectionAccount")}
              onChange={(e) =>
                changeHandler("collectionAccount", e.target.value)
              }
              value={rollOver?.collectionAccount}
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm">
              {t("rollover.transferAmount")} (0 {t("rollover.yuan")}):
            </label>
            <input
              type="number"
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              min="0"
              onChange={(e) => changeHandler("amount", e.target.value)}
              value={rollOver?.amount}
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm">
              {t("rollover.specifiedAddendum")}:
            </label>
            <input
              type="text"
              className="mt-2 p-[2px_7px] w-full text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
              placeholder={t("rollover.specifiedAddendum")}
              onChange={(e) => changeHandler("appointedToPay", e.target.value)}
              value={rollOver?.appointedToPay}
            />
          </div>
          <div className="mt-3">
            <button
              className="p-[3px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark"
              onClick={onClickRollOverHandler}
            >
              {t("rollover.initiateRollover")}
            </button>
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={() => {}}>
        <Box sx={modalStyle} className="dark:bg-grey-dark">
          <PaymentCard
            handleClose={() => setOpen(false)}
            onClickHandler={onClickPaymentCard}
          />
        </Box>
      </Modal>
    </>
  );
};
