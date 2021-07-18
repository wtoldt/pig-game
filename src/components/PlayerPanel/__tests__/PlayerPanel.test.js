import { render } from '@testing-library/react';
import PlayerPanel from '../PlayerPanel';

const defaultProps = {
  player: {
    name: 'P9',
    active: false,
    left: true,
    right: false
  }
};

function getWrapper(props={}) {
  return render(
    <PlayerPanel {...defaultProps} {...props} />
  );
}

describe('PlayerPanel Component', () => {

  describe('Snapshot testing', () => {
    it('Default snapshot', () => {
      const { container } = getWrapper();
      expect(container).toMatchSnapshot();
    });
  });
});
