import './App.css';
import ExpenseTracker from "./components/expenseTracker/ExpenseTracker"
import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="App">
        <ExpenseTracker />
    </div>
    </SnackbarProvider>
  );
}

export default App;
