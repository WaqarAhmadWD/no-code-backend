import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices.js";
import { useNavigate } from "react-router-dom";

const NestedForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    children: [],
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // TODO: it should be 5 if you want upto 5.
  const deep_level = 2;

  const handleAdd = async () => {
    
    const result = await dispatch(
      fetchData({
        url: `/type/create`,
        method: "POST",
        data: { ...formData },
      })
    ).unwrap();
    if (!result?.error) {
      navigate("/type");
    }
  };

  const handleAddLevel = (path) => {
    const addChild = (data, path, currentDepth) => {
      if (path.length === 0) {
        return [...data, { name: "", children: [] }];
      }
      const [current, ...rest] = path;
      return data.map((item, index) =>
        index === current
          ? {
              ...item,
              children:
                currentDepth < deep_level
                  ? addChild(item.children || [], rest, currentDepth + 1)
                  : item.children,
            }
          : item
      );
    };

    setFormData((prev) => ({
      ...prev,
      children: addChild(prev.children, path, 1),
    }));
  };

  // Remove input
  const handleRemoveLevel = (path) => {
    const removeChild = (data, path) => {
      if (path.length === 1) {
        return data.filter((_, index) => index !== path[0]);
      }
      const [current, ...rest] = path;
      return data.map((item, index) =>
        index === current
          ? {
              ...item,
              children: removeChild(item.children || [], rest),
            }
          : item
      );
    };
    setFormData((prev) => ({
      ...prev,
      children: removeChild(prev.children, path),
    }));
  };

  // Update input value
  const handleInputChange = (path, value) => {
    const updateData = (data, path) => {
      if (path.length === 1) {
        return data.map((item, index) =>
          index === path[0] ? { ...item, name: value } : item
        );
      }
      const [current, ...rest] = path;
      return data.map((item, index) =>
        index === current
          ? {
              ...item,
              children: updateData(item.children || [], rest),
            }
          : item
      );
    };
    setFormData((prev) => ({
      ...prev,
      children: updateData(prev.children, path),
    }));
  };

  // Recursive rendering of levels
  const renderLevels = (levels, path = [], currentDepth = 1, parentName = "") =>
    levels.map((level, index) => (
      <div key={`${path.join("-")}-${index}_id`} style={{ marginLeft: "40px" }}>
        {(parentName?.length > 0 || (currentDepth == 1 && formData.name)) && (
  <div className="flex gap-1 items-center">
    <span className="text-gray-500 text-sm ">
      {parentName || (currentDepth == 1 && formData.name)}{" "}
    </span>
    <img
      src="/images/right-and-down.svg"
      className="w-[0.5rem] rotate-90"
      alt=""
    />
  </div>
)}

        <input
          type="text"
          value={level.name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
          onChange={(e) => handleInputChange([...path, index], e.target.value)}
          placeholder={`Level ${currentDepth} Name`}
        />
        {currentDepth < deep_level && (
          <button
            onClick={() => handleAddLevel([...path, index])}
            disabled={currentDepth >= deep_level} 
            className="m-2 text-white blue-bg text-sm px-3 py-1 rounded-md text-center "
          >
            +
          </button>
        )}
        <button
          className="m-2 text-white blue-bg text-sm px-3 py-1 rounded-md text-center "
          onClick={() => handleRemoveLevel([...path, index])}
        >
          -
        </button>
        {renderLevels(
          level.children || [],
          [...path, index],
          currentDepth + 1,
          level.name
        )}
      </div>
    ));

  return (
    <div className="p-10">
      <div>
      <h1 className="text-xl blue-text font-weight700 mb-4">Types</h1>
      <h1 className="text-xs font-bold blue-gray-2  00 mb-4">Note: In case of less levels, the second last will be duplated automatically</h1>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Type Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
        />
        <button
          className="m-2 text-white blue-bg text-sm px-3 py-1 rounded-md text-center "
          onClick={() => handleAddLevel([])}
        >
          +
        </button>
      </div>

      {renderLevels(formData.children)}
      <button
        type="submit"
        className=" text-white blue-bg text-sm px-5 py-2 rounded-md text-center "
        onClick={() => handleAdd()}
      >
        Submit
      </button>
    </div>
  );
};

export default NestedForm;
