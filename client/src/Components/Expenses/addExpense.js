import { Grid, Container } from "@material-ui/core";
import { Controls } from "../Controls";
import { Form, useForm } from "../../Hooks/useForm";
import * as expenseService from "../../Services/expense.service";
import { useEffect } from "react";

const initialFValues = {
  title: '',
  amount: '',
  category: '',
  subCategory: '',
  paymentMode: '',
  remarks: ''
};

export default function AddExpense(props) {

  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('title' in fieldValues)
      temp.title = fieldValues.title ? "" : "Title is Required"
    if ('amount' in fieldValues) {
      temp.amount = fieldValues.amount ? "" : "Amount is Required"
      //temp.amount = (/^\d+(\.|\,)\d{2}$/).test(values.amount) ? "" : "Amount should be in number format"
    }
    if ('category' in fieldValues)
      temp.category = fieldValues.category.length !== 0 ? "" : "Category is Required"
    if ('subCategory' in fieldValues)
      temp.subCategory = fieldValues.subCategory.length !== 0 ? "" : "Sub Category is Required"
    if ('paymentMode' in fieldValues)
      temp.paymentMode = fieldValues.paymentMode.length !== 0 ? "" : "Payment Mode is Required"

    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every(item => item === "");
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFValues, true, validate);

  const handleSubmit = async e => {
    e.preventDefault()
    if (validate()) {
      addOrEdit(values, resetForm)
    }
  }

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      })
  }, [recordForEdit, setValues])

  // TODO: check for above setValues

  return (
    <Container component="main" maxWidth="md">
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Controls.Input
              id="title"
              name="title"
              label="Title"
              value={values.title}
              onChange={handleInputChange}
              autoFocus
              required
              error={errors.title}
            />

            <Controls.Input
              id="amount"
              name="amount"
              label="Amount"
              value={values.amount}
              onChange={handleInputChange}
              required
              error={errors.amount}
            />

            <Controls.RadioGroup
              id="category"
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              items={expenseService.getCategoryList()}
              error={errors.category}
            />

          </Grid>
          <Grid item xs={12} md={6}>

            <Controls.Select
              id="subCategory"
              name="subCategory"
              label="Sub Category"
              value={values.subCategory}
              onChange={handleInputChange}
              options={expenseService.getSubCategoryCollection()}
              error={errors.subCategory}
            />

            <Controls.Select
              id="paymentMode"
              name="paymentMode"
              label="Payment Mode"
              value={values.paymentMode}
              onChange={handleInputChange}
              options={expenseService.getPaymentModesList()}
              error={errors.paymentMode}
            />

            <Controls.Input
              id="remarks"
              name="remarks"
              label="Remarks"
              value={values.remarks}
              onChange={handleInputChange}
            />

            <div>
              <Controls.Button
                text="Submit"
                type="submit"
              />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
