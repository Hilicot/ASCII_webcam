import { useEffect } from 'react';

//const ascii_string = ["$", "$", "$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z" ,"O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "\\", "|", "(", ")", "1", "{", "}", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", "\"", "^", "`", "'", ".", " ", " ", " "," ", " ", " ", " ", " ", " "];
const ascii_string = "@%#8*+=-:. ";
const size_factor = 2;

function ASCIIWebcam(props) {
  useEffect(() => { updateText(props.text, props.setText).then(setTimeout(() => { updateText(props.text, props.setText) }, 300)); }, []);
  return (<>
    <ASCIIGrid text={props.text} />
    <video autoPlay={true} id="videoElement"></video>
    <canvas></canvas>
  </>)
};

async function updateText(text, setText) {
  let video = document.querySelector("#videoElement");
  let canvas = document.querySelector("canvas");
  const ctx = canvas.getContext('2d');
  if (video.videoHeight > 0) {
    canvas.height = 48*size_factor;
    canvas.width = 64*size_factor;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let _text = "";
    for (let i = 0, k = 0; i < canvas.height; i++) {
      for (let j = 0; j < canvas.width; j++, k += 4) {
        let bright = (frame.data[k] + frame.data[k + 1] + frame.data[k + 2]) / 3.0;
        let char = ascii_string[Math.floor(bright/256*ascii_string.length)];
        _text = _text + char;
      }
      _text = _text + '\n';
    }
    setText(_text);
  }
  setTimeout(() => { updateText(text, setText) }, 30);
}

function ASCIIGrid(props) {
  return (<div className='text'>{props.text}</div>)
}


export default ASCIIWebcam;