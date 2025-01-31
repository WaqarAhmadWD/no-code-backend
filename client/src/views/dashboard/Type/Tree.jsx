const TreeRendering = ({data,level=0, selected,setSelected}) => {
    const deep_level = 3;
    const selectSubTree = (id)=> {
        if(deep_level -1 === level){
            setSelected(() => id);
        }
    }
    return (
        <>
        <div
        className={`parent-level-${level}`}
        >
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className={`inner-parent-level-${level}`}
                >
                <div onClick={()=> selectSubTree(item?.id)}  className={`cursor-pointer level-${level} item-${index} unique-id-${item?.id} ${selected == item?.id?"active":"" }  border mb-4 mx-2 border-black rounded-lg text-xs p-2 flex justify-center items-center`} >
                  {item?.name?.slice(0,10) }{ item?.name?.length > 10 ?"...":"" }
                </div>
                {item.children && item.children.length ? (
                    <div
                  >
                    {TreeRendering({ data: item.children, level: level + 1,selected, setSelected })}
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </>
      
    );
}
export default TreeRendering;