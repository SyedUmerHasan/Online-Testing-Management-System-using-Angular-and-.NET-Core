import * as PostActions from 'src/app/StateManager/Action/Post.actions';
import { Post } from './../../../../Model/Post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from 'src/app/Model/AppState.model';

interface PostState {
  post: Post;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  message$: Observable<string>;
  post: Observable<Post>;
  text: string; /// form input val

  constructor(private store: Store<AppState>, private postStore: Store<PostState>) {
    this.message$ = this.store.select('message');
    this.post = this.postStore.select('post');
  }

  ngOnInit() {

  }

  spanishMessage() {
    this.store.dispatch({type: 'SPANISH'});
  }

  frenchMessage() {
    this.store.dispatch({type: 'FRENCH'});
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text) )
  }

  resetPost() {
    this.postStore.dispatch(new PostActions.Reset());
  }

  upvote() {
    console.log("umer");
    var dummy = {};
    this.postStore.forEach(value => {
      dummy = value;
      console.log(value);
    });
    this.postStore.dispatch(new PostActions.Upvote());
  }

  downvote() {
    this.postStore.dispatch(new PostActions.Downvote());
  }

  getvotes() {
    this.postStore.dispatch(new PostActions.GetLikes());
  }

}
