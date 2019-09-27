import {createStore} from 'redux';

const initialState = {
    industries: []
};

const reducer = (state = initialState, action)=>{

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
