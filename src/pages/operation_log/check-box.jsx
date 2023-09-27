import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import JSONViewer from 'react-json-view';

export default ({ handleClose, onClickHandler }) => {
  const { t } = useTranslation();

  const jsonData1 = {
    // your JSON data here
    limit: 0,
    skip: 0
  };

  const jsonData2 = {
    code: 200,
    data: {
      dataset: [
        {
          id: 23,
          bankName: "VCB",
          bankSubName : "",
          bankOwner : "BUI VAN HIEN",
          bankAccount : "561000610947",
          balance : 227189,
          maxDayAmount : 3000000000,
          bizInfo: 
            {
              isShowDF : false,
              deviceStat : "offline",
              questId : "",
              autoBillType : "ALL",
              bankUsername : "0867300296",
              minBillAmount : "300000",
              maxBillAmount : "30000000",
              bankPassword : "Bvh5588@",
              staticOtp : "555888",
            }
        }
      ]
    }
  }

  const items = [
    {
      key: '1',
      label: `operating parameters`,
      children: <JSONViewer src={jsonData1} />,
    },
    {
      key: '2',
      label: `operating result`,
      children: <JSONViewer src={jsonData2} />,
    },
  ];

  return (
    <>
      {/* Header */}
      <div class="flex justify-between items-start px-5 py-2 border-b border-grey">
        <Tabs items={items} />
        <button className="text-xl dark:text-white" onClick={handleClose}>
          ×
        </button>
      </div>
    </>
  );
};
