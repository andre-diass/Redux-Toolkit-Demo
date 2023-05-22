/*
//THE REDUX PATTERN:
(1) Create a store
(2) Declare the initial state and the reducer
(3) Define action and action creators
(4) Subscribe to the store 
(5) Dispatch action to update the store 
(6) Unsubscribe to the changes

*/

const redux = require("redux");
const createStore = redux.createStore; // to create the store through the method createStore
const combineReducers = redux.combineReducers; // to combine the reducers
const applyMiddleware = redux.applyMiddleware; // to add middleware

const reduxLogger = require("redux-logger"); // to log the actions;
const logger = reduxLogger.createLogger(); // to log the actions;

//action: an object with a type property
const PRODUCT_ORDERED = "PRODUCT_ORDERED";
const PRODUCT_RESTOCKED = "PRODUCT RESTOCKED";

const MATERIAL_ORDERED = "MATERIAL_ORDERED";
const MATERIAL_RESTOCKED = "MATERIAL_RESTOCKED";

//action creator: a function that returns an object
//action creator wich is going to give the action itself
function orderProduct() {
  return {
    type: PRODUCT_ORDERED,
    payload: 1,
  };
}

//action to restockProduct
function restockProduct(qty = 1) {
  return {
    type: PRODUCT_RESTOCKED,
    payload: qty,
  };
}

function orderMaterial(qty = 1) {
  return {
    type: MATERIAL_ORDERED,
    payload: qty,
  };
}

function restockMaterial(qty = 1) {
  return {
    type: MATERIAL_RESTOCKED,
    payload: qty,
  };
}

////////////////////////////////////////////////////////////////////////

//state
const ProductInitialState = {
  numOfProducts: 10,
};

const MaterialInitialState = {
  numOfMaterials: 30,
};

//reducer
//(previousState, action) => newState
const ProductReducer = (state = ProductInitialState, action) => {
  switch (action.type) {
    case PRODUCT_ORDERED:
      return {
        ...state,
        numOfProducts: state.numOfProducts - 1,
      };
    case PRODUCT_RESTOCKED:
      return {
        ...state,
        numOfProducts: state.numOfProducts + action.payload,
      };
    default:
      return state; // Add default case to return the current state
  }
};

const MaterialReducer = (state = MaterialInitialState, action) => {
  switch (action.type) {
    case MATERIAL_ORDERED:
      return {
        ...state,
        numOfMaterials: state.numOfMaterials - 1,
      };
    case MATERIAL_RESTOCKED:
      return {
        ...state,
        numOfMaterials: state.numOfMaterials + action.payload,
      };
    default:
      return state; // Add default case to return the current state
  }
};

//combine the reducers

const rootReducer = combineReducers({
  Product: ProductReducer,
  Material: MaterialReducer,
});

//the redux store holding the application state (1)
//the create store method from the redux library accepts as parameter the reducer function wich controls how the state transitions happen and also gives the state of the application wich is the initial state
const store = createStore(rootReducer, applyMiddleware(logger));

// Allow access to state via getState() (2)
console.log("Initial state:", store.getState());

// Register listeners via subscribe() (3)
//store.subscribe is going to return a function
//every the store updates we log the state to the console
const unsubscribe = store.subscribe(() =>
  console.log("Updated state:", store.getState())
);

//Provide the dispatch method to update the state
//when I dispacth the action, the reducer sees that the action type is "PRODUCT ORDERED" and returns the new state
store.dispatch(orderProduct());
store.dispatch(orderProduct());
store.dispatch(orderProduct());
store.dispatch(orderMaterial(2));
store.dispatch(restockProduct(5));
store.dispatch(restockMaterial());

//Unregister of listeners via the functin returned by subscribe() (4)
unsubscribe();
