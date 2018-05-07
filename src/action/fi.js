// @flow
import debounce from 'debounce';
import { key } from 'redux-store';
import type { Dispatch, GetState, ThunkAction } from 'model/redux';
import type { SimpleAction, PayloadAction } from 'utils/react-redux';
import type { State, FormInputs } from 'model/state';
import { get, set } from 'service/user-setting';

const write = debounce(state => {
  set(key, state);
}, 1000);

export const CHANGE_VALUE: 'fi/change-value' = 'fi/change-value';
type ChangeFieldAction = PayloadAction<typeof CHANGE_VALUE, $Shape<FormInputs>>;
export function changeValue(payload: $Shape<FormInputs>): ThunkAction {
  return function(dispatch: Dispatch, getState: GetState) {
    const action: ChangeFieldAction = { type: CHANGE_VALUE, payload };

    dispatch(action);
    return write(getState());
  };
}

export const LOAD_USER_DATA: 'fi/load-user-data' = 'fi/load-user-data';
export const LOADED_USER_DATA: 'fi/loaded-user-data' = 'fi/loaded-user-data';
type LoadUserDataAction = SimpleAction<typeof LOAD_USER_DATA>;
type LoadedUserDataAction = PayloadAction<typeof LOADED_USER_DATA, State>;
export function loadUserData(): ThunkAction {
  return function(dispatch: Dispatch) {
    dispatch({ type: LOAD_USER_DATA });

    return get(key).then((userData: State) =>
      dispatch({ type: LOADED_USER_DATA, payload: userData }),
    );
  };
}

export type FIAction =
  | ChangeFieldAction
  | LoadUserDataAction
  | LoadedUserDataAction;
