import React from 'react';
import { mount } from '@cypress/react';
import App from '../../src/Containers/Home/index';

it('renders learn react link', () => {
  mount(<App />);
  cy.get('h3').contains('Ingredients on hand');
});