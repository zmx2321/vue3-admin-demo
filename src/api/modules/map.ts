import { Map } from "@/api/interface/index";
import http, { myApi } from "@/api";

const base = `../${myApi}`

// mock
export const getServiceAreaPoint = () => {
    return http.get<Map.ServiceAreaPoint>(`${base}/map/point/getServiceAreaPoint`, {}, { loading: false });
};