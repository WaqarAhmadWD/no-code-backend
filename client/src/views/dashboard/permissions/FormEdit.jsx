import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
export default function Form() {
  const { id, name } = useParams();
  // const [formDataAdd, setFormDataAdd] = useState({ name: name });
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [availModule, setAvailModule] = useState([]);
  const [originData, setOriginData] = useState([]);
  const fetchDataFun = async () => {
    const availModuleLocal = await dispatch(
      fetchData({
        url: `/module/get`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (availModuleLocal?.data) {
      await setAvailModule(availModuleLocal.data);
      setOriginData(availModuleLocal.data);
    }
    const roleAssignedModule = await dispatch(
      fetchData({
        url: `/assign_role_module/get/${id}`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (roleAssignedModule?.data) {
      setAvailModule(
        availModuleLocal.data.map((localModule) => {
          const assignedModule = roleAssignedModule.data.find(
            (e) => e.module_id === localModule.id
          );

          return {
            name: localModule.name,
            module_id: localModule.id,
            do_create: assignedModule?.do_create || false,
            do_edit: assignedModule?.do_edit || false,
            do_get: assignedModule?.do_get || false,
            do_delete: assignedModule?.do_delete || false,
          };
        })
      );
    }
  };
  useEffect(() => {
    fetchDataFun();
  }, []);
  const handleAdd = async () => {
  
    const result = await dispatch(
      fetchData({
        url: `/role/edit/${id}`,
        method: "PUT",
        data: {  name,permissions: availModule },
        refresh:"/assign_role_module/get/"+id
      })
    ).unwrap();
    if(!result?.error){
      navigate("/permissions");
    }
  };
  const handleValues = ({ id, method }) => {
    setAvailModule((prev) =>
      prev.map((item) =>
        item.module_id === id ? { ...item, ...method } : item
      )
    );
  };

  return (
    <main className="user-role-sec grow">
      <div className=" px-4 sm:px-6 lg:px-5 py-5 r w-full max-w-9xl mx-auto">
        <div className="bg-white py-5  rounded-md shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between px-3">
            <div className="">
              {/* Close button */}
              <div className="modal-body">
                <div className="space-y-4">
                  {/* <div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="username"
                      value={formDataAdd?.name}
                      onChange={(e) =>
                        setFormDataAdd({
                          name: e.target.value,
                        })
                      }
                    />
                  </div> */}
                  <div className="text-[1.5rem] mb-4">Role Name: <span className="font-bold">{name}</span></div>
                  <table className="table-auto w-full gap-4">
                    <thead className="gap-4">
                      <tr>
                        <th className="text-left">Module</th>
                        <th className="text-left">Create | </th>
                        <th className="text-left">Update | </th>
                        <th className="text-left">Views  | </th>
                        <th className="text-left">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availModule.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                name="do_create"
                                id={`do_create_${index}`}
                                checked={item.do_create || false} // Ensure a boolean value
                                disabled={originData.some(
                                  (e) => e.id === item.module_id && !e.do_create
                                )}
                                onChange={(e) =>
                                  handleValues({
                                    id: item.module_id,
                                    method: { do_create: e.target.checked },
                                  })
                                }
                              />
                              <div
                                className={`relative w-11 h-6 ${
                                  originData.some(
                                    (e) =>
                                      e.id === item.module_id && !e.do_create
                                  )
                                    ? "bg-gray-900"
                                    : "bg-gray-200"
                                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                              ></div>
                            </label>
                          </td>
                          <td>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                name="do_edit"
                                id={`do_edit_${index}`}
                                checked={item.do_edit || false} // Ensure a boolean value
                                disabled={originData.some(
                                  (e) => e.id === item.module_id && !e.do_edit
                                )}
                                onChange={(e) =>
                                  handleValues({
                                    id: item.module_id,
                                    method: { do_edit: e.target.checked },
                                  })
                                }
                              />
                              <div
                                className={`relative w-11 h-6 ${
                                  originData.some(
                                    (e) => e.id === item.module_id && !e.do_edit
                                  )
                                    ? "bg-gray-900"
                                    : "bg-gray-200"
                                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                              ></div>
                            </label>
                          </td>
                          <td>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                name="do_get"
                                id={`do_get_${index}`}
                                checked={item.do_get || false} // Ensure a boolean value
                                disabled={originData.some(
                                  (e) => e.id === item.module_id && !e.do_get
                                )}
                                onChange={(e) =>
                                  handleValues({
                                    id: item.module_id,
                                    method: { do_get: e.target.checked },
                                  })
                                }
                              />
                              <div
                                className={`relative w-11 h-6 ${
                                  originData.some(
                                    (e) => e.id === item.module_id && !e.do_get
                                  )
                                    ? "bg-gray-900"
                                    : "bg-gray-200"
                                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                              ></div>
                            </label>
                          </td>
                          <td>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                name="do_delete"
                                id={`do_delete_${index}`}
                                checked={item.do_delete || false} // Ensure a boolean value
                                disabled={originData.some(
                                  (e) => e.id === item.module_id && !e.do_delete
                                )}
                                onChange={(e) =>
                                  handleValues({
                                    id: item.module_id,
                                    method: { do_delete: e.target.checked },
                                  })
                                }
                              />
                              <div
                                className={`relative w-11 h-6 ${
                                  originData.some(
                                    (e) =>
                                      e.id === item.module_id && !e.do_delete
                                  )
                                    ? "bg-gray-900"
                                    : "bg-gray-200"
                                } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                              ></div>
                            </label>
                          </td>
                   
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-center">
                    <button
                      type="submit"
                      className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                      onClick={() => handleAdd()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
