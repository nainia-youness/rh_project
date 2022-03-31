import { createAction,props} from "@ngrx/store";
import { AuthResponse } from "src/app/core/services/http/auth/auth.interface";



enum ActionTypes {
    LOGIN = '[Login Page] Login',
    LOGIN_START = '[Login Page] Login Start',
    LOGIN_SUCCESS= '[Login Page] Login Success',
    LOGIN_FAILURE= '[Login Page] Login Failure'
}


export const loginStart=createAction(ActionTypes.LOGIN_START,props<{password:string,email:string}>())


export const loginSuccess=createAction(ActionTypes.LOGIN_SUCCESS,props<{authResponse:AuthResponse}>())


export const loginFailure=createAction(ActionTypes.LOGIN_FAILURE,props<{error:string}>())

