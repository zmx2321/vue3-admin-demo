import { ElDescriptions, ElDescriptionsItem } from "element-plus";

export const getPopupInnerDom = (popupObj) => {
    let popupData = null;

    if (popupObj.currentPopupData) {
        popupData = popupObj.currentPopupData;
    } else {
        popupData = popupObj.popupData;
    }

    return (
        <>
            <div class="common_popup_item">
                <ElDescriptions title={popupData.newCellName} border class="margin-top" column={2} size="small">
                    <ElDescriptionsItem label="cgi">{popupData.cgi}</ElDescriptionsItem>
                    <ElDescriptionsItem label="网络制式">{popupData.networkType}</ElDescriptionsItem>
                    <ElDescriptionsItem label="基站类型">{popupData.coverType}</ElDescriptionsItem>
                    <ElDescriptionsItem label="站号">{popupData.stationNo}</ElDescriptionsItem>
                    <ElDescriptionsItem label="频段">{popupData.workFrequency}</ElDescriptionsItem>
                    {popupData.antDirectionAngle && (
                        <ElDescriptionsItem label="方位角">{popupData.antDirectionAngle}°</ElDescriptionsItem>
                    )}
                    <ElDescriptionsItem label="经纬度">[{popupData.longitude}, {popupData.latitude}]</ElDescriptionsItem>
                </ElDescriptions >

                <span class='get_more' data-function="getMore">查看更多</span>
            </div>
        </>
    );
};

export const getPOIPopupInnerDom = (popupObj) => {
    // const positionFix = 3; // 坐标保留几位小数
    // <dd>[${popupObj.coordinate[0].toFixed(positionFix)}, ${popupObj.coordinate[1].toFixed(positionFix)}]</dd>
    // <dd>[${popupObj.coordinate[0]}, ${popupObj.coordinate[1]}]</dd>

    let popupData = null;

    if (popupObj.currentPopupData) {
        popupData = popupObj.currentPopupData;
    } else {
        popupData = popupObj.popupData;
    }

    return (
        <>
            <div class="common_popup_item">
                <h3>POI搜索结果</h3>
                <ul>
                    <li>
                        <dl>
                            <dt>地址:</dt>
                            <dd>{popupData.address}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>名称:</dt>
                            <dd>{popupData.name}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>经纬度:</dt>
                            <dd>[{popupData.lonlat}]</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </>
    );
};

export const getFeaturesPopupInnerDom = (popupObj, next) => {

    let currentDataList = []; // 数据集合
    const featuresPopupStr = popupObj.popupData.map(item => {
        let currentData = {}

        switch (item.get("type")) {
            case 'Marker':
                currentData = item.get('pointData')
                break;
            case 'Curve':
                currentData = item.get('curveData')
                break;
        }
        currentDataList.push(currentData)

        if (!currentData) {
            return
        }

        switch (currentData.networkType) {
            case '4g':
                currentData.newCellName = currentData.cellName
                break
            case '5g':
                currentData.newCellName = currentData.nrCellName
                break
        }

        const setFeaturesPopupStr = (newDom) => {
            return (
                <div class="feature_item" data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                    <span data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>[{currentData.networkType}] {currentData.newCellName}</span>
                    <dl data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                        <dt>cgi:</dt>
                        <dd>{currentData.cgi}</dd>
                    </dl>
                    {newDom ? newDom : ''}
                    <dl data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                        <dt>状态:</dt>
                        <dd>{currentData.cellLifeStatus}</dd>
                    </dl>
                </div>
            )
        }

        const setFeaturesPOIPopupStr = () => {
            return (
                <div class="feature_item" data-function='getSingleByFeatures' data-unique={`hotPointID:${currentData.hotPointID}`}>
                    <span data-function='getSingleByFeatures' data-unique={`hotPointID:${currentData.hotPointID}`}>[POI点] {currentData.address}</span>
                    <dl data-function='getSingleByFeatures' data-unique={`hotPointID:${currentData.hotPointID}`}>
                        <dt>名称:</dt>
                        <dd>{currentData.name}</dd>
                    </dl>
                    <dl data-function='getSingleByFeatures' data-unique={`hotPointID:${currentData.hotPointID}`}>
                        <dt>经纬度:</dt>
                        <dd>[{currentData.lonlat}]</dd>
                    </dl>
                </div>
            )
        }

        if (!item.get('businessType') && !item.get('drawType')) {
            if (popupObj.type.length > 3) {
                return setFeaturesPopupStr((
                    <dl data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                        <dt>基站类型:</dt>
                        <dd>{currentData.coverType} - [{item.get("type") === 'Marker' ? '标注点' : '扇区'}]</dd>
                    </dl>
                ))
            } else {
                return setFeaturesPopupStr()
            }
        }

        if (item.get('businessType') === 'POIMarker') {
            return setFeaturesPOIPopupStr()
        }
    })

    next(currentDataList)  // 输出业务数据

    return (
        <>
            <div class="common_features_popup_item">
                {
                    <ul class="features_top">
                        <li>{popupObj.name}</li>
                        <li>类型: {popupObj.type}</li>
                    </ul>
                }
                {featuresPopupStr}
            </div>
        </>
    );
};

export const getNoFeaturesPopupInnerDom = (popupObj, next) => {
    let pointNum = 0;
    let curveNum = 0;

    const featuresPopupStr = popupObj.popupData.map(currentData => {
        switch (currentData.coverType) {
            case "室内":
                pointNum += 1;
                break;
            case "室外":
                curveNum += 1;
                break;
        }
        switch (currentData.networkType) {
            case "4g":
                currentData.newCellName = currentData.cellName;
                break;
            case "5g":
                currentData.newCellName = currentData.nrCellName;
                break;
        }

        return (
            <div class="feature_item" data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                <span data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>[{currentData.networkType}] {currentData.newCellName}</span>
                <dl data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                    <dt>cgi:</dt>
                    <dd>{currentData.cgi}</dd>
                </dl>
                <dl data-function='getSingleByFeatures' data-unique={`cgi:${currentData.cgi}`}>
                    <dt>状态:</dt>
                    <dd>{currentData.cellLifeStatus}</dd>
                </dl>
            </div>
        )
    })

    next(popupObj.popupData); // 输出业务数据

    return (
        <>
            <div class="common_features_popup_item">
                {
                    <ul class="features_top">
                        <li>{popupObj.popupData.length} 个要素</li>
                        <li>点要素: {pointNum}</li>
                        <li>扇区要素: {curveNum}</li>
                    </ul>
                }
                {featuresPopupStr}
            </div>
        </>
    );
};
