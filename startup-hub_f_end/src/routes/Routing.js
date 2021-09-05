import { Route, Switch } from "react-router";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import EditProfile from "../components/EditProfile/EditProfile";

const routing = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/forgot_password" exact component={ForgotPassword} />
    <Route path="/edit_profile" exact component={EditProfile} />
  </Switch>
);

export default routing;