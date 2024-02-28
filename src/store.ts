import { createStore } from "redux"
import { configureStore } from "@reduxjs/toolkit" 
import { boardReducer } from "./kanban-board/slices/boardSlice" 
import { gameReducer } from "./tic-tac-toe/reducers/game" 
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import logger from 'redux-logger'

const persistConfig = {
	key: "root",
	version: 1,
	storage,
}

export const store = configureStore({
	reducer: {
		"game": persistReducer(persistConfig, gameReducer),
		"board": persistReducer(persistConfig, boardReducer),
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		},
	}).concat(logger),
	// middleware: (getDefaultMiddleware) =>
 //    getDefaultMiddleware({
 //      serializableCheck: {
 //        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
 //      },
 //    }),
})

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)



