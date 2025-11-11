import React, { useMemo, useState } from "react" // 입력/선택 상태 관리를 위해 useState/useMemo 사용
import { useNavigate } from "react-router-dom" // 생성 완료 후 상세 페이지로 이동하기 위해 추가
import HeaderNobutton from "../Component/Header/HeaderNobutton"
import Input from "../Component/Text_Field/Input"
import ToggleButton from "../Component/Button/Toggle-button"
import Option from "../Component/Option/Option"
import PrimaryMain from "../Component/Button/Primary-main"
import apiClient from "../api/client" // API 호출을 위해 axios 인스턴스 사용

const COLOR_OPTIONS = ["beige", "purple", "blue", "green"] // Rolling API에서 허용하는 배경색
const IMAGE_PRESETS = [ // 이미지 모드에서 기본으로 제공할 배경 후보
  "https://i.ibb.co/wZQjvc86/Kakao-Talk-20251111-022932220.jpg",
  "https://i.ibb.co/R43DLhsH/Kakao-Talk-20251111-022938248.jpg",
  "https://i.ibb.co/F4m2R8Nn/clover.png",
  "https://i.ibb.co/vxRmv64t/Snow.jpg"
]

function ImageSelectGrid({ presets, selectedIndex, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {presets.map((url, index) => (
        <button
          key={`${url}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={`relative w-[154px] md:w-[168px] h-[154px] md:h-[168px] rounded-xl overflow-hidden border transition-all duration-200 flex items-center justify-center ${
            selectedIndex === index ? 'border-purple-500 shadow-lg' : 'border-gray-200'
          }`}
          style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {selectedIndex === index && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-[44px] h-[44px] rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-18-bold">✓</span>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function CreatePostPage() {
  const navigate = useNavigate()
  const [recipientName, setRecipientName] = useState("") // To. 입력값 상태
  const [mode, setMode] = useState("color") // 컬러/이미지 토글 상태
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]) // 기본 선택 컬러
  const [selectedIndex, setSelectedIndex] = useState(0) // 선택된 이미지 인덱스
  const [submitting, setSubmitting] = useState(false)
  const isValid = useMemo(() => recipientName.trim().length > 0, [recipientName])

  const handleNameChange = (value) => {
    setRecipientName(value)
  }

  const handleToggleChange = (value) => {
    setMode(value)
  }

  const handleColorChange = (colorValue) => {
    setSelectedColor(colorValue)
  }

  const handleSelectImage = (index) => {
    setSelectedIndex(index)
  }

  const handleSubmit = async () => {
    if (!isValid || submitting) return

    try {
      setSubmitting(true)
      const imageUrlForRequest = mode === 'image' ? IMAGE_PRESETS[selectedIndex] : undefined

      const payload = {
        team: process.env.REACT_APP_ROLLING_TEAM,
        name: recipientName.trim(),
        backgroundColor: selectedColor, // 필수 필드라서 항상 포함
        backgroundImageURL: imageUrlForRequest
      }

      const response = await apiClient.post(`/${process.env.REACT_APP_ROLLING_TEAM}/recipients/`, payload)
      const newId = response.data?.id

      if (newId) {
        navigate(`/post/${newId}`, { replace: true }) // 생성된 상세 페이지로 이동
      } else {
        alert('ID를 확인할 수 없어 리스트로 이동합니다.')
        navigate('/list', { replace: true })
      }
    } catch (error) {
      console.error('롤링 페이퍼 생성 실패:', error?.response?.data || error)
      alert(`롤링 페이퍼 생성에 실패했습니다. (${error?.response?.status || '네트워크 오류'})`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <HeaderNobutton />
      <div className="
            w-full max-w-[768px] min-h-[646px] mx-auto mt-[57px]
            p-[45px_24px] mb-[120px] text-left
            flex flex-col items-center
           "
      >
        <div className="w-[320px] md:w-[720px] flex flex-col items-start gap-[40px]">
          <div className="w-full">
            <div className="mb-[12px] text-gray-900 text-24-bold">To.</div>
            <Input value={recipientName} onChange={handleNameChange} placeholder="받는 사람 이름을 입력하세요" />
          </div>

          <section className="w-full flex flex-col gap-[24px]">
            <div>
              <p className="text-gray-900 text-24-bold">배경화면을 선택해 주세요.</p>
              <p className="text-gray-500 text-16-regular">컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
            </div>

            <div>
              <ToggleButton active={mode} onChange={handleToggleChange} />
            </div>

            {mode === 'color' ? (
              <Option activeColor={selectedColor} onChange={handleColorChange} />
            ) : (
              <div className="w-full flex flex-col gap-4">
                <ImageSelectGrid
                  presets={IMAGE_PRESETS}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelectImage}
                />
              </div>
            )}
          </section>
        </div>

        <div className="py-[24px] px-[20px] md:p-[24px] flex justify-center items-center">
          <PrimaryMain
            text={submitting ? '생성 중...' : '생성하기'}
            to={null}
            disabled={!isValid || submitting}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  )
}

export default CreatePostPage