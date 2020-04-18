import {
    GET_ERRORS,
    UPDATE_STATUS,
    ADD_PRODUCT,
    GET_PRODUCTS,
  } from "../actions/types";
//   import axios from 'axios'
// import { getProducts } from "../actions/productsAction";
  const isEmpty = require("is-empty");
  const initialState = {
    status: false,
    statusData: undefined,
    products: undefined,
    loading:true,
  };

  
  export default  function(state = initialState, action) {
 
  console.log('get product ne bulaya h=======',action)
    switch (action.type) {
      case UPDATE_STATUS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
         statusData: action.payload,
         status: true,
        };
        case GET_ERRORS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
        statusData: action.payload,
         status: false,
        };

        case ADD_PRODUCT:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
         products: action.payload,
         loading: false,
        };
        case GET_PRODUCTS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
         products: action.payload,
         loading: false,
        };
      default:
        return state;
    }
  }

//   [{
//       jss:'',
//       ssd:''.
//       bhbjy:'',
//   }]