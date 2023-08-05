<template>
  <div ref="mapContainer" class="map-container"></div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { XYZ } from 'ol/source';
import { AMapJSAPILoader } from '@amap/amap-jsapi-loader';

export default {
  name: 'MapComponent',
  setup() {
    const mapContainer = ref(null);

    onMounted(() => {
      // 初始化AMap JS API Loader
      const loader = new AMapJSAPILoader({
        key: 'your_amap_api_key',
        version: '2.0',
        plugins: [],
      });

      // 加载AMap JS API
      loader.load().then(() => {
        // 创建高德地图图层
        const gaodeLayer = new Tile({
          source: new XYZ({
            url: 'https://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            crossOrigin: 'anonymous',
          }),
        });

        // 创建OpenLayers地图对象
        const map = new Map({
          layers: [gaodeLayer],
          target: mapContainer.value,
          view: new View({
            center: [0, 0], // 设置地图初始中心点
            zoom: 12, // 设置地图初始缩放级别
            projection: 'EPSG:3857', // 设置地图投影
          }),
          controls: [], // 可选：设置地图控件
        });

        // 在这里可以进行更多的地图操作，如添加图层、标注等

        // 设置地图的尺寸
        map.updateSize();
      });
    });

    return {
      mapContainer,
    };
  },
};
</script>
