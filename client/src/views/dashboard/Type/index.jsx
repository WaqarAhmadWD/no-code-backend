import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchData } from "../../../store/slices/apiSlices.js";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/pagination/index.jsx";
import PropTypes from 'prop-types';

const NestedTogglableTable = ({permissions}) => {
  const [openLists, setOpenLists] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [formDataAdd, setFormDataAdd] = useState({ name: "" });
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const childRef = useRef();
  const navigate = useNavigate();
  // TODO: it should be 5 in case of showing 5 deep nested form.
  const deep_level = 3;
  // Function to toggle a specific list's visibility
  const toggleList = (listKey) => {
    setOpenLists((prevState) => ({
      ...prevState,
      [listKey]: !prevState[listKey],
    }));
  };
  const matchedValue = (value) =>{
    return value
    ?.match(/level_\d+s/g)
    ?.reverse();
  }
  const handleDelete = async (id, child = "type") => {
    const result = await dispatch(
      fetchData({ url: `/${child}/delete/${id}`, method: "DELETE" })
    ).unwrap();
    if (!result?.error) {
      if(child=="type")childRef.current.decreaseField();
      fetchDataFun(false,childRef.current.getData().query);
    }
  };
  const handleEdit = async (id, child = "type") => {
    const result = await dispatch(
      fetchData({ url: `/${child}/edit/${id}`, method: "PUT", data: formData })
    ).unwrap();
    if (!result?.error) {
      fetchDataFun(false,childRef.current.getData().query);
      setFormData({ name: "" });
      setIsOpen(null);
    }
  };
  const handleAdd = async (id, child = "type") => {
    const result = await dispatch(
      fetchData({ url: `/${child}/create`, method: "POST", data: {...formDataAdd,id} })
    ).unwrap();
    if (!result?.error) {
      fetchDataFun(false,childRef.current.getData().query);
      setFormDataAdd({ name: "" });
      setIsOpenAdd(null);
    }
  };
  // Fetch data function
  const fetchDataFun = async (notif = true,query="") => {
    const result = await dispatch(
      fetchData({
        url: `/type/get`+query,
        loading: true,
        error: notif,
        message: false,
        refresh: !notif
      })
    ).unwrap();
    if (result?.data) setData(result.data);
    return result?.total_fields || 0;
  };
 


  // Recursive function to render rows in a table
  const renderTableRows = (items, parentKey = "",parent_id = null) => {
    if (Array.isArray(items)) {
      return items.map((item, index) => {
        const currentKey = `${parentKey}-${index}`;
        const isArray = Array.isArray(item);
        const isObject = typeof item === "object" && item !== null;

        return (
          <React.Fragment key={currentKey}>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td
                style={{ paddingLeft: `${parentKey.split("-").length * 10}px` }}
                className="py-3 px-6 text-left text-xs text-black"
              >
                <div
                  onClick={() =>
                    isArray || isObject ? toggleList(currentKey) : null
                  }
                  style={{
                    cursor: isArray || isObject ? "pointer" : "default",
                  }}
                >
                  <div className="flex items-center gap-2">
                    {parseInt(parentKey.split("-").length - 1) / 2 !=
                      deep_level - 1 &&
                    (isArray || isObject) ? (
                      openLists[currentKey] ? (
                        <img src="/images/up.svg" className="w-2 h-2 " />
                      ) : (
                        <div>
                          {/* {parseInt(parentKey.split("-").length -1) / 2  } */}
                          <img
                            src="/images/up.svg"
                            className="w-2 h-2 rotate-180"
                          />
                        </div>
                      )
                    ) : (
                      ""
                    )}
                    {isObject ? item.name : item.toString()}
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-left text-xs text-black">
                {!isArray && !isObject ? item.toString() : ""}
              </td>
       
              <td className="flex items-center">
                {/* {permissions("do_delete") && <div>
                
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const matches = parentKey
                            ?.match(/level_\d+s/g)
                            ?.reverse();
                          handleDelete(
                            item.id,
                            (matches && matches[0]) || "type"
                          );
                        }
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <path
                      d="M24.3535 5.69824H19.9785L18.7285 4.44824H12.4785L11.2285 5.69824H6.85352V8.19824H24.3535M8.10352 24.4482C8.10352 25.1113 8.36691 25.7472 8.83575 26.216C9.30459 26.6848 9.94047 26.9482 10.6035 26.9482H20.6035C21.2666 26.9482 21.9024 26.6848 22.3713 26.216C22.8401 25.7472 23.1035 25.1113 23.1035 24.4482V9.44824H8.10352V24.4482Z"
                      fill="#DC0F3D"
                    />
                  </svg>
                
                </div>} */}
                     <div className="App">
                  {/* Button to open the modal */}
                  {/* {permissions("do_edit") && <button
                    className="px-4 py-2 rounded"
                    onClick={() => {
                      setIsOpen(item.id);
                      setFormData({
                        name: item.name,
                        email: item.email,
                        active: item.active,
                      });
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
                  </button>} */}

                  {/* Modal */}
                  {isOpen === item.id && (
                    <div className="popup popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                      <div className="bg-white p-6 rounded shadow-lg w-96">
                        <div className="mb-5 flex flex-row items-center justify-between">
                          <h2 className="text-lg font-semibold blue-text">
                            Edit Type
                          </h2>
                          <button
                            className="rounded-full  text-white px-2 py-1 "
                            onClick={() => setIsOpen(null)}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                                fill="#4A90E2"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Close button */}
                        <div className="modal-body">
                          <div className="space-y-4">
                            <div>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="text-center">
                              <button
                                type="submit"
                                className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                                onClick={() => {
                                  const matches = parentKey
                                    ?.match(/level_\d+s/g)
                                    ?.reverse();
                                  handleEdit(
                                    item.id,
                                    (matches && matches[0]) || "type"
                                  );
                                }}
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
              </td>
            </tr>
            {openLists[currentKey] && renderTableRows(item, currentKey, item?.id)}
          </React.Fragment>
        );
      });
    } else if (typeof items === "object" && items !== null) {
      return Object.entries(items).map(([key, value]) => {
        const currentKey = `${parentKey}-${key}`;
        const isArray = Array.isArray(value);
        const isObject = typeof value === "object" && value !== null;

        return (
          <React.Fragment key={currentKey}>
            <tr>
              {parentKey.split("-").length / 2 < deep_level && (
                <td
                  style={{
                    paddingLeft: `${parentKey.split("-").length * 10}px`,
                  }}
                >
                  <div
                    onClick={() => toggleList(currentKey)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex items-center gap-2">
                      {!isArray && !isObject ? (
                        ""
                      ) : openLists[currentKey] ? (
                        <img src="/images/up.svg" className="w-2 h-2" />
                      ) : (
                        <img
                          src="/images/up.svg"
                          className="w-2 h-2 rotate-180"
                        />
                      )}{" "}
                      {/* {key} */}
                      {(isArray || isObject) && key}
                    
                    </div>
                  </div>
                </td>
                
              )}
           
             <td>
            {(permissions("do_create") && matchedValue(key) && parentKey.split("-").length / 2 < deep_level) && (
                         <button
                         onClick={() => setIsOpenAdd(parent_id)}
                         className="m-2 text-black bg-blue-200 text-sm px-3 py-1 rounded-md text-center "
                       >
                         +
                       </button>
                      )}
                        {isOpenAdd === parent_id && (
              <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <div className="mb-5 flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold blue-text">
                      Add Field on {key}
                    </h2>
                    <button
                      className="rounded-full  text-white px-1.5 py-0 "
                      onClick={() => setIsOpenAdd(false)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                          fill="#4A90E2"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Close button */}
                  <div className="modal-body">
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name_add"
                          id="name_add"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Name"
                          value={formDataAdd.name}
                          onChange={(e) =>
                            setFormDataAdd({
                              ...formDataAdd,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

               
              

                      <div className="text-center">
                        <button
                          type="submit"
                          className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                          onClick={() => handleAdd(parent_id,matchedValue(key))}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
             </td>
              {/* <td>{!isArray && !isObject ? value.toString() : ""}</td> */}
            </tr>
            {parentKey.split("-").length / 2 < deep_level &&
              openLists[currentKey] &&
              renderTableRows(value, currentKey)}
          </React.Fragment>
        );
      });
    }

    return null;
  };

  return (
    <main className="user-role-sec grow">
      <div className=" px-4 sm:px-6 lg:px-5 py-5 r w-full max-w-9xl mx-auto">
        <div className="bg-white py-5  rounded-md shadow-md">
          <div className="basis-1/4">
            <h1 className="text-xl blue-text font-weight700">{name}</h1>
          </div>
          <div className="flex gap-2">
            {permissions("do_create") &&<div className="flex flex-col md:flex-row items-center justify-end gap-2">
              <div
                className="basis-1/1"
                onClick={() => navigate("/type-form-add")}
              >
                <button
                  type="button"
                  className="text-xs rounded-md add-role py-1.5 text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium  px-2  text-center inline-flex items-center"
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
                  Add New Type
                </button>
              </div>
            </div>}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between px-3">
            {/* Search Input */}

            <table
              border="1"
              style={{ width: "100%", borderCollapse: "collapse" }}
              className="min-w-full table-auto"
            >
              <thead>
                <tr className="blue-bg text-white capitalize">
                  {/* <th className="py-2 text-xs px-6 text-left">Key</th>
            <th className="py-2 text-xs px-6 text-left">Value</th> */}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light  p-4">
                {renderTableRows(data)}
              </tbody>
            </table>
          </div>
            <Pagination fetchDataFun={fetchDataFun} ref={childRef}/>
        </div>
      </div>
    </main>
  );
};
NestedTogglableTable.propTypes = {
  permissions: PropTypes.func,
};
export default NestedTogglableTable;
