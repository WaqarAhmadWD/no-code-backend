import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/slices/apiSlices.js";
import { notAllowed, formatObject, stripIdSuffix } from "../utils/index.js";
import Swal from "sweetalert2";
export default function Home() {
  const [selected, setSelected] = useState({
    module: "",
    column: "",
  });
  const [module, setModule] = useState([]);
  const [column, setColumn] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [columnAssocited, setColumnAssocited] = useState({});
  const [formAdd, setFormAdd] = useState({});
  const [formEdit, setFormEdit] = useState({});
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const fetchDataLocal = async () => {
    const result = await dispatch(
      fetchData({ url: "/rest-of/module/get" })
    ).unwrap();
    if (!result.error) {
      setModule(result?.data);
    }
  };
  const fetchColumnsAndData = async (module) => {
    const result = await dispatch(
      fetchData({ url: `/dynamic/${module}/column` })
    ).unwrap();
    if (!result.error) {
      setFormAdd(() => {
        const initialState = {};
        result.data.map((col) => {
          if (notAllowed.every((e) => e != col)) {
            initialState[col] = ""; // Initialize each column with an empty string
          }
        });
        return initialState;
      });
      setColumn(result?.data);
    }
    const data = await dispatch(
      fetchData({ url: `/dynamic/${module}/get` })
    ).unwrap();
    if (!data.error) {
      setData(data?.data);
    }
  };
  const handleDelete = async (id) => {
    const result = await dispatch(
      fetchData({
        url: `/dynamic/${selected?.module}/delete/${id}`,
        method: "DELETE",
      })
    ).unwrap();
    if (!result.error) {
      const data = await dispatch(
        fetchData({
          url: `/dynamic/${selected?.module}/get`,
          loading: false,
          message: false,
        })
      ).unwrap();
      if (!data.error) {
        setData(data?.data);
      }
    }
  };
  const handleEdit = async (id) => {
    const result = await dispatch(
      fetchData({
        url: `/dynamic/${selected?.module}/edit/${id}`,
        method: "PUT",
        data: formEdit,
      })
    ).unwrap();
    if (!result.error) {
      setIsOpen(false);
      const data = await dispatch(
        fetchData({
          url: `/dynamic/${selected?.module}/get`,
          loading: false,
          message: false,
        })
      ).unwrap();
      if (!data.error) {
        setData(data?.data);
      }
    }
  };
  const operation = async (url, method = "GET") => {
    const result = await dispatch(
      fetchData({
        url,
        method,
        data: formAdd,
      })
    ).unwrap();
    if (!result?.error) {
      fetchDataLocal();
    }
  };
  const handleAdd = async () => {
    const result = await dispatch(
      fetchData({
        url: `/dynamic/${selected?.module}/create`,
        method: "POST",
        data: formAdd,
      })
    ).unwrap();
    if (!result.error) {
      setIsOpenAdd(false);
      const data = await dispatch(
        fetchData({
          url: `/dynamic/${selected?.module}/get`,
          loading: false,
          message: false,
        })
      ).unwrap();
      if (!data.error) {
        setData(data?.data);
      }
    }
  };
  const fetchSingle = async (id) => {
    const result = await dispatch(
      fetchData({ url: `/dynamic/${selected?.module}/get/${id}` })
    ).unwrap();
    if (!result.error) {
      setFormEdit(result?.data);
    }
  };
  useEffect(() => {
    fetchDataLocal();
  }, []);
  useEffect(() => {
    const fetchAssociatedColumns = async () => {
      const associated = column.filter((elem) => elem.endsWith("_id"));

      const associatedDataArray = await Promise.all(
        associated.map(async (e) => {
          const res = await dispatch(
            fetchData({ url: `/dynamic/${e.slice(0, -3)}/get` })
          ).unwrap();
          return { [e]: res?.data };
        })
      );

      // Merge array of objects into a single object
      const associatedData = Object.assign({}, ...associatedDataArray);

      // Now you have: { field: [...], attribute: [...] }
      setColumnAssocited(associatedData);

      setColumnAssocited(associatedData);
    };

    if (isOpenAdd) {
      fetchAssociatedColumns();
    }
  }, [isOpenAdd]);
  return (
    <>
      <div className="flex flex-col p-16">
        <div className="flex w-full items-center justify-between p-4 ">
          <div className="relative ">
            <select
              name="module"
              id="module"
              defaultValue={-1}
              className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
              onChange={(e) => {
                setSelected({ ...selected, module: e.target.value });
                fetchColumnsAndData(e.target.value);
              }}
            >
              <option value={-1} disabled>
                Select Module
              </option>
              {module &&
                module.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <button
              onClick={() => {
                setIsOpenAdd(true);
              }}
              className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
            >
              Add New Data
            </button>
            <button
              onClick={() => {
                operation("/rest-of/flush");
              }}
              className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
            >
              Flush
            </button>
            {isOpenAdd && (
              <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <div className="mb-5 flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold blue-text">
                      {selected?.module}
                    </h2>
                    <button
                      className="rounded-full  text-white px-2 py-1 "
                      onClick={() => setIsOpenAdd(null)}
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
                        {column &&
                          column.map(
                            (elem) =>
                              notAllowed.every((el) => el != elem) &&
                              !elem.endsWith("_id") && (
                                <input
                                  type="text"
                                  key={elem}
                                  placeholder={elem}
                                  value={formAdd[elem]}
                                  onChange={(e) => {
                                    setFormAdd((prevForm) => ({
                                      ...prevForm,
                                      [elem]: e.target.value, // Update the specific field in the formAdd state
                                    }));
                                  }}
                                  className="form-control w-full mb-4 md:w-[300px] py-1.5 px-9 border rounded-md"
                                />
                              )
                          )}
                        {column &&
                          column.map(
                            (elem) =>
                              notAllowed.every((el) => el != elem) &&
                              elem.endsWith("_id") && (
                                <select
                                  type="number"
                                  key={elem}
                                  placeholder={elem}
                                  value={formAdd[elem]}
                                  onChange={(e) => {
                                    setFormAdd((prevForm) => ({
                                      ...prevForm,
                                      [elem]: e.target.value, // Update the specific field in the formAdd state
                                    }));
                                  }}
                                  className="form-control w-full mb-4 md:w-[300px] py-1.5 px-9 border rounded-md"
                                >
                                  {columnAssocited[elem] &&
                                    columnAssocited[elem].map((e, idx) => (
                                      <option
                                        key={idx}
                                        value={e.id || e._id || idx}
                                      >
                                        {formatObject(e)}
                                      </option>
                                    ))}
                                </select>
                              )
                          )}
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                          onClick={() => handleAdd({})}
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
        <table className="min-w-full table-auto rounded-lg">
          {/* Table Header */}
          <thead className="">
            <tr className=" blue-bg text-white capitalize">
              {column &&
                column.map((e) => (
                  <th key={e} className=" py-2 text-xs px-6 text-left">
                    {e}
                  </th>
                ))}

              <th className="py-2 text-xs px-6 text-center">Actions</th>
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
                  {item &&
                    Object.keys(item).map((e) => {
                      const exits = column.find((ele) => ele === e);
                      if (!exits) {
                        return null;
                      }
                      return (
                        <td
                          className="py-3 px-6 text-left text-xs text-black"
                          key={e}
                        >
                          <pre>{formatObject(item[stripIdSuffix(e)])}</pre>
                        </td>
                      );
                    })}

                  <td className="py-3 px-6 text-left text-xs text-black">
                    <div className="flex item-center justify-center">
                      <div className="App">
                        {/* Button to open the modal */}
                        <button
                          className="px-4 py-2 rounded"
                          onClick={() => {
                            setIsOpen(item?.id);
                            fetchSingle(item?.id);
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
                        {isOpen === item?.id && (
                          <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                              <div className="mb-5 flex flex-row items-center justify-between">
                                <h2 className="text-lg font-semibold blue-text">
                                  {selected?.module}
                                </h2>
                                <button
                                  className="rounded-full  text-white px-2 py-1 "
                                  onClick={() => {
                                    setIsOpen(null);
                                  }}
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
                                <div className="space-y-4 ">
                                  <div className="flex flex-col gap-4">
                                    {column &&
                                      column.map(
                                        (elem) =>
                                          notAllowed.every(
                                            (el) => el != elem
                                          ) && (
                                            <input
                                              type="text"
                                              key={elem}
                                              placeholder={elem}
                                              value={formEdit[elem]}
                                              onChange={(e) => {
                                                setFormEdit((prevForm) => ({
                                                  ...prevForm,
                                                  [elem]: e.target.value, // Update the specific field in the formAdd state
                                                }));
                                              }}
                                              className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
                                            />
                                          )
                                      )}
                                  </div>

                                  <div className="text-center">
                                    <button
                                      type="submit"
                                      className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                                      onClick={() => handleEdit(isOpen)}
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

                      <button
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
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
                              handleDelete(item?.id);
                            }
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
                            d="M24.3535 5.69824H19.9785L18.7285 4.44824H12.4785L11.2285 5.69824H6.85352V8.19824H24.3535M8.10352 24.4482C8.10352 25.1113 8.36691 25.7472 8.83575 26.216C9.30459 26.6848 9.94047 26.9482 10.6035 26.9482H20.6035C21.2666 26.9482 21.9024 26.6848 22.3713 26.216C22.8401 25.7472 23.1035 25.1113 23.1035 24.4482V9.44824H8.10352V24.4482Z"
                            fill="#DC0F3D"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
