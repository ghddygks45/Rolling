import React, { useCallback, useEffect, useRef } from 'react'
import Header from '../Header/Header'
import CardList from '../CardList/CardList'
import PrimaryMain from '../Button/Primary-main'
import LeftArrow from '../Button/Left-arrow'
import RightArrow from '../Button/Right-arrow'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const POPULAR_CARDS = Array.from({ length: 12 }, (_, index) => ({ id: index }))
const RECENT_CARDS = Array.from({ length: 12 }, (_, index) => ({ id: index + 100 }))

function RollingSwiper({ cards, sliderKey }) {
  const prevWrapperRef = useRef(null)
  const nextWrapperRef = useRef(null)
  const swiperRef = useRef(null)

  const initializeNavigation = useCallback(() => {
    const swiper = swiperRef.current
    const prevButton = prevWrapperRef.current?.querySelector('button')
    const nextButton = nextWrapperRef.current?.querySelector('button')

    if (!swiper || !prevButton || !nextButton) return

    swiper.params.navigation = {
      ...(swiper.params.navigation || {}),
      prevEl: prevButton,
      nextEl: nextButton
    }

    if (swiper.navigation && swiper.navigation.destroy && swiper.navigation.init) {
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [])

  useEffect(() => {
    initializeNavigation()
  }, [initializeNavigation, cards.length])

  return (
    <div className="relative flex items-center">
      <div ref={prevWrapperRef} className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <LeftArrow />
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ enabled: false }}
        loop={cards.length > 4}
        spaceBetween={20}
        slidesPerView={4}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setTimeout(() => initializeNavigation(), 0)
        }}
        className="w-full"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={`${sliderKey}-${card.id ?? index}`} className="!w-[275px] flex justify-center">
            <CardList />
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={nextWrapperRef} className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10">
        <RightArrow />
      </div>
    </div>
  )
}

function ListPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-center shadow-[0_1px_0_rgba(237,237,237,1)] bg-white">
        <div className="w-full max-w-[1199px]">
          <Header />
        </div>
      </header>

      <main className="flex flex-col items-center gap-16 py-16">
        <section className="w-full max-w-[1160px] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-24-bold text-gray-900">인기 롤링 페이퍼 🔥</h2>
          </div>
          <RollingSwiper cards={POPULAR_CARDS} sliderKey="popular" />
        </section>

        <section className="w-full max-w-[1160px] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-24-bold text-gray-900">최근에 만든 롤링 페이퍼 ⭐️️</h2>
          </div>
          <RollingSwiper cards={RECENT_CARDS} sliderKey="recent" />
        </section>

        <div className="w-full max-w-[1201px] flex flex-col items-center">
          <PrimaryMain className="mt-6 shadow-[0_4px_10px_rgba(153,53,255,0.2)]" />
        </div>
      </main>
    </div>
  )
}

export default ListPage

