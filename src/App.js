import React from "react";
import { Route } from "react-router-dom";
import DefaultLayoutPage from "./pages/Strater/DefaultLayoutPage";
import Login from './pages/Pages/Auth/Login';
import GeneralDashboard from "./pages/Dashboard/GeneralDashboard";
import Admins from "./pages/Components/Admin/Admins";
import AddEditAdmin from "./pages/Components/Admin/AddEditAdmin";
import ViewAdmin from "./pages/Components/Admin/ViewAdmin";
import Categories from "./pages/Components/Categories/Categories";
import AddEditCategories from "./pages/Components/Categories/AddEditCategories";
import ViewCategories from "./pages/Components/Categories/ViewCategories";
import Subcategories from "./pages/Components/Subcategories/Subcategories";
import AddEditSubcategories from "./pages/Components/Subcategories/AddEditSubcategories";
import ViewSubcategories from "./pages/Components/Subcategories/ViewSubcategories";
import Metters from "./pages/Components/Metters/Metters";
import AddEditMetters from "./pages/Components/Metters/AddEditMetters";
import ViewMetters from "./pages/Components/Metters/ViewMetters";
import Post from './pages/Components/Post/Post';
import AddEditPost from './pages/Components/Post/AddEditPost';
import ViewPost from './pages/Components/Post/ViewPost';
import Campaning from "./pages/Components/Campaning/Campaning";
import AddEditCampanings from "./pages/Components/Campaning/AddEditCampanings";
import ViewCampaning from "./pages/Components/Campaning/ViewCampaning";
import ChangePassword from "./pages/Pages/Auth/ChangePassword";

const App = () => {
  return (
    <>
    <div className="App">
    
      {/* {sessionStorage.getItem("ADMIN") ? (<Redirect to='/dashboard'/>) : (<Redirect to='/'/>)} */}
          <Route path='/' exact component={Login} />
          <Route path="/dashboard" component={GeneralDashboard} />
          <Route path="/layout/default" component={DefaultLayoutPage} />
          <Route path='/admins' component={Admins}/>
          <Route path='/addAdmin' component={AddEditAdmin}/>
          <Route path='/editAdmin/:id' component={AddEditAdmin}/>
          <Route path='/viewAdmin/:id' component={ViewAdmin}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/addCategory' component={AddEditCategories}/>
          <Route path='/editCategory/:id' component={AddEditCategories}/>
          <Route path='/viewCategory/:id' component={ViewCategories}/>
          <Route path='/subcategories' component={Subcategories}/>
          <Route path='/addSubcategory' component={AddEditSubcategories}/>
          <Route path='/editSubcategory/:id' component={AddEditSubcategories}/>
          <Route path='/viewSubcategory/:id' component={ViewSubcategories}/>
          <Route path='/metters' component={Metters}/>
          <Route path='/addMetters' component={AddEditMetters}/>
          <Route path='/editMetters/:id' component={AddEditMetters}/>
          <Route path='/viewMetters/:id' component={ViewMetters}/>
          <Route path='/post' component={Post}/>
          <Route path='/addPost' component={AddEditPost}/>
          <Route path='/editPost/:id' component={AddEditPost}/>
          <Route path='/viewPost/:id' component={ViewPost}/>
          <Route path='/campaning' component={Campaning}/>
          <Route path='/addCampaning' component={AddEditCampanings}/>
          <Route path='/editCampaning/:id' component={AddEditCampanings}/>
          <Route path='/viewCampaning/:id' component={ViewCampaning}/>
          <Route path='/change-password' component={ChangePassword}/>
    </div>
    </>
  );
}

export default App;
