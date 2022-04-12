import { createAction,props} from "@ngrx/store";
import { User, UserModel } from "src/app/shared/models/user.model";


enum ActionTypes {
    LOGIN = '[Login Page] Login',
    LOGIN_START = '[Login Page] Login Start',
    LOGIN_SUCCESS= '[Login Page] Login Success',
    LOGIN_FAILURE= '[Login Page] Login Failure',
    GET_USER_START = '[Home Page] Get User Start',
    GET_USER_SUCCESS= '[Home Page] Get User Success',
    GET_USER_FAILURE= '[Home Page] Get User Failure',
}


export const loginStart=createAction(ActionTypes.LOGIN_START,props<{password:string,email:string}>())


export const loginSuccess=createAction(ActionTypes.LOGIN_SUCCESS,props<{loginResponse:any}>())


export const loginFailure=createAction(ActionTypes.LOGIN_FAILURE,props<{error:string}>())


export const getUserStart=createAction(ActionTypes.GET_USER_START)


export const getUserSuccess=createAction(ActionTypes.GET_USER_SUCCESS,props<{user:UserModel}>())


export const getUserFailure=createAction(ActionTypes.GET_USER_FAILURE,props<{error:any}>())

