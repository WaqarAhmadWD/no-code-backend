import "./style.css";
import { useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isRemember: false,
  });
  

  const dispatch = useDispatch()
  const fetchDataLocal = async (e) => {
    e.preventDefault();
    if (!user?.email || !user?.password) {
      await dispatch(
        fetchData({ throwMe: "email and password are required" })
      ).unwrap();
      return;
    }
    const result = await dispatch(
      fetchData({ url: "/auth/login", method: "POST", data: user })
    ).unwrap();
    if (result && result.message && !result.error) {
        localStorage.setItem("Authorization", result?.data?.token);
          localStorage.setItem("user", JSON.stringify({id:result?.data?.user?.id,name:result?.data?.user?.name,email:result?.data?.user?.email}));
          localStorage.setItem("roles", JSON.stringify(result?.data?.user?.roles));
          localStorage.setItem("modules", JSON.stringify(result?.data?.user?.modules));
          setUser({ email: "", password: "",isRemember: false, });
        window.location.href = "/";  
    }
  };
  return (
    <>
    <div className="bg-white flex flex-col items-center justify-center min-h-screen px-5">
      <div className="w-full  md:max-w-[420px] h-[450px] bg-white py-5 shadow-xl rounded-xl border border-indigo-400">
        <div className="container mx-auto px-4">
          <div className="text-center mt-7">
            <img
              className="site-logo w-[250px] h-auto mx-auto"
              src="/images/shield-logo.png"
              alt="Logo"
            />
          </div>
          <div className="py-3">
            <div className="p-3 p-md-5 mx-md-3">
              <div className="mx-auto w-full">
                <div className="text-center mt-3 mt-md-4 pt-md-2">
                  <h3 className="mb-3 text-2xl font-medium text-black">
                    Login
                  </h3>
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
                            <div className="relative mt-4">
                              <svg
                                className="inpt-icons absolute"
                                width="17"
                                height="14"
                                viewBox="0 0 17 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.0518 10.1697C16.0518 9.06674 15.1548 8.16974 14.0518 8.16974H13.0518V5.16974C13.0518 2.41274 10.8088 0.169739 8.05176 0.169739C5.29476 0.169739 3.05176 2.41274 3.05176 5.16974V8.16974H2.05176C0.948758 8.16974 0.0517578 9.06674 0.0517578 10.1697V18.1697C0.0517578 19.2727 0.948758 20.1697 2.05176 20.1697H14.0518C15.1548 20.1697 16.0518 19.2727 16.0518 18.1697V10.1697ZM5.05176 5.16974C5.05176 3.51574 6.39776 2.16974 8.05176 2.16974C9.70576 2.16974 11.0518 3.51574 11.0518 5.16974V8.16974H5.05176V5.16974Z"
                                  fill="#565F88"
                                />
                              </svg>
                              <input
                                className="form-control w-full md:w-[300px] py-1.5 px-9 border rounded-md"
                                type="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) =>
                                  setUser({ ...user, password: e.target.value })
                                }
                              />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <input className="mt-0" type="checkbox"   checked={user.isRemember}
                                  onChange={(e) => setUser({ ...user, isRemember: e.target.checked })} />
                                <h6 className="remembr-text mb-0 text-xs">
                                  Remember Password
                                </h6>
                              </div>
                              <Link
                                className="forgt-text text-xs"
                                to="/forget"
                              >
                                Forgot Password
                              </Link>
                            </div>
                            <div className="mt-5" onClick={fetchDataLocal}>
                              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 w-full border-0 mb-3 font-bold text-white rounded-md text-xs py-3">
                                Login
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

export default Login;
