import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSingleSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";

const ViewSubcategories = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
  
  const singleData = useSelector((state) => state?.subcategory?.cateData)
  
  useEffect(() => {
      dispatch(getSingleSubcategoryStart(id))
    }, [])

    return(
    <>
        <Header />
        <SideBar />
            <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Single Subcategory Detail</h1>
          </div>
          <div className="card-header-action">
            <Link to={'/subcategories'} className="btn btn-primary">
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
                    <span className="itemKey" style={{ color: "black" }}>Category Ref Id:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.category_ref_id}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Subcategory Name:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.subcategory_name}</span>
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

export default ViewSubcategories;