import './App.css';
import ASCIIWebcam from './components/ASCIIWebcam.js';
import { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState("0000");
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(function (w_stream) {
          let video = document.querySelector("#videoElement");
          video.srcObject = w_stream;
          setText("111111111");
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
  }, []);
  return (
    <div className="App">
      <p>
        ASCII webcam
      </p>
      <ASCIIWebcam text={text} setText={setText} />
    </div>
  );
}

export default App;
