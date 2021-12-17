import { USER_LOGIN, USER_LOGOUT, PET_ADD, PET_REMOVE, PETS_UPDATE } from "./actions";

const petReducer = (state, action) => {
  switch(action.type){
    case PET_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case PET_REMOVE:
      return {
        ...state,
        data: state.data.filter(pet => pet.id !== action.payload)
      }
    case PETS_UPDATE: 
        return {
          ...state,
          data: action.payload
        }
    default:
      return state
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        user: null
      }
    default:
      return state
  }
}

export { authReducer, petReducer };