import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import { convertToChildren } from "../../../utils/lib_utils.js";
// import Tree from "./Tree.jsx";
import PropTypes from 'prop-types';
const NestedForm = ({id,getData }) => {
  // const id = undefined;
  const [formData, setFormData] = useState([]);
  const [selected, setSelected] = useState([]);
  // const [selectedTree, setSelectedTree] = useState(null);
  const [storeId, setStoreId] = useState([]);
  const dispatch = useDispatch()
  const deep_level = 2;

  
  const fetchDataFunc = async () => {
    const result = await dispatch(
      fetchData({
        url: `/type/get`,
        method: "GET",
        message:false,
      })
    ).unwrap();
    if (!result?.error) {
      const convertedData = convertToChildren(result.data);
      if(id){
        const selectedItems = searchForSelectOnDeepLevel(convertedData,id);
        const sortedData = sortDataByIds(convertedData,selectedItems?.map(e=>e[1]) || [])
        setStoreId(selectedItems?.map(e=>e[1]) || []);
        console.log("fired",convertedData,selectedItems?.map(e=>e[0]),selectedItems?.map(e=>e[1]),id);
        setFormData(sortedData);
        setSelected([0,0,0,0,0,0]);
        console.log("sortedData",sortedData)
      }else{
        setFormData(convertedData);
        
      }
    }
  };
  const sortDataByIds = (data, idArray, level = 0) => {
    // Sort the current level based on idArray[level]
    const sortedData = data.sort((a, b) => {
      if (a.id === idArray[level]) return -1;
      if (b.id === idArray[level]) return 1;
      return 0;
    });
  
    // Recursively sort children if present
    for (const item of sortedData) {
      if (item.children && item.children.length > 0) {
        item.children = sortDataByIds(item.children, idArray, level + 1);
      }
    }
  
    return sortedData;
  };
  
  const searchForSelectOnDeepLevel = (data = formData,id, level = 0, path = []) => {
    for (const [index, item] of data.entries()) {
      const currentPath = [...path, [index,item.id]]; // Maintain the path to the current node
      // console.log(`level-${level}: checking id=${item.id}`);
    
      if (item.id === id && level === deep_level) {
        // console.log("Match found:", currentPath);
        return currentPath; // Return the path when a match is found
      }
    
      if (item.children?.length > 0) {
        const result = searchForSelectOnDeepLevel(item.children,id, level + 1, currentPath);
        if (result) return result; // If a match is found in recursion, return it
      }
    }
    
  
    return null; // No match found at this branch
  };

  
  useEffect(() => {
    if (formData && formData[selected[0]]?.children[selected[1]]?.children[
      selected[2]
    ]?.children[selected[3]]?.children[selected[4]]?.children?.length > 0) {
      const updatedStoreId = [...storeId];
      updatedStoreId[5] = formData && formData[selected[0]]?.children[selected[1]]?.children[
        selected[2]
      ]?.children[selected[3]]?.children[selected[4]]?.children[0]?.id;
      setStoreId(updatedStoreId)
    }else
    if (formData && formData[selected[0]]?.children[selected[1]]?.children[
      selected[2]
    ]?.children[selected[3]]?.children?.length > 0) {
      const updatedStoreId = [...storeId];
      updatedStoreId[4] = formData && formData[selected[0]]?.children[selected[1]]?.children[
        selected[2]
      ]?.children[selected[3]]?.children[0]?.id;
      setStoreId(updatedStoreId)
    }else
    if (formData && formData[selected[0]]?.children[selected[1]]?.children[
      selected[2]
    ]?.children?.length > 0) {
      const updatedStoreId = [...storeId];
      updatedStoreId[3] = formData && formData[selected[0]]?.children[selected[1]]?.children[
        selected[2]
      ]?.children[0]?.id;
      setStoreId(updatedStoreId)
    }else
    if (formData && formData[selected[0]]?.children[selected[1]]?.children?.length > 0) {
      const updatedStoreId = [...storeId];
      updatedStoreId[2] = formData && formData[selected[0]]?.children[selected[1]]?.children[
        0
      ]?.id;
      setStoreId(updatedStoreId)
    }else
    if (formData && formData[selected[0]]?.children?.length > 0) {
      const updatedStoreId = [...storeId];
      updatedStoreId[1] = formData && formData[selected[0]]?.children[0]?.id;
      setStoreId(updatedStoreId)
    }else
    if (formData?.length > 0) {
      const updatedStoreId = [...storeId];
      updatedStoreId[0] = formData && formData[0]?.id;
      setStoreId(updatedStoreId)
    }
  }, [selected, formData]);
  const handleChange = (e, index) => {
    const updatedSelected = [...selected]; // Copy the existing array
    const selectedIndex = e.target.selectedIndex; // Get the selected index (adjust for default option)
    updatedSelected.splice(index);
    // store ids
    const updatedIds = [...storeId];
    updatedIds.splice(index);
    if (updatedSelected.length > index) {
      // If the array has elements, update the first one
      updatedSelected[index] = selectedIndex >= 0 ? selectedIndex : null;
      updatedIds[index] = parseInt(e.target.value);
    } else {
      // If the array is empty, insert the new value at the start
      updatedSelected.splice(
        index,
        0,
        selectedIndex >= 0 ? selectedIndex : null
      );
      updatedIds.splice(
        index,
        0,
        parseInt(e.target.value)
      );
    }
    getData(updatedIds[deep_level]);
    console.log(updatedSelected,updatedIds)
    // Update the state with the modified array
    setSelected(updatedSelected);
    setStoreId(updatedIds)
  };

  useEffect(() => {
    fetchDataFunc();
  }, []);
  return (
    <div>
    <div className="flex flex-col w-full gap-4">
      {/* type */}
      <div> 
        {/* selected:
        {JSON.stringify(selected,null,2)}
        id:
        {JSON.stringify(storeId,null,2)} */}
      <label htmlFor="type__" className="text-xs text-gray-500 font-bold">Level 01</label>
      <select name="type__" id="type__" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   onClick={(e) => handleChange(e, 0)}>
        {formData &&
          formData.map((item) => (
           <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
      </select>
      </div>
      {/* level 01 */}
      {deep_level >= 1 && selected[0] != null && formData && formData[selected[0]]?.children?.length > 0 && (
        <div>
        <label htmlFor="type__" className="text-xs text-gray-500 font-bold">Level 02</label>
        <select name="" id=""   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  onClick={(e) => handleChange(e, 1)}>
         {formData[selected[0]]?.children?.map((item, index) => (
            <option key={index} value={item?.id}>
              {item?.name}
            </option>
          ))}
         {/* <option value={-1} disabled>Default value</option> */}
        </select>
        </div>
      )}
      {/* level 02 */}
      {deep_level >= 2 && selected[1] != null && formData && formData[selected[0]]?.children[selected[1]]?.children?.length > 0 && (
        <div>
          {/* TODO: defaultValue is id in deep level 3  */}
          {/* {id} */}
          <label htmlFor="type__" className="text-xs text-gray-500 font-bold">Level 03</label>
       <select name="" id=""  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   onClick={(e) => handleChange(e, 2)}>
          {formData[selected[0]]?.children[selected[1]]?.children?.map(
            (item, index) => (
              <option key={index} value={item?.id}>
                {item?.name}
              </option>
            )
          )}
         {/* <option value={-1} disabled>Default value</option> */}
        </select>
        </div>
      )}
      {/* level 03 */}
      {deep_level >= 3 && selected[2] != null && formData && formData[selected[0]]?.children[selected[1]]?.children[
            selected[2]
          ]?.children?.length > 0 && (
            <div>
          <label htmlFor="type__" className="text-xs text-gray-500 font-bold">Level 04</label>
        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   onClick={(e) => handleChange(e, 3)}>
          {formData[selected[0]]?.children[selected[1]]?.children[
            selected[2]
          ]?.children.map((item, index) => (
            <option key={index} value={item?.id}>
              {item?.name}
            </option>
          ))}
         {/* <option value={-1} disabled>Default value</option> */}
        </select>
        </div>
      )}
      {/* level 04 */}
      {deep_level >= 4 && selected[3] != null && formData && formData[selected[0]]?.children[selected[1]]?.children[
            selected[2]
          ]?.children[selected[3]]?.children?.length > 0 && (
      <div>
      <label htmlFor="type__" className="text-xs text-gray-500 font-bold">Level 05</label>
        <select name="" id=""  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onClick={(e) => handleChange(e, 4)}>
          {formData[selected[0]]?.children[selected[1]]?.children[
            selected[2]
          ]?.children[selected[3]]?.children.map((item, index) => (
            <option key={index} value={item?.id}>
              {item?.name}
            </option>
          ))}
          {/* <option value={-1} selected>default value</option> */}
        </select>
        </div>
      )}
      {/* level 05 */}
      {deep_level >= 5 && selected[4] != null && formData && formData[selected[0]]?.children[selected[1]]?.children[
            selected[2]
          ]?.children[selected[3]]?.children[selected[4]]?.children?.length > 0  && (
      <div>
      <label htmlFor="type__" className="text-xs text-gray-500 font-bold">Level 06</label>
        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"   onClick={(e) => handleChange(e, 5)}>
          {formData[selected[0]]?.children[selected[1]]?.children[
            selected[2]
          ]?.children[selected[3]]?.children[selected[4]]?.children.map(
            (item, index) => (
              <option key={index} value={item?.id}>
                {item?.name}
              </option>
            )
          )}
         {/* <option value={-1} disabled>Default value</option> */}
        </select>
        </div>
      )}
      {/* <pre>{JSON.stringify(selected,null,2)}</pre> */}
    
      {/* <button
        type="submit"
        className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
      >
        Find defaults
      </button> */}
    </div>
    <div className="w-full">
      {/* <Tree data={formData} selected={selectedTree} setSelected={setSelectedTree}/> */}
    </div>
    </div>
  );
};

NestedForm.displayName = 'NestedForm';
NestedForm.propTypes = {
  id: PropTypes.number,
  getData: PropTypes.func
};
export default NestedForm;
