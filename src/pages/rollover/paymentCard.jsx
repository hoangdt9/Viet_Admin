import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDebitCardsInfo } from "../../redux/financial/debit-card/debitCardReducer";

export default ({ handleClose, onClickHandler }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { debitCardsInfo } = useSelector(
    (state) => state.debitCardState
  );
  const [dataSource, setDataSource] = useState([
    {
      index: "23",
      bank: "VCB",
      cardholder: "STORM FROM HIEN",
      bankAccount: "561000610947",
      operate: (
        <Button onClick={() => onClickHandler("VCB", 561000610947)}>
          {t("rollOver.choose")}
        </Button>
      ),
    },
  ]);

  const onClickConfirmHandler = () => {
    handleClose();
  };

  const columns = [
    {
      title: t("rollOver.index"),
      dataIndex: "index",
      key: "index",
    },
    {
      title: t("rollOver.bank"),
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: t("rollOver.cardholder"),
      dataIndex: "cardholder",
      key: "cardholder",
    },
    {
      title: t("rollOver.bankAccount"),
      dataIndex: "bankAccount",
      key: "bankAccount",
    },
    {
      title: t("rollOver.operate"),
      dataIndex: "operate",
      key: "operate",
    },
  ];

  useEffect(() => {
    dispatch(getDebitCardsInfo());
  }, [])

  useEffect(() => {
    // {
    //   index: "23",
    //   bank: "VCB",
    //   cardholder: "STORM FROM HIEN",
    //   bankAccount: "561000610947",
    //   operate: (
    //     <Button onClick={() => onClickHandler("VCB", 561000610947)}>
    //       {t("rollOver.choose")}
    //     </Button>
    //   ),
    // }
    let temp = [];
    debitCardsInfo?.debitCards?.map((card, key) => {
      temp.push({
        index: key+1,
        bank: card.bankName,
        cardholder: card.name,
        bankAccount: card.bankAccount,
        operate:
          <Button onClick={() => onClickHandler(card.bankName, card.bankAccount)}>
            {t("rollOver.choose")}
          </Button>
      })
    })
    setDataSource([...temp]);
    
  }, [debitCardsInfo])

  return (
    <>
      {/* Header */}
      <div class="flex justify-between items-center px-5 py-2 border-b border-grey">
        <h4 className="dark:text-white">
          {t("rollover.choosePaymentCard")}
        </h4>
        <button className="text-xl dark:text-white" onClick={handleClose}>
          ×
        </button>
      </div>
      {/* Body */}
      {/* <div className="py-5 px-5">
        <div className="flex items-center">
          <div className="w-1/3 text-right">
            <label className="mr-5 block text-sm dark:text-white">
              <b className="text-primary">*</b>{" "}
              {t("change_password.oldPassword")}:
            </label>
          </div>
          <div className="w-2/3">
            <input
              type="password"
              className="mt-2 w-80 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary dark:bg-grey-dark"
              placeholder={t("change_password.oldPassword")}
              onChange={(e) => onChaneHandler("password", e.target.value)}
              value={paymentCard?.password}
            />
          </div>
        </div>
      </div> */}
      <div className="p-4">
        <Table
          className="text-xs"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    </>
  );
};
