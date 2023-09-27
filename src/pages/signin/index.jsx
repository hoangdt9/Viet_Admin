import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/authReducer';
import { useSelector, useDispatch } from 'react-redux'
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
  const authState = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const [acceptFlag, setAcceptFlag] = useState(false);
  const [isBot, setIsBot] = useState(false);

  useEffect(()=>{
    if(authState.userToken) {
      dispatch(openSnackBar({status: "warning", message: "You are logged in"}));
      navigate('/home');
    }
  }, [authState])

  const onRegisterClick = () => {
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
    dispatch(loginUser({account: inputData.account, password: inputData.password}))
    .then(result => {
      if (result) {
        dispatch(openSnackBar({status: "success", message: "You're logged in"}))
        navigate('/home');
      }
    });
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
            <RegisterInput type="text" icon={userPhone} text="account" inputData={inputData} stateHandler={setInputData}/>
            <RegisterInput type="password" icon={cahpchaIcon} text="password" inputData={inputData} stateHandler={setInputData}/>
            <Captcha validate={setIsBot} />
            
            <div className="mb-5">
              <button onClick={onRegisterClick} style={{borderStyle: "outset", borderColor: 'buttonborder'}} className='text-center text-lg rounded-full bg-[#0096e6] w-full block p-[15px] mt-5 border-2 border-solid'>
                <font className="font-medium tracking-wide" >login</font>
              </button>
            </div>
            <div className='text-center text-blue-500'>
              <Link className='mx-2 text-sm' to = "/signup">
                Register Account
              </Link>
            </div>
          </div>
    </div>
  );
}
