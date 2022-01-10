import uuid from 'uuid';
import { GET_ITEM, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    // items: [
    //     {id: uuid(), name: "Mitchell"},
    //     {id: uuid(), name: "Marisa"},
    //     {id: uuid(), name: "Amber"},
    //     {id: uuid(), name: "Karolina"}
    // ]
}

// export default function(state = initialState, action) {
//     switch(action.type) {
//         case GET_ITEM:
//             return {
//                 ...state
//             }
//         default:
//             return state;
//     }
// }