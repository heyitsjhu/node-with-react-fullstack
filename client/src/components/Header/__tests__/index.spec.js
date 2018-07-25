import React from 'react';
import Header from '../index';
import * as renderer from 'react-test-renderer';

describe('<Header />', () => {
  it('renders and matches our snapshot', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
