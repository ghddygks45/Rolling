import React from 'react'
import deleted from '../img/deleted.png';

function deleteButton() {
  return (
    <>
        <div className="w-[36px] h-[36px] inline-block bg-white rounded-md hover:bg-grayscale-100 disabled:bg-grayscale-300  active:bg-grayscale-700 focus:bg-grayscale-700">
            <a className='w-full h-full flex justify-center justify-items-center items-center rounded-md' href="/"><img className='w-[24px] h-[24px]' src={deleted} alt="플러스" /></a>
        </div>
    </>
  )
}

export default deleteButton