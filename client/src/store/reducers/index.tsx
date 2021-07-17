import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {settingsReducer} from "./settingsReducer";
import {listReducer} from "./listReducer";
import {buildReducer} from "./buildReducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  list: listReducer,
  build: buildReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
