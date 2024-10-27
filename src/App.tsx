import './App.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor } from './state/store';
import AppRoutes from './routes';

const App =() => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>  
      {/* Ensures that the persisted state is restored before rendering the app, preventing UI from rendering before the state is available. */}
      {/* The loading={null} prop can be replaced with a spinner or some loading indicator while the state is being restored. */}
   {/* <Router>
    <Routes>
      <Route path='/' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/user' element={ 
        <ProtectedRoute role={'user'}>
           <UserDashboard/>
          </ProtectedRoute> } />
    </Routes>    
   </Router> */}
   <AppRoutes />
   </PersistGate>
   </Provider>
  )
}

export default App
