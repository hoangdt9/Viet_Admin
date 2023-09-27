import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const { t } = useTranslation();
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
              onClick={() => requestSort('name')}
              className={`text-left ${getClassNamesFor('name')}`}
            >
              {t('financial.debitcardreport.name')}
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('price')}
              className={`text-left ${getClassNamesFor('price')}`}
            >
              {t('financial.debitcardreport.price')}
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
  const products = [
    { id: 1, name: 'Cheese', price: 4.9 },
    { id: 2, name: 'Milk', price: 1.9 },
    { id: 3, name: 'Yoghurt', price: 2.4 },
    { id: 4, name: 'Heavy Cream', price: 3.9 },
    { id: 5, name: 'Butter', price: 0.9 },
  ];
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className='flex items-center mt-2 dark:text-white'>
        <div>
          <label className='text-sm'>{t('financial.debitcardreport.paymentReport')}</label>
          <button className='bg-primary dark:bg-grey-dark ml-2 text-white inline-block mb-0 font-medium text-center cursor-pointer border border-primary whitespace-nowrap leading-normal px-4 text-[12px] leading-[1.5] rounded h-7 select-none transition-all ease-in-out duration-300 relative'>
            <font className=''>{t('financial.debitcardreport.inquire')}</font>
          </button>
          <div className='mt-1 flex flex-row items-center justify-start'>
            <div>
              <label className='text-sm'>{t('financial.debitcardreport.statisticType')}</label>
              <input
                type='date'
                className='ml-2 p-[3px_10px] w-44 text-sm border border-grey duration-300 hover:border-primary dark:bg-dark'
                placeholder='Enter the user ID to search for'
              />
            </div>
            <div className='ml-4'>
              <label className='text-xs'>{t('financial.debitcardreport.statisticType')}:</label>
              <input
                type='radio'
                className='ml-2 p-[1px_1px] text-sm border border-grey rounded-full duration-300 hover:border-primary dark:bg-dark'
                name="option"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleOptionChange}
              />
            </div>
            <div className='ml-4'>
              <label className='text-xs'>{t('financial.debitcardreport.totalPayment')}</label>
              <input
                type='radio'
                className='ml-2 p-[1px_1px] text-sm border border-grey rounded-full duration-300 hover:border-primary dark:bg-dark'
                name="option"
                value="option3"
                checked={selectedOption === 'option3'}
                onChange={handleOptionChange}
              />
            </div>
            <label className='ml-4 text-xs'>{t('financial.debitcardreport.bankFees')}</label>
          </div>
        </div>
      </div>
      <div className='mt-5 min-w-full'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='bg-grey-light text-xs text-[rgba(0,0,0,0.85)] font-semibold dark:bg-grey-dark dark:text-white'>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.paymentNumber')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.onMonday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.tuesday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.wednesday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.thursday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.friday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.saturday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.weekday')}</td>
              <td className='p-[10px_8px]'>{t('financial.debitcardreport.sum')}</td>
            </tr>
          </thead>
          <tbody>
            <tr className='border-grey text-lg hover:bg-[#faefeb] text-primary border-b-[1px] dark:hover:bg-tableHoverColor'>
              <td className='p-[12px_8px] text-grey-dark dark:text-white text-sm'>[NGUYEN NGOC TU] BIDV 45510002784332</td>
              <td className='p-[12px_8px] '>VB66 </td>
              <td className='p-[12px_8px]'>67</td>
              <td className='p-[12px_8px]'>158,311,000</td>
              <td className='p-[12px_8px]'>0</td>
              <td className='p-[12px_8px]'>0</td>
              <td className='p-[12px_8px]'>0</td>
              <td className='p-[12px_8px]'>0</td>
              <td className='p-[12px_8px]'>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
