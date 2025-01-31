import  { useState } from "react";
import Swal from "sweetalert2";

export default function DataTable({ columns, data, handleDelete }) {
  
  
  if(!Array.isArray(columns)){
    return (<div>columns should be an array</div>)
}
if(!Array.isArray(data)){
    return (<div>columns should be an array</div>)
}
 
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto w-full">
        {/* Table Header */}
        
        <thead className="bg-blue-600 w-full">
          <tr className="text-white capitalize">
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-6 text-left cursor-pointer"
              >
                {col.title} 
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-gray-600 text-sm font-light">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {columns.map((col, colIndex) => col.name!="action" && (
                  <td
                    key={colIndex}
                    className="py-3 px-6 text-left text-xs text-black"
                  >
                    {col.render ? col.render(item[col.name], item) : item[col.name]}
                  </td>
                ))}
                <td className="py-3 px-6 text-left text-xs text-black">
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
                          handleDelete(item.id);
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-3 px-6 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}