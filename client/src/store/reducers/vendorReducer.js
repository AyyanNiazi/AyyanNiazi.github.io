import {
    STEP_ONE,
    STEP_TWO,
    STEP_THREE,
    GET_ERRORS,
    STORE_INFO,
    GET_PRODUCTS,
    EDIT_PRODUCT,
    UPDATE_PRODUCT,
  } from "../actions/types";
  import axios from 'axios'
import { getProducts } from "../actions/productsAction";
  const isEmpty = require("is-empty");
  const initialState = {
    dataForRegistration: undefined,
    step: 'stepOne',
    shifter: '',
    tshifter: '',
    registrationComplete: false,
    storeInfo:undefined,
    products:undefined,
    editProduct:undefined,
    updateProducts:undefined,
  };

  
  export default  function(state = initialState, action) {
 
  console.log('get product ne bulaya h=======',action)
    switch (action.type) {
      case STEP_ONE:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
          step: 'stepOne',
          dataForRegistration: action.payload,
          shifter: 'stepTwo'
        };
        case STEP_TWO:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
        //   step: 'stepTwo',
          dataForRegistration: action.payload,
          tshifter: 'stepThree',
          shifter: 'stepTwo',
        };
        case STEP_THREE:
            return {
              ...state,
            //   isAuthenticated: !isEmpty(action.payload),
            //   step: 'stepThree',
              dataForRegistration: action.payload,
              tshifter: 'stepThree',
              registrationComplete: true,
            };
 
        case GET_ERRORS:
            return {
              ...state,
              error: action.payload
            };
       case STORE_INFO:
              return {
                ...state,
                storeInfo: action.payload
              };
      case GET_PRODUCTS:
                return {
                  ...state,
                  products: action.payload
                };
      case UPDATE_PRODUCT:
                  return {
                    ...state,
                updateProducts: action.payload
                };
      case EDIT_PRODUCT:
        return {
          ...state,
          editProduct: action.payload
        };
      default:
        return state;
    };
  }

//   [{
//       jss:'',
//       ssd:''.
//       bhbjy:'',
//   }]