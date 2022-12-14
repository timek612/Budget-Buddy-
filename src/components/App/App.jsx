//This page is where everything lives. All components are imported here with client routes for navigation. 
//The motherboard for my app.
//All protected routes are routes that can only be accessed if the user is logged in.
//Otherwise they get redirected to the login page.
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import '@fontsource/roboto';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import NewExpense from '../NewExpense/NewExpense';
import IndividualExpenses from '../IndividualExpenses/IndividualExpenses';
import Chart from '../Chart/Chart';
import EditProfile from '../EditProfile/EditProfile';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';
import EditExpense from '../EditExpense/EditExpense'
import RecurringExpenses from '../RecurringExpenses/RecurringExpenses';
import WelcomePage from '../WelcomePage/WelcomePage';
import PersonalForm from '../PersonalForm/PersonalForm';
import UserSubmissionPage from '../UserSubmissionPage/UserSubmissionPage';
import RecurringSetup from '../RecurringSetup/RecurringSetup';
import ThankYou from '../ThankYou/ThankYou';
import PersonalInfoEdit from '../PersonalInfoEdit/PersonalInfoEdit';
import IncomeEdit from '../IncomeEdit/IncomeEdit';
import MuiSnackbar from '../MuiSnackBar';
import TechUsed from '../TechUsed/TechUsed';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // const individualExpenses = useSelector((store) => store.expenseReducer.expenseReducer)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' } );
  }, [dispatch]);

  

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <ProtectedRoute exact path="/newExpense">
            <NewExpense />
          </ProtectedRoute>

          <ProtectedRoute exact path="/individualExpenses">
            <IndividualExpenses />
          </ProtectedRoute>

          <ProtectedRoute exact path="/chart">
            <Chart />
          </ProtectedRoute>

          <ProtectedRoute exact path="/editProfile">
            <EditProfile />
          </ProtectedRoute>

          <ProtectedRoute path= '/expenseDetails'>
            <ExpenseDetails />
          </ProtectedRoute>

          <ProtectedRoute path="/editExpense">
            <EditExpense />
          </ProtectedRoute>

          <ProtectedRoute exact path="/recurringExpenses">
            <RecurringExpenses />
          </ProtectedRoute>

          <Route exact path="/welcomePage">
            <WelcomePage />
          </Route>

          <ProtectedRoute exact path="/personalForm">
            <PersonalForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/userSubmissionPage">
            <UserSubmissionPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/recurringSetup">
            <RecurringSetup />
          </ProtectedRoute>

          <ProtectedRoute exact path="/thankYou">
            <ThankYou />
          </ProtectedRoute>

          <Route exact path="/logTfOut">
            <LoginPage />
          </Route>

          <ProtectedRoute exact path="/incomeEdit">
            <IncomeEdit />
          </ProtectedRoute>

          <ProtectedRoute exact path="/personalInfoEdit">
            <PersonalInfoEdit />
          </ProtectedRoute>

          <ProtectedRoute exact path="/techUsed">
            <TechUsed />
          </ProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
