import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import Error from './components/Error';
import App from './App';
import Login from './components/Login';
import Registration from './components/Registration';
import { ToastContainer } from 'react-toastify';
import Admindash from './components/Admindash';
import DoctorRegistration from './components/DoctorRegistration';
import Department from './components/Department';
import Appointment from './components/Appointmrnt';
import DoctorList from './components/DoctorList';
import AppointmentList from './components/AppointmentList';
import EditDoctor from './components/EditDoctor';
import RegisterStaff from './components/RegistrationStaff';
import StaffList from './components/StaffList';
import EditStaff from './components/EditStaff';
import RoomList from './components/RoomList';
import History from './components/History';
import HomeDoctorList from './components/HomeDoctorList';
import AddRoom from './components/AddRoom';


const router = createBrowserRouter([
{
    path:'/',
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Registration />
      },
      {
        path: "/admindash",
        element: <Admindash />
      },
      {
        path: "/doctorRegistration",
        element: <DoctorRegistration />
      },
      {
        path: "/department",
        element: <Department />
      },
      {
        path: "/appointmentsList",
        element: <AppointmentList />
      },
      {
        path: "/appointments",
        element: <Appointment />
      },
      {
        path:"/doctorlist",
        element: <DoctorList />
      },
      {
        path:"/doctoredit",
        element: <EditDoctor />
      },
      {
        path:"/registerStaff",
        element: <RegisterStaff />
      },
      {
        path:"/stafflist",
        element: <StaffList />
      },
      {
        path:"/editstaff",
        element: <EditStaff />
      },
      {
        path: "/roomList",
        element: <RoomList />
      },
      {
        path: "/history",
        element: <History />
      },
      {
        path: "/homeDoctorList",
        element: <HomeDoctorList />
      },
      {
        path: "/addRoom",
        element: <AddRoom />
      },
    ] 
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <div>
   <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  <RouterProvider router={router} />
  </div>
);
