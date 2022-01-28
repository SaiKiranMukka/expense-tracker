import React, {useState, useEffect} from 'react'
import { makeStyles, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import AddExpense from './addExpense';
import useTable from '../../Hooks/useTable';
import { Controls } from '../Controls';
import { Search, Add, EditOutlined, Close } from '@material-ui/icons';
import Popup from '../Common/Popup';
import ConfirmDialog from '../Common/ConfirmDialog';
import * as expenseService from '../../Services/expense.service';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1.5),
      padding: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(10),
      padding: theme.spacing(5)
    }
  },
  searchToolbar: {
    [theme.breakpoints.down('xs')]: {
      '&.MuiToolbar-gutters': {
        'padding-left': theme.spacing(0)
      }
    }
  },
  searchInput: {
    [theme.breakpoints.down('xs')]: {
      width: '69%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '75%'
    },
    
  },
  newButton: {
    position: 'absolute',
    right: '10px',
    [theme.breakpoints.down('md')]: {
      '&.MuiButton-outlinedSizeLarge': {
        padding: theme.spacing(1.25),
      }
    },
  }
}));

const headCells = [
  { id: 'title', label: 'Title' },
  { id: 'amount', label: 'Amount' },
  { id: 'category', label: 'Category' },
  { id: 'subCategory', label: 'Sub Category' },
  { id: 'paymentMode', label: 'Payment Mode' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Expenses() {

  const classes = useStyles();

  const fetchExpensesList = async () => {
    const expensesList = await expenseService.getExpensesList();
    setRecords(expensesList);
  }

  useEffect(() => {
    fetchExpensesList();
  }, [])


  //TODO: fetch all expenses from database
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({fn: items => { return items; }})
  const [openPopup, setOpenPopup] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items;
        else 
          return items.filter(item => item.title.toLowerCase().includes(target.value.toLowerCase()))
      }
    })
  }

  const addOrEdit = async (expense, resetForm) => {
    
    if (expense?._id === undefined) {
      await expenseService.addExpense(expense);
    } else {
      await expenseService.updateExpense(expense, expense?._id);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    fetchExpensesList();
  }

  const openInPopup = item => {
    setRecordForEdit(item);
    setOpenPopup(true);
  }

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    await expenseService.deleteExpense(id)
    fetchExpensesList();
  }

  return (
    <React.Fragment>
    <Paper className={classes.pageContent} elevation={2}>
      <Toolbar className={classes.searchToolbar}>
        <Controls.Input
          label="Search Expenses"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>)
          }}
          onChange={handleSearch}
        />
        <Controls.Button
          text="Add"
          variant="outlined"
          startIcon={<Add />}
          className={classes.newButton}
          onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {
            recordsAfterPagingAndSorting().map(item => 
              (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.subCategory}</TableCell>
                  <TableCell>{item.paymentMode}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {openInPopup(item)}}
                    >
                      <EditOutlined fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => { onDelete(item._id) },
                        })
                        //onDelete(item.id)
                      }}
                    >
                      <Close fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
    <Popup
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      title="Add Expense"
    >
      <AddExpense
        recordForEdit={recordForEdit}
        addOrEdit={addOrEdit}
      /> 
    </Popup>
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
    </React.Fragment>
  )
}
