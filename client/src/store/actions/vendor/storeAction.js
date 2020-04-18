import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  STEP_ONE,
  STEP_TWO,
  STEP_THREE,
  STORE_INFO,
  GET_PRODUCTS,
  EDIT_PRODUCT,
  UPDATE_PRODUCT,
} from "../types";

let log = console.log
export const stepOne = (data) => dispatch => {
    // history.push()
    dispatch({
        type: STEP_ONE,
        payload: data
      })
 
  }

  export const stepTwo = (data) => dispatch => {
    // history.push()
    dispatch({
        type: STEP_TWO,
        payload: data
      })
 
  }

  export const stepThree = (data,) => dispatch => {
    axios
    .post('/api/vendor/createStore',data)
    .then(res => {
     
      dispatch({
        type: STEP_THREE,
        payload: res.data
      })
      log('proceed ka data ', res.data)
    })
    .catch(err => {
      log('proceedsy error......., ', err.message)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
 
  }

  export const storeInfo = (data) => dispatch => {
    // axios
    // .get('/api/vendor/createStore',data)
    // .then(res => {
     
      dispatch({
        type: STORE_INFO,
        payload: data
      })

      log('proceed ka data ',data)
    // })
    // .catch(err => {
    //   log('proceedsy error......., ', err.message)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err
      // })
    // })
 
}

export const getVendorProducts = (data,) => dispatch => {
  axios
  .get(`/api/vendor/getProducts/${data}`)
  .then(res => {
   
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
    log('Vendor products ka data ', res.data)
  })
  .catch(err => {
    log('proceedsy error......., ', err.message)
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  })

}

export const editProduct = data => dispatch => {
  dispatch({
    payload:data,
    type:EDIT_PRODUCT
  })
}

export const updateProduct = (data) => dispatch => {
  axios.post('/api/vendor/updateProduct',data)
  .then(res => {
      console.log(res.data)
      // history.push('/vendor/product')
      dispatch({
          payload:res.data,
          type:UPDATE_PRODUCT,
      })
  })
  .catch(err => {
    dispatch({
      payload:err,
      type:GET_ERRORS,
  })
  })
};


  