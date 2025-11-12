import React, { useEffect, useState } from "react";
import Header from "../Component/Header/Header";
import MessageHeader from "../Component/Header/MessageHeader";
import DeleteButton from "../Component/Button/Delete-button";
import Modal from "../Component/Modal/Modal";
import ModalTest from "../Component/Modal/ModalTest";
import axios from "axios";
import UserCard, { defaultMessage } from "../Component/Card/UserCard";
import { useParams } from "react-router-dom";

// 🚨 정적인 메시지 데이터 (ID 추적 및 기타 정보 추가)
const STATIC_MESSAGES = Array.from({ length: 9 }).map((_, index) => ({
  id: index + 1, // 각 메시지를 고유하게 식별
  senderName: `보낸 이 #${index + 1}`,
  content: `안녕하세요, 이것은 ${
    index + 1
  }번째 메시지 카드 내용입니다. 모달창에 표시될 긴 내용입니다.`,
  profileImageURL: `https://placehold.co/40x40/f2dca0/000000?text=${index + 1}`,
  date: `2023.10.${10 + index}`, // 임시 날짜
  relationship: ["동료", "친구", "가족"][index % 3], // 임시 관계 태그
}));

function OwnerPage() {
  // const [selectedMessage, setSelectedMessage] = useState(null);

  // === 페이지 삭제 확인 모달 상태 (전체 페이지 삭제) ===
  const [isPageDeleteModalOpen, setIsPageDeleteModalOpen] = useState(false);

  // === 메시지 삭제 확인 모달 상태 추가 (개별 메시지 삭제) ===
  const [isMessageDeleteModalOpen, setIsMessageDeleteModalOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState(null); // 삭제할 메시지

  const { id } = useParams(); // URL에 있는 id 값 가져오기
  const [messages, setMessages] = useState([]);
  const defaultMessages = Array(6).fill(defaultMessage);

  // 카드데이터 뿌리기: UserCard.jsx
  useEffect(() => {
    const dataMessages = async () => {
      try {
        const res = await axios.get(
          `https://rolling-api.vercel.app/20-4/recipients/${id}/messages`
        );
        setMessages(res.data.results || []);
      } catch (error) {
        alert(`실패입니다. 에러코드: ${error}`);
      }
    };

    dataMessages();
  }, []);

  // 랜더링 데이터 선택: 없으면 defaultMessages데이터 표시
  const messegesToRender = messages && messages.length > 0 ? messages : defaultMessages;

  // 모달에 데이터 가져오기: Modal.jsx
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 카드 클릭 시 모달 열기 핸들러
  const handleCardClick = (id) => {
    setSelectedId(id);
    setIsOpen(true);
    console.log(id);
  };

  // selectedMessage: 아이디 값이 같을 경우 그 메세지 객체를 반환받음
  const selectedMessage = messegesToRender.find((msg, index) => {
    const messageId = msg.id ?? index;
    return messageId === selectedId;
  });

  // useEffect(() => {
  //   console.log("useEffect실행");
  //   if (selectedId !== null) {
  //     console.log("🟢 업데이트된 selectedId:", selectedId);
  //   }
  // }, [selectedId]);

  // 메시지 상세 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsOpen(false);
    // setSelectedMessage(null);
  };

  // --- 전체 페이지 삭제 로직 ---
  const handleOpenPageDeleteModal = () => {
    setIsPageDeleteModalOpen(true);
  };

  const handleClosePageDeleteModal = () => {
    setIsPageDeleteModalOpen(false);
  };

  const handleConfirmPageDelete = () => {
    console.log("페이지 전체를 삭제합니다.");
    setIsPageDeleteModalOpen(false);
  };

  // --- 개별 메시지 삭제 로직 ---
  const handleOpenMessageDeleteModal = (id) => {
    setMessageToDeleteId(id); // 삭제할 ID 저장
    setIsMessageDeleteModalOpen(true);
  };

  const handleCloseMessageDeleteModal = () => {
    setIsMessageDeleteModalOpen(false);
    setMessageToDeleteId(null); // ID 초기화
  };

  const handleConfirmMessageDelete = () => {
    // 실제 삭제 로직 (예: 필터링)
    console.log(`${messageToDeleteId}번 메시지를 삭제합니다.`);
    // setSTATIC_MESSAGES(prev => prev.filter(msg => msg.id !== messageToDeleteId));
    handleCloseMessageDeleteModal();
  };

  // 페이지 삭제 확인 모달
  const PageDeleteConfirmModal = () => (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
      <h3 className="text-xl font-bold mb-4 text-center">페이지 삭제 확인</h3>
      <p className="text-gray-700 mb-6 text-center">페이지를 삭제하시겠습니까?</p>
      <div className="flex justify-center space-x-3">
        <button
          onClick={handleConfirmPageDelete}
          className="py-2 px-4 bg-purple-600 text-white text-18-regular rounded-lg hover:bg-purple-700 transition flex-1"
        >
          예
        </button>
        <button
          onClick={handleClosePageDeleteModal}
          className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex-1"
        >
          아니요
        </button>
      </div>
    </div>
  );

  // 메시지 삭제 확인 모달
  const MessageDeleteConfirmModal = () => (
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
      <h3 className="text-xl font-bold mb-4 text-center">메시지 삭제 확인</h3>
      <p className="text-gray-700 mb-6 text-center">메시지를 삭제하시겠습니까?</p>
      <div className="flex justify-center space-x-3">
        <button
          onClick={handleConfirmMessageDelete}
          className="py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex-1"
        >
          예
        </button>
        <button
          onClick={handleCloseMessageDeleteModal}
          className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex-1"
        >
          아니요
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="overflow-y-scroll owner-page-scrollbar-hide">
        <div className="flex flex-col min-h-screen bg-beige-200">
          {/* 상단 헤더 영역 (고정) */}
          <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-30">
            <div className="mx-auto">
              <Header />
              <div className="flex justify-between items-center px-6">
                <MessageHeader />
              </div>
            </div>
          </div>

          {/* 메시지 카드 영역 */}
          <div className="flex-1 w-full pt-[180px] pb-10 relative">
            <div className="mx-auto px-6 relative max-w-7xl">
              {/* 삭제 버튼 - 페이지 삭제 모달 연결 */}
              <div
                className="absolute top-[-55px] right-8 z-10"
                onClick={handleOpenPageDeleteModal}
              >
                <DeleteButton text="삭제하기" />
              </div>

              {/* 카드 목록 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-[28px] relative z-10">
                {messegesToRender.map((message, idx) => (
                  <UserCard
                    key={message.id ?? idx}
                    message={message}
                    onClick={() => handleCardClick(message.id ?? idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <ModalTest
            onClick={(e) => e.stopPropagation()}
            isOpen={isOpen}
            onClose={handleCloseModal}
            message={selectedMessage}
          />
        </div>
      )}

      {/* 메시지 상세 모달 렌더링 */}
      {/* {isOpen && selectedMessage && (
        <div
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <Modal
            onClick={(e) => e.stopPropagation()}
            isOpen={isOpen}
            onClose={handleCloseModal}
            senderName={selectedMessage.senderName}
            content={selectedMessage.content}
          />
        </div>
      )} */}

      {/* 페이지 삭제 확인 모달 렌더링 */}
      {isPageDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center"
          onClick={handleClosePageDeleteModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PageDeleteConfirmModal />
          </div>
        </div>
      )}

      {/* 🌟 ✅ 메시지 삭제 확인 모달 렌더링 */}
      {isMessageDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center"
          onClick={handleCloseMessageDeleteModal} // 오버레이 클릭 시 닫기
        >
          <div onClick={(e) => e.stopPropagation()}>
            <MessageDeleteConfirmModal />
          </div>
        </div>
      )}
    </>
  );
}

export default OwnerPage;
