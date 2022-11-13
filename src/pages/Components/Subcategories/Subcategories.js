import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { deleteSubcategoryStart, loadSubcategoryStart } from "../../../Redux/Actions/SubcategoryActions";

const Subcategories = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    const handleDelete = (id) => {
        if(window.confirm("Are you sure that you wanted to delete that user?")){
          dispatch(deleteSubcategoryStart(id))
        }
      }

      useEffect(() => {
        dispatch(loadSubcategoryStart())
      },[])

      const subcategoryData = useSelector((state) =>state?.subcategory?.subcategories?.categoryData?.rows);
      const [ data , setData] = useState(subcategoryData)

 useEffect(() => {
    setData(subcategoryData)
  }, [subcategoryData])

    return(
        <>
        <Header />
        <SideBar />
        <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Subcategories</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Subcategories Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addSubcategory'} className="btn btn-primary">
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
                          <th>Category Id</th>
                          <th>Subcategory Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {(data || []).map((item , index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.category_ref_id}</td>
                          <td>{item.subcategory_name}</td>
                          <td>{item.status}</td>
                          <td>
                            <Link  
                              style={{color:'blue'}}
                              className="fas fa-pencil-alt"
                              to={`/editSubcategory/${item.id}`}>
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
                            to={`/viewSubcategory/${item.id}`}
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

export default Subcategories;