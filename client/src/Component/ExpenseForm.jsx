import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AddTransactions } from "../Apis/Service";

const ExpenseForm = ({ onAddExpense, getData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const tags = [
    { value: "spent", label: "Amount Spent" },
    { value: "credited", label: "Amount Credited" },
  ];

  const onSubmit = (data) => {
    onAddExpense({ ...data, id: Date.now() });
    reset();
    AddTransactions(data)
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Accordion className='mt-3 shadow-sm '>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
          onClick={() => reset()}
        >
          <Typography>Add Expenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit(onSubmit)} className='container mt-4'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label'>Title</label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    placeholder='Tile'
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <div className='invalid-feedback'>
                      {errors.title.message}
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label'>Amount</label>
                  <input
                    type='number'
                    className={`form-control ${
                      errors.amount ? "is-invalid" : ""
                    }`}
                    placeholder='Number'
                    {...register("amount", {
                      required: "Amount is required",
                      valueAsNumber: true,
                      validate: (value) =>
                        value > 0 || "Amount must be greater than 0",
                    })}
                  />
                  {errors.amount && (
                    <div className='invalid-feedback'>
                      {errors.amount.message}
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='form-label'>Type</label>
                  <select
                    className={`form-select ${errors.type ? "is-invalid" : ""}`}
                    {...register("type", { required: "Type is required" })}
                  >
                    <option value=''>Select type...</option>
                    {tags.map((tag) => (
                      <option key={tag.value} value={tag.value}>
                        {tag.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <div className='invalid-feedback'>
                      {errors.type.message}
                    </div>
                  )}
                </div>
              </div>
              <div className='col-md-12'>
                <div className='d-flex justify-content-center mb-3'>
                  <Button type='submit' variant='contained' className='rounded'>
                    Add Expense
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default ExpenseForm;
