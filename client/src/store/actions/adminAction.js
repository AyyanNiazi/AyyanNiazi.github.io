import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  UPDATE_STATUS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS
} from "./types";

export const updateStatus = (data) => dispatch => {
    axios
      .post("/api/admin/updateStatus",data)
      .then((res) => {
        console.log('Status update ka response ===> ', res);
            dispatch({
                type: UPDATE_STATUS,
                payload: data
            })
    })
      .catch(err =>
        {
        console.log('Status update ka error===> ', err.message);
        //         return(
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    }
      );
  };

  export const addProduct = (data) => dispatch => {
    axios
      .post("/api/admin/addProduct",data)
      .then((res) => {
        console.log('Status update ka response ===> ', res);
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            })
    })
      .catch(err =>
        {
        console.log('Status update ka error===> ', err.message);
        //         return(
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    }
      );
  };

  export const productApprovals = (data) => dispatch => {
    axios
      .post("/api/admin/productApprovals",data)
      .then((res) => {
        console.log('Status update ka response ===> ', res);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data
            })
    })
      .catch(err =>
        {
        console.log('Status update ka error===> ', err.message);
        //         return(
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    }
      );
  };

  export const getProducts = (data) => dispatch => {
    axios.get('/api/products')
    .then(res => {
        console.log(res.data)
        dispatch({
            payload:res.data,
            type:GET_PRODUCTS,
        })
    })
    .catch(err => {
      dispatch({
        payload:err,
        type:GET_ERRORS,
    })
    })
  };

  

  

  
  