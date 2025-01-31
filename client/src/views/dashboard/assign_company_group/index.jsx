import { useState,useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import Pagination from "../../../components/pagination/index.jsx";
// import Companyimg from "../images/Companyimg.svg"
import PropTypes from 'prop-types';
AssignCompany.propTypes = {
  permissions: PropTypes.func,
};
function AssignCompany({permissions}) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
const childRef = useRef();
  const name = "Assign Company to a Group";
  const module = "assign_company_group";
  const [searchTerm, setSearchTerm] = useState("");

 
  const fetchDataFun = async (notif = true,query="") => {
    const result = await dispatch(
      fetchData({
        url: `/${module}/get`+query,
        loading: true,
        error: notif,
        message: false,
      })
    ).unwrap();
    
    if (result?.data) setData(result.data);
    
    return result?.total_fields || 0;
  };


  return (
    <>
      <main className="user-role-sec grow ">
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
                    <svg className="search-icon" width="14" height="13" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.1362 12.8558C16.1362 13.0094 16.0752 13.1567 15.9666 13.2653C15.8579 13.3739 15.7106 13.435 15.557 13.435H11.6189C11.4899 13.9159 11.2058 14.3409 10.8107 14.644C10.4156 14.9471 9.93154 15.1114 9.43357 15.1114C8.9356 15.1114 8.45153 14.9471 8.05643 14.644C7.66133 14.3409 7.37726 13.9159 7.24827 13.435H1.27153C1.11793 13.435 0.97062 13.3739 0.86201 13.2653C0.753399 13.1567 0.692383 13.0094 0.692383 12.8558C0.692383 12.7022 0.753399 12.5549 0.86201 12.4463C0.97062 12.3377 1.11793 12.2767 1.27153 12.2767H7.24827C7.37726 11.7957 7.66133 11.3707 8.05643 11.0676C8.45153 10.7645 8.9356 10.6002 9.43357 10.6002C9.93154 10.6002 10.4156 10.7645 10.8107 11.0676C11.2058 11.3707 11.4899 11.7957 11.6189 12.2767H15.557C15.7106 12.2767 15.8579 12.3377 15.9666 12.4463C16.0752 12.5549 16.1362 12.7022 16.1362 12.8558ZM16.1362 2.65519C16.1362 2.80879 16.0752 2.95609 15.9666 3.0647C15.8579 3.17332 15.7106 3.23433 15.557 3.23433H13.6652C13.5362 3.71531 13.2521 4.1403 12.857 4.4434C12.4619 4.74651 11.9778 4.9108 11.4799 4.9108C10.9819 4.9108 10.4978 4.74651 10.1027 4.4434C9.70763 4.1403 9.42356 3.71531 9.29458 3.23433H1.27153C1.19547 3.23433 1.12016 3.21935 1.0499 3.19025C0.979632 3.16114 0.915788 3.11848 0.86201 3.0647C0.808231 3.01093 0.765572 2.94708 0.736467 2.87682C0.707363 2.80655 0.692383 2.73124 0.692383 2.65519C0.692383 2.57914 0.707363 2.50383 0.736467 2.43356C0.765572 2.3633 0.808231 2.29945 0.86201 2.24567C0.915788 2.1919 0.979632 2.14924 1.0499 2.12013C1.12016 2.09103 1.19547 2.07605 1.27153 2.07605H9.29458C9.42356 1.59507 9.70763 1.17008 10.1027 0.866976C10.4978 0.563871 10.9819 0.399582 11.4799 0.399582C11.9778 0.399582 12.4619 0.563871 12.857 0.866976C13.2521 1.17008 13.5362 1.59507 13.6652 2.07605H15.557C15.6334 2.07501 15.7092 2.08928 15.7799 2.11802C15.8506 2.14675 15.9149 2.18937 15.9689 2.24336C16.0229 2.29735 16.0655 2.3616 16.0942 2.43234C16.1229 2.50307 16.1372 2.57885 16.1362 2.65519ZM16.1362 7.75164C16.1372 7.82798 16.1229 7.90376 16.0942 7.97449C16.0655 8.04523 16.0229 8.10949 15.9689 8.16347C15.9149 8.21746 15.8506 8.26008 15.7799 8.28882C15.7092 8.31755 15.6334 8.33182 15.557 8.33078H6.52242C6.39343 8.81176 6.10936 9.23675 5.71426 9.53986C5.31916 9.84296 4.83509 10.0072 4.33712 10.0072C3.83914 10.0072 3.35508 9.84296 2.95998 9.53986C2.56488 9.23675 2.28081 8.81176 2.15182 8.33078H1.27153C1.11793 8.33078 0.97062 8.26977 0.86201 8.16116C0.753399 8.05255 0.692383 7.90524 0.692383 7.75164C0.692383 7.59804 0.753399 7.45074 0.86201 7.34213C0.97062 7.23352 1.11793 7.1725 1.27153 7.1725H2.15182C2.28081 6.69152 2.56488 6.26653 2.95998 5.96343C3.35508 5.66032 3.83914 5.49603 4.33712 5.49603C4.83509 5.49603 5.31916 5.66032 5.71426 5.96343C6.10936 6.26653 6.39343 6.69152 6.52242 7.1725H15.557C15.7106 7.1725 15.8579 7.23352 15.9666 7.34213C16.0752 7.45074 16.1362 7.59804 16.1362 7.75164Z" fill="black" />
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
                <table className="min-w-full table-auto">
                  {/* Table Header */}
                  <thead className="">
                    <tr className=" blue-bg text-white capitalize">
                      <th className="py-2 text-xs px-6 text-left">ID</th>
                      <th className=" py-2 text-xs px-6 text-left">
                        Group Name
                      </th>
                      <th className="py-2 text-xs px-6 text-left">Company</th>
                      {permissions(["do_edit","do_create"]) && <th className="py-2 text-xs px-6 text-center">Actions</th>}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="text-gray-600 text-sm font-light  p-4">
                    {data.length > 0 ? (
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

                          <td className="py-3 px-6 text-left text-xs text-black">
                            {item?.companies.length <= 3 ? item?.companies?.map((company) => company.entity_name).join(", ") || "No Company":(item?.companies?.slice(0,3)?.map((company) => company.entity_name).join(", ")+"...") || "No Company"}
                          </td>
                          {permissions(["do_edit","do_create"]) && <td className="py-3 px-6 text-left text-xs text-black">
                            <div className="flex item-center justify-center">
                              <div className="App">
                                {/* Button to open the modal */}
                                <Link
                                  className="px-4 py-2 rounded"
                                  to={`/assign-company-group/${item?.id}/${item?.name}`}
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
                                </Link>

                                {/* Modal */}
                          
                              </div>


                            </div>
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
                <Pagination fetchDataFun={fetchDataFun} ref={childRef}  />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AssignCompany;
