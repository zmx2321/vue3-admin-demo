// 首页浙江
export const zheJiangIndexPopup = (popuData) => `<section class="popupp_wrap main_popupp">
    <ul>
      <li>${popuData.serverpart_name}</li>
      <li>${popuData.region_name}</li>
      <li>[ ${popuData.longitude}, ${popuData.latitude} ]</li>
    </ul>
  </section>`

// 浙江
export const zheJiangPopup = (popuData) => `<section class="popupp_wrap main_popupp">
    <ul>
      <li>${popuData.shop_name}</li>
      <li>${popuData.open_year}</li>
      <li>${popuData.adress}</li>
      <li>${popuData.employees} 人</li>
      <li>[ ${popuData.longitude}, ${popuData.latitude} ]</li>
    </ul>
  </section>`