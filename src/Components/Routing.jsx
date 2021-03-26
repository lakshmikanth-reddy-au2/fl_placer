import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddEmployee from './EmployeeComponent/AddEmployee.jsx';
import EmployeeList from './EmployeeComponent/EmployeeList.jsx';


export default function Routing() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={EmployeeList} />
                <Route exact path="/add" component={AddEmployee} />
            </Switch>
        </BrowserRouter>
    )
}
