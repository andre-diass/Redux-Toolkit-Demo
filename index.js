const redux = require('redux')
const createStore = redux.createStore; // to create the store through the method createStore

//action: an object with a type property
//action creator: a function that returns an object
const PRODUCT_ORDERED = "PRODUCT_ORDERED";

function orderProduct(){
    return {
        type: PRODUCT_ORDERED,
        quantity: 1,
    }
    
}

//state
const initialState = {
    numOfProducts: 10,
    otherProperty: 0 
}

//reducer
//(previousState, action) => newState
const reducer = (state = initialState, action ) => {
    switch(action.type){
        case PRODUCT_ORDERED:
            return  {
                ...state,
                numOfProducts: state.numOfProducts -1
            }
    }
    
}

//the redux store holding the application state (1)
const store = createStore(reducer)

// Allow access to state via getState() (2)
console.log('Initial state:', store.getState());

// Register listeners via subscribe() (3)
//store.subscribe is going to return a function
const unsubscribe = store.subscribe(() => console.log("Updated state:" , store.getState()))

//Provide the dispatch method to update the state
store.dispatch(orderProduct())
store.dispatch(orderProduct())
store.dispatch(orderProduct())

//Unregister of listeners via the functin returned by subscribe() (4)
unsubscribe()