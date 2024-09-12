 import Button from "../button/Button"
 import { useState } from "react"
 import { useSnackbar } from "notistack"
 import styles from "./BalanceForm.module.css"


 const BalanceForm =({setIsOpen, setBalance}) => {
       const [income, setIncome] = useState('')
       const {enqueueSnackbar} = useSnackbar();

       const handleSubmit = (e) =>{
        e.preventDefault()

        if(Number(income) < 0){
          enqueueSnackbar("Income should be greater than 0", {variant: "warning"})
          setIsOpen(false)
          return
        }
        setBalance(prev => prev + Number(income))
        setIsOpen(false)
       }

       return(
        <div className={styles.balanceWrapper}>
        <h2>Add Balance</h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.formWrapper}>
        <input
          type="number"
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />

        <Button type="submit" styles="primary" shadow >Add Balance</Button>
        <Button style = "secondary" shadow handleClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
       </form>
       </div>
       )

 }

 export default BalanceForm;