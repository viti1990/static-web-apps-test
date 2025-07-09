import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import counterReducer from '../slice/counterSlice';
import themeReducer from '../slice/themeSlice';
import usersReducer from '../slice/usersSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer, 
    theme: themeReducer, 
    users: usersReducer, 
  },
});

// Tipos para usar en hooks y componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
