import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import Pagination from "../../../components/pagination/index.jsx";
// import userimg from "../images/userimg.svg"
import PropTypes from 'prop-types';
UserRole.propTypes = {
  permissions: PropTypes.func,
};
function UserRole({permissions}) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
const childRef = useRef();;
  const navigate = useNavigate();
  const name = "Permissions";
  const module = "role";
  const [searchTerm, setSearchTerm] = useState("");


  const fetchDataFun = async (notif = true,query="") => {
    const result = await dispatch(
      fetchData({
        url: `/${module}/get`+query,
        loading: true,
        error: notif,
        message: false,
        refresh: !notif
      })
    ).unwrap();
    if (result?.data) setData(result.data);
    return result?.total_fields || 0;
  };
 
  return (
    <>
      <main className="user-role-sec grow">
        <div className=" px-4 sm:px-6 lg:px-5 py-5 r w-full max-w-9xl mx-auto">
          <div className="bg-white py-5  rounded-md shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between px-3">
              {/* Search Input */}

              <div className="basis-1/4">
                <h1 className="text-xl blue-text font-weight700">{name}</h1>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-end gap-2">
                <div className="searc-outer basis-1/2">
                  <span className="searc-outer">
                    <svg
                      className="search-icon"
                      width="14"
                      height="13"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0001 13.769L10.1048 10.8737M10.1048 10.8737C10.6001 10.3785 10.9929 9.79049 11.261 9.14341C11.529 8.49632 11.6669 7.80278 11.6669 7.10238C11.6669 6.40198 11.529 5.70843 11.261 5.06135C10.9929 4.41426 10.6001 3.8263 10.1048 3.33104C9.60955 2.83578 9.02159 2.44292 8.3745 2.17489C7.72742 1.90686 7.03387 1.76891 6.33347 1.76891C5.63307 1.76891 4.93953 1.90686 4.29244 2.17489C3.64535 2.44292 3.0574 2.83578 2.56214 3.33104C1.56192 4.33126 1 5.68785 1 7.10238C1 8.5169 1.56192 9.87349 2.56214 10.8737C3.56236 11.8739 4.91895 12.4358 6.33347 12.4358C7.748 12.4358 9.10458 11.8739 10.1048 10.8737Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <form action="" onSubmit={(e)=>{e.preventDefault();childRef.current.searchFun(searchTerm)}}>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={`Search ${name}`}
                      className="px-4 py-1 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    </form>
                  </span>
                </div>
         
              </div>
            </div>

            <div className="grid mt-4">
              <div className="col-span-12 overflow-x-auto">
                
                  <table className="min-w-full table-auto ">
                    {/* Table Header */}
                    <thead className="blue-bg ">
                      <tr className="  text-white capitalize">
                        <th className=" py-2 text-xs px-6 text-left">ID</th>
                        <th className=" py-2 text-xs px-6 text-left">
                          Role Name
                        </th>
                        {permissions(["do_edit","do_delete"]) && <th className=" py-2 text-xs px-6 text-center">Actions</th>}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-gray-600 text-sm font-light  p-4">
                      { (permissions("do_get") && data?.length > 0) ? (
                        data.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-3 px-6 text-left text-xs text-black">
                              {item.id}
                            </td>
                            <td className="py-3 px-6 text-left text-xs text-black">
                       
                              {item.name}
                            </td>
                            
                            {permissions("do_edit") && <td className="py-3 px-6 text-left text-xs text-black">
                              {item.name!="super_admin" && <div className="flex item-center justify-center">
                                <div className="App">
                                  {/* Button to open the modal */}
                                  <button
                                    className="px-4 py-2 rounded"
                                    onClick={() => {
                                      navigate(
                                        `/role-form-permissions/${item.id}/${item.name}`
                                      );
                                    }}
                                  >
                                    <svg
                                      width="23"
                                      height="23"
                                      viewBox="0 0 31 31"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M9.35352 9.44824H8.10352C7.44047 9.44824 6.80459 9.71163 6.33575 10.1805C5.86691 10.6493 5.60352 11.2852 5.60352 11.9482V23.1982C5.60352 23.8613 5.86691 24.4972 6.33575 24.966C6.80459 25.4348 7.44047 25.6982 8.10352 25.6982H19.3535C20.0166 25.6982 20.6524 25.4348 21.1213 24.966C21.5901 24.4972 21.8535 23.8613 21.8535 23.1982V21.9482"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M20.6035 6.94825L24.3535 10.6983M26.0848 8.9295C26.5771 8.4372 26.8536 7.76948 26.8536 7.07325C26.8536 6.37702 26.5771 5.70931 26.0848 5.217C25.5925 4.7247 24.9247 4.44812 24.2285 4.44812C23.5323 4.44812 22.8646 4.7247 22.3723 5.217L11.8535 15.6983V19.4483H15.6035L26.0848 8.9295Z"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>

                        
                              </div>}
                            </td>}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-3 px-6 text-center text-gray-500"
                          >
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                 <Pagination fetchDataFun={fetchDataFun} ref={childRef}/>
                       
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default UserRole;
