import React from 'react';
import dynamic from 'next/dynamic';

const ShakaPlayer = dynamic(() => import('shaka-player-react'), {
  ssr: false,
});

export default function Index() {
  return (
    <div>
      <ShakaPlayer
        autoPlay
        src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
      />
    </div>
  );
}
