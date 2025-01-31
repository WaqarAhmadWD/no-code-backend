import {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import AccountTypes from "../Type/FormEdit.jsx";
export default function Form() {
     const [formDataAdd, setFormDataAdd] = useState({first_name: "", last_name: "", email: "", phone:"",last_level_id:"" });

    //  const [lastLevel,setLastLevel]= useState([]);
    const [last_level,set_last_level] = useState();
     const dispatch = useDispatch()
     const navigate = useNavigate();
     const {name,id} = useParams();
     const getData = (e) =>{
      set_last_level(e);
      console.log(e,"yes")
     }
     const handleEdit = async () => {
      if(!last_level){
        await dispatch(
          fetchData({throwMe:"Please select the last level" })
        ).unwrap();
        return;
      }
      const limit = localStorage.getItem("limit") || 10;
        const result = await dispatch(
          fetchData({ url: `/investor/edit/${id}`, method: "PUT", data: {...formDataAdd,last_level_id:last_level}, refresh:[`/investor/get/${id}`,`/investor/get?limit=${limit}&offset=0&search=`] })
        ).unwrap();
        if (!result?.error) {
          setFormDataAdd({ first_name: "", last_name: "", email: "", phone:"",last_level_id:"" });
          navigate("/investor");
        }
      };
      const fetchDataFun = async (notif = true) => {
        const investor = await dispatch(
          fetchData({
            url: `/investor/get/${id}`,
            loading: notif,
            error: notif,
            message: false,
          })
        ).unwrap();
        if (investor?.data){
          setFormDataAdd(investor.data);
        } 
 
      };
        useEffect(() => {
          fetchDataFun();

        }, []);
  return (
        <div className=" flex items-center justify-center bg-black bg-opacity-5">
          <div className="bg-white p-6 rounded shadow-lg w-full">
            <div className="mb-5 flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold blue-text">
                Edit ({name}) investor
              </h2>
            </div>

            {/* Close button */}
            <div className="modal-body">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="First Name"
                    value={formDataAdd.first_name}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Last Name"
                    value={formDataAdd.last_name}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
              
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Email"
                    value={formDataAdd.email}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="phone"
                    value={formDataAdd.phone}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                 {formDataAdd?.last_level_id && <div className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                                <AccountTypes getData={getData} id={formDataAdd?.last_level_id}/>
                                </div>}
              </div>
              <div className='flex items-center py-4 justify-start'>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
                    onClick={() => handleEdit()}
                  >
                    Submit
                  </button>
                </div>
                </div>
            </div>
          </div>
        </div>
  )
}
