import * as RestService from './Helper/request';
import * as CONSTANTS from '../Constants';
import { toast } from 'react-toastify';

export const getCategoryList = () => {
  return [
    { id : 1, label: "Savings", value: "Savings" },
    { id: 2, label: "Investment", value: "Investment" },
    { id: 3, label: "Expense", value: "Expense" }
  ]
};

export const getSubCategoryCollection = () => {
  return [
    { id: 1, label: 'Salary', value: 'Salary' },
    { id: 2, label: 'Interest', value: 'Interest'},
    { id: 3, label: 'FD/RD', value: 'FD/RD' },
    { id: 4, label: 'Mutual Funds', value: 'Mutual Funds'},
    { id: 5, label: 'Stocks', value: 'Stocks' },
    { id: 6, label: 'Credit Card Payment', value: 'Credit Card Payment'},
    { id: 7, label: 'General Expenses', value: 'General Expenses' },
    { id: 8, label: 'Shopping', value: 'Shopping' },
    { id: 9, label: 'Utilities', value: 'Utilities' },
    { id: 10, label: 'Travel', value: 'Travel' },
    { id: 11, label: 'Misc.', value: 'Misc.' },
    { id: 12, label: 'Other', value: 'Other' }
  ]
};

export const getPaymentModesList = () => {
  return [
    { id: 1, label: 'Credit Card', value: 'Credit Card' },
    { id: 2, label: 'Debit Card', value: 'Debit Card' },
    { id: 3, label: 'Cash', value: 'Cash' },
    { id: 4, label: 'Cheque', value: 'Cheque' },
    { id: 5, label: 'Online Transaction', value: 'Online Transaction' }
  ]
};

export const getExpensesList = async () => {
  const { data } = await RestService.getCall(CONSTANTS.API_URL + CONSTANTS.EXPENSE_API_ENDPOINT);
  return data.Expenses || [];
}

export const addExpense = async (data) => {
  const { status } = await RestService.postCall(CONSTANTS.API_URL + CONSTANTS.EXPENSE_API_ENDPOINT, data);
  if (status === 201) {
    toast.success("Added Successfully !!", {
      position: toast.POSITION.TOP_RIGHT
    })
  }
}

export const updateExpense = async (data, expenseId) => {
  const { status } = await RestService.putCall(CONSTANTS.API_URL + CONSTANTS.EXPENSE_API_ENDPOINT + expenseId, data, '', '');
  if (status === 200) {
    toast.success("Updated Successfully !!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
  } else {
    toast.error("Unable to update, Please try again", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    })
  }
}

export const deleteExpense = async (expenseId) => {
  const { status } = await RestService.deletCall(CONSTANTS.API_URL + CONSTANTS.EXPENSE_API_ENDPOINT + expenseId);
  if (status === 200) {
    toast.success("Removed Successfully !!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
  } else {
    toast.error("Unable to remove, Please try again.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
  }
}
