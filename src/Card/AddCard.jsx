import React from 'react'
import styles from './AddCard.module.css'
import addIcon from './assets/addButton.svg';

/* 카드 추가 컴포넌트 */
function AddCard() {
    return ( <>
        <div className={styles.addCard}>
            <button className={styles.addButton}>
                <img src={addIcon} alt="추가" />
            </button>
        </div>
    </>
    );
}

export default AddCard;
