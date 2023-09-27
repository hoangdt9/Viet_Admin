import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsChevronRight } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import GoogleAuthenticator from "../../pages/google_authenticator";
import ChangePassword from "../../pages/change_password";
import { useSelector } from "react-redux";
import { authService } from "../../services/changePassword";

const links = [
  {
    to: "/home",
    key: "homePage",
    subLinks: [],
  },
  {
    to: "/basic-information",
    key: "basicInformation",
    subLinks: [],
  },
  {
    to: "#",
    key: "userRightsManagement",
    subLinks: [
      // {
      //   to: '/permission-settings',
      //   key: 'permissionSettings'
      // },
      {
        to: "/permission-group-list",
        key: "permissionGroupList",
      },
    ],
  },
  {
    to: "#",
    key: "financialManagement",
    subLinks: [
      {
        to: "/reconcilation-daily",
        key: "reconcilationDaily",
      },
      {
        to: "/channel-report",
        key: "channelReport",
      },
      {
        to: "/merchant-channel-report",
        key: "merchantChannelReport",
      },
      {
        to: "/debit-card",
        key: "debitCard",
      },
      {
        to: "/debit-card-entry-record",
        key: "debitCardEntryRecord",
      },
      // {
      //   to: "/debit-card-balance-operators",
      //   key: "debitCardBalanceOperators",
      // },
      {
        to: "/debit-card-report",
        key: "debitCardReport",
      },
      // More
    ],
  },
  {
    to: "#",
    key: "collectionManagement",
    subLinks: [
      {
        to: "/receipt-main-gate",
        key: "receiptMainGate",
      },
      {
        to: "/bank-card-management",
        key: "bankcardManagement",
      },
      {
        to: "/momo-management",
        key: "momoManagement",
      },
      {
        to: "/vittlepay-management",
        key: "vittlepayManagement",
      },
      {
        to: "/zalo-management",
        key: "zaloManagement",
      },
      // {
      //   to: "/device-management",
      //   key: "deviceManagement",
      // },
      {
        to: "/bank-balance-sheet",
        key: "bankBalanceSheet",
      },
      {
        to: "/collection-daily",
        key: "collecionDaily",
      },
      {
        to: "/collection-card-out-record",
        key: "collectionCardOutRecord",
      },
      {
        to: "/receipt-report",
        key: "receiptReport",
      },
      // More
    ],
  },
  {
    to: "#",
    key: "releaseManagement",
    subLinks: [
      {
        to: "/issuer",
        key: "issuer",
      },
      {
        to: "/issue-personnel-report",
        key: "issuePersonnelReport",
      },
      {
        to: "/shift-list",
        key: "shiftList",
      },
      {
        to: "/scheduling-overview",
        key: "schedulingOverview",
      },
      {
        to: "/daily-report",
        key: "dailyReport",
      },
      {
        to: "/bad-debit-list",
        key: "badDebitList",
      },
      {
        to: "/bad-debit-report",
        key: "badDebitReport",
      },
      // More
    ],
  },
  {
    to: "#",
    key: "agentManagement",
    subLinks: [
      {
        to: "/proxy-list",
        key: "proxyList",
      },
      {
        to: "/agency-profit-report",
        key: "agencyProfitReport",
      },
      {
        to: "/agent-settlement-report",
        key: "agentSettlementReport",
      },
      {
        to: "/agent-settlement-list",
        key: "agentSettlementList",
      },
      // More
    ],
  },
  {
    to: "#",
    key: "merchantManagement",
    subLinks: [
      {
        to: "/merchant-list",
        key: "merchantList",
      },
      // {
      //   to: '/audit-list',
      //   key: 'auditList'
      // },
      {
        to: "/order-list",
        key: "orderList",
      },
      {
        to: "/drop-list",
        key: "dropList",
      },
      {
        to: "/refund-list",
        key: "refundList",
      },
      {
        to: "/filling-list",
        key: "fillingList",
      },
      // More
    ],
  },
  // {
  //   to: '#',
  //   key: 'monitorManagement',
  //   subLinks: [
  //     {
  //       to: '/monitor-list',
  //       key: 'monitorList'
  //     },
  //     {
  //       to: '/car-list',
  //       key: 'carList'
  //     }
  //     // More
  //   ]
  // },
  {
    to: "/settlement-list",
    key: "settlementList",
    subLinks: [],
  },
  {
    to: "/background-ip-whitelist",
    key: "backgroundIpWhitelist",
    subLinks: [],
  },
  {
    to: "/operation-log",
    key: "operationLog",
    subLinks: [],
  },
  {
    to: "/rollover",
    key: "rollover",
    subLinks: [],
  },
  {
    to: "#",
    key: "googleAuthenticator",
    subLinks: [],
  },
  {
    to: "#",
    key: "changePassword",
    subLinks: [],
  },
  {
    to: "/set-up",
    key: "setUp",
    subLinks: [],
  },
  {
    to: "#",
    key: "accessGuide",
    subLinks: [
      {
        to: "/access-guide/payment-api",
        key: "paymentAPI",
      },
      {
        to: "/access-guide/payment-api1",
        key: "paymentAPI",
      },
      // More
    ],
  },
];

