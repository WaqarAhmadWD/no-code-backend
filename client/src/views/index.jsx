import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/slices/apiSlices.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Home() {
  const navigator = useNavigate();
  const [selected, setSelected] = useState({
    module: "",
    column: "",
  });
  const [module, setModule] = useState([]);
  const [column, setColumn] = useState([]);
  const [data, setData] = useState([])
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
      fetchData({ url: `/dynamic/${selected.module}/delete/${id}`, method:"DELETE" })
    ).unwrap();
    if (!result.error) {
        const data = await dispatch(
            fetchData({ url: `/dynamic/${selected.module}/get` })
          ).unwrap();
          if (!data.error) {
            setData(data?.data);
          }
    }
    const data = await dispatch(
        fetchData({ url: `/dynamic/${module}/get` })
      ).unwrap();
      if (!data.error) {
        setData(data?.data);
      }
  };
  
  useEffect(() => {
    fetchDataLocal();
  }, []);
  return (
    <>
      <div className="flex flex-col  px-4">
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
               <button     className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
                  >Add New Data</button>
        </div>
        <table className="min-w-full table-auto rounded-lg">
                  {/* Table Header */}
                  <thead className="">
                    <tr className=" blue-bg text-white capitalize">
                      {column && column.map(e=>(<th key={e} className=" py-2 text-xs px-6 text-left">
                        {e}
                      </th>))}
                
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
                          {item && Object.keys(item).map(e=>(
                            <td className="py-3 px-6 text-left text-xs text-black" key={e}>
                            {item[e]}
                          </td>
                          ))}
                   
                         <td className="py-3 px-6 text-left text-xs text-black">
                            <div className="flex item-center justify-center">
                              <div className="App">
                                {/* Button to open the modal */}
                                <Link
                                  className="px-4 py-2 rounded"
                                  to={`${item?.id}/${item?.entity_name}`}
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
      </div>
    </>
  );
}
