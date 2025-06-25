import React, { Suspense } from 'react';
import ClientCard from './ClientCard';
import LoadingAnimation from '../Loading/LoadingAnimation';

const clientsPromise = fetch("/clientsReview.json").then(res => res.json())

const ClientsReview = () => {
    return (
        <div className='dark:bg-gray-900'>
            <h1 className='dark:text-gray-200 font-bold play text-4xl text-center pb-5'>Words That <span className='text-orange-500 dark:text-amber-500'>Matters</span></h1>
            <div className='w-full mx-auto py-5 bg-[url(./Images/clientBg.jpg)] dark:bg-[url(./Images/clientBg-d.jpg)] bg-no-repeat bg-cover flex justify-center items-center'>
            
            <Suspense fallback={<LoadingAnimation></LoadingAnimation>}>
                <ClientCard clientsPromise={clientsPromise}></ClientCard>
            </Suspense>
        </div>
        </div>
    );
};

export default ClientsReview;