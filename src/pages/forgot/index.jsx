import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { registerUser } from '../../redux/authReducer';
import { useDispatch } from 'react-redux'
import { openSnackBar } from '../../redux/snackBarReducer';
import bgImage from '../../assets/images/bg.png';
import logoImage from '../../assets/images/register/logo.png';
import userIcon from '../../assets/images/register/user.png';
import us_userIcon from '../../assets/images/register/us_user.png';
import userPhone from '../../assets/images/register/user_phone.png';
import cahpchaIcon from '../../assets/images/register/captcha.png';
import {RegisterInput} from '../../components/ui/input/RegisterInput'

export default function Index() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputData, setInputData] = useState({});
  

  const clickSignUpBtn = () => {
    if (email == '' || password =='') {
      dispatch(openSnackBar({status: "warning", message: "Please fill email and password"}))
      return;
    }
    dispatch(registerUser({email, password}));
  }
  const onRegisterClick = () => {
    // dispatch(registerUser({email, password}));
  }
  console.log(inputData);
  return (
    <div style={{ backgroundImage: `url(${bgImage})` }} className='flex p-6 items-center justify-center text-2xl bg-cover h-screen'>
          <div className='w-[400px] h-auto p-9 text-gray-200 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-2/3 bg-white rounded-md'>
            <div className="flex justify-center mb-8">
              <img src={logoImage} alt="logo" className="h-16 rounded-lg" />
            </div>
            <RegisterInput type="text" icon={userIcon} text="email" inputData={inputData} stateHandler={setInputData}/>
            <RegisterInput type="password" icon={userPhone} text="New Password" inputData={inputData} stateHandler={setInputData}/>
            
            <div className="mb-5">
              <button onClick={onRegisterClick} style={{borderStyle: "outset", borderColor: 'buttonborder'}} className='text-center text-lg rounded-full bg-[#0096e6] w-full block p-[15px] mt-5 border-2 border-solid'>
                <font className="font-medium tracking-wide" >Update Password</font>
              </button>
            </div>
            <div className='text-center text-blue-500'>
              <Link className='mx-2 text-sm' to = "/signin">
                back login
              </Link>
            </div>
            {/* <div>
              <TextField fullWidth label = "Email" id = "fullWidth1" onChange={e => setEmail(e.target.value)}/>
              <TextField fullWidth label = "Password" id = "fullWidth" type = "password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='mt-3 justify-center flex'>
              <div className='mx-2'>
                <Button variant='contained' color= "primary" onClick = {() => clickSignUpBtn()}>Sign Up</Button>
              </div>
              <Link className='mx-2' to = "/signin">
                <Button variant='contained' color= "secondary" >Go to Login Page</Button>
              </Link>
            </div> */}
          </div>
    </div>
  );
}
