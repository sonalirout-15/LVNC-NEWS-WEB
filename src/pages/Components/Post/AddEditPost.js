import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header, Sidebar } from "../../../components/admin";
import { loadAdminStart} from "../../../Redux/Actions/AdminActions";
import { loadCategoryStart } from "../../../Redux/Actions/CategoryAction";
import { createPostStart, updatePostStart } from "../../../Redux/Actions/PostActions";
import { loadSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";

const initialState = {
    admin_ref_id : '',
    category_ref_id : '',
    subcategory_ref_id : '',
    title:'',
    description:'',
    image:'',
    audio:'',
    video:'',
  }

const AddEditPost = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const [submit, setSubmit] = useState(false);
    const history = useHistory();
    const [titleError, setTitleError] = useState();
    const [descriptionError, setDescriptionError] = useState();
    const [imageError, setImageError] = useState();
    const [audioError, setAudioError] = useState();
    const [videoError, setVedioError] = useState();
    var { id,admin_ref_id,category_ref_id,subcategory_ref_id,title,description,image,audio,video } = formValue;
    const dispatch = useDispatch();
    var { id } = useParams();

    const post = useSelector((state) => state?.post?.post?.rows)
    const admin = useSelector((state) => state?.admin?.admin?.rows)
    const subcategories = useSelector((state) => state?.subcategory?.subcategories?.categoryData?.rows);
    const categories = useSelector((state) => state?.categoryData?.categories?.categoryData?.rows);

    useEffect(() => {
        if (id) {
          setEditMode(true);
          const singlePost = post ? post.find((item) => item.id === Number(id)) : null;
          setFormValue({ ...singlePost });
        } else {
          setEditMode(false);
          setFormValue({ ...formValue });
        }
      }, [id]);

      useEffect(() => {
        dispatch(loadCategoryStart())
      }, [])
    
      useEffect(() => {
        dispatch(loadSubcategoryStart())
      }, [])
    
    useEffect(() => {
        dispatch(loadAdminStart())
      }, [])

      const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true)
        if (title  === '') {
          setTitleError('Title is required')
        }
        if (description === '') {
          setDescriptionError('Description is required');
        }
        if (image  === '') {
          setImageError('Image is required');
        }
        if (audio  === '') {
          setAudioError('Audio is required')
        }
        if (video  === '') {
          setVedioError('Vedio is required')
        }else{
    
          if (!editMode) {
            const formData = new FormData();
            formData.append("admin_ref_id", admin_ref_id );
            formData.append("category_ref_id", category_ref_id );
            formData.append("subcategory_ref_id", subcategory_ref_id );
            formData.append("title", title );
            formData.append("description", description);
            formData.append("image", image );
            formData.append("audio", audio );
            formData.append("video", video );
            if(submit){
                dispatch(createPostStart(formData));
                history.push('/post')
            }
          }
           else {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("admin_ref_id", admin_ref_id );
            formData.append("category_ref_id", category_ref_id );
            formData.append("subcategory_ref_id", subcategory_ref_id );
            formData.append("title", title );
            formData.append("description", description);
            formData.append("image", image );
            formData.append("audio", audio );
            formData.append("video", video );
            dispatch(updatePostStart(formData));
            setEditMode(false);
            history.push('/post')
          }
        }
      };
    
      
   const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

   const handleFileSelect = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
  };

    return(
        <>
        <Header />
        <Sidebar />
        <div className="main-content">
        <section className="section" onSubmit={handleSubmit}>
          <div className="section-header">
            <h4>Post</h4>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="section-body">
            <div className="row">
              <div className="col-18 col-md-6 col-lg-6">
                <div className="card">
                  <div className="card-header">
                  <center><strong>{!editMode ? "Add Post" : "Update Post"}</strong></center>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="title"
                        value={title || ""}
                        name="title"
                        onChange={onInputChange} 
                        />
                    </div>
                    <label style={{
                  color: "red",
                  marginLeft: "2%",
                  display: "flex"
                }}>
                  {titleError}
                </label>
                    <div className="form-group">
                      <label>Description</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="description"
                        value={description || ""}
                        name="description"
                        onChange={onInputChange} />
                    </div>
                    <label style={{
                  color: "red",
                  marginLeft: "2%",
                  display: "flex"
                }}>
                  {descriptionError}
                </label>
                    <div className="form-group">
                      <label>Image</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="/accept/*"
                        id="image"
                        defaultValue={image || ""}
                        name="image"
                        onChange={handleFileSelect}/>
                    </div>
                    <label style={{
                      color: "red",
                      marginLeft: "2%",
                      display: "flex"
                    }}>
                    {imageError}
                </label>
                <div className="form-group">
                      <label>Audio</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="/accept/*"
                        id="audio"
                        defaultValue={audio || ""}
                        name="audio"
                        onChange={handleFileSelect}/>
                    </div>
                    <label style={{
                      color: "red",
                      marginLeft: "2%",
                      display: "flex"
                    }}>
                    {audioError}
                </label>
                <div className="form-group">
                      <label>Video</label>
                      <input 
                        type="file" 
                        className="form-control" 
                        accept="/accept/*"
                        id="video"
                        defaultValue={video || ""}
                        name="video"
                        onChange={handleFileSelect}/>
                    </div>
                    <label style={{
                      color: "red",
                      marginLeft: "2%",
                      display: "flex"
                    }}>
                    {videoError}
                </label>
                <div className="form-group">
                      <label>Admin Id</label>
                      <select 
                        className="form-control" 
                        id="admin_ref_id"
                        value={admin_ref_id || ""}
                        name="admin_ref_id"
                        onChange={onInputChange}
                        >
                    {admin ? admin.map(adminItem => (
                      <option
                        key={adminItem.name} 
                        value={adminItem.id}>
                          {adminItem.name}
                        </option>
                    )) : null}
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Subcategory Id</label>
                      <select 
                        className="form-control" 
                        id="subcategory_ref_id"
                        value={subcategory_ref_id || ""}
                        name="subcategory_ref_id"
                        onChange={onInputChange}
                        >
                    {subcategories ? subcategories.map(subcatItem => (
                      <option
                        key={subcatItem.subcategory_name} 
                        value={subcatItem.id}>
                          {subcatItem.subcategory_name}
                        </option>
                    )) : null}
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Category Id</label>
                      <select 
                        className="form-control" 
                        id="category_ref_id"
                        value={category_ref_id || ""}
                        name="category_ref_id"
                        onChange={onInputChange}
                        >
                    {categories ? categories.map(catItem => (
                      <option
                        key={catItem.category_name} 
                        value={catItem.id}>
                          {catItem.category_name}
                        </option>
                    )) : null}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update" }</button>{" "}
                    <Link to={'/post'} className="btn btn-info">
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

export default AddEditPost;