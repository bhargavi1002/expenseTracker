import { PiPizza,PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiRollingSuitcase } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import styles from "./TransactionCard.module.css";

const TransactionCard = ({details, handleDelete, handleEdit}) => {
      
    return(
        <div className={styles.card}>
            <div className={styles.cardInner}>
          <div className={styles.icons}>
            {details.category == 'food' && <PiPizza />}
            {details.category == 'Entertainment' && <PiGift/>}
            {details.category == 'travel' && <CiRollingSuitcase />}
          </div>
          <div className={styles.cardData}>
            <h5>{details.title}</h5>
            <p>{details.date}</p>
          </div>
          </div>

          <div className={styles.cardInner}>
            <p className={styles.cardPrice}>{`₹${details.price}`}</p>
            <div className={styles.buttonWrapper}>
                <button className={styles.cardDelete} onClick={handleDelete}>
                    <IoMdCloseCircleOutline/>
                </button>
                <button className={styles.cardEdit} onClick={handleEdit}>
                    <MdOutlineModeEdit/>
                </button>
            </div>
          </div>
         
        </div>
    )
 
}

export default TransactionCard;