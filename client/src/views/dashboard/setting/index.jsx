import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Setting() {
    
    const navigate = useNavigate(); // Get the navigation object
    const [limit,setLimit] = useState(parseInt(localStorage.getItem("limit")) || 0);
    const [cache,setCache] = useState((localStorage.getItem("cache")) === "true" || false);
      const handleSetValue = ()=>{
        localStorage.setItem("limit",limit);
        localStorage.setItem("cache", cache?"true":"false");
        navigate(-1);
      }
  return (
    <>
    <div className='min-h-screen flex justify-center mt-8'>
    <div className=''>
              <div className=" flex items-center justify-center bg-black bg-opacity-5">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                  <div className="mb-5 flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold blue-text">
                      Basic Settings
                    </h2>
                  </div>

                  {/* Close button */}
                  <div className="modal-body">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="limits" className='text-xs font-bold text-gray-500'>Limits</label>
                        <input
                          type="text"
                          name="limits"
                          id="limits"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Set Limits"
                          value={limit}
                          onChange={(e) =>
                            setLimit(parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div>
                        <div className='flex items-center gap-x-2'>
                            <div className='flex flex-col '>
                            <span className='text-[8px]'>Experemental</span>
                        <label htmlFor="cache" className='text-xs font-bold text-gray-500'>Cache</label>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                name="cache"
                                id="cache"
                                checked={cache}
                                onChange={(e) =>
                                    setCache(e.target.checked)
                                }
                              />
                              <div
                                className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                              ></div>
                            </label>
                            </div>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                          onClick={handleSetValue}
                        >
                          Set Values
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
    </>
  )
}
