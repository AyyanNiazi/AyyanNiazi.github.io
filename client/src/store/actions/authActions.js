import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  console.log('Register Action-----')
  axios
    .post("/api/register", userData)
    .then((res) => {history.push("/login")
                    console.log("Register Success", res)}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const registerVendor = (userData, history) => dispatch => {
  console.log('Register Action-----')
  axios
    .post("/api/vendor/signup", userData)
    .then((res) => {history.push("/vendor/login")
                    console.log("Vendor ka Register Success", res)}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  console.log('Login Action-----');

  axios
    .post("/api/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      console.log("Login Success", res)
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      {console.log("Login Err",err.message)
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};
//vendor ka login
export const loginVendor = (userData,history) => dispatch => {
  console.log('Login Action-----');

  axios
    .post("/api/vendor/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      console.log("Login Success", res)
      const { token } = res.data;
      localStorage.setItem("vendorToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/vendor/landingPage")
    })
    .catch((err) =>
      {console.log("Login Err",err.message)
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  console.log("setCurrentUser: ",decoded)
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const gmailLogin = (token) => dispatch => {
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));

}
