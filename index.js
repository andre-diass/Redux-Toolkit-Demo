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
                numOfProducts = state.numOfProducts -1
            }
    }
    
}