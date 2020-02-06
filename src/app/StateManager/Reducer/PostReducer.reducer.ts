import { Post } from './../../Model/Post.model';
import * as PostActions from 'src/app/StateManager/Action/Post.actions';
export type Action = PostActions.All;


const myDefaultPost: Post = {
  text: 'Hello. I am the default post',
  likes: 0
};

/// Helper function to create new state object
const newState = (state: Post, newData: any) => {
  return Object.assign({}, state, newData);
};

export function PostReducer(state: Post = myDefaultPost, action: Action) {

  console.log(action.type, state);

  switch (action.type) {
    case PostActions.EDIT_TEXT:
        return newState(state, { text: action.payload });

    case PostActions.UPVOTE:
      return newState(state, { likes: state.likes + 1 });

    case  PostActions.DOWNVOTE:
      return newState(state, { likes: state.likes - 1 });

    case PostActions.RESET:
      return myDefaultPost;

    default:
      return state;
  }
}
