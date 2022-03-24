import renderer from 'react-test-renderer';
import React from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import ShakaPlayer from '../src';

jest.mock('shaka-player/dist/shaka-player.ui');

describe('implementation', () => {
  test('supports autoPlay, width & height', () => {
    const component = renderer.create(
      <ShakaPlayer autoPlay width={16} height={9} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('sets up shaka with the UI library', () => {
    const component = renderer.create(<ShakaPlayer />);
    expect(shaka.Player).toHaveBeenCalled();
    expect(shaka.ui.Overlay).toHaveBeenCalled();
  });

  test('exposes player & ui api through ref', () => {
    let ref;
    function Wrapper() {
      ref = React.useRef();
      return <ShakaPlayer ref={ref} />;
    }

    const component = renderer.create(<Wrapper />);

    expect(Object.keys(ref.current)).toEqual(['player', 'ui', 'videoElement']);
  });
});
