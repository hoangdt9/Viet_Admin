import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../redux/authReducer";
import { openSnackBar } from "../../redux/snackBarReducer";

const languages = [
  {
    name: "English",
    key: "en",
  },
  {
    name: "中文",
    key: "ch",
  },
];

const timezones = [
  {
    name: "GMT+8",
    key: "+8",
  },
  {
    name: "GMT+7",
    key: "+7",
  },
];

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [admin, setAdmin] = useState({});
  const { t, i18n } = useTranslation();
  const authState = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState.loggedIn) {
      dispatch(
        openSnackBar({ status: "warning", message: "You are logged out" })
      );
      navigate("/signin");
      return;
    }

    let storedData = localStorage.getItem("user");
    let parsedData = storedData && JSON.parse(JSON.stringify(storedData));
    setAdmin(parsedData.admin);
  }, [authState, dispatch, navigate]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [i18n.language, darkMode]);

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutUser());
  };

  return (
    <div
      className={`flex w-full items-center justify-end h-[64px] bg-white dark:bg-[#304655]`}
    >
      <ul className="flex">
        <li className="flex items-center mr-10">
          <select
            className="pl-3 border border-gray-300 duration-300 rounded hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white"
            onChange={handleLanguageChange}
          >
            {languages.map((item, i) => {
              return (
                <option key={i} value={item.key}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </li>
        <li className="flex items-center mr-10">
          <label htmlFor="timezone" className="text-gray-400 dark:text-white">
            {t("header.timezone")}:{" "}
          </label>
          <select
            name="timezone"
            className="ml-2 border border-gray-300 duration-300 rounded text-sm hover:border-primary focus:border-primary dark:bg-dark dark:text-white dark:border-white"
          >
            {timezones.map((item, i) => {
              return (
                <option key={i} value={item.key}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </li>
        <li className="flex items-center mr-10 text-gray-400">
          <span className="dark:text-white">Dark mode:</span>
          <Switch
            checked={darkMode}
            className="flex items-center"
            color="warning"
            onChange={handleDarkModeChange}
          />
        </li>
        <li className="flex items-center mr-10 text-gray-400 dark:text-white">
          {t("header.account")}:
          <span className="ml-2 font-bold">{admin.name}</span>
        </li>
        <li className="flex items-center mr-10 text-gray-400 dark:text-white">
          {t("header.balance")}:
          <span className="ml-2">{`${"0 " + t("header.yuan")}`}</span>
        </li>
        <li className="flex items-center mr-20">
          <button
            className="text-primary duration-300 hover:text-gray-400"
            onClick={handleLogout}
          >
            {t("header.logOut")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
