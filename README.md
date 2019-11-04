# Shaka Player React

A React component for [Shaka Player](https://github.com/google/shaka-player), an open-source JavaScript library for adaptive media. It is highly recommended to check the official shaka documentation first.

## Installation

`npm install shaka-player-react --save`

`yarn add shaka-player-react`

## Usage

Before you start, make sure you load the CSS shipped with shaka-player.

```javascript
import React from 'react';
import ShakaPlayer from 'shaka-player-react';

function App() {
  return (
    <ShakaPlayer autoPlay src="https://streams.com/example.mpd" />
  );
}
```

The following `ShakaPlayer` properties are supported:

| Property | Description | Type |
|----------|---------------------------------------------------------------------------------------------|--------|
| src | The MPEG-DASH, or HLS media asset. Is provided to `shaka.Player.load` on mount or change. | String |
| autoPlay | Whether the asset should autoplay or not, directly bound to the `HTMLVideoElement` element. |  |
| width | Width of the player. |  |
| height | Height of the player. |  |

### Access shaka's player object.

The following is a more advanced setup to illustrate how you can integrate shaka's features in React.

```javascript
import React, { useRef, useEffect } from 'react';
import ShakaPlayer from 'shaka-player-react';

function App() {
  const controllerRef = useRef(null);
  
  useEffect(() => {
    const { 
      /** @type {shaka.Player} */ player, 
      /** @type {shaka.ui.Overlay} */ ui,
      /** @type {HTMLVideoElement} */ videoElement,
    } = controllerRef.current;
    
    async function loadAsset() {
      // Load an asset.
      await player.load('https://streams.com/example.mpd');
      
      // Trigger play.
      videoElement.play();
    }
    
    loadAsset();
  }, []);
  
  return (
    <ShakaPlayer ref={controllerRef} />
  );
}
```

Or check the [example](https://github.com/matvp91/shaka-player-react/tree/master/example) in this repository.
