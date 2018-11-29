import React from 'react';
import ReactDOM from 'react-dom';
import ThemedApp from './ThemedApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThemedApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
