import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTable from '../Custom/MaterialTable'
import {Button, Grid } from '@material-ui/core';
import CommonButton from '../Common/Button.jsx';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {manipulateEcployeeListAction} from "../../Actions/actions";
import AddEmployee from './AddEmployee.jsx';

export default function EmployeeList(props) {

    const state = useSelector(state => state.storeData)
    const dispatch = useDispatch();
    const [tableData, settableData] = useState({
        columns : [
            { title: 'Employee Name', field: 'employeeName' },
            { title: 'Role', field: 'role' },
            { title: 'Location', field: 'location' },
            { title: 'Active', field: 'active' },
            { title : "Edit", field: "edit", render: (rowData) => <EditIcon style={{cursor : "pointer"}} onClick={() => handleEdit(rowData)} />},
            { title : "Delete", field: "delete", render: (rowData) => <DeleteIcon style={{cursor : "pointer"}} onClick={() => handleDelete(rowData)}/>}
          ],
        row : state.listOfemployees
    })
    const [isUpdate, setisUpdate] = useState(false)
    const [selectedRow, setselectedRow] = useState({})

    const handleAddButtonClick = () => {
        props.history.push('/add')
    }
    const handleEdit = (rowData) => {
        setselectedRow(rowData);
        setisUpdate(true)
    }
    const handleDelete = async (rowData) => {
        let items = state.listOfemployees
        await items.splice(items.findIndex(function(i){
            return i.id === rowData.id;
        }), 1);
        await dispatch(manipulateEcployeeListAction(items))
        window.location.reload()
    }
    const handleCancel = () => {
        setisUpdate(false)
    }
    return (
        <div className="main-Content">
            <Grid container spacing={3} justify="flex-end" className="add-employee-btn-grid">
                <Grid item xs={12} md={3} sm={3} className="add-emp-item" >
                    {!isUpdate && <CommonButton className="btn btn-primary" handleAddButtonClick={handleAddButtonClick}>Add Employee</CommonButton>}
                </Grid>
            </Grid>
            {isUpdate ? <AddEmployee isUpdate={isUpdate} data={selectedRow} handleCancel={handleCancel} /> : 
            <CustomTable
                columns={tableData.columns}
                  rows={tableData.row}
                  />
            }
        </div>
    )
}
