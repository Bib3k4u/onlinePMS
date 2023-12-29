import emailjs from '@emailjs/browser';
import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEmailValidateState } from '../StateManagements/EmailValidState';
export const Verification = ({studentDetails1,index,verificationStatus, onVerification }) => {
    const {emailValidFirst,setEmailValidForStudent1}  = useEmailValidateState();
    const form = useRef();
    const [verificationCode, setVerificationCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
 
    useEffect(() => {
      generateVerificationCode();
    }, []); // Run once on component mount to generate the initial verification code
  
    const generateVerificationCode = () => {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
      setVerificationCode(code);
    };

  const sendEmail = (e) => {
    e.preventDefault();

    const emailParams = {
      to_email: studentDetails1.email,
      from_email: 'bibek.20scse1010849@galgotiasuniversity.edu.in',
      message: `Your verification code for Project Registration is: ${verificationCode}`,
    };

    console.log('Sending email with params:', emailParams);

    emailjs
      .send('service_nnzh19f', 'template_4mqrnba', emailParams, '-L5otkMq3v6AAnlP1')
      .then((result) => {
        console.log(result.text);
        form.current.reset();
        toast.success('Verification code sent successfully!', {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.log(error.text);
        toast.error('Failed to send verification code. Please try again later.', {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const verifyCode = async() => {
    if (enteredCode === verificationCode) {
      onVerification(index);
      setEmailValidForStudent1(true);
      try {
        
      } catch (error) {
        
      }

      toast.success('Verification successful!', {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setEmailValidForStudent1(false);
      toast.error('Invalid verification code. Please try again.', {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
console.log(verificationCode);
  return (
    <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-md my-8">
      <ToastContainer />
      <form ref={form} onSubmit={sendEmail}>
        <label className="block text-gray-700 text-sm font-bold mb-2">You need to verify your email before proceeding:</label>
        <input
          type="email"
          name="to_email"
          value={studentDetails1.email}
          readOnly
          className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send Verification Code
        </button>
      </form>

      {verificationStatus[index] ? (
        <p className="mt-4 text-green-700 font-bold">Verification successful!</p>
      )  : (
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter Verification Code:
          </label>
          <input
            type="text"
            onChange={(e) => setEnteredCode(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
          />
          <button
            onClick={verifyCode}
            className="mt-4 w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

