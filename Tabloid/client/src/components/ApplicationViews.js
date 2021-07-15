import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CategoryList from "./Category/CategoryList"
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import Tags from "./Tags/Tags";
import { TagList } from "./Tags/TagList";
import PostList from "./Post/PostList";
import { CategoryForm } from "./Category/CategoryForm";

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
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/addcategory">
          <CategoryForm />
        </Route>

        <Route path="/categories">
          < CategoryList />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>

      <Route path="/posts" exact>
        <PostList />
      </Route>
    </main>
  );
};
