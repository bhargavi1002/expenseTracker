import { IoIosArrowRoundBack, IoIosArrowRoundForward} from "react-icons/io";
import styles from "./Pagination.module.css"

const Pagination = ({pageUpdate, currentPage, totalPages}) =>{
    
    const handlePrevious = () =>{
        if(currentPage > 1){
            pageUpdate(prev => prev-1)
        }
    }
    const handleNext = () =>{
        if(totalPages > currentPage){
            pageUpdate(prev => prev +1)
        }
    }

    return(
        <div className={styles.paginationWrapper}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                <IoIosArrowRoundBack />
            </button>
            <p>{currentPage}</p>

            <button onClick={handleNext} disabled={currentPage === totalPages}>
                <IoIosArrowRoundForward />
            </button>
        </div>
    )


}
export default Pagination;
