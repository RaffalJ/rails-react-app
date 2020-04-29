import { combineReducers } from 'redux';

const defaultCase = (state: any) => ({ 'DEFAULT': () => { return state } });

const fetchCases = (field: string, state: any, action: any) => ({
  [`${field}-success`]: () => ({ ...state, [`${field}`]: action.payload }),
  [`${field}-loading`]: () => ({ ...state, [`${field}`]: { loading: action.loading } }),
  [`${field}-add`]:     () => ({ ...state, [`${field}`]: state[`${field}`].concat(action.payload) }),
  [`${field}-error`]:   () => ({ ...state, [`${field}Error`]: { error: action.error } }),
});

const caseSelector = (type: string, fields: string[], state: any, action: any) => {
  let index = { ...defaultCase(state) };

  const cases = {
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
};

const messengerParams = [
  { fields: ['rooms', 'messages'], caseSelectorName: 'fetch' },
];
const messengerInitState = { rooms: [], messages: [], selectedRoom: '' };
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
