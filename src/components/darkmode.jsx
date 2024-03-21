import React, { useState } from 'react';
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid'
export const Darkmode = ({darkmode , setDarkmode}) => {



    return <>
        <div onClick={() => setDarkmode(!darkmode)} className="static fixed bottom-10 right-10 rounded-full bg-gray-800 dark:bg-white h-16 w-16 flex items-center justify-center cursor-pointer">
            {darkmode ? 
                <SunIcon className='h-6 w-6'/>
             : 
                <MoonIcon className='h-6 w-6 text-white'/>
            }
        </div>
    </>
}