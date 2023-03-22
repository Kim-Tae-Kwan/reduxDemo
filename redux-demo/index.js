const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.createStore;
// 액션 생성 함수 디스패치에 바인딩
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();


// 액션 타입
const CAKE_ORDER = 'CAKE_ORDER';
const CAKE_RESTOCK = 'CAKE_RESTOCK';

const ICECREAM_ORDER = 'ICECREAM_ORDER';
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK';

// 액션 생성 함수
const cakeOrder = (payload = 1) => ({type: CAKE_ORDER, payload});
const cakeRestock = (payload = 1) => ({type: CAKE_RESTOCK, payload});

const icecreamOrder = (payload = 1) => ({type: ICECREAM_ORDER, payload});
const icecreamRestock = (payload = 1) => ({type: ICECREAM_RESTOCK, payload});

// 초기 상태
const cakeInitState = {
    numOfCakes: 10
};

const icecreamInitState = {
    numOfIcecreams: 10
};

// 리듀서
function cakeReducer(state = cakeInitState, action){
    const { type, payload } = action;

    switch(type){
        case CAKE_ORDER:
            return produce(state, draft => {
                draft.numOfCakes = draft.numOfCakes - payload;
            });


        case CAKE_RESTOCK:
            return produce(state, draft => {
                draft.numOfCakes = draft.numOfCakes + payload;
            });
        default:
            return state;
    }
};

function icecreamReducer(state = icecreamInitState, action){
    const { type, payload } = action;

    switch(type){
        case ICECREAM_ORDER:
            return produce(state, draft => {
                draft.numOfIcecreams = draft.numOfIcecreams - payload;
            });
        case ICECREAM_RESTOCK:
            return produce(state, draft => {
                draft.numOfIcecreams = draft.numOfIcecreams + payload;
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({ cakeReducer, icecreamReducer });

const store = createStore(rootReducer, applyMiddleware(logger));
//const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()));

// store.dispatch(cakeOrder());
// store.dispatch(cakeOrder());
// store.dispatch(cakeOrder());
// store.dispatch(cakeRestock());

// 액션 생성 함수 디스패치에 바인딩
const actions = bindActionCreator({ cakeOrder, cakeRestock, icecreamOrder, icecreamRestock }, store.dispatch);

actions.cakeOrder();
actions.cakeOrder();
actions.cakeOrder();
actions.cakeRestock(3);

actions.icecreamOrder();
actions.icecreamOrder();
actions.icecreamOrder();
actions.icecreamRestock(3);

// unsubscribe();