import { render } from '@testing-library/react';
import GameControls from '../GameControls';

const defaultProps = {
  onGameReset: () => {},
  onRoll: () => {},
  onHold: () => {},
  dieValue: () => {},
  disabled: false,
  dieValue: 1
};

function getWrapper(props={}) {
  return render(
    <GameControls {...defaultProps} {...props} />
  );
}

describe('GameControls Component', () => {

  describe('Snapshot testing', () => {
    it('Default snapshot', () => {
      const { container } = getWrapper();
      expect(container).toMatchSnapshot();
    });

    it('Disabled snapshot', () => {
      const { container } = getWrapper({ disabled: true });
      expect(container).toMatchSnapshot();
    });

  });
});
