//Components, Hooks and Pages
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./pages/BookCheckoutPage/BookCheckoutPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { Footer } from "./layouts/Footer";
import { Navbar } from "./layouts/Navbar";
import { SearchBooksPage } from "./pages/SearchBooksPage/SearchBooksPage";
import { ReviewListPage } from "./pages/BookCheckoutPage/ReviewListPage/ReviewListPage";
import { ShelfPage } from "./pages/ShelfPage/ShelfPage";
import { MessagesPage } from "./pages/MessagesPage/MessagesPage";
import { ManageLibraryPage } from "./pages/ManageLibraryPage/ManageLibraryPage";

//Css
import "./App.css";

//Login and Security
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push("/login");
  };

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBooksPage />
            </Route>
            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route path="/login" render={() => <LoginWidget config={oktaConfig} />} />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path="/shelf">
              <ShelfPage />
            </SecureRoute>
            <SecureRoute path="/messages">
              <MessagesPage />
            </SecureRoute>
            <SecureRoute path="/admin">
              <ManageLibraryPage />
            </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
