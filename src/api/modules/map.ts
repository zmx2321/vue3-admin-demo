import { Map } from "@/api/interface/index";
import http, { myApi } from "@/api";

const base = `../${myApi}`

// 服务区点位
export const getServiceAreaPoint = () => {
    return http.get<Map.ServiceAreaPoint>(`${base}/map/point/getServiceAreaPoint`, {}, { loading: false });
};

// 浙江加油站点位
export const getGasStationPoint = () => {
    return http.get<Map.GasStationPoint>(`${base}/map/point/getGasStationPoint`, {}, { loading: false });
};