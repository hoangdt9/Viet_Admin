import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowDown } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import MerchantModal from "../agent_management/merchantModal";
import {
  addDebitCard,
  getDebitCardsInfo,
  updateDebitCard,
  changeRobot,
  searchDebitCard,
  deleteDebitCard,
  transferBetDebitCards
} from "../../redux/financial/debit-card/debitCardReducer";
import TooltipWithButtons from "../../components/ui/tooltip/TooltipWithButtons";
import { InputNumber, Popover } from "antd";

import dayjs from "dayjs";
import { OrangeButton } from "../../components/ui/button/AgentManagement";
import { debitCardService } from "../../services/financial/debit-card/debitCard.service";
import { getDevitCards } from "../../redux/settlement_list/settlementReducer";

import {toast} from 'react-toastify';

const DebitCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalName, setModalName] = useState("add_debit_card");
  const debitCardsInfo = useSelector(
    (state) => state.debitCardState?.debitCardsInfo
  );
  const addedCard = useSelector((state) => state.debitCardState?.addedCard);
  const [cardsInfo, setCardsInfo] = useState([]);
  const [currentCardsInfo, setCurrentCardsInfo] = useState([]);
  const [editId, setEditId] = useState("");
  const [updateCardData, setUpdateCardData] = useState("");
  const [searchData, setSearchData] = useState([]);
  // The number of items per page
  const [perPage, setPerPage] = useState(10);
  // Total pages
  const [pages, setPages] = useState(1);
  // Current page
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(-1);
  const [balance, setBalance] = useState(0);

  const [transferId, setTransferId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferFee, setTransferFee] = useState("");

  const changeSequence = async (key, index) => {
    const res = await debitCardService.changeSequence(
      currentCardsInfo[key]._id,
      currentCardsInfo[key + index]._id
    );
    if (res.success) dispatch(getDebitCardsInfo());
  }

  const popOverContent = () => {
    return (
      <div className="p-2">
        <div className="text-xs flex items-center">
          <span className="text-[#f04134]">* </span>
          <p className="text-xs text-[rgba(0,0,0,0.85)] leading-[32px]">
            balance setting :
          </p>
        </div>
        <InputNumber
          className="w-full"
          value={balance}
          onChange={(e) => setBalance(e)}
        />
        <div className="mt-3">
          <OrangeButton
            label="Sure"
            onClickHandler={() =>
              onClickChangeBalance(currentCardsInfo[open]._id, balance)
            }
          />
        </div>
      </div>
    );
  };

  const transferPopoverContent = (id) => {

    return (
      <div className="p-2 items-end">
        <div className="text-xs flex items-center justify-end">
          <span className="text-[#f04134]">* </span>
          <p className="text-xs mr-2 text-[rgba(0,0,0,0.85)] leading-[32px]">
            Debit card :
          </p>
          <select
              placeholder="shift name"
              type="text"
              className="p-[2px_7px] text-grey w-[150px] text-sm dark:bg-[#231e22] border border-[#8378788f] dark:border-[white] rounded-md hover:border-primary focus:border-primary"
              value = {transferId}
              onChange={handleIdChange}
          >
              <option disabled selected className='text-grey'>select the target...</option>
              {currentCardsInfo &&
                currentCardsInfo.map((item, key) => {
                return(
                  id !== item._id &&
                  <option value = {item._id} key = {key}>{item.name}</option>
                ) 
              })}
          </select>
        </div>
        <div className="text-xs flex items-center justify-end mt-1">
          <span className="text-[#f04134]">* </span>
          <p className="text-xs mr-2 text-[rgba(0,0,0,0.85)] leading-[32px]">
            transfer amo.. :
          </p>
          <InputNumber
            className="w-[150px]"
            value = {transferAmount}
            onChange={(e) => setTransferAmount(e)}
          />
        </div>
        <div className="text-xs flex items-center justify-end mt-1">
          <span className="text-[#f04134]">* </span>
          <p className="text-xs mr-2 text-[rgba(0,0,0,0.85)] leading-[32px]">
            handling fee :
          </p>
          <InputNumber
            className="w-[150px]"
            value = {transferFee}
            onChange={(e) => setTransferFee(e)}
          />
        </div>
        <div className="mt-3 flex items-center justify-end">
          <button
            className="mr-1 w-fit px-4 py-1.5 rounded-[4px] cursor-pointer text-white font-medium text-center whitespace-nowrap text-xs border dark:border-primary bg-primary hover:bg-primary-dark duration-300 dark:bg-[#3e3c3b] dark:hover:bg-[#4d465e] border-transparent"
            onClick={() => onClickTransfer(id)}
          >
            {"keep"}
          </button>
          <button
            className="w-fit px-4 py-1.5 rounded-[4px] cursor-pointer font-medium text-center whitespace-nowrap text-xs border dark:border-primary hover:bg-primary-dark duration-300 dark:bg-[#3e3c3b] hover:text-white dark:hover:bg-[#4d465e]"
            onClick={() => onClickTransferReset()}
          >
            {"reset"}
          </button>
        </div>
      </div>
    );
  }

  const onClickTransferReset = () => {
    setTransferId("");
    setTransferAmount("");
    setTransferFee("");
  }

  const onClickTransfer = (id) => {
    if(id && transferAmount && transferFee && transferId){
      dispatch(transferBetDebitCards({fromDebitCardId : id, amount : transferAmount, handlingFee : transferFee, toDebitCardId : transferId}));
    }
    else{
      toast.error("input values are required")
      return;
    }
  }

  const handleIdChange = (e) => {
    console.log(e.target.value);
    setTransferId(e.target.value);
  }

  const handleTransferOpenChange = () => {
    setTransferId("");
    setTransferAmount("");
    setTransferFee("");
  }

  const onClickChangeBalance = async (id, balance) => {
    await debitCardService.changeBalance(id, balance);
    hide();
    dispatch(getDebitCardsInfo());
  };

  const hide = () => {
    setOpen(-1);
  };

  const handleOpenChange = (key) => {
    if (open !== key) {
      setOpen(key);
      setBalance(currentCardsInfo[key].balance);
    } else hide();
  };
  const onClickBalanceHandler = (id) => {};

  const CardItem = (item, key, length) => {
    return (
      <tr
        key={key}
        className="hover:bg-[#faefeb] dark:hover:bg-[#4D465E] text-grey-dark dark:text-white border-b-[1px] border-grayCustom text-xs"
      >
        <td className="p-[12px_8px] ">{key}</td>
        <td className="p-[12px_8px]">
          {item._id !== editId ? (
            item.name
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
            item.bankName
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
            item.bankAccount
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
        <td className="p-[12px_8px]">{item.totalDepositAmount} yuan</td>
        <td
          className="p-[12px_8px] text-primary cursor-pointer"
          onClick={() => onClickBalanceHandler(key)}
        >
          <Popover
            content={popOverContent}
            title={
              <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium">
                Modify the balance of the debit card
              </div>
            }
            trigger="click"
            open={open === key}
            onOpenChange={() => handleOpenChange(key)}
          >
            {item?.balance}
          </Popover>
        </td>
        <td className="p-[12px_8px]">
          {item.paymentRobot === "closure" ? (
            <button
              onClick={onClickClosure}
              id={item._id}
              className="text-[#f04134] bg-red-dark border border-red-dark p-[3px_9px] rounded-md"
            >
              {t("financial.debitcard.closure")}
            </button>
          ) : (
            <button
              onClick={onClickTurnOn}
              id={item._id}
              className="text-[#00a854] bg-[#cfefdf] border border-grey p-[3px_9px] rounded-md"
            >
              {t("financial.debitcard.turnOn")}
            </button>
          )}
        </td>
        <td className="p-[12px_8px] text-primary ">
          {item._id !== editId ? (
            <>
              <button
                id={item._id}
                onClick={onViewAccountHandler}
                className="pr-2 border-r dark:border-white leading-[10px]"
              >
                {t("financial.debitcard.viewAccountRecords")}
              </button>
              <button
                id={item._id}
                onClick={onEditHandler}
                className="pr-2 border-r border-white leading-[10px] pl-2"
              >
                {t("financial.debitcard.edit")}
              </button>
              <Popover
                className="hover:cursor-pointer"
                content={transferPopoverContent(item._id)}
                title={
                  <div className="border-b border-[#e9e9e9] pb-1.5 text-xs font-medium">
                    Transfer to payment card
                  </div>
                }
                trigger="click"
                onOpenChange={handleTransferOpenChange}
              >
                {t("financial.debitcard.transfer")}
              </Popover>
              <button id={item._id} onClick={onDeleteHandler} className="pl-2">
                {t("financial.debitcard.delete")}
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
        <td className="p-[12px_8px]">
          {key !== 0 && (
            <button
              id={item._id}
              onClick={async() => await changeSequence(key, -1)}
              className="border border-black bg-white p-[4px_8px] rounded-md dark:bg-[#4a4542] dark:border-white hover:border-primary"
            >
              <BsArrowUp className="" />
            </button>
          )}
          {key !== length - 1 && (
            <button
              id={item._id}
              onClick={async() => await changeSequence(key, 1)}
              className="border border-black bg-white p-[4px_8px] rounded-md dark:bg-[#4a4542] dark:border-white hover:border-primary"
            >
              <BsArrowDown className="" />
            </button>
          )}
        </td>
      </tr>
    );
  };
  // Pagination Item
  const PaginationItem = (pages, currentPage) => {
    const items = [];

    for (let page = 1; page <= pages; page++) {
      if (page === currentPage) {
        items.push(
          <li key={page}>
            <button
              name={page}
              onClick={onPageNumberClick}
              className="px-2 rounded text-gray-700 dark:text-white dark:bg-grey-dark"
            >
              {page}
            </button>
          </li>
        );
      } else {
        items.push(
          <li key={page}>
            <button
              name={page}
              onClick={onPageNumberClick}
              className="px-2 rounded text-gray-700 dark:text-primary dark:bg-grey-dark"
            >
              {page}
            </button>
          </li>
        );
      }
    }

    return items;
  };
  const makePaginationData = (currentPage, perPage) => {
    // Calculate the total number of pages
    const pages = Math.ceil(cardsInfo.length / perPage);
    // Generate the data for the current page
    const currentCardsInfo = cardsInfo.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    setCurrentCardsInfo(currentCardsInfo);
    setPages(pages);
  };
  // When click the pagination
  const onPageNumberClick = (e) => {
    console.log("onPageNumberClick", e.target.name);
    const pageNumber = parseInt(e.target.name);
    if (pageNumber != currentPage) {
      makePaginationData(pageNumber, perPage);
      setCurrentPage(pageNumber);
    }
  };
  // When click the prevPage button
  const onPrevPageClick = () => {
    if (currentPage != 1) {
      makePaginationData(currentPage - 1, perPage);
      setCurrentPage(currentPage - 1);
    }
  };
  // When click the NextPage button
  const onNextPageClick = () => {
    if (currentPage != pages) {
      makePaginationData(parseInt(currentPage) + 1, perPage);
      setCurrentPage(parseInt(currentPage) + 1);
    }
  };
  // Wheb click closure button
  const onClickClosure = (e) => {
    console.log(e.target.id);
    let robotData = {};
    robotData.id = e.target.id;
    robotData.paymentRobot = "turn on";
    dispatch(changeRobot(robotData));
  };
  // Wheb click turn on button
  const onClickTurnOn = (e) => {
    console.log(e.target.id);
    let robotData = {};
    robotData.id = e.target.id;
    robotData.paymentRobot = "closure";
    dispatch(changeRobot(robotData));
  };
  // Update debit card
  const onUpdateHandler = () => {
    dispatch(updateDebitCard(updateCardData));
    setEditId("");
  };
  // Cancel updating debit card
  const onCancelUpdate = () => {
    setEditId("");
  };
  // When change the Edit Input change
  const onEditInputChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setUpdateCardData({
      ...updateCardData,
      [e.target.name]: e.target.value,
    });
  };
  // When click the View account records button
  const onViewAccountHandler = () => {};
  // When click the Edit button
  const onEditHandler = (e) => {
    console.log(e.target.id);
    const e_Id = e.target.id;
    cardsInfo.forEach((value, key) => {
      console.log(value);
      if (value._id === e_Id) {
        let temp = {};
        temp.id = value._id;
        temp.name = value.name;
        temp.bankName = value.bankName;
        temp.bankAccount = value.bankAccount;
        setUpdateCardData(temp);
        return;
      }
    });
    setEditId(e_Id);
  };
  // When click the transfer button
  const onTransferHandler = () => {};
  // When click the delete button
  const onDeleteHandler = (e) => {
    e.preventDefault(e);
    const id = e.target.id;
    console.log(id);
    dispatch(deleteDebitCard({ id }));
  };
  useEffect(() => {}, []);
  useEffect(() => {
    console.log("useEffect");
    if (addedCard) {
      dispatch(getDebitCardsInfo());
    }
  }, [dispatch, addedCard]);

  useEffect(() => {
    const cardsInfo = debitCardsInfo?.debitCards;
    setCardsInfo(cardsInfo);
    const currentCardsInfo = debitCardsInfo?.debitCards?.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
    setCurrentCardsInfo(currentCardsInfo);
    if (debitCardsInfo?.debitCards) {
      const pages = Math.ceil(debitCardsInfo?.debitCards.length / perPage);
      setPages(pages);
    }
  }, [debitCardsInfo]);

  const onCancelHandler = () => {
    setIsOpenModal(false);
  };
  const addPaymentCardHandler = () => {
    setIsOpenModal(true);
  };
  const onSearchInputChange = (e) => {
    e.preventDefault();
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };
  const onInquire = () => {
    let tempSearchData = {
      date: "",
      name: "",
      bankName: "",
      bankAccount: "",
    };
    tempSearchData = { ...tempSearchData, ...searchData };
    dispatch(searchDebitCard(tempSearchData));
  };
  // When change the select box
  const handleItemsPerPageChange = (e) => {
    console.log(e.target.value);
    const perPage = e.target.value;
    setPerPage(parseInt(perPage));
    setCurrentPage(1);
    makePaginationData(1, perPage);
  };
  console.log("currentCardsInfo", currentCardsInfo);
  console.log("perpage", perPage);
  console.log("pages", pages);
  console.log("currentPage", currentPage);

  return (
    <>
      <div className="flex flex-row items-center">
        <h1 className="text-sm dark:text-white">
          {t("financial.debitcard.paymentCardList")}
        </h1>
        <div className="ml-1">
          <button
            onClick={addPaymentCardHandler}
            className="p-[5px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark"
          >
            {t("financial.debitcard.addPaymentCard")}
          </button>
        </div>
      </div>
      <div className="flex items-center mt-2 dark:text-white">
        <div>
          <label className="text-xs">
            {t("financial.debitcard.selectDate")}
          </label>
          <input
            type="date"
            name="date"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            placeholder={t("financial.debitcard.enterUserID")}
            defaultValue={dayjs().format("YYYY-MM-DD")}
            onChange={onSearchInputChange}
          />
          <label className="text-xs ml-5">
            {t("financial.debitcard.name")}
          </label>
          <input
            type="text"
            name="name"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            onChange={onSearchInputChange}
          />
          <label className="text-xs ml-5">
            {t("financial.debitcard.bankName")}
          </label>
          <input
            type="text"
            name="bankName"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            onChange={onSearchInputChange}
          />
          <label className="text-xs ml-5">
            {t("financial.debitcard.bankAccount")}
          </label>
          <input
            type="text"
            name="bankAccount"
            className="ml-2 p-[3px_15px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark"
            onChange={onSearchInputChange}
          />
          <button
            onClick={onInquire}
            className="p-[5px_15px] ml-6 text-xs text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark"
          >
            {t("financial.debitcard.inquire")}
          </button>
        </div>
      </div>
      <div className="mt-5 min-w-full">
        <table className="w-full text-sm">
          <thead>
            <tr className=" text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white">
              <td className="p-[10px_8px]">#</td>
              <td className="p-[10px_8px]">{t("financial.debitcard.name")}</td>
              <td className="p-[10px_8px]">
                {t("financial.debitcard.bankName")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcard.bankAccount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcard.totalDepositAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcard.balance")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcard.paymentRobot")}
              </td>
              <td className="p-[10px_8px]">
                {t("financial.debitcard.operate")}
              </td>
              <td className="p-[10px_8px]">{t("financial.debitcard.order")}</td>
            </tr>
          </thead>
          <tbody>
            {currentCardsInfo &&
              currentCardsInfo.map((item, key) => {
                return CardItem(item, key, currentCardsInfo.length);
              })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-4">
        <ul className="flex text-primary text-sm">
          <li className="ml-1">
            <button
              onClick={onPrevPageClick}
              className="mr-1 px-2 rounded dark:bg-grey-dark dark:text-white"
            >
              {"<"}
            </button>
          </li>
          {PaginationItem(pages, currentPage)}
          <li className="ml-1">
            <button
              onClick={onNextPageClick}
              className="ml-1 px-2 rounded dark:bg-grey-dark dark:text-white"
            >
              {">"}
            </button>
          </li>
        </ul>
        <select
          onChange={handleItemsPerPageChange}
          id="items-per-page"
          defaultValue={perPage}
          className="ml-5 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white"
        >
          <option value="10">
            {t("financial.debitcard.itemsPerPage", { count: 10 })}
          </option>
          <option value="30">
            {t("financial.debitcard.itemsPerPage", { count: 30 })}
          </option>
          <option value="50">
            {t("financial.debitcard.itemsPerPage", { count: 50 })}
          </option>
          <option value="100">
            {t("financial.debitcard.itemsPerPage", { count: 100 })}
          </option>
        </select>
      </div>
      <MerchantModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal()}
        name={modalName}
        setModalName={setModalName}
        onCancelHandler={onCancelHandler}
      />
    </>
  );
};

export default DebitCard;