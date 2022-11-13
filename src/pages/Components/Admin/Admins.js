import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {  Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { loadAdminStart,deleteAdminStart } from "../../../Redux/Actions/AdminActions";

const Admins = () => {
    const dispatch = useDispatch();

useEffect(() => {
        dispatch(loadAdminStart())
    }, [])

const handleDelete = (id) => {
        if (window.confirm("Are you sure that you wanted to delete that admin?")) {
          dispatch(deleteAdminStart(id))
        }
    }

const tableData = useSelector((state) => state?.admin?.admin?.rows)
const [data, setData] = useState(tableData);
console.log('DATA¬¬¬¬¬', tableData)

useEffect(() => {
    setData(tableData)
}, [tableData])

    return(
        <>
        <Header />
        <SideBar />
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Admins</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Admin Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addAdmin'} className="btn btn-primary">
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          <th>Gender</th>
                          <th>Address</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {(data || []).map((item , index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.gender}</td>
                          <td>{item.address}</td>
                          <td><img src={item.image} style={{height:"50px"}}></img></td>
                          <td>{item.status}</td>
                          <td>
                            <Link  
                              style={{color:'blue'}}
                              className="fas fa-pencil-alt"
                              to={`/editAdmin/${item.id}`}>
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
                            to={`/viewAdmin/${item.id}`}
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


export default Admins;