import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

function Login() {
  const handleLogin = () => {
    signIn().catch(error => {
      console.error('Error during sign-in:', error);
    });
  };

  return (
    <div className='grid place-items-center min-h-screen bg-gray-100'>
      <Image
        src="https://links.papareact.com/t4i"
        height={400}
        width={400}
        objectFit="contain"
        alt="Login Image"
      />
      <button
        onClick={handleLogin}
        className='p-5 mt-5 bg-blue-500 rounded-full text-center cursor-pointer text-white'
      >
        Login with Facebook
      </button>
    </div>
  );
}

export default Login;
