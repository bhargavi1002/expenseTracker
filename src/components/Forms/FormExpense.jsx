import Button from "../button/Button";
import { useState, useEffect } from "react";
import { useSnackbar } from 'notistack'
import styles from './FormExpense.module.css'

const FormExpense = ({setIsOpen, expenseList, setExpenseList, editId, setBalance, balance}) =>{
    
    const[ formData, setFormData] = useState({
        title:'',
        category:'',
        price:'',
        date:'',
    })

    const {enqueueSnackbar} = useSnackbar();

    const handleChange = (e) =>{
        const name =  e.target.name
        setFormData(prev =>({...prev, [name]: e.target.value}))
    }

    const handleAdd = (e) =>{
        e.preventDefault()
        const expensePrice = Number(formData.price);
        if (balance === 0) {
            enqueueSnackbar("Cannot add expense. Your wallet balance is zero!", { variant: "warning" });
            return;  
        }
        if (expensePrice > balance) {
            enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" });
            return;  
          }

       setBalance(prev => prev - expensePrice);
        const endId = expenseList.length > 0 ? expenseList[0].id:0
        setExpenseList(prev => [{...formData, id:endId + 1},...prev])

        setFormData({
            title:'',
            category:'',
            price:'',
            date:'',
        })
        setIsOpen(false)
    }

    const handleEdit =(e) =>{
        e.preventDefault();

        const updatedPrice = Number(formData.price); 
        if (updatedPrice > balance) {
            enqueueSnackbar("Updated price should be less than the wallet balance", { variant: "warning" });
            return; 
          }
        if (editId) {
            const updatedExpenses = expenseList.map((item) =>
                item.id === editId ? { ...item, ...formData } : item
            );
            const originalExpense = expenseList.find((item) => item.id === editId);
            const priceDifference = Number(originalExpense.price) - Number(formData.price);
            setBalance((prev) => prev + priceDifference);

            setExpenseList(updatedExpenses);
            setIsOpen(false);
            enqueueSnackbar("Expense updated successfully", { variant: "success" });
        }
    }
    useEffect(() =>{
        if(editId){
            const expense = expenseList.find(item => item.id == editId)

            setFormData({
                title:expense.title,
                category:expense.category,
                price:expense.price,
                date:expense.date,
            })
        }
    },[editId])

    return(
        <div className={styles.formWrapper}>
            <h2>{editId ? 'Edit Expenses': 'Add Expenses'}</h2>
            <form onSubmit={editId ? handleEdit : handleAdd}>
                <div className={styles.fillFields}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange}
                required/>
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange}
                required/>

                <select name="category" value={formData.category} onChange={handleChange} required className={styles.customSelect}>

                 <option value='' disabled>Select Category</option>
                 <option value='food'>Food</option>
                 <option value='Entertainment'>Entertainment</option>
                 <option value='travel'>Travel</option>
                 </select>

                 <input type="date" name="date" value={formData.date} onChange={handleChange}required className={styles.customInput}/>
                </div>
                <div className={styles.fillButtons}>
                <Button type="submit" style="primary" shadow>{editId ? 'Edit Expense' : 'Add Expense'}</Button>
                <Button style="secondary" shadow
                handleClick = {() => setIsOpen(false)} className={styles.ButtonOverride}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default FormExpense;

