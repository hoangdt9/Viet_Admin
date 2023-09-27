import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default ({ handleClose, onClickHandler }) => {
  const { t } = useTranslation();
  const [newPwd, setNewPwd] = useState({});
  const onChaneHandler = (name, value) => {
    setConfirmPwd(false);
    setNewPwd({ ...newPwd, [name]: value });
  };
  const [confirmPwd, setConfirmPwd] = useState(false);

  const changePasswordValidator = () => {
    if (
      newPwd?.password === "" ||
      newPwd?.newPassword == "" ||
      newPwd?.confirmPassword === "" ||
      newPwd?.password === undefined ||
      newPwd?.newPassword == undefined ||
      newPwd?.confirmPassword === undefined
    )
      return false;
    return true;
  };

  const onClickConfirmHandler = () => {
    if (changePasswordValidator()) {
      if (newPwd?.newPassword === newPwd?.confirmPassword)
        onClickHandler(newPwd);
      else setConfirmPwd(true);
    } else alert("Typing error");
    handleClose();
  };

  return (
    <>
      {/* Header */}
      <div class="flex justify-between items-center px-5 py-2 border-b border-grey">
        <h4 className="dark:text-white">
          {t("change_password.changePassword")}
        </h4>
        <button className="text-xl dark:text-white" onClick={handleClose}>
          ×
        </button>
      </div>
      {/* Body */}
      <div className="py-5 px-5">
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
              value={newPwd?.password}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/3 text-right">
            <label className="mr-5 block text-sm dark:text-white">
              <b className="text-primary">*</b>{" "}
              {t("change_password.changePassword")}:
            </label>
          </div>
          <div className="w-2/3">
            <input
              type="password"
              className="mt-2 w-80 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary dark:bg-grey-dark"
              placeholder={t("change_password.newPassword")}
              onChange={(e) => onChaneHandler("newPassword", e.target.value)}
              value={newPwd?.newPassword}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/3 text-right">
            <label className="mr-5 block text-sm dark:text-white">
              <b className="text-primary">*</b>{" "}
              {t("change_password.confirmPassword")}:
            </label>
          </div>
          <div className="w-2/3">
            <input
              type="password"
              className="mt-2 w-80 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary dark:bg-grey-dark"
              placeholder={t("change_password.confirmPassword")}
              onChange={(e) =>
                onChaneHandler("confirmPassword", e.target.value)
              }
              value={newPwd?.confirmPassword}
            />
            {confirmPwd && (
              <p className="text-primary text-xs">
                Please confirm the new password.
              </p>
            )}
          </div>
        </div>
        {/* <div className="flex items-center">
          <div className="w-1/3 text-right">
            <label className="mr-5 block text-sm dark:text-white">
              <b className="text-primary">*</b>{" "}
              {t("change_password.googleVerification")}:
            </label>
          </div>
          <div className="w-2/3">
            <input
              type="email"
              className="mt-2 w-80 text-sm border border-grey rounded bg-white overflow-y-auto resize-none hover:border-primary focus:border-primary dark:bg-grey-dark"
              placeholder={t("change_password.googleVerification")}
            />
          </div>
        </div> */}
      </div>
      {/* Footer */}
      <div class="flex justify-end items-center px-5 py-2 border-t border-grey">
        <button
          className="ml-3 p-[5px_20px] text-sm border border-grey rounded cursor-pointer duration-300 hover:text-primary hover:border-primary dark:bg-grey-dark dark:text-white dark:hover:text-primary"
          onClick={handleClose}
        >
          {t("change_password.cancel")}
        </button>
        <button
          className="ml-3 p-[5px_20px] text-sm text-white bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark dark:hover:text-primary"
          onClick={onClickConfirmHandler}
        >
          {t("change_password.save")}
        </button>
      </div>
    </>
  );
};
