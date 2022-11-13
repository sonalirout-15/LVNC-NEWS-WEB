import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Header } from "../../../components/admin";
import SideBar from "../../../components/admin/sidebar";
import { deleteCategoryStart, loadCategoryStart } from "../../../Redux/Actions/CategoryAction";

const Categories = () => {
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        if (window.confirm("Are you sure that you wanted to delete that category?")) {
          dispatch(deleteCategoryStart(id))
        }
      }

    useEffect(() => {
        dispatch(loadCategoryStart())
    }, [])
    const categoriesData = useSelector((state) => state?.categoryData?.categories?.categoryData?.rows)
    const [data, setData] = useState(categoriesData)

    useEffect(() => {
        setData(categoriesData)
    }, [categoriesData])

    return(
        <>
        <Header />
        <SideBar />
        <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Categories</h1>
          </div>
          <div className="row">
            <div className="col-lg-10 col-md-12 col-12 col-sm-14">
              <div className="card">
                <div className="card-header">
                  <h4>Category Details</h4>
                  <div className="card-header-action">
                    <Link to={'/addCategory'} className="btn btn-primary">
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
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {(data || []).map((item , index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.category_name}</td>
                          <td>{item.status}</td>
                          <td>
                          <Link  
                              style={{color:'blue'}}
                              className="fas fa-pencil-alt"
                              to={`/editCategory/${item.id}`}>
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
                                to={`/viewCategory/${item.id}`}
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

export default Categories;