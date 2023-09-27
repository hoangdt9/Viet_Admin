import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import logoImage1 from "../../assets/images/paygate/vietnamBankScanCode.png";
import logoImage2 from "../../assets/images/paygate/vietnamCardToCard.png";
import logoImage3 from "../../assets/images/paygate/vietnamMOMO.png";
import logoImage4 from "../../assets/images/paygate/vietnamViettelPay.png";
import logoImage5 from "../../assets/images/paygate/vietnamZALO.png";
import MerchantModal from "../agent_management/merchantModal";
import { Select, TimePicker, Button, InputNumber, Switch } from "antd";
import {
  getAllGates,
  modifyGate,
  addGate,
  deleteGate,
} from "../../services/collection/receipt";
import {
  getGatesData,
  initSuccess,
  addNewGate,
  editGate,
  removeGate,
  setSuccess,
} from "../../redux/collectionReducer";
import dayjs from "dayjs";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("name")}
              className={`text-left ${getClassNamesFor("name")}`}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("price")}
              className={`text-left ${getClassNamesFor("price")}`}
            >
              Price
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default () => {
  const { t } = useTranslation();
  const { gates } = useSelector((state) => state.collectionState);
  const { success } = useSelector((state) => state.collectionState);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalName, setModalName] = useState("newGate");
  const [newGate, setNewGate] = useState({});

  const getImage = (channel) => {
    switch (channel) {
      case "vietnamCardToCard":
      case "InnerFilling":
        return logoImage2;
      case "vietnamBankScanCode":
        return logoImage1;
      case "vietnamMOMO":
        return logoImage3;
      case "vietnamViettelPay":
        return logoImage4;
      case "vietnamZALO":
      case "returnedMessages":
      case "vietnamDirect":
        return logoImage5;
      default:
        return logoImage2;
    }
  };

  const onEditHandler = (key) => {
    let temp = { ...gates[key] };
    if (temp?.collection_time_from) {
      temp.collection_time_from = dayjs(temp?.collection_time_from).format(
        "HH:mm"
      );
    }
    if (temp?.collection_time_to) {
      temp.collection_time_to = dayjs(temp?.collection_time_to).format("HH:mm");
    }
    setNewGate(temp);
    setModalName("editGate");
    setIsOpenModal(true);
  };
  const onAddHandler = () => {
    setNewGate({
      probability: 100,
      delayed_collection: 5,
    });
    setModalName("newGate");
    setIsOpenModal(true);
  };
  async function myFunc() {
    if (success) {
      await dispatch(getGatesData());
    }
    dispatch(setSuccess(false));
  }

  useEffect(() => {
    if (success) myFunc();
  }, [success]);

  useEffect(() => {
    dispatch(setSuccess(true));
  }, []);

  const convertToDate = (dateString) => {
    const [hours, minutes] = dateString.split(":");

    const date = dayjs().hour(hours).minute(minutes);
    return date.toDate();
  };
  const onClickAddNewGate = async () => {
    if (newGate?.payment_method)
      newGate.payment_method = newGate.payment_method[0] ?? "";
    if (newGate?.collection_time_from)
      newGate.collection_time_from = convertToDate(
        newGate?.collection_time_from
      );
    if (newGate?.collection_time_to)
      newGate.collection_time_to = convertToDate(newGate?.collection_time_to);
    await dispatch(addNewGate(newGate));
  };

  const onClickEditGate = async () => {
    const temp = {
      ...newGate,
      payment_method: Array.isArray(newGate.payment_method)
        ? newGate.payment_method[0] ?? ""
        : newGate.payment_method,
    };
    if (temp?.collection_time_from)
      temp.collection_time_from = convertToDate(temp?.collection_time_from);
    if (temp?.collection_time_to)
      temp.collection_time_to = convertToDate(temp?.collection_time_to);
    temp.id = temp?._id;
    await dispatch(editGate(temp));
  };
  const onClickDeleteHandler = async (id) => {
    await dispatch(removeGate(id));
  };

  return (
    <>
      <div className="flex items-center mt-2 dark:text-white">
        <div>
          <button
            className="bg-primary text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative dark:bg-grey-dark dark:border-primary dark:text-white"
            onClick={() => onAddHandler()}
          >
            <font className="">
              {t("collectionManagement.receiptMainGate.newGate")}
            </font>
          </button>
        </div>
      </div>

      <div className="mt-5 min-w-full">
        <table className="w-full text-sm dark:text-grey-light ">
          <thead>
            <tr className="bg-grey-light text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white">
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.paymentType")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.collectionTime")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.receiptAmount")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.paymentDeviceType")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.applyMerchant")}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.condition")}
              </td>
              <td className="p-[10px_8px]">
                {t(
                  "collectionManagement.receiptMainGate.delayedCollectionTime"
                )}
              </td>
              <td className="p-[10px_8px]">
                {t("collectionManagement.receiptMainGate.operate")}
              </td>
            </tr>
          </thead>
          <tbody>
            {gates.map((gate, key) => (
              <React.Fragment key={key}>
                <tr className="border-grey text-lg hover:bg-[#e9e9e9] text-primary border-b-[1px] dark:hover:bg-tableHoverColor">
                  <td className="p-[12px_8px] dark:text-white text-primary text-sm">
                    {t("collectionManagement.receiptMainGate.channel")} #
                    {key + 1}: {t(`agentmanagement.merchant.${gate?.channel}`)}
                  </td>
                  <td className="p-[12px_8px] "></td>
                  <td className="p-[12px_8px]"></td>
                  <td className="p-[12px_8px]"></td>
                  <td className="p-[12px_8px]"></td>
                  <td className="p-[12px_8px]"></td>
                  <td className="p-[12px_8px]"></td>
                  <td className="p-[12px_8px]">
                    <button className="text-xs">
                      {t("collectionManagement.receiptMainGate.moveDown")}
                    </button>
                  </td>
                </tr>
                <tr className="border-grey text-lg hover:bg-[#e9e9e9] text-primary border-b-[1px] dark:hover:bg-tableHoverColor">
                  <td className="p-[12px_8px] dark:text-white">
                    <img
                      src={getImage(gate?.channel)}
                      alt={gate?.channel}
                      className="w-12 dark:bg-transparent dark:text-white dark:bg-white"
                    />
                  </td>
                  <td className="p-[12px_8px]">
                    <button className="text-[#f04134] text-xs  p-[3px_9px] rounded-md bg-red-dark border border-red-dark dark:bg-grey-dark">
                      {dayjs(gate?.createdAt).format("YYYY:MM:DD") ??
                        t("collectionManagement.receiptMainGate.unlimited")}
                    </button>
                  </td>
                  <td className="p-[12px_8px]">
                    <button className="text-xs text-white bg-[rgba(235,105,50,1)] p-[4px_8px] rounded-md">
                      50,000 {t("collectionManagement.receiptMainGate.yuan")} ~
                      200,000,000{" "}
                      {t("collectionManagement.receiptMainGate.yuan")}
                    </button>
                  </td>
                  <td className="p-[12px_8px]">
                    <button className="text-[#f04134] text-xs p-[3px_9px] rounded-md bg-red-dark border border-red-dark dark:bg-grey-dark">
                      {gate?.payment_device ??
                        t("collectionManagement.receiptMainGate.unlimited")}
                    </button>
                  </td>
                  <td className="p-[12px_8px]">
                    <button className="text-[#f04134] text-xs  p-[3px_9px] rounded-md bg-red-dark border border-red-dark dark:bg-grey-dark">
                      {gate?.merchants ??
                        t("collectionManagement.receiptMainGate.unlimited")}
                    </button>
                  </td>
                  <td className="p-[12px_8px] text-grey text-sm dark:text-white ">
                    {t("collectionManagement.receiptMainGate.probability")}:
                    {gate?.probability ?? "0%"}
                    <br />
                    {t("collectionManagement.receiptMainGate.collectionArea")}:
                    <span className="text-[rgba(255,0,0,1)]">
                      {t("collectionManagement.receiptMainGate.unlimited")}
                    </span>
                  </td>
                  <td className="p-[12px_8px]"></td>
                  <td className="p-[12px_8px]">
                    <button
                      className="bg-primary text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative dark:bg-grey-dark dark:border-primary dark:text-white"
                      onClick={() => onEditHandler(key)}
                    >
                      <font className="">
                        {t("collectionManagement.receiptMainGate.edit")}
                      </font>
                    </button>
                    <button
                      className="bg-primary text-white inline-block ml-1 font-medium text-center cursor-pointer border border-grey hover:border-primary whitespace-nowrap px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative dark:bg-grey-dark dark:text-white"
                      onClick={() => onClickDeleteHandler(gate?._id)}
                    >
                      <font className="">
                        {t("collectionManagement.receiptMainGate.delete")}
                      </font>
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <MerchantModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal()}
        name={modalName}
        setModalName={setModalName}
        data={newGate}
        setData={setNewGate}
        onClickHandlers={{
          newGate: onClickAddNewGate,
          editGate: onClickEditGate,
        }}
      />
    </>
  );
};
