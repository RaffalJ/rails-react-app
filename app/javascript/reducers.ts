import { combineReducers } from 'redux';

const defaultCase = (state: any) => ({ 'DEFAULT': () => { return state } });

const fetchCases = (field: string, state: any, action: any) => ({
  [`${field}-success`]: () => ({ ...state, [`${field}`]: action.payload }),
  [`${field}-failure`]: () => ({ ...state, [`${field}`]: { error: action.error } }),
  [`${field}-loading`]: () => ({ ...state, [`${field}`]: { loading: action.loading } }),
  [`${field}-add`]:     () => ({ ...state, [`${field}`]: state[`${field}`].concat(action.payload) }),
});

const inputCases = (field: string, state: any, action: any) => ({
  [`${field}-form`]: () => ({ ...state, [`${field}`]: action.content }),
})

const caseSelector = (type, fields, index, state, action) => {
  const cases = {
    input: () => {},
    fetch: () => { fields.map(field => (index = { ...index, ...fetchCases(field, state, action) })) },
  }

  return cases[type]
}

const genericReducer = (initialState: Object, fields: string[]) => {
  const reducer = (state = initialState, action: any) => {
    let index = { ...defaultCase(state) };
    // caseSelector('fetch', fields, index, state, action);
    // console.log('selector: ', caseSelector('fetch', fields, index, state, action));
    fields.map(field => (index = { ...index, ...fetchCases(field, state, action) }));

    return (index[action.type] || index['DEFAULT'])();
  }

  return reducer;
}

const messengerInitState = { rooms: [], messages: [] };
const messenger = genericReducer(messengerInitState, ['rooms', 'messages']);

const currentUserInitState = { currentUser: null };
const currentUser = genericReducer(currentUserInitState, ['currentUser']);

export default combineReducers({
  messenger,
  currentUser,
})
