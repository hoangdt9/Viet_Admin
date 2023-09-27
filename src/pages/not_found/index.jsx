import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <div className='flex w-full h-screen justify-center items-center dark:bg-dark'>
      <h1 className='font-semibold text-[72px] dark:text-grey'>{t('notFound.title')}</h1>
    </div>
  )
}