import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@mui/material';

export default ({handleClose}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <div class='flex justify-between items-center px-5 py-2 border-b border-grey'>
        <h4 className='dark:text-white'>{t('googleAuthenticator.googleAuthenticator')}</h4>
        <button className='text-xl dark:text-white' onClick={handleClose}>×</button>
      </div>
      {/* Body */}
      <div className='py-5 px-5'>
        <div className='text-center'>
          <label className='mr-2 text-sm dark:text-white'>{t('googleAuthenticator.whetherToUseGoogleAuthenticationForLogin')}:</label>
          <Switch
            // checked={darkMode}
            className='flex items-center'
            color='warning'
            // onChange={handleDarkModeChange}
          />
        </div>
        <p className='mt-3 p-[8px_48px_8px_16px] text-sm border rounded bg-[#ECF6FD] border-[#D2EAFB]'>
        {t('googleAuthenticator.tip')}: {t('googleAuthenticator.alert')}
        </p>
        <div className='mt-5 text-center'>
          <label className='text-sm dark:text-white'>{t('googleAuthenticator.googleVerificationCode')}:</label>
          <input
            type='text'
            className='ml-3 p-[6px_7px] text-sm border border-grey rounded duration-300 hover:border-primary focus:border-primary focus:outline-none dark:bg-dark dark:text-white'
            placeholder={t('googleAuthenticator.googleVerificationCode')}
          />
          <button className='ml-3 p-[3px_20px] text-sm text-white  bg-primary border border-primary rounded cursor-pointer duration-300 hover:bg-primary-dark dark:bg-grey-dark dark:hover:text-primary'>{t('googleAuthenticator.confirmation')}</button>
        </div>
      </div>
      {/* No Footer */}
    </>
  );
};