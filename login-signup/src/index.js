import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blogpage from './Components/Pages/Blogpage';
import Contact from './Components/Pages/Contact';
import Dashboard from './Components/Pages/Dashboard';
import SignupPage from './Components/Pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminPage from './Components/Pages/Adminpage';
import AdminDashboard from './Components/Pages/AdminDashboard';
import UsersList from './Components/Pages/UsersList';
import AddBook from './Components/Pages/AddBook';
import DeleteBook from './Components/Pages/DeleteBook';
import Cart from './Components/Pages/Cart';
import Profile from './Components/Pages/Profile';
import MainPage from './Components/Pages/MainPage';
import RatingsPage from './Components/Pages/RatingsPage';
import Feepay from './Components/Pages/Feepay';
import SuccessPage from './Components/Pages/SuccessPage';
import FailurePage from './Components/Pages/FailurePage';
import Borrowpage from './Components/Pages/Borrowpage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <MainPage/>,
  },
  {
    path: "blog",
    element: <Blogpage/>,
  },
  {
    path: "ratingspage",
    element: <RatingsPage/>,
  },
  {
    path: "Contact",
    element: <Contact/>,
  },
  {
    path: "Dashboard",
    element: <Dashboard/>,
  },
  {
    path: "Signup",
    element: <SignupPage/>,
  },
  {
    path: "admin",
    element: <AdminPage/>,
  },
  {
    path: "admindashboard",
    element: <AdminDashboard/>,
  },
  {
    path: "register_table",
    element: <UsersList/>,
  },
  {
    path: "course_books",
    element: <AddBook/>,
  },
  {
    path: "delete_books",
    element: <DeleteBook/>,
  },
  {
    path: "signuppage",
    element: <SignupPage/>,
  },
  {
    path: "cart",
    element: <Cart/>,
  },
  {
    path: "profile",
    element: <Profile/>,
  },
  {
    path: "feepay",
    element: <Feepay/>,
  },
  {
    path: "success",
    element: <SuccessPage/>,
  },
  {
    path: "fail",
    element: <FailurePage/>,
  },
  {
    path: "borrowpage",
    element: <Borrowpage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
