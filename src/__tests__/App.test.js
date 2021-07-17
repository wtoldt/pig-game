import { render, screen } from '@testing-library/react';
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

    it('Has text pig game', () => {
      //assemble
      const wrapper = getWrapper();
      expect(screen.getByText(/pig game/i)).toBeInTheDocument();
    });
  });
});
