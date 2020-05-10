import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { api } from "./api/pc_room";
const { kakao } = window;
class PopUp extends Component {
  constructor(props) {
    super(props);
  }
  map;
  markers = [];
  infowindows = [];
  componentDidMount() {
    var container = document.getElementById("myMap"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.6345882413846, 126.8327565232912), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    console.log(this.map);
  }
  render() {
    return (
      <div className="popup">
        <div id="myMap" style={{ width: "500px", height: "400px" }} />
      </div>
    );
  }
}

function App() {
  // const [data, setData] = useState({});
  // fetch("/data")
  //   .then((res) => res.json())
  //   .then((data) => setData(data));
  const onSubmit = async () => {
    const result = await api.getPCRoomInfo();
    console.log(result);
  };
  return (
    <div className="App">
      <PopUp />
      <div onClick={() => onSubmit()}>
        <span>검색</span>
      </div>
    </div>
  );
}

export default App;
