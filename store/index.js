import {createStore} from 'redux';


const initialState = {
    industries: []
};


const reducer = (state = initialState, action)=>{
    console.log("reducer ", action)

    //always return brand new object
    switch (action.type) {
        case "UPDATE":
                return Object.assign({}, state, { industries : action.update })
            break;
    
        default:
            return state;
    }

}

const store = createStore(reducer);

export default store;