const modalTitle = {
  googleAuthenticator: "Google authenticator",
  changePassword: "Change password",
};

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  // const activeItemIndex = links.findIndex((item) => item.to === location.pathname);
  const [activeSubLinks, setActiveSubLinks] = useState([]);
  const [currentModal, setCurrentModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { userToken } = useSelector((state) => state.authState);

  const handleOpen = (key) => {
    setCurrentModal(key);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubLinkClick = (subLinks, key) => {
    setActiveSubLinks((prevActiveSubLinks) => {
      return prevActiveSubLinks === subLinks ? [] : subLinks;
    });
    if (key === "googleAuthenticator" || key === "changePassword") {
      handleOpen(key);
    }
  };

  const onClickChangePwdHandler = async (newPassword) => {
    const temp = { ...newPassword };
    temp.id = userToken?.admin.id;
    await authService.changePassword(temp);
  };

  return (
    <div className="w-[200px] min-h-screen bg-[#001529]">
      <div className="bg-black">
        <img src="/img/logo.png" className="mx-auto h-[64px]" alt="Logo" />
      </div>

      <ul>
        {links.map((item, i) => {
          const isActive = item.to === location.pathname;
          const hasSubLinks = item.subLinks.length > 0;
          const isSubLinkActive = activeSubLinks === item.subLinks;
          return (
            <li key={i} className={`${isActive ? " bg-primary" : ""}`}>
              <NavLink
                exact
                to={item.to}
                className={`flex items-center justify-between py-3 pl-5 pr-2 ${isActive ? "text-white" : "text-grey"
                  } text-xs`}
                activeClassName="text-white"
                onClick={() => handleSubLinkClick(item.subLinks, item.key)}
              >
                <span>{t(`sidebar.${item.key}`)}</span>
                {hasSubLinks && (
                  <BsChevronRight
                    className={`inline-block ml-1 ${isSubLinkActive ? "transform rotate-90" : ""
                      }`}
                  />
                )}
              </NavLink>
              {hasSubLinks && (
                <ul
                  className={`pl-5 bg-[#000C17] ${isSubLinkActive ? "block" : "hidden"
                    }`}
                >
                  {item.subLinks.map((subLink, j) => {
                    const isSubActive = subLink.to === location.pathname;
                    return (
                      <li
                        key={j}
                        className={`py-2 pl-3${isSubActive ? " bg-primary" : ""
                          }`}
                      >
                        {subLink.to === "/access-guide/payment-api" ? (
                          <Link
                            className={`hover:cursor-pointer flex${isSubActive ? " text-white" : " text-grey"
                              } text-xs`}
                            activeClassName="text-white"
                            to="/1.html"
                            target="_blank"
                          >
                            {subLink.key}
                          </Link>
                        ) : subLink.to === "/access-guide/payment-api1" ? (
                          <Link
                            className={`hover:cursor-pointer flex${isSubActive ? " text-white" : " text-grey"
                              } text-xs`}
                            activeClassName="text-white"
                            href="/2.html"
                            target="_blank"
                          >
                            {subLink.key}
                          </Link>
                        ) : (
                          <NavLink
                            exact
                            to={subLink.to}
                            className={`flex${isSubActive ? " text-white" : " text-grey"
                              } text-xs`}
                            activeClassName="text-white"
                          >
                            {t(`sidebar.${subLink.key}`)}
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <Modal open={modalOpen} onClose={() => { }}>
        <Box sx={modalStyle} className="dark:bg-grey-dark">
          {currentModal === "googleAuthenticator" && (
            <GoogleAuthenticator handleClose={handleClose} />
          )}
          {currentModal === "changePassword" && (
            <ChangePassword
              handleClose={handleClose}
              onClickHandler={onClickChangePwdHandler}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
};

export default Sidebar;
