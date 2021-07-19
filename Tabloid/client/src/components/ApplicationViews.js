import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CategoryList from "./Category/CategoryList"
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserList from "./UserProfiles/ListAllActiveUsers"
import { TagList } from "./Tags/TagList";
import PostList from "./Post/PostList";
import { CategoryForm } from "./Category/CategoryForm";
import { EditCategory } from "./Category/CategoryEditForm";
import { PostDetail } from "./Post/PostDetail";
import { PostForm } from "./Post/PostForm";
import CreateTag from "./Tags/CreateTag";
import { CommentList } from "./Comment/CommentList";
import { CommentForm } from "./Comment/CommentForm";


export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Tags/Create" exact>
          {isLoggedIn ? <CreateTag /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/addcategory">
          <CategoryForm />
        </Route>

        <Route path="/categories">
          < CategoryList />
        </Route>
        <Route path="/category/edit/:id">
          {isLoggedIn ? <EditCategory /> : <Redirect to="/login" />}
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/allusers">
          <UserList />
        </Route>

        <Route path="/posts/details/comment/:id">
          <CommentList />
        </Route>

        <Route path="/addcomment">
          <CommentForm />
        </Route>
      </Switch>

      <Route path="/posts" exact>
        <PostList />
      </Route>

      <Route path="/posts/details/:id" exact>
        <PostDetail />
      </Route>

      <Route path="/posts/add">
        <PostForm />
      </Route>
    </main>
  );
};
