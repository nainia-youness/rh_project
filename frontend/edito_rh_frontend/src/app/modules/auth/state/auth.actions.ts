import { createAction,props} from "@ngrx/store";
import { Login } from "./auth.interface";

export const loginChange=createAction('loginChange',props<{login:Login}>())
