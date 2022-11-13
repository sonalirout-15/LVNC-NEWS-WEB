import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { createCategoryStart, updateCategoryStart} from "../../../Redux/Actions/CategoryAction";

const initialState = {
    category_name: ''
  }

const AddEditCategories = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [nameError, setNameError] = useState();
    const [submit, setSubmit] = useState();
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    var { id, category_name } = formValue;
    const dispatch = useDispatch();
    var { id } = useParams();

    const categories = useSelector((state) => state?.categoryData?.categories?.categoryData?.rows);

    useEffect(() => {
      if (id) {
        setEditMode(true);
        const singleCategory = categories ? categories.find((item) => item.id === Number(id)) : null;
        setFormValue({ ...singleCategory });
      } else {
        setEditMode(false);
        setFormValue({ ...initialState });
      }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true)
        if (category_name === '') {
          setNameError('Category name is required')
        }
        if(category_name > 4){
          setNameError('Category name needs to atleast 4 characters')
        }
        if(category_name > 25)
        {
          setNameError('Category name must be 4 to 25 characters')
        }
         else {
          if (!editMode) {
            if(submit){
                dispatch(createCategoryStart(formValue));
                history.push('/categories');
            }
          } else {
            dispatch(updateCategoryStart(formValue))
            setEditMode(false);
            history.push('/categories')
          }
        }
      };
      
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log("form ...", formValue);
  };
    return(
        <>
        <Header />
        <SideBar />
        <div className="main-content">
        <section className="section" onSubmit={handleSubmit}>
          <div className="section-header">
            <h4>Category</h4>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="section-body">
            <div className="row">
              <div className="col-18 col-md-6 col-lg-6">
                <div className="card">
                  <div className="card-header">
                  <center><strong>{!editMode ? "Add Category" : "Update Category"}</strong></center>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="category_name"
                        value={category_name || ""}
                        name="category_name"
                        onChange={onInputChange} 
                        />
                    </div>
                    <label style={{
                  color: "red",
                  marginLeft: "2%",
                  display: "flex"
                }}>
                  {nameError}
                </label>
                    <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update" }</button>{" "}
                    <Link to={'/categories'} className="btn btn-info">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </form>
        </section>
      </div>
        </>
    )
}

export default AddEditCategories;