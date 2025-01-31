import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
export default function Form() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const fetchDataFun = async () => {
    const dataLocal = await dispatch(
      fetchData({
        url: `/cal/balance-sheet/${id}`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (dataLocal?.data) setData(dataLocal.data);
  };
  useEffect(() => {
    fetchDataFun();
  }, []);
  return (
    <main className="user-role-sec grow">
      <div className=" px-4 sm:px-6 lg:px-5 py-5 r w-full max-w-9xl mx-auto">
        <div className="bg-white py-5  rounded-md shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between px-3">
            <div className="">
              {/* Close button */}
              <div>
              total wealth : {data?.total_wealth || 0}
              </div>
              <div>
              <div>
              total liabilities : {data?.liabilities?.total_liabilities || 0}
              </div>
              {/* <div>
                {data?.liabilities?.map((item,index) => (
                  <div key={index}></div>
                ))}
              </div> */}
              </div>
              <div>
              total assets : {data?.assets?.total_assets || 0}
              </div>
              <div>
              investements: {data?.investements?.total_investements || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
