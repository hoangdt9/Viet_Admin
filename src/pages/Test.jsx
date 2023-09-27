import React, { useEffect } from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { isNumber } from "../utils"
import { useDispatch } from 'react-redux';
import { testUser } from '../redux/testReducer';
import { getAllMerchants } from '../redux/testReducer';
import { API_BASE } from '../config/constants';
import { authHeader } from '../utils';
import { handleResponse } from '../utils';

export default function Test() {

    const dispatch = useDispatch();
    const initData = 
        {
            orderAmount: 0,
            payMethod: 'Vietnam bank transfer card',
            bankAccountName: 'Techcombank',
            notifyUrl: 'localhost:3000',
            backUrl: 'localhost:3000', // Optional
            bankCode: 'ACB',
            bankMemo: '', // Optional
            is_revise_wrong_amount: '0', // Number optional (0, 1)
            sign: '', // required
    };
    const payChannelData = [
        'Vietnam bank transfer card',
        'Vietnam Online Banking Direct Connection',
        'Vietnam online banking scan code',
        'Vietnam ZALO pay',
        'Vietnam MOMO pay',
        'Vietnam VittelPay',
        'Vietnam GCASH',
        'Vietnam GCASH_QR'
    ];
    const payBankData = [
        'Techcombank',
        'ACB',
        'Vietcombank',
        'BIDV',
        'Sacombank',
        'Eximbank',
        'MBBank',
        'ABB',
        'DGB',
        'HDB',
        'TPB',
        'SGB',
        'VPB',
        'Agibank',
        'VietCapital',
        'OCB',
        'OTHER'
    ];
    const bankCodeData = [
        'ACB',
        'ABB',
        'DGB',
        'EXIM',
        'VCB',
        'BIDV',
        'VTB',
        'TCB',
        'STB',
        'MB',
        'HDB',
        'TPB',
        'SGB',
        'VPB',
    ];
    const [merchantData, setMerchantData] = useState([]);

    const myFunc = async () => {
        console.log("useEffect");
        const requestOptions = {
            method: "GET",
            headers: authHeader()
        };
        const response = await fetch(`${API_BASE}/merchant/getAllMerchants`, requestOptions);
        const data = await handleResponse(response);
        setMerchantData(data.merchants);
    }

    useEffect(() => {
        myFunc()
    }, [])

    const [sendData, setSendData] = useState(initData);
    const onSubmit = () => {
        sendData.orderAmount = parseInt(sendData.orderAmount);
        dispatch(testUser(sendData));
        dispatch(getAllMerchants());
    }
    const onChange = (e) => {
        console.log(e.target.value);
        setSendData({
            ...sendData,
            [e.target.name]: e.target.value,
          });
    }
    console.log("sendData",sendData);
    return (
        <div className="flex flex-row justify-center border border-grey m-[50px_50px] ">
            <div className=' p-[20px_10px]'>
                <h1 className="text-4xl font-bold text-black">Payment interface test</h1>
                <h2 className='mt-3 mb-3 text-primary underline'>
                    <Link to={"/"} className='my-4 text-primary'>
                        zalo wake up payment
                    </Link>
                </h2>
                {/* Start orderAmount */}
                <div className="mb-4 flex flex-row justify-between">
                    <div className="mr-10">
                        <h3 htmlFor="" className='text-black'>Amount 1</h3>
                        <input type="number" name="orderAmount" className='w-64' onChange={onChange}  />
                    </div>
                    <div className="">
                        <h3 htmlFor="" className='text-black'>Bank Name</h3>
                        <select onChange={onChange} defaultValue={initData.bankCode} name="merchantId" id="merchantId" className='w-64'>
                        {merchantData && merchantData.map((item) => {
                            return <option value={item._id} >{item.name}</option>
                        })}
                    </select>
                    </div>
                </div>
                {/* Start payMethod */}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="">payment channel</h3>
                    <select onChange={onChange} defaultValue={initData.payMethod} name="payMethod" id="payMethod" className='w-64'>
                    {payChannelData && payChannelData.map((item) => {
                            return <option value={item} >{item}</option>
                        })}
                    </select>
                </div>
                {/* Start bankAccountName */}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="">payment bank</h3>
                    <select onChange={onChange} defaultValue={initData.bankAccountName} name="bankAccountName" id="bankAccountName" className='w-64'>
                        {payBankData && payBankData.map((item) => {
                            return <option value={item} >{item}</option>
                        })}
                    </select>
                </div>
                {/* Start notifyUrl */}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="">notifyUrl</h3>
                    <input type="text" name="notifyUrl" defaultValue={initData.notifyUrl} onChange={onChange} className='w-64' />
                </div>
                {/* Start backUrl */}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="" >backUrl</h3>
                    <input type="text" name="backUrl" defaultValue={initData.backUrl} onChange={onChange} className='w-64' />
                </div>
                {/* Start bankCode*/}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="">bankCode</h3>
                    <select onChange={onChange} defaultValue={initData.bankCode} name="bankCode" id="bankCode" className='w-64'>
                        {bankCodeData && bankCodeData.map((item) => {
                            return <option value={item} >{item}</option>
                        })}
                    </select>
                </div>
                {/* Start bankMemo */}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="">bankMemo</h3>
                    <input type="text" name="bankMemo" defaultValue={initData.bankMemo} onChange={onChange} className='w-64' />
                </div>
                {/* Start is_revise_wrong_amount */}
                <div className="mb-4">
                    <h3 className='text-black' htmlFor="">is_revise_wrong_amount</h3>
                    <input type="text" name="is_revise_wrong_amount" defaultValue={initData.is_revise_wrong_amount} onChange={onChange} className='w-64' />
                </div>
                {/* sign */}
                {/* <div className="mb-4">
                    <h3 className='text-black' htmlFor="">sign</h3>
                    <input type="text" name="sign" onChange={onChange} className='w-64' />
                </div> */}
                {/* Start Order merchant */}
                {/* <div className="mb-4">
                    <h3 className='text-black' htmlFor="">merchant</h3>
                    <input type="number" name="merchant" onChange={onChange} className='w-64' />
                </div> */}

                <button onClick={onSubmit} className='bg-red border border-primary hover:bg-primary p-[4px_10px] ml-4 text-white' >submit payment</button>
            </div>
        </div>
    )
}
