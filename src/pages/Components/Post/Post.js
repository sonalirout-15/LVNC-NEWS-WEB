import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { deletePostStart, loadPostStart } from "../../../Redux/Actions/PostActions";

const Post = () => {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        if (window.confirm("Are you sure that you wanted to delete that post?")) {
          dispatch(deletePostStart(id))
        }
      }

      useEffect(() => {
        dispatch(loadPostStart())
      }, [])

      const postData = useSelector((state) => state?.post?.post?.rows)
      const [data, setData] = useState(postData)

      useEffect(() => {
        setData(postData)
      }, [postData])

    return(
        <>
        <Header />
        <SideBar />
        <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Post</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Post Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addPost'} className="btn btn-primary">
                      + New
                    </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped mb-1">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Admin Ref Id</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Image</th>
                          <th>Audio</th>
                          <th>Video</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {(data || []).map((item , index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.admin_ref_id}</td>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td><img src={item.image} style={{height:"50px"}}></img></td>
                          <td><audio controls><source src={item.audio} type='audio/mp3'/></audio></td>
                          <td><video controls style={{height:'50px'}}><source src={item.video} type="video/mp4"/></video></td>
                          <td>{item.status}</td>
                          <td>
                            <Link  
                              style={{color:'blue'}}
                              className="fas fa-pencil-alt"
                              to={`/editPost/${item.id}`}>
                            </Link>
                            {" "}
                           <Link
                            style={{color:'red'}} 
                             className='fas fa-trash'
                             onClick={() => handleDelete(item.id)}
                             />
                             {" "}
                           <Link
                           style={{color:'green'}}
                            className="fas fa-eye"
                            to={`/viewPost/${item.id}`}
                           />
                          </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
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

export default Post;