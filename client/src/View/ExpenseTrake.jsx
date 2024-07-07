import { useEffect, useState } from "react";
import ExpenseForm from "../Component/ExpenseForm";
import CalculateTheSpends from "../Component/CalculateTheSpends";
import { DeleteTransactions, GetTransactions } from "../Apis/Service";

const ExpenseTrake = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  function deleteTransations(id) {
    DeleteTransactions(id)
      .then(({ data }) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== id)
    );
    deleteTransations(id);
  };

  function getData() {
    GetTransactions() // Assuming GetTransactions returns a Promise
      .then(({ data }) => {
        setExpenses(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData(); // Call getData with parentheses
  }, []); // Empty dependency array (optional, see below)

  return (
    <div>
      <ExpenseForm onAddExpense={addExpense} getData={getData} />
      <div className='row'>
        {expenses.length > 0 ? (
          <div className='col-md-12'>
            <CalculateTheSpends
              expenses={expenses}
              onDeleteExpense={deleteExpense}
            />
          </div>
        ) : (
          <div className='col-md-12'>
            <div className='text-center mt-3'>No Data Available</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTrake;
