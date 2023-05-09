import { combineReducers, Store, CombinedState, AnyAction } from 'redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer} from "redux-persist";
import user from './user';
import storage from 'redux-persist/lib/storage' 

const rootReducer = (state: any, action: AnyAction): CombinedState<any> => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({ user });
      return combinedReducer(state, action);
    }
  }
};
const persistConfig = {
  key: "root",
  version: 1,
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // 위에서 만든 persistReducer를 대입
  devTools: process.env.NODE_ENV !== 'production',
});

const makeStore: MakeStore<EnhancedStore> = () => store;
export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore, { debug: process.env.NODE_ENV !== 'production' });
export type RootState = ReturnType<typeof rootReducer>;
