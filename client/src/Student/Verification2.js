import emailjs from '@emailjs/browser';
import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Verification2 = ({ studentDetails2 }) => {
  const form = useRef();
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [projectCode, setProjectCode] = useState('');

  useEffect(() => {
    generateVerificationCode();
  }, []); // Run once on component mount to generate the initial verification code

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
    setVerificationCode(code);
  };

  const generateProjectCode = () => {
    // Generate a unique 4-digit project code
    const projectCode = `BT-${Math.floor(1000 + Math.random() * 9000)}`;
    setProjectCode(projectCode);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const emailParams = {
      to_email: studentDetails2.email,
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
        // After successful verification, generate a project code
        generateProjectCode();
      })
      .catch((error) => {
        console.log(error.text);
        toast.error('Failed to send verification code. Please try again later.', {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const verifyCode = () => {
    if (enteredCode === verificationCode) {
      setIsCodeVerified(true);
      toast.success('Verification successful!', {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setIsCodeVerified(false);
      toast.error('Invalid verification code. Please try again.', {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-md my-8">
      <ToastContainer />
      <form ref={form} onSubmit={sendEmail}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          You need to verify your email before proceeding:
        </label>
        <input
          type="email"
          name="to_email"
          value={studentDetails2.email}
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

      {isCodeVerified ? (
        <div className="mt-4">
          <p className="text-green-700 font-bold">Verification successful!</p>
          {projectCode && (
            <button
              className="mt-2 w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:border-green-300"
              onClick={() => alert(`Project Code: ${projectCode}`)}
            >
              Generate Project Code
            </button>
          )}
        </div>
      ) : (
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
