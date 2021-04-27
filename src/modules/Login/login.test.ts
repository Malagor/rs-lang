import React from 'react';
import * as actions from './actions';
import { loginReducer, loginState } from './loginReducer';

export const user = {
  id: 'testId_123',
  name: 'TestName',
  email: 'testEmail',
  password: 'testPassword',
};

export const auth = {
  message: 'testMessage',
  token: 'testToken_123',
  refreshToken: 'testRefreshToken_123',
  userId: 'testId_123',
  name: 'TestName',
};

describe('Login state tests', () => {
  test('User data must be set', () => {
    const action = actions.setUser(user);
    const state = loginReducer(loginState, action);

    expect(state.user.id).toBe('testId_123');
    expect(state.user.name).not.toBeNull();
    expect(state.user.avatar).toBeFalsy();
  });

  test('Auth data must be set', () => {
    const action = actions.setAuth(auth);
    const state = loginReducer(loginState, action);

    expect(state.auth.userId).toBe('testId_123');
    expect(state.auth.token).toBeTruthy();
    expect(state.auth.message).toBe('testMessage');
  });

  test('AuthError must be set', () => {
    const action = actions.setAuthError(true);
    const state = loginReducer(loginState, action);

    expect(state.error).toBeTruthy();
  });

  test('AuthLoading must be set', () => {
    const action = actions.setAuthLoading(true);
    const state = loginReducer(loginState, action);

    expect(state.loading).toBeTruthy();
  });
});

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

describe('Login thunk test', () => {
  test('Thunk logOutUser must call dispatch', async () => {
    const thunk = actions.logOutUser();
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalled();
    expect(getStateMock).not.toBeCalled();
  });
});
