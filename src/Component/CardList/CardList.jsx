import React, { useMemo } from 'react'
import profile01 from './assets/profile01.svg'
import profile02 from './assets/profile02.svg'
import profile03 from './assets/profile03.svg'
import pattern01 from '../Card_list/assets/pattern01.svg'
import pattern02 from '../Card_list/assets/pattern02.svg'
import pattern03 from '../Card_list/assets/pattern03.svg'
import pattern04 from '../Card_list/assets/pattern04.svg'

const DEFAULT_BACKGROUND =
  "https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDVfOTYg/MDAxNjE0OTU1MTgyMzYz.ozwJXDtUw0V_Gniz6i7qgDOkNs09MX-rJdCcaw6AAeAg.DZivXhGnQDUUx7kgkRXNOEI0DEltAo6p9Jk9SDBbxRcg.JPEG.sosohan_n/IMG_3725.JPG?type=w800"

const COLOR_STYLE_MAP = {
  beige: { hex: '#FFE2AD', pattern: pattern02 },
  purple: { hex: '#ECD9FF', pattern: pattern01 },
  blue: { hex: '#B1E4FF', pattern: pattern03 },
  green: { hex: '#D0F5C3', pattern: pattern04 }
}

function CardList({ recipient }) {
  //API에서 받은 recipient.name이 있으면 그 이름을, 없으면 기존 텍스트 To.Sowon을 그대로 보여줘요!
  const name = recipient?.name || 'To.Sowon'
  //API 응답의 recipient.messageCount가 숫자/문자열 형태로 오면 숫자로 변환해서 사용합니다.
  // 값이 없거나 변환이 실패하면 기존 숫자 30을 그대로
  const messageCount = useMemo(() => {
    if (recipient?.messageCount === undefined || recipient?.messageCount === null) return 30
    const parsed = Number(recipient.messageCount)
    return Number.isNaN(parsed) ? 30 : parsed
  }, [recipient?.messageCount])
  const backgroundImageURL = recipient?.backgroundImageURL || null
  const backgroundColorName = recipient?.backgroundColor || null

  const colorStyle = backgroundColorName
    ? COLOR_STYLE_MAP[backgroundColorName] || { hex: backgroundColorName }
    : null

  const isImageCard = Boolean(backgroundImageURL || (!colorStyle && !backgroundColorName))

  const backgroundStyle = isImageCard
    ? {
        backgroundImage: `url('${backgroundImageURL || DEFAULT_BACKGROUND}')`,
        backgroundColor: 'transparent'
      }
    : {
        backgroundImage: 'none',
        backgroundColor: colorStyle?.hex || '#FFE2AD'
      }

  const titleClass = isImageCard
    ? 'text-24-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] text-white'
    : 'text-24-bold text-gray-900'

  const infoClass = isImageCard
    ? 'mb-5 text-16-regular leading-[1.5] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]'
    : 'mb-5 text-16-regular leading-[1.5] text-gray-700'

  return (
    <div
      data-cardlist
      className="
        relative overflow-hidden flex-shrink-0
        w-[208px] h-[232px] rounded-[16px] box-border
        pt-6 pr-5 pb-5 pl-5
        min-[361px]:w-[275px] min-[361px]:h-[260px]
        min-[361px]:pt-[30px] min-[361px]:pr-6 min-[361px]:pb-5 min-[361px]:pl-6
        border border-grayscale-500/20
        shadow-[0_2px_13px_rgba(0,0,0,0.08)]
        bg-cover bg-center
        transition-colors duration-200
      "
      style={{
        ...backgroundStyle,
        color: isImageCard ? '#FFFFFF' : '#2B2B2B'
      }}
    >
      {isImageCard && (
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      )}
      {!isImageCard && colorStyle?.pattern && (
        <img
          src={colorStyle.pattern}
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-[-10px] pointer-events-none z-0 select-none"
        />
      )}
      <div
        className={`flex flex-col gap-3 relative z-[1] ${isImageCard ? 'text-white' : 'text-gray-900'}`}
      >
        <div className={titleClass}>{name}</div>

        <div className="flex items-center">
          <img
            className="w-7 h-7 rounded-full border border-white object-cover relative ml-0"
            src={profile01}
            alt="profile01"
          />
          <img
            className="w-7 h-7 rounded-full border border-white object-cover relative ml-[-10px]"
            src={profile02}
            alt="profile02"
          />
          <img
            className="w-7 h-7 rounded-full border border-white object-cover relative ml-[-10px]"
            src={profile03}
            alt="profile03"
          />
          <span className="inline-flex items-center justify-center ml-[-10px] relative z-[1]">
            <span
              className="
                flex items-center justify-center
                w-7 h-7
                rounded-full bg-[#FFFFFF] text-12-regular
              "
              style={{ color: '#000000' }}
            >
              +27
            </span>
          </span>
        </div>

        <div className={infoClass}>
          <span className={`text-16-bold ${isImageCard ? 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]' : 'text-gray-900'}`}>
            {messageCount}
          </span>
          명이 작성했어요!
        </div>
      </div>

      <div
        className="
          flex items-end
          mt-[17px] pt-[18px]
          max-[360px]:mt-4 max-[360px]:pt-[14px]
          border-t border-grayscale-500/40
          absolute z-[1]
        "
      >
        <div
          className="
            w-[66px] h-9 mr-2
            bg-black/60
            flex justify-center items-center
            rounded-[32px] px-3 py-2
            text-white
          "
        >
          👍&nbsp;20
        </div>
        <div
          className="
            w-[66px] h-9 mr-2
            bg-black/60
            flex justify-center items-center
            rounded-[32px] px-3 py-2
            text-white
          "
        >
          😍&nbsp;12
        </div>
        <div
          className="
            w-[66px] h-9
            bg-black/60
            flex justify-center items-center
            rounded-[32px] px-3 py-2
            text-white
          "
        >
          😢&nbsp;7
        </div>
      </div>
    </div>
  )
}

export default CardList

