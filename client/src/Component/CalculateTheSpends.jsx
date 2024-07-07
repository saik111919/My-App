import {
  Typography,
  List,
  ListItemText,
  Card,
  CardContent,
  Button,
} from "@mui/material";
// import MoneyOffIcon from "@mui/icons-material/MoneyOff";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Delete } from "@mui/icons-material";
import PropTypes from "prop-types";
// import { GetTransactions } from "../Apis/Service";
// import { useEffect } from "react";

const CalculateTheSpends = ({ expenses, onDeleteExpense }) => {
  if (!Array.isArray(expenses)) {
    console.error("Invalid prop 'expenses'. Expected an array.");
    return null;
  }

  if (typeof onDeleteExpense !== "function") {
    console.error("Invalid prop 'onDeleteExpense'. Expected a function.");
    return null;
  }

  // Function to calculate totals based on type
  const calculateTotalsByType = (type) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.type === type
    );
    const totalAmount = filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return totalAmount;
  };

  // Function to group expenses by date using id
  const groupExpensesByDate = () => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.createdAt).toLocaleDateString();
      if (!groupedExpenses[date]) {
        groupedExpenses[date] = [];
      }
      groupedExpenses[date].push(expense);
    });
    return groupedExpenses;
  };

  const totalsByType = {
    spent: calculateTotalsByType("spent"),
    credited: calculateTotalsByType("credited"),
  };

  const groupedExpenses = groupExpensesByDate();

  return (
    <Card>
      <CardContent>
        <div className='d-flex gap2 justify-content-between'>
          <Typography variant='h4' gutterBottom>
            Total Spent: ₹{totalsByType.spent.toFixed(2)}
          </Typography>
          <Typography variant='h4' gutterBottom>
            Total Credited: ₹{totalsByType.credited.toFixed(2)}
          </Typography>
        </div>
        {/* Display grouped expenses */}
        <div>
          {Object.keys(groupedExpenses).map((date) => (
            <div key={date}>
              <Card>
                <CardContent>
                  <Typography variant='h5'>{date}</Typography>
                </CardContent>
              </Card>
              <List>
                {groupedExpenses[date].map((expense) => (
                  <Card key={expense._id}>
                    <CardContent className='d-flex justify-content-between'>
                      <ListItemText primary={`${expense.title}`} />
                      <ListItemText primary={`₹${expense.amount.toFixed(2)}`} />
                      <Button onClick={() => onDeleteExpense(expense._id)}>
                        <Delete />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </List>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

CalculateTheSpends.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["spent", "credited"]).isRequired,
    })
  ).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

export default CalculateTheSpends;

// import {
//   Typography,
//   List,
//   ListItemText,
//   Card,
//   CardContent,
//   Button,
// } from "@mui/material";
// // import MoneyOffIcon from "@mui/icons-material/MoneyOff";
// // import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import { Delete } from "@mui/icons-material";
// // import { GetTransactions } from "../Apis/Service";
// // import { useEffect } from "react";

// const CalculateTheSpends = ({ expenses, onDeleteExpense }) => {
//   // Function to calculate totals based on type
//   const calculateTotalsByType = (type) => {
//     const filteredExpenses = expenses.filter(
//       (expense) => expense.type === type
//     );
//     const totalAmount = filteredExpenses.reduce(
//       (total, expense) => total + expense.amount,
//       0
//     );
//     return totalAmount;
//   };

//   // Function to group expenses by date using id
//   const groupExpensesByDate = () => {
//     const groupedExpenses = {};
//     expenses.forEach((expense) => {
//       const date = new Date(expense.id).toLocaleDateString();
//       if (!groupedExpenses[date]) {
//         groupedExpenses[date] = [];
//       }
//       groupedExpenses[date].push(expense);
//     });
//     return groupedExpenses;
//   };

//   const totalsByType = {
//     spent: calculateTotalsByType("spent"),
//     credited: calculateTotalsByType("credited"),
//   };

//   const groupedExpenses = groupExpensesByDate();

//   return (
//     <Card>
//       <CardContent>
//         <div className='d-flex gap2 justify-content-between'>
//           <Typography variant='h4' gutterBottom>
//             Total Spent: ₹{totalsByType.spent.toFixed(2)}
//           </Typography>
//           <Typography variant='h4' gutterBottom>
//             Total Credited: ₹{totalsByType.credited.toFixed(2)}
//           </Typography>
//         </div>
//         {/* Display grouped expenses */}
//         <div>
//           {Object.keys(groupedExpenses).map((date) => (
//             <div key={date}>
//               <Card>
//                 <CardContent>
//                   <Typography variant='h5'>{date}</Typography>
//                 </CardContent>
//               </Card>
//               <List>
//                 {groupedExpenses[date].map((expense) => (
//                   <Card key={expense.id}>
//                     <CardContent className='d-flex justify-content-between'>
//                       <ListItemText primary={`${expense.title}`} />
//                       <ListItemText primary={`₹${expense.amount.toFixed(2)}`} />
//                       {/* {expense.type === 'spent' ? <MoneyOffIcon /> : <MonetizationOnIcon />} */}
//                       <Button onClick={() => onDeleteExpense(expense.id)}>
//                         <Delete />
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </List>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CalculateTheSpends;
