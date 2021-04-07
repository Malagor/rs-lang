import React from 'react';
import { GameItem } from './GameItem';
import { create } from 'react-test-renderer';

describe('GameItem component test', () => {
  test('Name must be in props', () => {
    const component = create(<GameItem name="AudioChallenge" img="url" />);
    const instance = component.root;

    expect(instance.props.status).toBe('AudioChallenge');
  });
});
