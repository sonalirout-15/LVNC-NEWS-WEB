import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSingleCategoryStart } from "../../../Redux/Actions/CategoryAction";

const ViewCategories = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams()
  
  const singleData = useSelector((state) => state?.categoryData?.categoryData[0])
  console.log('SingleData¬¬¬¬¬', singleData)
  
    useEffect(() => {
      dispatch(getSingleCategoryStart(id))
    }, [])
  
    return(
        <>
        <Header />
        <SideBar />
         <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Single Category Detail</h1>
          </div>
          <div className="card-header-action">
            <Link to={'/categories'} className="btn btn-primary">
                Back
            </Link>
        </div>
        <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <h2 className="title">Information</h2>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>ID:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.id}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Category Name:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.category_name}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Status:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </section>
      </div>
        </>
    )
}

export default ViewCategories;