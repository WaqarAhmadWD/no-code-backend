import {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import AccountTypes from "../Type/FormEdit.jsx";
export default function Form() {
     const [formDataAdd, setFormDataAdd] = useState({ entity_name: "", tax_id: "", entity_type: "", data_created:"",state:"",state_formation:"",address:"",phone:"",email:"",user_id:"",manager_name:"",manager_address:"",manager_email:"",manager_phone:"" });
     const [user,setUser] = useState([]);
     const [us_state,set_us_state] = useState([]);
    //  const [lastLevel,setLastLevel]= useState([]);
    const [last_level,set_last_level] = useState();
     const [entity_type,set_entity_type] = useState([]);
     const dispatch = useDispatch()
     const navigate = useNavigate();
     const {name,id} = useParams();
     const getData = (e) =>{
      set_last_level(e);
      console.log(e,"yes")
     }
     const handleEdit = async () => {
      const limit = localStorage.getItem("limit") || 10;
        const result = await dispatch(
          fetchData({ url: `/company/edit/${id}`, method: "PUT", data: {...formDataAdd,last_level_id:last_level}, refresh:[`/company/get/${id}`,`/company/get?limit=${limit}&offset=0&search=`] })
        ).unwrap();
        if (!result?.error) {
          setFormDataAdd({ entity_name: "", tax_id: "", entity_type: "", data_created:"",state:"",state_formation:"",address:"",phone:"",user_id:"",manager_name:"",email:"",manager_address:"",manager_email:"",manager_phone:"" });
          navigate("/company");
        }
      };
      const fetchDataFun = async (notif = true) => {
        const company = await dispatch(
          fetchData({
            url: `/company/get/${id}`,
            loading: notif,
            error: notif,
            message: false,
          })
        ).unwrap();
        if (company?.data){
          setFormDataAdd(company.data);
        } 
        // const last_level_data = await dispatch(
        //   fetchData({
        //     url: `/last_level/get`,
        //     loading: notif,
        //     error: notif,
        //     message: false,
        //   })
        // ).unwrap();
        // if (last_level_data?.data) setLastLevel(last_level_data.data);
        const user_data = await dispatch(
          fetchData({
            url: `/auth/get`,
            loading: notif,
            error: notif,
            message: false,
          })
        ).unwrap();
       if (user_data?.data) setUser(user_data.data);
        const lists = await dispatch(
            fetchData({
              url: `/company/get/lists`,
              loading: notif,
              error: notif,
              message: false,
            })
          ).unwrap();
          if (lists?.data) {
            if(lists?.data?.US_STATE){
                set_us_state(lists?.data?.US_STATE);
              }
              if(lists?.data?.ENTITY_TYPE){
                set_entity_type(lists?.data?.ENTITY_TYPE);

            }
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
                Edit ({name}) Company/Entity 
              </h2>
            </div>

            {/* Close button */}
            <div className="modal-body">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="entity_name"
                    id="entity_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Company/Entity Name"
                    value={formDataAdd.entity_name}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        entity_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="tax_id"
                    id="tax_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Tax Id"
                    value={formDataAdd.tax_id}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        tax_id: e.target.value,
                      })
                    }
                  />
                </div>
                <select name="" id="" value={formDataAdd?.entity_type} onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        entity_type: e.target.value,
                      })
                    } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 >
                    {/* <option value={-1} disabled>Select Entity Type</option> */}
                    {entity_type && Object.values(entity_type)?.map((e,i)=>
                        <option value={e} key={i}>{e}</option>
                    )}
                </select>
                <div>
                  <input
                    type="date"
                    name="data_created"
                    id="data_created"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Date Created"
                    value={formDataAdd?.data_created && formDataAdd?.data_created.slice(0,10)}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        data_created: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <pre>{JSON.stringify(Object.values(us_state),null,2)}</pre> */}
                <select name="" id="" value={formDataAdd?.state}   onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        state: e.target.value,
                      })
                    } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 >
                    <option value={-1} disabled>Select US State</option>
                    {us_state && Object.values(us_state)?.map((e,i)=>
                        <option value={e} key={i}>{e}</option>
                    )}
                </select>
                <div>
                  <input
                    type="text"
                    name="state_formation"
                    id="state_formation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="State Formation"
                    value={formDataAdd.state_formation}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        state_formation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Address"
                    value={formDataAdd.address}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        address: e.target.value,
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
                <select name="" id="" value={formDataAdd?.user_id}   onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        user_id: parseInt(e.target.value),
                      })
                    } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 >
                    <option value={-1} disabled>Select User</option>
                    {user && user?.map((e,i)=>
                        <option value={e?.id} key={i}>{e?.name}</option>
                    )}
                </select>
                {/* <select name="" id="" value={formDataAdd?.last_level_id}   onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        last_level_id: parseInt(e.target.value),
                      })
                    } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 >
                    <option value={-1} disabled>Select Type</option>
                    {lastLevel && lastLevel?.map((e,i)=>
                        <option value={e?.id} key={i}>{e?.name}</option>
                    )}
                </select> */}
                <div>
                  <input
                    type="text"
                    name="manager_name"
                    id="manager_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="manager name"
                    value={formDataAdd.manager_name}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        manager_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="manager_address"
                    id="manager_address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="manager address"
                    value={formDataAdd.manager_address}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        manager_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="manager_email"
                    id="manager_email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="manager email"
                    value={formDataAdd.manager_email}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        manager_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="manager_phone"
                    id="manager_phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="manager phone"
                    value={formDataAdd.manager_phone}
                    onChange={(e) =>
                      setFormDataAdd({
                        ...formDataAdd,
                        manager_phone: e.target.value,
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
