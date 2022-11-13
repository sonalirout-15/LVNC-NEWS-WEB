import { combineReducers } from "redux";
import adminReducer from "./Reducers/AdminReducer";
import campaningReducer from "./Reducers/CampaningReducer";
import categoryReducer from "./Reducers/CategoryReducer";
import mettersReducer from "./Reducers/MettersReducer";
import postReducer from "./Reducers/PostReducer";
import subcategoryReducer from "./Reducers/SubcategoryReducer";

const rootReducer = combineReducers({
    admin : adminReducer,
    categoryData : categoryReducer,
    subcategory : subcategoryReducer,
    metters : mettersReducer,
    post : postReducer,
    campaning : campaningReducer
})

export default rootReducer;