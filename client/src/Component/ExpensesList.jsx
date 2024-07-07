
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardContent } from '@mui/material';
import { Fragment } from 'react';

const ExpensesList = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <Card>
          <CardContent>
            {expenses.map((expense) => (
              <Fragment key={expense.id}>
                <div className="card mb-1">
                  <div className="card-body d-flex justify-content-between align-items" >
                    <h3 className="card-title">{expense.title}</h3>
                    <p className="card-text">{expense.amount} &#8377;</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Fragment>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

ExpensesList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default ExpensesList;
