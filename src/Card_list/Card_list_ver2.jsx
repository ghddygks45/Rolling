import React from 'react';
import styles from './Card_list_ver2.module.css';
import profile01 from './assets/profile01.svg';
import profile02 from './assets/profile02.svg';
import profile03 from './assets/profile03.svg';

/* 이미지 배경 */
function CardList2() {
    return ( <>
      <div
      className={styles.card}
      style={{
        backgroundImage: `url('https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDVfOTYg/MDAxNjE0OTU1MTgyMzYz.ozwJXDtUw0V_Gniz6i7qgDOkNs09MX-rJdCcaw6AAeAg.DZivXhGnQDUUx7kgkRXNOEI0DEltAo6p9Jk9SDBbxRcg.JPEG.sosohan_n/IMG_3725.JPG?type=w800')`,
      }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.toName}>To.Sowon</div>
          <div className={styles.cardProfile}>
            <img src={profile01} alt='profile01'/>
            <img src={profile02} alt='profile02'/>
            <img src={profile03} alt='profile03'/> 
            <span className={styles.moreProfiles}>+27</span>
          </div>
          <div className={styles.writtenRecord}>
            <span>30명</span>이 작성했어요!
          </div>
        </div>
        <div className={styles.imojiWrapper}>
          <div className={styles.imoji}>👍 20</div>
          <div className={styles.imoji}>😍 12</div>
          <div className={styles.imoji}>😢 7</div>
        </div>
      </div>
    </>
    );
}

export default CardList2