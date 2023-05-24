import {HttpMethodTypes} from "../types/Enums";

export default {
    login : {
        url : '/auth/token',
        method: HttpMethodTypes.POST
    },
    logout:{
        url : '/auth/token/logout',
        method: HttpMethodTypes.POST
    },
    add_user:{
        url : 'users/',
        method: HttpMethodTypes.POST
    },
    find_user : {
        url : 'users/:id',
        method: HttpMethodTypes.GET
    },
    update_user : {
        url : 'users/:id',
        method: HttpMethodTypes.PUT
    },
    all_users : {
        url : 'users/',
        method: HttpMethodTypes.GET
    },
    delete_user : {
        url : 'users/:id',
        method: HttpMethodTypes.DELETE
    },
    add_protocol : {
        url : 'protocols/test',
        method: HttpMethodTypes.POST
    },
    add_project : {
        url : 'project/',
        method: HttpMethodTypes.POST
    },
    all_projects : {
        url : 'project/',
        method: HttpMethodTypes.GET
    } ,
    delete_project : {
        url : 'project/:id',
        method: HttpMethodTypes.DELETE
    },
    find_project : {
        url : 'project/:id',
        method: HttpMethodTypes.GET
    },
}
