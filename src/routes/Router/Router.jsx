import { createBrowserRouter } from "react-router";
import Root from "../../layouts/Root/Root";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddCourse from "../../components/AddCourse/AddCourse";
import ManageCourse from "../../components/ManageCourse/ManageCourse";
import EditCourse from "../../components/EditCourse/EditCourse";
import MyEnrolledCourse from "../../components/MyEnrolledCourse/MyEnrolledCourse";
import Course from "../../pages/Course/Course";
import Error from "../../components/Error/Error";
import About from "../../components/About/About";
import Faq from "../../components/Faq/Faq";
import Contact from "../../components/Contact/Contact";
import Term from "../../components/Term/Term";
import Dashboard from "../../components/Dashboard/Dashboard";
import Profile from "../../components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/courses",
        Component: Course,
      },
      {
        path: "/course-details/:id",
        Component: CourseDetails,
      },
      {
        path: "/addcourse",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/managecourse",
        element: (
          <PrivateRoute>
            <ManageCourse></ManageCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse></EditCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-enrolled-course",
        element: (
          <PrivateRoute>
            <MyEnrolledCourse></MyEnrolledCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/faq",
        Component: Faq,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/terms",
        Component: Term,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);

export default router;
