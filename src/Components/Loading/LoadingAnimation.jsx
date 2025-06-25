import React from 'react';
import loadingAnimation from "../../assets/loading.json"
import Lottie from 'lottie-react';
const LoadingAnimation = () => {
    return (
        <div className='dark:bg-gray-700 flex justify-center'>
            <div className=''>
                <Lottie animationData={loadingAnimation} loop={true}></Lottie>
            </div>
        </div>
    );
};

export default LoadingAnimation;