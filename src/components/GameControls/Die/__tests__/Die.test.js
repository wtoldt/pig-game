import { render } from '@testing-library/react';
import Die from '../Die';

const defaultProps = {
  value: 1
};

function getWrapper(props={}) {
  return render(
    <Die {...defaultProps} {...props} />
  );
}

describe('Die Component', () => {

  describe('Snapshot testing', () => {
    it('Default snapshot', () => {
      const { container } = getWrapper();
      expect(container).toMatchSnapshot();
    });

    //test 1-6
    it.each([1, 2, 3, 4, 5, 6])('%i snapshot test', (value) => {
      const { container } = getWrapper({ value });
      expect(container).toMatchSnapshot();
    });

  });
});
