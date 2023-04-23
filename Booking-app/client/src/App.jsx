import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import ProfilePage from './pages/ProfilePage'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './UserContext'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import LoginChoice from './pages/LoginChoice'
import LoginAdminPage from './Admin/LoginAdminPage'
import AdminPage from './Admin/AdminPage'
import AccountAdminPage from './Admin/AccountAdminPage'
import AllUserPage from './Admin/AllUserPage'
import AllPlacePage from './Admin/AllPlacePage'
import AllBookingPage from './Admin/AllBookingPage'
import NewUser from './Admin/NewUser'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'
import DetailsPlacePage from './Admin/DetailsPlacePage'
import ClientPage from './pages/ClientPage'
import AppRovePage from './Admin/AppRovePage'

axios.defaults.baseURL='https://g4-api.vercel.app/'
axios.defaults.withCredentials = true; 

function App() {
  return (
    <UserContextProvider>
     <Routes> 
      <Route  path='/' element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path='/loginChoice' element={<LoginChoice />} />
      <Route path='/loginChoice/login' element={<LoginPage />} />
      <Route path='/loginChoice/admin' element={<LoginAdminPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/account' element={<ProfilePage/>} />
      <Route path='/account/places' element={<PlacesPage/>} />
      <Route path='/account/client' element={<ClientPage/>} />
      <Route path='/account/places/new' element={<PlacesFormPage />} />
      <Route path='/account/places/:id' element={<PlacesFormPage />} />
      <Route path='/place/:id' element={<PlacePage />} />
      <Route path='/account/bookings' element={<BookingsPage/>} />
      <Route path='/account/bookings/:id' element={<BookingPage/>} />
       
      </Route>    
     </Routes>
     <Routes>
     <Route path='/adminPage' element={<AdminPage />}  />
     <Route path='accountAdmin' element={<AccountAdminPage/>} />
     <Route path='adminPage/alluser' element={<AllUserPage/>} />
     <Route path='/adminPage/allplace' element={<AllPlacePage />}  />
     <Route path='/adminPage/allbooking' element={<AllBookingPage />}  />
     <Route path='/adminpage/alluser/newuser' element={<NewUser/>} />
     <Route path='/details/:id' element={<DetailsPlacePage/>} />
     <Route path='/adminPage/approve' element={<AppRovePage />} />
     </Routes>
     </UserContextProvider>
     
    
  )
}

export default App
