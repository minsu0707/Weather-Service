import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const API_KEY = "cc8fc50faefca217efc4aa07af3753ef";
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "get",
          url: url,
        });
        console.log(data);
        setResult(data);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="도시를 입력하세요"
          type="text"
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 2px solid black;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;

  .city {
    font-size: 24px;
  }
  .temperature {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: center;
    margin-top: 8px;
  }
`;
