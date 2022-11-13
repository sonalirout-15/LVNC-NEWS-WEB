import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { createCampaningStart, updateCampaningStart } from "../../../Redux/Actions/CampaningActions";

const initialState = {
    title:'',
    description:'',
    image:'',
    audio:'',
    video:'',
  }

const AddEditCampanings = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const [submit, setSubmit] = useState(false)
    const history = useHistory();
    const [titleError, setTitleError] = useState();
    const [descriptionError, setDescriptionError] = useState();
    const [imageError, setImageError] = useState();
    const [audioError, setAudioError] = useState();
    const [videoError, setVedioError] = useState();
    var {id,title,description,image,audio,video} = formValue;
    const dispatch = useDispatch();
    var { id } = useParams();

    const campaning = useSelector((state) => state?.campaning?.campaning?.CampaningData?.rows)

    useEffect(() => {
        if (id) {
          setEditMode(true);
          const singleCampaning = campaning ? campaning.find((item) => item.id === Number(id)) : null;
          setFormValue({ ...singleCampaning });
        } else {
          setEditMode(false);
          setFormValue({ ...initialState });
        }
      }, [id]);

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
            formData.append("title", title );
            formData.append("description", description);
            formData.append("image", image );
            formData.append("audio", audio );
            formData.append("video", video );
            if(submit){
                dispatch(createCampaningStart(formData));
                history.push('/campaning')
            }
      
          }
           else {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", title );
            formData.append("description", description);
            formData.append("image", image );
            formData.append("audio", audio );
            formData.append("video", video );
            dispatch(updateCampaningStart(formData));
            setEditMode(false);
            history.push('/campaning')
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
        <SideBar />
        <div className="main-content">
        <section className="section" onSubmit={handleSubmit}>
          <div className="section-header">
          <center><strong>{!editMode ? "Add Post" : "Update Post"}</strong></center>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="section-body">
            <div className="row">
              <div className="col-18 col-md-6 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Post</h4>
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
                    <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update" }</button>{" "}
                    <Link to={'/campaning'} className="btn btn-info">
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

export default AddEditCampanings;