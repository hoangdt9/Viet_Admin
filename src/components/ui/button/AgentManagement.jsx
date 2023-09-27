export const OrangeButton = ({ label, onClickHandler }) => (
  <div
    className="w-fit px-4 py-1.5 rounded-[4px] cursor-pointer text-white font-medium text-center whitespace-nowrap text-xs border dark:border-primary bg-primary hover:bg-primary-dark duration-300 dark:bg-[#3e3c3b] dark:hover:bg-[#4d465e] border-transparent"
    onClick={onClickHandler}
  >
    {label}
  </div>
);
