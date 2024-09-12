import React from "react";
import styles from './Transaction.module.css'
import TransactionCard from "../TransactionCard/TransactionCard"
import Modal from '../modal/Modal';
import FormExpense from "../Forms/FormExpense"
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination"



const Transaction = ({ transactions, title, editTransaction, balance, setBalance}) =>{
    
    const [editId, setEditId] = useState(0);
    const [isEditorOpen, setEditorOpen] = useState(false)
    const [currentTransactions, setCurrentTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0)

     const handleDelete = (id) => {
            const item =   transactions.find(i => i.id == id)
            const price = Number(item.price) 
            setBalance(prev => prev  + price)
            editTransaction(prev => (
                prev.filter(item => item.id != id)
            ))
     }

     const handleEdit = (id) => {
        setEditId(id)
        setEditorOpen(true)
     }

     useEffect(() => {
        if (Array.isArray( transactions)) {
            const start = (currentPage - 1) * maxRecords;
            const end = Math.min(currentPage * maxRecords, transactions.length);
            setCurrentTransactions( transactions.slice(start, end));
            setTotalPages(Math.ceil( transactions.length / maxRecords));
        }
    }, [currentPage, transactions]);

     useEffect(() =>{
          if(totalPages < currentPage && currentPage >1){
            setCurrentPage(prev => prev-1)
          }
     },[totalPages])

    return(
        <div className={styles.transactionWrapper}>
            {title && <h2>{title}</h2>}

             { transactions.length >0 ?
                <div className={styles.list}>
                    <div>
                       {currentTransactions.map(transaction =>(
                        <TransactionCard
                        details={ transaction}
                        key={transaction.id} // Use the unique ID from the transaction
                        handleDelete={() => handleDelete(transaction.id)}
                        handleEdit={() => handleEdit(transaction.id)}
                    />
                       ))}
                    </div>
                    {totalPages > 1 && (
                         <div className={styles.paginationWrapper}>
                        <Pagination pageUpdate={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
                        </div>)}
                    </div>
                    : (
                        <div className={styles.noTransaction}>
                            <p>No transaction</p>
                        </div>
                    )
                }
            
            <Modal isOpen = {isEditorOpen} setIsOpen ={setEditorOpen}>
                <FormExpense
                  editId ={editId}
                  expenseList={ transactions}
                  setExpenseList ={editTransaction}
                  setIsOpen={setEditorOpen}
                  balance ={balance}
                  setBalance={setBalance}/>
            </Modal>
        </div>
    )
}


export default Transaction;