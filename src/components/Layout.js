import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';


export default ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col w-[calc(100vw-200px)] dark:bg-grey-dark'>
        <Header />
        <div className='flex-auto m-[20px_24px_0] p-[20px_24px_0] bg-white shadow dark:bg-dark'>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}