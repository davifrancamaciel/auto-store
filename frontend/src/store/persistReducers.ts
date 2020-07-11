import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export default (reducers:any) => {
  const persistedReducer = persistReducer(
    {
      key: 'gestaoflexts',
      storage,
      whitelist: ['auth','user']
    },
    reducers
  );

  return persistedReducer;
};
