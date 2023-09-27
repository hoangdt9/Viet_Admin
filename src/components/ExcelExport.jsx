import React from 'react'
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { useTranslation } from "react-i18next";

import { Tooltip } from "antd";
import { Button } from 'antd';
export const Excelexport = ({excelData, fileName, name}) => {
    const { t } = useTranslation();
    const fileType = 'application/vnd.openxmlfirmats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], { type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <>
            <Tooltip title='Excel Export'>
                <button onClick={(e) => exportToExcel(fileName)} className="text-white px-2 py-1 border border-primary dark:text-white dark:border-white dark:hover:border-primary">
                    {/* {t("settlement_list.exportData")} */}
                    {name}
                </button>
                
            </Tooltip>
        </>
    )
}
