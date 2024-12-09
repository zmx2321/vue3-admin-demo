import { Test } from "@/api/interface/index";
import http, { zmxApi, myTestApi } from "@/api";

// mock
export const getMockTest = () => {
    return http.get<Test.MockTest>(`../${zmxApi}/mock`);
};

// myTestApi
export const getHelloServlet0 = () => {
    return http.get<Test.MockTest>(`../${myTestApi}/HelloJavaWeb02_war_exploded/hello-servlet`);
};

export const getHelloServlet = () => {
    return http.get<Test.MockTest>(`../${myTestApi}/hello-servlet`);
};