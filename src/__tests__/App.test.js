import { render } from '@testing-library/react';
import App from '../App';

const defaultProps = {};

function getWrapper(props={}) {
  return render(
    <App {...defaultProps} {...props} />
  )
}

describe('App Component', () => {

  describe('Snapshot testing', () => {
    it('Default snapshot', () => {
      const wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
