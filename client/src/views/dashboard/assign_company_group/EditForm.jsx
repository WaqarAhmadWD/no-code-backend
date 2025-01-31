import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

export default function Form() {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const { id, name } = useParams();
  // const [formDataAdd, setFormDataAdd] = useState({ name: name });
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const fetchDataFun = async () => {
    const companies = await dispatch(
      fetchData({
        url: `/company/get`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (companies?.data) {
      setOptions(companies?.data?.map((e)=>({value:e.id,label:e.entity_name})));
    }
    const assign_group_companies = await dispatch(
      fetchData({
        url: `/assign_company_group/get/${id}`,
        loading: false,
        error: false,
        message: false,
      })
    ).unwrap();
    if (assign_group_companies?.data?.companies) {
      setSelected(assign_group_companies?.data?.companies?.map((e)=>e.id));
    }
  };
  const handleEdit = async () => {
    const result = await dispatch(
      fetchData({ url: `/assign_company_group/create`, method: "POST",  data: {
        company_id: selected,
        group_id: id,
      }, })
    ).unwrap();
    if (!result?.error) {
      navigate(`/assign-company-group`);
    }
  };
  useEffect(() => {
    fetchDataFun();
  }, []);

  return (
    <main className="user-role-sec grow">
      <div className=" p-4 sm:px-6 lg:px-5 py-5 r w-full  mx-auto">
        <div className="bg-white py-5 p-4 rounded-md shadow-md">
          <div className="">
            <div className="">
              {/* Close button */}
              <div className="">
                <div className="space-y-4">
                  <div className="text-[1.5rem] mb-4">
                    Group Name: <span className="font-bold">{name}</span>
                  </div>
                  {/* <pre>{JSON.stringify(selected,null,2)}</pre> */}
                  <DualListBox
                  canFilter
                    options={options}
                    selected={selected}
                    onChange={(newValue) => setSelected(newValue)}
                    icons={{
                      moveLeft: <span className="fa fa-chevron-left" />,
                      moveAllLeft: [
                          <span key={0} className="fa fa-chevron-left" />,
                          <span key={1} className="fa fa-chevron-left" />,
                      ],
                      moveRight: <span className="fa fa-chevron-right" />,
                      moveAllRight: [
                          <span key={0} className="fa fa-chevron-right" />,
                          <span key={1} className="fa fa-chevron-right" />,
                      ],
                      moveDown: <span className="fa fa-chevron-down" />,
                      moveUp: <span className="fa fa-chevron-up" />,
                      moveTop: <span className="fa fa-double-angle-up" />,
                      moveBottom: <span className="fa fa-double-angle-down" />,
                  }}
                  />
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
      </div>
    </main>
  );
}
