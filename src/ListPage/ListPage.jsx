import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import CardList from '../CardList/CardList';
import Button from '../Button/Button';
import PrimaryMain from '../Button/Primary-main';

const TOTAL_CARDS = 12;
const VISIBLE_CARDS = 4;
const SCROLL_POSITIONS = TOTAL_CARDS - VISIBLE_CARDS + 1;

function ListPage() {
  const popularListRef = useRef(null);
  const recentListRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [gapWidth, setGapWidth] = useState(20);
  const [popularIndex, setPopularIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSizes = () => {
      const sampleCard = document.querySelector('[data-cardlist]');
      if (sampleCard) {
        setCardWidth(sampleCard.getBoundingClientRect().width);
      }

      const sampleList = popularListRef.current;
      if (sampleList) {
        const styles = window.getComputedStyle(sampleList);
        const gapValue = styles.columnGap || styles.gap || '20';
        setGapWidth(parseFloat(gapValue) || 20);
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  useEffect(() => {
    if (cardWidth === 0) return;

    if (popularListRef.current) {
      popularListRef.current.scrollTo({
        left: popularIndex * (cardWidth + gapWidth),
        behavior: 'auto',
      });
    }

    if (recentListRef.current) {
      recentListRef.current.scrollTo({
        left: recentIndex * (cardWidth + gapWidth),
        behavior: 'auto',
      });
    }
  }, [cardWidth, gapWidth]);

  const handleScroll = (ref, direction) => {
    if (!ref.current) return;

    const container = ref.current;
    if (cardWidth === 0) return;

    const isPopular = ref === popularListRef;
    const currentIndex = isPopular ? popularIndex : recentIndex;

    const newIndex =
      (currentIndex + direction + SCROLL_POSITIONS) % SCROLL_POSITIONS;

    if (isPopular) {
      setPopularIndex(newIndex);
    } else {
      setRecentIndex(newIndex);
    }

    const targetPosition = newIndex * (cardWidth + gapWidth);

    container.scrollTo({
      left: targetPosition,
      behavior: 'smooth',
    });
  };

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
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-10 h-10 !px-0 !py-0 rounded-full border-[#DADCDF] bg-white/90 shadow-[0_4px_8px_rgba(0,0,0,0.08)] backdrop-blur-[2px]"
                ariaLabel="이전"
                onClick={() => handleScroll(popularListRef, -1)}
              >
                <span className="sr-only">이전</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 9L4.5 6L7.5 3"
                    stroke="#101010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-10 h-10 !px-0 !py-0 rounded-full border-[#DADCDF] bg-white/90 shadow-[0_4px_8px_rgba(0,0,0,0.08)] backdrop-blur-[2px]"
                ariaLabel="다음"
                onClick={() => handleScroll(popularListRef, 1)}
              >
                <span className="sr-only">다음</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    d="M7.5 9L4.5 6L7.5 3"
                    stroke="#101010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={popularListRef}
              className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <CardList data-cardlist key={`popular-${index}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1160px] flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-24-bold text-gray-900">최근에 만든 롤링 페이퍼 ⭐️️</h2>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-10 h-10 !px-0 !py-0 rounded-full border-[#DADCDF] bg-white/90 shadow-[0_4px_8px_rgba(0,0,0,0.08)] backdrop-blur-[2px]"
                ariaLabel="이전"
                onClick={() => handleScroll(recentListRef, -1)}
              >
                <span className="sr-only">이전</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 9L4.5 6L7.5 3"
                    stroke="#101010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-10 h-10 !px-0 !py-0 rounded-full border-[#DADCDF] bg-white/90 shadow-[0_4px_8px_rgba(0,0,0,0.08)] backdrop-blur-[2px]"
                ariaLabel="다음"
                onClick={() => handleScroll(recentListRef, 1)}
              >
                <span className="sr-only">다음</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    d="M7.5 9L4.5 6L7.5 3"
                    stroke="#101010"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={recentListRef}
              className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <CardList data-cardlist key={`recent-${index}`} />
              ))}
            </div>
          </div>
        </section>

        <div className="w-full max-w-[1201px] flex flex-col items-center">
          <PrimaryMain className="mt-6 shadow-[0_4px_10px_rgba(153,53,255,0.2)]" />
        </div>
      </main>
    </div>
  );
}

export default ListPage;

