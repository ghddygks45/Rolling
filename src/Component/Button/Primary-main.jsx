import React from 'react'
import { useNavigate } from "react-router-dom";

function PrimaryMain({ text = "생성하기", to = "/post", disabled = false, onClick }) {

    const navigate = useNavigate();
  
    const handleClick = () => {
      if (disabled) return // 비활성화 상태에서는 클릭 무시
      if (typeof onClick === 'function') {
        onClick() // 외부에서 onClick을 넘긴 경우 해당 핸들러 우선 실행
        return
      }
      if (to) {
        navigate(to); // to가 주어졌다면 해당 경로로 이동
      }
    };

  return (
    <>
        <button
        onClick={handleClick}
        disabled={disabled}
        className="w-[320px] md:w-[720px] h-[56px] bg-purple-500 rounded-xl text-18-bold text-white
        hover:bg-purple-700 
        disabled:bg-gray-300 
        active:bg-purple-800 
        focus:bg-purple-800">{text}</button>
    </>
  )
}

export default PrimaryMain