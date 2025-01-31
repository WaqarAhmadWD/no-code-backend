import "./style.css";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import { useNavigate } from 'react-router-dom';

const Forget = () => {
  const navigator = useNavigate();
  const [user,setUser] = useState({
    email:"",
  });
  const dispatch = useDispatch()
const childRef = useRef();;
  const fetchDataLocal = async (e) => {
    e.preventDefault();
    if(!user?.email){
      await dispatch(
        fetchData({ throwMe:"email is required" })
      ).unwrap();
      return;
    }
    const result = await dispatch(
      fetchData({ url: "/auth/forget", method: "POST", data:user })
    ).unwrap();
   if(!result.error){
        setUser({ email: "" });
        navigator(`/reset?email=${user.email}`);
     
    }
  };
  return (
    <>
    <div className="bg-white flex flex-col items-center justify-center min-h-screen px-5">
        <div className="w-full  md:max-w-[420px] h-auto bg-white py-5 shadow-xl rounded-xl border border-indigo-400">
            <div className="container mx-auto px-4">
                <div className="text-center mt-7">
                    <img className="site-logo w-[250px] h-auto mx-auto" src="/images/shield-logo.png" alt="Logo" />
                </div>
                <div className="py-3">
                    <div className="p-3 p-md-5 mx-md-3">

                        <div className="mx-auto w-full">
                            <div className="text-center mt-3 mt-md-4 pt-md-2">
                                <h3 className="mb-3 text-2xl font-medium text-black">Reset Password</h3>
                                <form action="">
                                    <div className="grid gap-4">
                                        <div className="col-span-12">
                                            <div className="grid gap-4">
                                                <div className="col-span-12 lg:col-span-12 mx-auto md:px-4">
                                                    <div className="relative">
                                                        <svg
                                                            className="inpt-icons absolute"
                                                            width="18"
                                                            height="12"
                                                            viewBox="0 0 22 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M0.551758 1.4198L1.30176 0.6698H20.8018L21.5518 1.4198V14.9198L20.8018 15.6698H1.30176L0.551758 14.9198V1.4198ZM2.05176 2.9723V14.1698H20.0518V2.9738L11.5168 9.5198H10.6018L2.05176 2.9723ZM18.5968 2.1698H3.50676L11.0518 7.9733L18.5968 2.1698Z"
                                                                fill="#1D3C6A"
                                                            />
                                                        </svg>
                                                        <input
                                                            className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
                                                            type="email"
                                                            placeholder="Email Address"
                                                            value={user.email}
                                                            onChange={(e) =>
                                                              setUser({ ...user, email: e.target.value })
                                                            }
                                                        />
                                                    </div>
                                                  
                                                    
                                                    <div className="mt-5" onClick={fetchDataLocal}>
                                                        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 w-full border-0 mb-3 font-bold text-white rounded-md text-xs py-3">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center mt-5">
            <h6 className="dd-by font-bold text-xs text-black-800">
                Designed & Developed by LEADconcept
            </h6>
        </div>
    </div>
   
</>
  );
};
export default Forget;