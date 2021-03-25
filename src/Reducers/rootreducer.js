const initialState = {
    listOfemployees : [{
      employeeName : "Sagar",
      role : "Admin",
      location : "Hyderabad",
      active : "True",
      id : 0
    }],

}

const rootreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
          return {...state, listOfemployees : [...state.listOfemployees, action.payload]}
        case 'MANIPULATE_EMPLOYEE_LIST':
          return {...state, listOfemployees : action.payload}
        default:
          return state
      }
}

export default rootreducer;