// eslint-disable-next-line import/no-named-as-default
import logger from 'redux-logger';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import bluetoothReducer from './ducks/bluetooth/bluetooth.reducer';
import rootSaga, {sagaMiddleware} from './rootSaga';

/**
 * Create the root reducer
 */
const rootReducer = combineReducers({
  bluetooth: bluetoothReducer.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(logger).concat(sagaMiddleware);
  },
  devTools: process.env.NODE_ENV === 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
