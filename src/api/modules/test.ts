import { Test } from "@/api/interface/index";
import http, { myApi } from "@/api";

// mock
export const getMockTest = () => {
    return http.get<Test.MockTest>(`../${myApi}/mock`);
};