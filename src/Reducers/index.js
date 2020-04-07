import {combineReducers} from 'redux';
import UserReducer from  './UserReducer';
import SessionReducer from  './SessionReducer';
const reducer = combineReducers({
user:UserReducer,session:SessionReducer
});
export default reducer;