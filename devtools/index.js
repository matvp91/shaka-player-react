import React from 'react';
import ReactDOM from 'react-dom';
import ShakaPlayer from 'shaka-player-react';

const STREAMS = [
  {
    name: 'Angel One MPEG-DASH',
    src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
  },
  {
    name: 'Big Buck Bunny HLS',
    src:
      'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
  },
];

function App() {
  const [show, setShow] = React.useState(false);

  function onToggle() {
    setShow(!show);
  }

  const [src, setSrc] = React.useState(STREAMS[0].src);

  function onSelectSrc(event) {
    setSrc(event.target.value);
  }

  return (
    <div>
      <div>
        <button onClick={onToggle}>{show ? 'Hide' : 'Show'}</button>
      </div>
      <div>
        <select value={src} onChange={onSelectSrc}>
          {STREAMS.map(stream => (
            <option key={stream.src} value={stream.src}>
              {stream.name}
            </option>
          ))}
        </select>
      </div>
      {show && <ShakaPlayer autoPlay src={src} />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
