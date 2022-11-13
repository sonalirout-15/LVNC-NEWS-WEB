import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { getSinglePostStart } from "../../../Redux/Actions/PostActions";

const ViewPost = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    
const singleData = useSelector((state) => state?.post?.postData?.data?.postData);


useEffect(() => {
    dispatch(getSinglePostStart(id))
  }, [])
    return(
        <>
        <Header />
        <SideBar />
        <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Single Post Detail</h1>
          </div>
          <div className="card-header-action">
            <Link to={'/post'} className="btn btn-primary">
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
                    <span className="itemKey" style={{ color: "black" }}>Title:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.title}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Description:</span>
                    <span className="itemValue" style={{ fontWeight: 'bold' }}>{singleData?.description}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Image:</span>
                    <img src={singleData?.image} style={{height:"82px"}}></img>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Audio:</span>
                    <audio controls><source src={singleData?.audio} type='audio/mp3' style={{height:"20px"}}/></audio>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey" style={{ color: "black" }}>Video:</span>
                    <video src={singleData?.video} type="video/mp4" style={{height:"40px"}}></video>
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

export default ViewPost;