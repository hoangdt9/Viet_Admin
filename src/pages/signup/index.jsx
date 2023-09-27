import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/authReducer';
import { useDispatch } from 'react-redux'
import { openSnackBar } from '../../redux/snackBarReducer';
import bgImage from '../../assets/images/bg.png';
import logoImage from '../../assets/images/register/logo.png';
import userIcon from '../../assets/images/register/user.png';
import us_userIcon from '../../assets/images/register/us_user.png';
import userPhone from '../../assets/images/register/user_phone.png';
import cahpchaIcon from '../../assets/images/register/captcha.png';
import {RegisterInput} from '../../components/ui/input/RegisterInput';
import {Captcha} from '../../components/captcha/Captcha';

export default function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const [acceptFlag, setAcceptFlag] = useState(false);
  const [isBot, setIsBot] = useState(false);
  const onRegisterClick = () => {
    if(!inputData.name){
      dispatch(openSnackBar({status: "warning", message: "Insert Name"}))
      return;
    }
    if(!inputData.account){
      dispatch(openSnackBar({status: "warning", message: "Insert account"}))
      return;
    }
    if(!inputData.password){
      dispatch(openSnackBar({status: "warning", message: "Insert password"}))
      return;
    }
    if(!isBot){
      dispatch(openSnackBar({status: "warning", message: "You're a bot"}))
      return;
    }
    if(!acceptFlag){
      dispatch(openSnackBar({status: "warning", message: "Please read and accept"}))
      return;
    }
    navigate("/signin");
    // dispatch(registerUser(inputData));
  }
  const onCheckBoxHandler = (e) => {
    console.log(e);
    setAcceptFlag(!acceptFlag);
  }
  console.log("isBot",isBot);
  return (
    <div style={{ backgroundImage: `url(${bgImage})` }} className='flex p-6 items-center justify-center text-2xl bg-cover h-screen'>
          <div className='w-[400px] h-auto p-9 text-gray-200 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-2/3 bg-white rounded-md'>
            <div className="flex justify-center mb-8">
              <img src={logoImage} alt="logo" className="h-16 rounded-lg" />
            </div>
            <RegisterInput type="text" icon={userIcon} text="Name" inputData={inputData} stateHandler={setInputData}/>
            <RegisterInput type="text" icon={userPhone} text="account" inputData={inputData} stateHandler={setInputData}/>
            <RegisterInput type="password" icon={cahpchaIcon} text="password" inputData={inputData} stateHandler={setInputData}/>
            <Captcha validate={setIsBot} />
            <div className="ml-4">
              <div htmlFor="" className='text-gray-700 cursor-pointer flex flex-row'>
                <span className=' cursor-pointer outline-none inline-block leading-none relative align-middle'>
                  <input type="checkbox" onClick={onCheckBoxHandler} className="w-4 h-4 leading-normal absolute left-0 z-10 cursor-pointer  bottom-[2px] right-0 " />
                </span>
                <span className='pl-2 pr-2 text-sm leading-12 font-sans leading-normal cursor-pointer ml-4'>Read and accept:</span>
                <span className='pl-2 pr-2 text-sm leading-12 font-sans leading-normal cursor-pointer tracking-tighter'>
                  <Link to='#' className='hover:text-blue-300'>"TK88 User Agreement"</Link> 
                </span>
              </div>
            </div>
            <div className="mb-5">
              <button onClick={onRegisterClick} style={{borderStyle: "outset", borderColor: 'buttonborder'}} className='text-center text-lg rounded-full bg-[#0096e6] w-full block p-[15px] mt-5 border-2 border-solid'>
                <font className="font-medium tracking-wide" >register</font>
              </button>
            </div>
            <div className='text-center text-blue-500'>
              <Link className='mx-2 text-sm' to = "/signin">
                back login
              </Link>
            </div>
          </div>
    </div>
  );
}
