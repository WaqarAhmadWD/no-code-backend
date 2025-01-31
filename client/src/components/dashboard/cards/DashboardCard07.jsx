import React from 'react';
// import customerimage from "../../images/customerimage.png";


function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100">
        <h1 className="font-semibold blue-text font-weight700 text-2xl">Customers/Investors</h1>
      </header>
      <div className="">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full ">
            {/* Table header */}
            <thead className="blue-bg  text-xs uppercase text-white bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Customer Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-start">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-start">Date - Time</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-start">Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-start">City</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center ">
                    Active
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {/* Row */}
              <tr>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <path
                        d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                        fill="#FFF"
                      />
                    </svg>
                    <div className=" text-xs text-black">
                      {/* <img src={customerimage} alt="" /> */}
                      William</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">william@gmail.com</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">12.09.2019 - 12.53 PM</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">00100</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">New York</div>
                </td>
                <td className="px-2 md:px-4 py-3">
                  <div className="text-center text-white rounded-full blue-bg text-xs px-0 py-1">Active</div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <path
                        d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                        fill="#FFF"
                      />
                    </svg>
                    <div className=" text-xs text-black">
                      {/* <img src={customerimage} alt="" /> */}
                      William</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">william@gmail.com</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">12.09.2019 - 12.53 PM</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">00100</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">New York</div>
                </td>
                <td className="px-2 md:px-4 py-3">
                  <div className="text-center text-white rounded-full blue-bg text-xs px-0 py-1">Active</div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <path
                        d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                        fill="#FFF"
                      />
                    </svg>
                    <div className=" text-xs text-black">
                      {/* <img src={customerimage} alt="" /> */}
                      William</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">william@gmail.com</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">12.09.2019 - 12.53 PM</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">00100</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">New York</div>
                </td>
                <td className="px-2 md:px-4 py-3">
                  <div className="text-center text-white rounded-full blue-bg text-xs px-0 py-1">Active</div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <path
                        d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                        fill="#FFF"
                      />
                    </svg>
                    <div className=" text-xs text-black">
                      {/* <img src={customerimage} alt="" /> */}
                      William</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">william@gmail.com</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-xs text-black">12.09.2019 - 12.53 PM</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">00100</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-start text-black">New York</div>
                </td>
                <td className="px-2 md:px-4 py-3">
                  <div className="text-center text-white rounded-full blue-bg text-xs px-0 py-1">Active</div>
                </td>
              </tr>
        
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
