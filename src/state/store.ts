import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice' //import authentication slice
import { persistStore, persistReducer, FLUSH, REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig ={
    key: "root",
    storage //browser's local storage
}
const rootReducer = combineReducers({ //Combines different reducers into a single root reducer. 
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // store's state to be saved in localStorage and rehydrated on app load.

 const store = configureStore( { 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/login/fulfilled',  
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,], // Ignore this specific action
                ignoredPaths: ['payload.headers'], // Ignore the headers property
            },
        }),
});

export const persistor =persistStore(store)  //state persistence in conjunction with the store.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store