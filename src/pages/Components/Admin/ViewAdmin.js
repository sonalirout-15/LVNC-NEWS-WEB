import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSingleAdminStart } from "../../../Redux/Actions/AdminActions";

const ViewAdmin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    console.log('ID¬¬¬¬', id)
  const singleData = useSelector((state) => state?.admin?.adminData)
  console.log('Single data¬¬¬¬¬', singleData)
  
    useEffect(() => {
      dispatch(getSingleAdminStart(id))
    }, [])
  
    return(
        <>
         <Header />
        <SideBar />
        <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Single Admin Detail</h1>
          </div>
          <div className="card-header-action">
            <Link to={'/admins'} className="btn btn-primary">
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
                  {/* <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Token:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.token}</span>
                  </div> */}
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Name:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.name}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Email:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Password:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.password}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Mobile No:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.mobile}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Gender:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.gender}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Address:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Image:</span>
                    <img src={singleData?.image} style={{height:"82px"}}></img>
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

export default ViewAdmin;