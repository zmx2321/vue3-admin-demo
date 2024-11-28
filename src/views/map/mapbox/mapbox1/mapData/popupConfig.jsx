import { ElDescriptions, ElDescriptionsItem } from "element-plus";

// 首页浙江
export const zheJiangIndexPopup = (popupData) => {
  return (
    <section class="zhe_jiang_index_popupp">
      <ElDescriptions title={`坐标: [ ${popupData.longitude}, ${popupData.latitude} ]`} border column={1} class="margin-top" size="small">
        <ElDescriptionsItem label="区域">{popupData.region_name}</ElDescriptionsItem>
        <ElDescriptionsItem label="服务区名称">{popupData.serverpart_name}</ElDescriptionsItem>
      </ElDescriptions>
    </section >
  )
}

// 浙江
export const zheJiangPopup = (popupData) => {
  return (
    <section class="zhe_jiang_popupp">
      <ElDescriptions title={`坐标: [ ${popupData.longitude}, ${popupData.latitude} ]`} border column={1} class="margin-top" size="small">
        <ElDescriptionsItem label="店铺名称">{popupData.shop_name}</ElDescriptionsItem>
        <ElDescriptionsItem label="人数">{popupData.employees}人</ElDescriptionsItem>
        <ElDescriptionsItem label="开业年份">{popupData.open_year}</ElDescriptionsItem>
        <ElDescriptionsItem label="地址">{popupData.adress}</ElDescriptionsItem>
      </ElDescriptions>
    </section >
  )
}