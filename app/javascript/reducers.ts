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

const caseSelector = (type: string, fields: string[], state: any, action: any) => {
  let index = { ...defaultCase(state) };

  const cases = {
    input: () => { fields.map(field => (index = { ...index, ...inputCases(field, state, action) })) },
    fetch: () => { fields.map(field => (index = { ...index, ...fetchCases(field, state, action) })) },
  };
  cases[`${type}`]();

  return index;
}

interface ISet {
  fields: string[];
  caseSelectorName: string;
}

const genericReducer = (initialState: Object, sets: ISet[]) => {
  const reducer = (state = initialState, action: any) => {
    let index: any;
    sets.map(set => (index = { ...index, ...caseSelector(set.caseSelectorName, set.fields, state, action) } ));

    return (index[action.type] || index['DEFAULT'])();
  }

  return reducer;
}

const messengerParams = [
  { fields: ['rooms', 'messages'], caseSelectorName: 'fetch' },
  { fields: ['newRoomForm'], caseSelectorName: 'input' },
];
const messengerInitState = { rooms: [], messages: [] };
const messenger = genericReducer(messengerInitState, messengerParams);

const currentUserParams = [
  { fields: ['currentUser'], caseSelectorName: 'fetch' },
];
const currentUserInitState = { currentUser: null };
const currentUser = genericReducer(currentUserInitState, currentUserParams);

export default combineReducers({
  messenger,
  currentUser,
})
