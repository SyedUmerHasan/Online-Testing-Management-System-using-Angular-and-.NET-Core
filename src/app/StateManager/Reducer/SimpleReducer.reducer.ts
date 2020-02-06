import { Action } from '@ngrx/store';

export function simpleReducer(state: string = 'Welcome', action: Action) {
  switch (action.type) {
    case 'SPANISH':
      return (state = 'Good Morning');

    case 'FRENCH':
      return (state = 'Namaskar');

    default:
      return state;
  }
}
