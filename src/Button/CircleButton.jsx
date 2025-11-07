import React from 'react'
import plus from '../img/plus.png';

function Circle_button() {
  return (
    <>
      <div className="w-[56px] h-[56px] inline-block bg-grayscale-500 rounded-full hover:bg-grayscale-600 disabled:bg-grayscale-300 active:bg-grayscale-700 focus:bg-grayscale-700">
          <a className='w-full h-full flex justify-center justify-items-center items-center rounded-full' href="/"><img className='w-[24px] h-[24px]' src={plus} alt="플러스" /></a>
      </div>
    </>
  )
}

export default Circle_button