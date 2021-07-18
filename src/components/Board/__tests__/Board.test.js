import { render } from '@testing-library/react';
import Board from '../Board';

const defaultProps = {};

function getWrapper(props={}, children = 'foo') {
  return render(
    <Board {...defaultProps} {...props}>
      {children}
    </Board>
  );
}

describe('Board Component', () => {

  describe('Snapshot testing', () => {
    it('Default snapshot', () => {
      const { container } = getWrapper();
      expect(container).toMatchSnapshot();
    });
  });
});
