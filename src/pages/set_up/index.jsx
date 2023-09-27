import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import testSound from "../../assets/sounds/test.mp3";
import useSound from "use-sound";

const bankList = [
  "AGRIBANK",
  "ABBANK",
  "ACB",
  "BAB",
  "BIDV",
  "DONGBANK",
  "GPB",
  "HDB",
];
const timeList = {
  night: [
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
  ],
  morning: [
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
  ],
  afternoon: [
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
  ],
  evening: [
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
    "00:00 - 00:59",
  ],
};

export default () => {
  const { t } = useTranslation();
  const [volume, setVolume] = useState(0.5);
  const [payMute, setPayMute] = useState(true);
  const [mute, setMute] = useState(false);
  const [emptyOrderAlert, setEmptyOrderAlert] = useState(true);
  const [callBack, setCallBack] = useState(false);
  const [play, { stop }] = useSound(testSound, { volume });
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume / 100.0);
  };

  const handleSystemSettingChange = (event) => (type) => {
    const newValue = event.target.value;
    switch (type) {
      case "payMute":
        setPayMute(newValue);
        break;
      case "mute":
        setMute(newValue);
        break;
      case "emptyOrderAlert":
        setEmptyOrderAlert(newValue);
        break;
      case "callBack":
        setCallBack(newValue);
        break;
    }
  };

  const onClickPlayTest = () => {
    stop();
    play();
  };

  return (
    <>
      <div className="flex items-center">
        <h3 className="text-xl font-semibold dark:text-white">
          {t("set_up.volumnSettings")}:
        </h3>
        <input
          type="range"
          id="volume"
          className="ml-2 border-primary"
          name="volume"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
        />
        <span className="ml-2 text-sm dark:text-white">{`(${
          volume * 100
        }%)`}</span>
        <button
          onClick={onClickPlayTest}
          className="ml-10 p-[3px_20px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark"
        >
          {t("set_up.volumnTest")}
        </button>
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold dark:text-white">
          {t("set_up.systemSettings")}:
        </h3>
        <div className="flex mt-5 text-sm">
          <div className="w-1/4">
            <label htmlFor="payMute" className="block dark:text-white">
              <b className="text-primary">*</b> {t("set_up.payMute")}:
            </label>
            <input
              type="checkbox"
              id="payMute"
              name="payMute"
              value={payMute}
              className="mt-3 rounded text-primary"
              onChange={() => handleSystemSettingChange("payMute")}
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="mute" className="block dark:text-white">
              <b className="text-primary">*</b> {t("set_up.mute")}:
            </label>
            <input
              type="checkbox"
              id="mute"
              name="mute"
              value={mute}
              className="mt-3 rounded text-primary"
              onChange={() => handleSystemSettingChange("mute")}
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="emptyOrderAlert" className="block dark:text-white">
              <b className="text-primary">*</b> {t("set_up.emptyOrderAlert")}:
            </label>
            <input
              type="checkbox"
              id="emptyOrderAlert"
              name="emptyOrderAlert"
              value={emptyOrderAlert}
              className="mt-3 rounded text-primary"
              onChange={() => handleSystemSettingChange("emptyOrderAlert")}
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="callBack" className="block dark:text-white">
              <b className="text-primary">*</b> {t("set_up.callBackDirectly")}:
            </label>
            <input
              type="checkbox"
              id="callBack"
              name="callBack"
              value={callBack}
              className="mt-3 rounded text-primary"
              onChange={() => handleSystemSettingChange("callBack")}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold dark:text-white">
          {t("set_up.bankSettingsForNonReceiptPayment")}:
        </h3>
        <p className="mt-5 font-semibold text-sm dark:text-white">
          {t("set_up.bankTickLabel")}
        </p>
        <div className="flex wrap">
          {bankList.map((bank, i) => {
            return (
              <div className="mr-5">
                <input
                  id={bank}
                  type="checkbox"
                  name={bank}
                  className="rounded text-primary"
                />
                <label htmlFor={bank} className="ml-3 text-sm dark:text-white">
                  {bank}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold dark:text-white">
          {t("set_up.sendWithdrawSettings")}:
        </h3>
        <div className="mt-5 p-5 border border-grey bg-grey-light rounded dark:bg-grey-dark">
          <div>
            <label className="block text-sm dark:text-white">
              <b className="text-primary">*</b>{" "}
              {t("set_up.presentationInformation")}:
            </label>
            <textarea className="w-full mt-2 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary">
              {`提現手續費：<br/>單筆0VND`}
            </textarea>
          </div>
          <div className="mt-5">
            <label className="block text-sm dark:text-white">
              <b className="text-primary">*</b>{" "}
              {t("set_up.merchantsCanIssueTime")}:
            </label>
            <div className="flex mt-3">
              {Object.keys(timeList).map((block) => {
                return (
                  <div className="w-1/4">
                    <div className=" border-b-[1px] border-grey">
                      <div className="pl-2 pb-2">
                        <input
                          id={block}
                          type="checkbox"
                          name={block}
                          className="rounded text-primary"
                          // checked
                        />
                        <label
                          htmlFor={block}
                          className="ml-3 text-sm dark:text-white"
                        >
                          {t(`set_up.${block}`)}
                        </label>
                      </div>
                    </div>
                    <div>
                      {timeList[block].map((timeframe, key) => {
                        return (
                          <div className="pl-2 pb-2">
                            <input
                              id={block + key}
                              type="checkbox"
                              name={block + key}
                              className="rounded text-primary"
                              // checked
                            />
                            <label
                              htmlFor={block + key}
                              className="ml-3 text-sm dark:text-white"
                            >
                              {timeframe}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <div></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex mt-5">
            <div className="w-1/4">
              <label className="block text-sm dark:text-white">
                <b className="text-primary">*</b> {t("set_up.minimumAccount")}:
              </label>
              <input
                type="number"
                className="mt-2 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary"
                value={10000}
              />
            </div>
            <div className="w-1/4">
              <label className="block text-sm dark:text-white">
                <b className="text-primary">*</b> {t("set_up.maximumAccount")}:
              </label>
              <input
                type="number"
                className="mt-2 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary"
                value={200000000}
              />
            </div>
          </div>
          <div className="flex mt-5">
            <div className="w-1/4">
              <label className="block text-sm dark:text-white">
                <b className="text-primary">*</b>{" "}
                {t("set_up.minimumPaymentAccount")}:
              </label>
              <input
                type="number"
                className="mt-2 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary"
                value={10000}
              />
            </div>
            <div className="w-1/4">
              <label className="block text-sm dark:text-white">
                <b className="text-primary">*</b>{" "}
                {t("set_up.maximumPaymentAccount")}:
              </label>
              <input
                type="number"
                className="mt-2 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary"
                value={200000000}
              />
            </div>
          </div>
          <div className="mt-10">
            <button className="p-[5px_80px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
              {t("set_up.saveConfirmation")}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-semibold dark:text-white">
          {t("set_up.formStyleSettings")}:
        </h3>
        <div className="flex justify-center w-full mt-5 p-5 border border-grey bg-grey-light rounded dark:bg-grey-dark">
          <button className="p-[3px_8px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
            {t("set_up.big")}
          </button>
          <button className="ml-1 p-[3px_8px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
            {t("set_up.default")}
          </button>
          <button className="ml-1 p-[3px_8px] text-sm text-white bg-primary rounded cursor-pointer duration-300 hover:bg-primary-dark">
            {t("set_up.small")}
          </button>
        </div>
        <div className="mt-5">
          <table className="w-full text-sm dark:text-grey-light">
            <thead>
              <tr className="">
                <td colSpan={4} className="border border-grey p-[10px_8px]">
                  {t("set_up.textOfFormData")}
                </td>
              </tr>
              <tr className="font-semibold dark:bg-grey-dark">
                <td className="border border-grey p-[10px_8px]">
                  {t("set_up.name")}
                </td>
                <td className="border border-grey p-[10px_8px]">
                  {t("set_up.age")}
                </td>
                <td className="border border-grey p-[10px_8px]">
                  {t("set_up.address")}
                </td>
                <td className="border border-grey p-[10px_8px]">
                  {t("set_up.action")}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-grey p-[12px_8px]">John Brown</td>
                <td className="border border-grey p-[12px_8px]">32</td>
                <td className="border border-grey p-[12px_8px]">
                  New York No. 1 Lake Park
                </td>
                <td className="border border-grey p-[12px_8px]">
                  <a className="text-primary">
                    {t("set_up.action")} - John Brown
                  </a>
                  <span className="mx-2 text-xs text-grey">|</span>
                  <a className="text-primary">{t("set_up.delete")}</a>
                  <span className="mx-2 text-xs text-grey">|</span>
                  <a className="text-primary">{t("set_up.moreActions")}</a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-end mt-4">
            <ul class="flex text-primary text-sm">
              <li class="ml-1">
                <a
                  href="#"
                  class="mr-1 px-2 rounded dark:bg-grey-dark dark:text-white"
                >
                  {"<"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-2 rounded text-white bg-primary dark:bg-grey-dark"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-2 rounded text-gray-700 dark:bg-grey-dark"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-2 rounded text-gray-700 dark:bg-grey-dark"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-2 rounded text-gray-700 dark:bg-grey-dark"
                >
                  4
                </a>
              </li>
              <li>
                <a href="#" class="px-2 rounded text-grey">
                  •••
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="px-2 rounded text-gray-700 dark:bg-grey-dark"
                >
                  10
                </a>
              </li>
              <li class="ml-1">
                <a
                  href="#"
                  class="ml-1 px-2 rounded dark:bg-grey-dark dark:text-white"
                >
                  {">"}
                </a>
              </li>
            </ul>
            {/* <select className='ml-5 text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'>
              <option value='10' selected>10 items/page</option>
              <option value='30'>30 items/page</option>
              <option value='50'>50 items/page</option>
              <option value='100'>100 items/page</option>
            </select> */}
          </div>
        </div>
      </div>
    </>
  );
};
