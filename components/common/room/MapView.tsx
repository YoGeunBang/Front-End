/* global kakao */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';

interface MapProps {
  _lat?: number;
  _lng?: number;
  address?: string;
  setShowMap: any;
}

const Map = ({ _lat, _lng, setShowMap, address }: MapProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1f278e30eee8fe627379a157074b51f3&libraries=services&autoload=false`;
    document.head.appendChild(mapScript);

    // 로드뷰 컨테이너
    var RV_container = document.getElementById('roadview');
    let container = document.getElementById('map');


    const markerSetMap = (_lat: number|undefined, _lng: number|undefined) => {
      //마커가 표시 될 위치
      let markerPosition = new window.kakao.maps.LatLng(_lat, _lng);
      console.log(markerPosition);
      // 좌표 근처 가장 가까운 파노라마 ID (panoID)를 찾음
      // panoID는 로드뷰 촬영장소(좌표)에 부여된 ID로 유추됨
      var roadviewClient = new window.kakao.maps.RoadviewClient(),
        roadview = new window.kakao.maps.Roadview(RV_container);
      roadviewClient.getNearestPanoId(markerPosition, 50, function (panoId: any) {
        roadview.setPanoId(panoId, markerPosition);
      });

      let options = {
        center: new window.kakao.maps.LatLng(_lat, _lng),
        level: 5,
      };

      let map = new window.kakao.maps.Map(container, options);

      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      // 마커를 지도 위에 표시
      marker.setMap(map);
    };
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 위도 경도 정보가 없을 경우
        if (!_lat) {
          let lat: number|undefined = _lat;
          let lng: number|undefined = _lng;
          var geocoder = new window.kakao.maps.services.Geocoder();
          // 주소를 통한 검색 메서드
          geocoder.addressSearch(address, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              lat = Number(result[0].y);
              lng = Number(result[0].x);
              markerSetMap(lat, lng);
            }
          });
        }
        // 위도 경도 정보가 있을 경우
        else {
          markerSetMap(_lat, _lng);
        }
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [_lat, _lng]);

  return (
    <MapViewEl>
      <div className="map-bar">
        <h1>지도</h1>
        <button className="close-btn">
          <GrFormClose
            size="30"
            onClick={() => {
              setShowMap(false);
            }}
          />
        </button>
      </div>
      <div className="map-area">
        <div id="map"></div>
        <div id="roadview"></div>
      </div>
    </MapViewEl>
  );
};

const MapViewEl = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  .map-bar {
    background-color: #eee;
    position: fixed;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: right;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #e5e5ec;

    @media screen and (max-width: 480px) {
      padding: 0;
    }
    h1 {
      position: absolute;
      display: block;
      flex: none;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
    }
    .close-btn {
      position: relative;
      z-index: 1;
      margin-right: 20px;
      border: none;
      background-color: transparent;
      path {
        stroke: #000;
      }
    }
  }
  .map-area {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 48px;
    @media screen and (max-width: 480px) {
      padding: 48px 0 0 0;
      flex-direction: column;
    }
    #map {
      position: relative;
      width: 100%;
      height: 100%;
    }
    #roadview {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;
export default Map;
