import thunkMiddleware from "redux-thunk";
import {applyMiddleware, createStore} from "redux"
import rootReducer from "reducers"

export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
)