import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { createAdminStart, updateAdminStart } from "../../../Redux/Actions/AdminActions";

const initialState = {
    name: '',
    email:'',
    password:'',
    confirm_password:'',
    mobile:'',
    gender:'',
    address:'',
    image:'',
  }

const AddEditAdmin = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();
    const[submit, setSubmit] = useState(false)
    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const [mobileError, setMobileError] = useState();
    const [genderError, setGenderError] = useState();
    const [addressError, setAddressError] = useState();
    const [imageError, setImageError] = useState();
    var { name , email, password, confirm_password, mobile, gender, address, image } = formValue;
    const dispatch = useDispatch();
    var { id } = useParams();

    const admin = useSelector((state) => state?.admin?.admin?.rows)
    console.log('ADMIN¬¬¬¬¬',admin)
    useEffect(() => {
        if (id) {
          setEditMode(true);
          const singleAdmin = admin ? admin.find((item) => item.id === Number(id)) : null;
          setFormValue({ ...singleAdmin });
        } else {
          setEditMode(false);
          setFormValue({ ...formValue });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        if (name  === '') {
          setNameError('Name is required.')
        }
        // if(!name[0].toUpperCase()){
        //   setNameError('First letter must be a capital letter')
        // }
        // if(name.length <5){
        //   setNameError('Admin name needs to be atleast 5 character')
        // }
        // if(name.length > 70){
        //   setNameError('Admin name length between 5 to 70 character')
        // }
        if (email === '') {
          setEmailError('Email is required.');
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
          setEmailError('Invalid email address')
        }
        if (password  === '') {
          setPasswordError('Password is required.');
        }else if(password.length < 6){
          setPasswordError('Atleast 6 character required.')
        }
        if (confirm_password  === '') {
          setConfirmPasswordError('Confirm Password is required.')
        }else if(password !== confirm_password){
          setConfirmPasswordError('Password and Confirm Password does not match.')
        }
        if (mobile  === '') {
          setMobileError('Mobile is required.')
        }else if(mobile.length != 10){
          setMobileError('Enter valid Mobile No.')
        }
        if (gender  === '') {
          setGenderError('Gender is required.')
        }
        if (address  === '') {
          setAddressError('Address is required.')
        }
        if (image  === '') {
          setImageError('Image is required.')
        }else{
      
          if (!editMode) {
            const formData = new FormData();
            formData.append("name", name );
            formData.append("email", email);
            formData.append("password", password );
            formData.append("confirm_password", confirm_password );
            formData.append("mobile", mobile );
            formData.append("gender", gender );
            formData.append("address", address );
            formData.append("image", image );
            if(submit){
              dispatch(createAdminStart(formData));
              history.push('/admins')
            }
          }
           else {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name );
            formData.append("email", email);
            formData.append("password", password );
            formData.append("confirm_password", confirm_password );
            formData.append("mobile", mobile );
            formData.append("gender", gender );
            formData.append("address", address );
            formData.append("image", image );
            dispatch(updateAdminStart(formData));
            setEditMode(false);
            history.push('/admins')
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
            <h4>Admin</h4>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="section-body">
            <div className="row">
              <div className="col-18 col-md-6 col-lg-6">
                <div className="card">
                  <div className="card-header">
                  <center><strong>{!editMode ? "Add Admin" : "Update Admin"}</strong></center>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Admin Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        value={name || ""}
                        name="name"
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
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="email"
                        value={email || ""}
                        name="email"
                        onChange={onInputChange} />
                    </div>
                    <label style={{
                  color: "red",
                  marginLeft: "2%",
                  display: "flex"
                }}>
                  {emailError}
                </label>
                    <div className="form-group">
                      <label>Password Strength</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fas fa-lock"></i>
                          </div>
                        </div>
                        <input
                          type="password"
                          className="form-control pwstrength"
                          data-indicator="pwindicator"
                          id="password"
                          value={password || ""}
                          name="password"
                          onChange={onInputChange} 
                        />
                      </div>
                      <label style={{
                        color: "red",
                        marginLeft: "2%",
                        display: "flex"
                    }}>
                      {passwordError}
                </label>
                      <div id="pwindicator" className="pwindicator">
                        <div className="bar"></div>
                        <div className="label"></div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fas fa-lock"></i>
                          </div>
                        </div>
                        <input
                          type="password"
                          className="form-control pwstrength"
                          data-indicator="pwindicator"
                          id="confirm_password"
                          value={confirm_password || ""}
                          name="confirm_password"
                          onChange={onInputChange} 
                        />
                      </div>
                      <label style={{
                      color: "red",
                      marginLeft: "2%",
                      display: "flex"
                      }}>
                  {confirmPasswordError}
                </label>
                      <div id="pwindicator" className="pwindicator">
                        <div className="bar"></div>
                        <div className="label"></div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Phone Number (US Format)</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fas fa-phone"></i>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control phone-number"
                          id="mobile"
                          value={mobile || ""}
                          name="mobile"
                          onChange={onInputChange} 
                        />
                      </div>
                    </div>
                    <label style={{
                    color: "red",
                    marginLeft: "2%",
                    display: "flex"
                    }}>
                  {mobileError}
                </label>
                    <div className="form-group">
                      <label>Gender</label>
                      <input 
                        type="text" 
                        className="form-control"
                        id="gender"
                        value={gender || ""}
                        name="gender"
                        onChange={onInputChange}  />
                    </div>
                    <label style={{
                      color: "red",
                      marginLeft: "2%",
                      display: "flex"
                    }}>
                  {genderError}
                </label>
                    <div className="form-group">
                      <label>Address</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="address"
                        value={address || ""}
                        name="address"
                        onChange={onInputChange} />
                    </div>
                    <label style={{
                      color: "red",
                      marginLeft: "2%",
                      display: "flex"
                  }}>
                  {addressError}
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
                    <button type="submit" className="btn btn-primary">{!editMode ? "Add" : "Update" }</button>{" "}
                    <Link to={'/admins'} className="btn btn-info">
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

export default AddEditAdmin;