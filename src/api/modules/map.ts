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

// 浙江点位
export const getZheJiangPoint = () => {
    return http.get<Map.ZheJiangPoint>(`${base}/map/point/getZheJiangPoint`, {}, { loading: false });
};

// 上海点位
export const getShangHaiPoint = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/getShangHaiPoint`, {}, { loading: false });
};

// 江苏点位
export const getJiangSuPoint = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/getJiangSuPoint`, {}, { loading: false });
};

// 新疆点位
export const getXinJiangPoint = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/getXinJiangPoint`, {}, { loading: false });
};

// 江西点位
export const getJiangXiPoint = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/getJiangXiPoint`, {}, { loading: false });
};

// 广西点位
export const getGuangXiPoint = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/getGuangXiPoint`, {}, { loading: false });
};

// 四川点位
export const getSiChuanPoint = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/getSiChuanPoint`, {}, { loading: false });
};

// 渲染宁波测试数据
export const renderNbTestData = () => {
    return http.get<Map.CityPoint>(`${base}/map/point/renderNbTestData`, {}, { loading: false });
};