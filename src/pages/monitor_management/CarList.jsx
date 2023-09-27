import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className='mt-10 text-xl text-center text-primary'>{t('sidebar.carList')}</h1>
    </>
  );
}
