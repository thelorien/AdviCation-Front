import { environment } from "src/environments/environment";

const URL_BASE = environment.urlBase;

export class Endpoint {
    constructor(public baseUrl: string, public path: string){}
}

export const ENDPOINTS = {
    login: new Endpoint(URL_BASE, "auth/login"),
    register: new Endpoint(URL_BASE, "auth/register"),
    userName: new Endpoint(URL_BASE, "auth/userName"),
    getAllAdvicesFromStudent:new Endpoint(URL_BASE,"advice/get-all-advices"),
    getAdvicesAvailables:new Endpoint(URL_BASE,"advice/get-advice-schedule"),
    setAdvice:new Endpoint(URL_BASE,"advice/set-advice"),
    getSubjects:new Endpoint(URL_BASE,"subject/get-subjects"),
    addAvice:new Endpoint(URL_BASE,"advice/add-advice"),
    getAdvicesFromTeacher:new Endpoint(URL_BASE,"advice/get-all-advices-teacher/{id}"),
    deleteAdvice:new Endpoint(URL_BASE,"advice/delete-advice"),
    getAllUsers:new Endpoint(URL_BASE,"user/get-all-users"),
    updateRol:new Endpoint(URL_BASE,"user/update-rol"),
    addSubject:new Endpoint(URL_BASE,"subject/add-subject"),
    reports:new Endpoint(URL_BASE,"/advice/reports"),
    getAdvicesFromStudent:new Endpoint(URL_BASE,"advice/get-all-advices-student/{id}"),
    deleteAdviceStudent:new Endpoint(URL_BASE,"advice/delete-advice-student"),
}
