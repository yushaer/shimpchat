import {combineReducers} from 'redux';
import UserReducer from  './UserReducer';
import SessionReducer from  './SessionReducer';
import MessageReducer from './Message_Reducer';
const reducer = combineReducers({
user:UserReducer,session:SessionReducer,messages:MessageReducer
});
export default reducer;