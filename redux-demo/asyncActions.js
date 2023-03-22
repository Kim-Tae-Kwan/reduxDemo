const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// 액션 타입
const FETCH_REQUESTED = 'FETCH_REQUESTED';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

// 액션 생성 함수
const fetchRequested = () => ({type: FETCH_REQUESTED});
const fetchSuccess = payload => ({type: FETCH_SUCCESS, payload});
const fetchError = payload => ({type: FETCH_ERROR, payload});

// 초기 상태
const fetchInitState = {
    loading: false,
    data: '',
    error: ''
}

// 리듀서
function fetchReducer(state = fetchInitState, action){
    const { type, payload } = action;
    switch(type){
        case FETCH_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return{
                loading: false,
                data: payload,
                error: ''   
            }
        case FETCH_ERROR:
            return{
                loading: false,
                data: '',
                error: payload
            }
        default:
            return state;
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchRequested());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const users = res.data.map(user => user.id);
            dispatch(fetchSuccess(users));
        })
        .catch(error => {
            dispatch(fetchError(error.message));
        });
    };
};

const store = createStore(fetchReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());