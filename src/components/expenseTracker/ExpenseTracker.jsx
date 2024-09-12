import React, {useState, useEffect} from "react";
import Card from "../card/Card"
import Modal from "../modal/Modal";
import FormExpense from "../Forms/FormExpense"
import BalanceForm from "../Forms/BalanceForm"
import PieCharts from "../piechart/PieCharts"
import ExpenseBarChart from "../Barchart/ExpenseBarChart";
import Transaction from "../transactions/Transaction";
import styles from './ExpenseTracker.module.css'

const ExpenseTracker = () => {
    const [walletBalance, setWalletBalance] = useState(0); 
    const [expenses, setExpenses] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [isMounted, setIsMounted] =  useState(false)


    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    const [categorySpends , setCategorySpends] = useState({
      food:0,
      entertainment: 0,
      travel: 0,
    })

    const [categoryCnt, setCategoryCnt]= useState({
      food:0,
      entertainment: 0,
      travel: 0,
    })

    useEffect(() =>{
      const localBalance= localStorage.getItem("balance");

      if(localBalance){
        setWalletBalance(Number(localBalance));
      }
      else{
        setWalletBalance(5000);
        localStorage.setItem("balance", 5000);
      }

      const items = JSON.parse(localStorage.getItem("expenses"));
    

      setExpenseList(items || [])
      setIsMounted(true);
    },[])

    
    useEffect(() => {
      if(expenseList.length > 0 || isMounted){
        localStorage.setItem("expenses", JSON.stringify(expenseList));
      }

      if(expenseList.length > 0){
        setExpenses(
          expenseList.reduce((present, currVal) => present + Number(currVal.price),
          0)
        );
    }
    else{
      setExpenses(0);
    }
    
    console.log("Expense List:", expenseList);
    let foodSpends = 0,entertainmentSpends = 0,travelSpends = 0;
    let foodCount = 0,entertainmentCount = 0,travelCount = 0;

    expenseList.forEach((item) => {
      // console.log(item.category);
      if(item.category == "food"){
        foodSpends += Number(item.price);
        foodCount++;
      }
      else if (item.category == "Entertainment") { 
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      }
      else if (item.category == "travel") { 
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCnt({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expenseList]);


  useEffect(( )=>{
    if(isMounted){
      localStorage.setItem("balance",walletBalance);
    }
  }, [walletBalance])

    return (
        <div className={styles.container}>
          <h1>Expense Tracker</h1>
          <div className={styles.containerWhole}>
        <div className={styles.cardContainer}>

          <Card
            title="Wallet Balance"
            money={walletBalance}
            buttonText="+ Add Income"
            buttonType="success"
            handleClick={() => setIsIncomeModalOpen(true)}
          />

          <Card 
           title="Expenses" 
           money={expenses}
           buttonText="+ Add Expense"
           buttonType="failure"
           success={false}
           handleClick={() => {setIsExpenseModalOpen(true)}}
          />
         </div>
         <div className={styles.chartContainer}>
         <PieCharts
         data={[
          {name:"Food", value:categorySpends.food},
          {name:"Entertainment", value:categorySpends.entertainment},
          {name:"Travel", value:categorySpends.travel}
         ]}
         />
         </div>
         </div>


         <div className={styles.belowContainer}>
          <Transaction
             transactions={expenseList}
             editTransaction={setExpenseList}
             title="Recent Transactions"
             balance={walletBalance}
             setBalance={setWalletBalance} />

          <div className={styles.barWrapper}>
          <ExpenseBarChart data={[
          {name:"Food", value:categorySpends.food},
          {name:"Entertainment", value:categorySpends.entertainment},
          {name:"Travel", value:categorySpends.travel}
         ]} />
         </div>

         </div>
          


      <Modal isOpen={isIncomeModalOpen} setIsOpen={setIsIncomeModalOpen}>
        <BalanceForm setIsOpen={setIsIncomeModalOpen} setBalance={setWalletBalance}/>
      </Modal>

      <Modal isOpen={isExpenseModalOpen} setIsOpen={setIsExpenseModalOpen}>
        <FormExpense
        setIsOpen={setIsExpenseModalOpen}
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setBalance={setWalletBalance}
        balance={walletBalance}
        />
      </Modal>
</div>
    )
}

export default ExpenseTracker;