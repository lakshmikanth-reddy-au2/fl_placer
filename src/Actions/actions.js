export function addEmployeeAction(data){
    return{
        type : "ADD_EMPLOYEE",
        payload : data
    }
}

export function manipulateEcployeeListAction(data){
    return{
        type : "MANIPULATE_EMPLOYEE_LIST",
        payload : data
    }
}