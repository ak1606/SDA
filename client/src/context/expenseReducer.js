export default (state, action) => {
    switch (action.type) {
      case 'GET_EXPENSES':
        return {
          ...state,
          expenses: action.payload,
          loading: false
        };
      case 'ADD_EXPENSE':
        return {
          ...state,
          expenses: [action.payload, ...state.expenses],
          loading: false
        };
      case 'DELETE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.filter(expense => expense._id !== action.payload),
          loading: false
        };
      case 'UPDATE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.map(expense =>
            expense._id === action.payload._id ? action.payload : expense
          ),
          loading: false
        };
      case 'GET_STATS':
        return {
          ...state,
          stats: action.payload,
          loading: false
        };
      case 'EXPENSE_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };