import { useState, useRef } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import Pagination from "../../../components/pagination/index.jsx";
// import userimg from "../images/userimg.svg"
import PropTypes from 'prop-types';
UserRole.propTypes = {
  permissions: PropTypes.func,
};
function UserRole({permissions}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [formData, setFormData] = useState({ user_id: "", role_id: [] });
  const [formDataAdd, setFormDataAdd] = useState({ user_id: "", role_id: [] });
  const [optionsRoles, setOptionsRoles] = useState([]);
  const [optionsUser, setOptionsUser] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
const childRef = useRef();;
  const name = "Assign Role";
  const module = "assign_role_user";
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
    const option = await dispatch(
      fetchData({
        url: `/role/get`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (!option?.error) {
      setOptionsRoles(
        option.data.map((item) => {
          if (item.name !== "super_admin") {
            return { value: item.id, label: item.name };
          }
          return null;
        }).filter((item) => item!=null)
      );
    }
    const optionUser = await dispatch(
      fetchData({
        url: `/auth/get`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (!optionUser?.error) {
      setOptionsUser(
        optionUser.data.map((item) => ({ value: item.id, label: item.name }))
      );
    }
    return result?.total_fields || 0;
  };


  const handleEdit = async (id) => {
    const result = await dispatch(
      fetchData({
        url: `/${module}/create`,
        method: "POST",
        data: {
          role_id: formData.role_id.map((e) => e.value),
          user_id: id,
        },
      })
    ).unwrap();
    if (!result?.error) {
      fetchDataFun(false,childRef.current.getData().query);
      setFormData({ role_id: [] });
      setIsOpen(null);
    }
  };
  const handleAdd = async () => {
    const result = await dispatch(
      fetchData({
        url: `/${module}/create`,
        method: "POST",
        data: {
          role_id: formDataAdd.role_id.map((e) => e.value),
          user_id: formDataAdd.user_id.value,
        },
      })
    ).unwrap();
    if (!result?.error) {
      fetchDataFun(false,childRef.current.getData().query);
      setFormDataAdd({ role_id: [] });
      setIsOpenAdd(null);
    }
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
                {permissions(["do_edit","do_create"]) && <div className="basis-1/1" onClick={() => setIsOpenAdd(true)}>
                  <button
                    type="button"
                    className="text-xs rounded-md add-role py-1 text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-2  text-center inline-flex items-center"
                  >
                    <svg
                      className="mr-2"
                      width="15"
                      height="16"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5674 0.769043C5.04438 0.769043 0.567383 5.24604 0.567383 10.769C0.567383 16.292 5.04438 20.769 10.5674 20.769C16.0904 20.769 20.5674 16.292 20.5674 10.769C20.5674 5.24604 16.0904 0.769043 10.5674 0.769043ZM15.5674 11.769H11.5674V15.769H9.56738V11.769H5.56738V9.76904H9.56738V5.76904H11.5674V9.76904H15.5674V11.769Z"
                        fill="white"
                      />
                    </svg>
                    Assign New Role
                  </button>
                </div>}
              </div>
            </div>
            {isOpenAdd && (
              <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <div className="mb-5 flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold blue-text">
                      Assign Roles to a User
                    </h2>
                    <button
                      className="rounded-full blue-bg text-white px-2 py-1 "
                      onClick={() => {
                        setIsOpenAdd(false);
                        setFormDataAdd({ user_id: "", role_id: [] });
                      }}
                    >
                         X
                    </button>
                  </div>

                  {/* Close button */}
                  <div className="modal-body">
                    <div className="space-y-4">
                      <div>
                        <Creatable
                          type="text"
                          name="username"
                          id="username"
                          isClearable
                          options={optionsUser}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="username"
                          value={formDataAdd.user_id} // Ensure this binds correctly to user_id
                          onChange={(selected) =>
                            setFormDataAdd({
                              ...formDataAdd, // Preserve existing form data
                              user_id: selected ? selected : null, // Set user_id based on selected value
                            })
                          }
                        />

                        <Select
                          type="text"
                          name="role"
                          id="role"
                          isMulti
                          options={optionsRoles}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="role"
                          value={formDataAdd.role_id}
                          onChange={(selected) =>
                            setFormDataAdd({
                              ...formDataAdd, // Spread existing form data to preserve other fields
                              role_id: selected ? selected : [], // Map selected optionsRoles to an array of values
                            })
                          }
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className=" text-white  text-sm px-5 py-2 rounded-md text-center blue-bg"
                          onClick={() => handleAdd()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid mt-4">
              <div className="col-span-12 overflow-x-auto  ">
                <table className="min-w-full table-auto">
                  {/* Table Header */}
                  <thead className="">
                    <tr className=" blue-bg text-white capitalize">
                      <th className="py-2 text-xs px-6 text-left">ID</th>
                      <th className=" py-2 text-xs px-6 text-left">
                        User Name
                      </th>
                      <th className="py-2 text-xs px-6 text-left">Roles</th>
                      {permissions(["do_edit","do_create"]) && <th className="py-2 text-xs px-6 text-center">Actions</th>}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="text-gray-600 text-sm font-light  p-4">
                    {data?.length > 0 ? (
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

                                   {item?.roles.length <= 3 ? item?.roles?.map((role) => role?.name).join(", ") || "No Role":(item?.roles?.slice(0,3)?.map((role) => role?.name).join(", ")+"...") || "No Role"}
                       
                          </td>
                          {permissions(["do_edit","do_create"]) &&<td className="py-3 px-6 text-left text-xs text-black">
                            {item?.roles?.every(
                              (ele) => ele.name !== "super_admin"
                            ) && (
                              <div className="flex item-center justify-center">
                                <div className="App">
                                  {/* Button to open the modal */}
                                 <button
                                    className="px-4 py-2 rounded"
                                    onClick={() => {
                                      setIsOpen(item.id);
                                      setFormData({ name: item.name });
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

                                  {/* Modal */}
                                  {isOpen === item.id && (
                                    <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                                      <div className="bg-white p-6 rounded shadow-lg w-96">
                                        
                                        <div className="mb-5 flex flex-row items-center justify-between">
                                          <h2 className="text-lg font-semibold blue-text">
                                          Assign Roles to a User
                                          </h2>
                                          <button
                                            className="rounded-full blue-bg text-white px-2 py-1 "
                                            onClick={() => setIsOpen(null)}
                                          >
                                            X
                                          </button>
                                        </div>

                                        {/* Close button */}
                                        <div className="modal-body">
                                          <div className="space-y-4">
                                            <div>
                                              <Select
                                                type="text"
                                                name="role"
                                                id="role"
                                                defaultValue={() =>
                                                  optionsRoles.filter(
                                                    (option) =>
                                                      item.roles.some(
                                                        (role) =>
                                                          role.id ===
                                                          option.value
                                                      )
                                                  )
                                                }
                                                isMulti
                                                options={optionsRoles}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                placeholder="role"
                                                value={formData.role_id}
                                                onChange={(selected) =>
                                                  setFormData({
                                                    ...formData, // Spread existing form data to preserve other fields
                                                    role_id: selected
                                                      ? selected
                                                      : [], // Map selected optionsRoles to an array of values
                                                  })
                                                }
                                              />
                                            </div>

                                            <div className="text-center">
                                              <button
                                                type="submit"
                                                className="text-white  text-sm px-5 py-2 rounded-md text-center blue-bg"
                                                onClick={() =>
                                                  handleEdit(item.id)
                                                }
                                              >
                                                Submit
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
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
