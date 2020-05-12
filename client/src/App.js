import React, { useState, Component, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { api } from "./api/pc_room";
const { kakao } = window;

// Kakao 맵을 보여줍니다.
const PopUp = (props) => {
  const { pcInfo, cafeInfo } = props;
  console.log(typeof pcInfo);
  console.log(Object.keys(pcInfo).length);
  console.log(pcInfo);
  let positions = [];
  for (let i = 0; i < Object.keys(pcInfo).length; i++) {
    positions.push({
      title: pcInfo[i].name,
      type: "pc",
      latlng: new kakao.maps.LatLng(
        parseFloat(pcInfo[i].y),
        parseFloat(pcInfo[i].x)
      ),
    });
  }
  // cafe 정보를 positions 에 저장합니다.
  for (let i = 0; i < Object.keys(cafeInfo).length; i++) {
    positions.push({
      title: cafeInfo[i].name,
      type: "cafe",
      latlng: new kakao.maps.LatLng(
        parseFloat(cafeInfo[i].y),
        parseFloat(cafeInfo[i].x)
      ),
    });
  }
  console.log(positions);
  const [currentLat, setCurrentLat] = useState(33.450701);
  const [currentLng, setCurrentLng] = useState(126.570667);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setCurrentLat(position.coords.latitude);
      setCurrentLng(position.coords.longitude);
    });
  }
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      // center: new kakao.maps.LatLng(currentLat, currentLng), //지도의 중심좌표.
      center: new kakao.maps.LatLng(37.6534912, 126.838014), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);

    // const markerPosition = new kakao.maps.LatLng(37.6534912, 126.838014);
    for (let i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다

      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let marker;
      if (positions[i].type === "pc") {
        marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].latlng,
          title: positions[i].title,
          clickable: true,
          image: markerImage,
        });
      } else {
        marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].latlng,
          title: positions[i].title,
          clickable: true,
        });
      }
      let infowindow = new kakao.maps.InfoWindow({
        content: `<div>${positions[i].title}</div>`,
        removable: true,
      });

      kakao.maps.event.addListener(
        marker,
        "click",
        makeOverListener(map, marker, infowindow)
      );
    }

    // 마커에 클릭 이벤트를 생성한다.
    function makeOverListener(map, marker, infowindow) {
      return function () {
        // 마커에 뷰가 열려있는지를 체크한다. ( 직접 찾아낸 데이터 )
        if (!infowindow.If.isConnected) {
          infowindow.open(map, marker);
        } else {
          infowindow.close();
        }
      };
    }
  });
  return (
    <div className="popup">
      <div id="myMap" style={{ width: "375px", height: "700px" }} />
    </div>
  );
};
// class PopUp extends Component {
//   constructor(props) {
//     super(props);
//   }
//   map;
//   markers = [];
//   infowindows = [];
//   componentDidMount() {
//     var container = document.getElementById("myMap"); //지도를 담을 영역의 DOM 레퍼런스
//     var options = {
//       //지도를 생성할 때 필요한 기본 옵션
//       center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//       level: 4, //지도의 레벨(확대, 축소 정도)
//     };
//     this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//     var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
//     var marker = new kakao.maps.Marker({
//       position: markerPosition,
//     });
//     // 마커가 지도 위에 표시되도록 설정합니다
//     marker.setMap(this.map);
//     console.log(this.map);
//   }
//   render() {
//     return (
//       <div className="popup">
//         <div id="myMap" style={{ width: "375px", height: "700px" }} />
//       </div>
//     );
//   }
// }

function App() {
  const [pcInfo, setPcInfo] = useState({});
  const [cafeInfo, setCafeInfo] = useState({});
  // const [data, setData] = useState({});
  // fetch("/data")
  //   .then((res) => res.json())
  //   .then((data) => setData(data));
  // getLocation();
  const onSubmit = async () => {
    // const result = await api.getPCRoomInfo();
    setPcInfo(await api.getInfo());
    setCafeInfo(await api.getCafeInfo());
    if (pcInfo) console.log(pcInfo);
    if (cafeInfo) console.log(cafeInfo);
  };
  return (
    <div className="App">
      <PopUp pcInfo={pcInfo} cafeInfo={cafeInfo} />
      <div onClick={() => onSubmit()}>
        <span>검색</span>
      </div>
    </div>
  );
}

export default App;
