import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { activeCardReducer } from './activeCard/activeCardSlice'
import { notification } from 'antd'
import { notificationsReducer } from './notifications/notificationsSlice'

const rootPersistConfig = {
  key: 'root', //key của cái persist do chúng ta chỉ định,cử để mặc định là root
  storage: storage, //Biến storage ở trên - lưu vào localstorage
  whitelist: ['user'] //định nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
  //blacklist: ['user'] //chỉ định các slice KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
}
//Combine các reducers trong dự án của chúng ta ở đây
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer,
  notifications: notificationsReducer
})

//Thực hiện persist Reducer
const persistedreducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedreducers,
  //Fix warning error when implement redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})