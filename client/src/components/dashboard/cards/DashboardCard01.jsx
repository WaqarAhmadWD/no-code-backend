
import { useDispatch } from "react-redux";
import { fetchData } from "../../../store/slices/apiSlices";
import { useEffect, useState } from "react";

const SvgDownUp = ({isUp}) => {
  if(isUp === true){
    return (
      <svg width="22" height="18" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.028 0.32616L23.2823 3.21708L16.3474 9.37765L10.6631 4.328L0.132812 13.6951L2.13655 15.4751L10.6631 7.90063L16.3474 12.9503L25.3003 5.00971L28.5546 7.90063L28.5546 0.326159L20.028 0.32616Z" fill="#3EB100" />
    </svg>
    )
  }else if(isUp === false){
    return(
      <svg width="22" height="12" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7033 15.4751L23.9576 12.5842L17.0227 6.42362L11.3384 11.4733L0.808105 2.10617L2.81184 0.326172L11.3384 7.90064L17.0227 2.85099L25.9756 10.7916L29.2298 7.90064V15.4751H20.7033Z" fill="#F93C65" />
            </svg>
    )
  }
}
function DashboardCard01() {
  const [data,setData] = useState();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const fetchDataFun = async (notif = true) => {
    setLoading(true);
  try {
    const result = await dispatch(
      fetchData({
        url: `/dashboard/get-statistics`,
        loading: true,
        error: notif,
        message: false,
        refresh: !notif,
      })
    ).unwrap();

    if (result?.data) setData(result.data);
    return result?.total_fields || 0;
  } catch (error) {
    console.error("Error fetching data:", error);
    // You can show a notification or handle the error here if needed
  } finally {
    setLoading(false); // Ensure loading is false even if the request fails
  }
  };
    useEffect(() => {
      fetchDataFun(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <>
      <div className={`${loading ? "opacity-0":"opacity-[1]"} transition-all duration-[0] border border-indigo-300 flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-sm rounded-xl `}>
          {/* {JSON.stringify(data,null,2)} */}
        <div className="p-4">
          <header className="flex justify-between items-start mb-2">
            <div className='d-flex flex-col'>
              <h2 className="text-lg font-semibold text-xs mb-3  text-gray-400">Total Customer</h2>
              <div className="text-3xl font-bold text-gray-800 mr-2 blue-text">{(data?.investor?.total_fields) || "No Data"}</div>
            </div>
            <div>

              <svg width="55" height="56" viewBox="0 0 86 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0.550781 38.0708V46.9077C0.550781 62.9436 13.5504 75.9432 29.5863 75.9432H43.1834H56.7806C72.8164 75.9432 85.816 62.9435 85.816 46.9077V38.0708V29.2339C85.816 13.1981 72.8164 0.198486 56.7805 0.198486H43.1834H29.5862C13.5504 0.198486 0.550781 13.1981 0.550781 29.234V38.0708Z" fill="#1D3C6A" />
                <path fillRule="evenodd" clipRule="evenodd" d="M32.1836 30.9485C32.1836 29.8651 32.397 28.7923 32.8116 27.7913C33.2262 26.7904 33.8339 25.8809 34.6 25.1149C35.366 24.3488 36.2755 23.7411 37.2765 23.3265C38.2774 22.9119 39.3502 22.6985 40.4336 22.6985C41.517 22.6985 42.5898 22.9119 43.5907 23.3265C44.5917 23.7411 45.5011 24.3488 46.2672 25.1149C47.0333 25.8809 47.641 26.7904 48.0556 27.7913C48.4702 28.7923 48.6836 29.8651 48.6836 30.9485C48.6836 33.1365 47.8144 35.2349 46.2672 36.7821C44.7201 38.3293 42.6216 39.1985 40.4336 39.1985C38.2456 39.1985 36.1471 38.3293 34.6 36.7821C33.0528 35.2349 32.1836 33.1365 32.1836 30.9485ZM59.6836 28.1985H51.4336V25.4485H59.6836V28.1985ZM59.6836 33.6985H51.4336V30.9485H59.6836V33.6985ZM59.6836 39.1985H51.4336V36.4485H59.6836V39.1985ZM26.6836 55.6985V54.3235C26.6836 51.0414 27.9874 47.8938 30.3081 45.573C32.6289 43.2523 35.7765 41.9485 39.0586 41.9485H41.8086C45.0906 41.9485 48.2383 43.2523 50.559 45.573C52.8798 47.8938 54.1836 51.0414 54.1836 54.3235V55.6985H26.6836Z" fill="#1D3C6A" />
              </svg>
            </div>
          </header>
          {data?.investor?.growthRate && <div className='flex justify-start items-center gap-3 mt-3'>
          <SvgDownUp isUp={data?.investor?.isGrowing}/>

            <h6 className='custoer-growth-text font-size-10'>{data?.investor?.isGrowing? `Up ${data?.investor?.growthRate}% Last 30 days customer`:`Down ${data?.investor?.growthRate}% Last 30 days customer`}</h6>
          </div>}
        </div>
      </div>
      <div className={`${loading ? "opacity-0":"opacity-[1]"} transition-all duration-[1s] border border-indigo-300 flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-sm rounded-xl`}>
        <div className="p-4">
          <header className="flex justify-between items-start mb-2">
            <div className='d-flex flex-col'>
              <h2 className="text-lg font-semibold text-xs mb-3  text-gray-400">Total Companies</h2>
              <div className="text-3xl font-bold text-gray-800 mr-2 blue-text">{(data?.company?.total_fields) || "No Data"}</div>
            </div>
            <div>

              <svg width="55" height="56" viewBox="0 0 87 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0.875488 38.0708V46.9077C0.875488 62.9436 13.8751 75.9432 29.911 75.9432H43.5081H57.1053C73.1411 75.9432 86.1407 62.9435 86.1407 46.9077V38.0708V29.2339C86.1407 13.1981 73.1411 0.198486 57.1052 0.198486H43.5081H29.9109C13.8751 0.198486 0.875488 13.1981 0.875488 29.234V38.0708Z" fill="#1D3C6A" />
                <path d="M45.1578 34.2485H27.0078V37.5485H45.1578V34.2485ZM45.1578 27.6485H27.0078V30.9485H45.1578V27.6485ZM27.0078 44.1485H38.5578V40.8485H27.0078V44.1485ZM57.5328 36.7235L60.0078 39.1985L48.4578 50.7485L41.0328 43.3235L43.5078 40.8485L48.4578 45.7985L57.5328 36.7235Z" fill="#1D3C6A" />
              </svg>

            </div>
          </header>
          {data?.company?.growthRate && <div className='flex justify-start items-center gap-3 mt-3'>
          <SvgDownUp isUp={data?.company?.isGrowing}/>

<h6 className='custoer-growth-text font-size-10'>{data?.company?.isGrowing? `Up ${data?.company?.growthRate}% Last 30 days company`:`Down ${data?.company?.growthRate}% Last 30 days company`}</h6>

          </div>}
        </div>
      </div>
      <div className={`${loading ? "opacity-0":"opacity-[1]"} transition-all duration-[1.5s] border border-indigo-300 flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-sm rounded-xl`}>
        <div className="p-4">
          <header className="flex justify-between items-start mb-2">
            <div className='d-flex flex-col'>
              <h2 className="text-lg font-semibold text-xs mb-3  text-gray-400">Total Investment</h2>
              <div className="text-3xl font-bold text-gray-800 mr-2 blue-text">$42,000</div>
            </div>
            <div>

              <svg width="55" height="56" viewBox="0 0 86 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0.200684 38.0708V46.9077C0.200684 62.9436 13.2003 75.9432 29.2362 75.9432H42.8333H56.4305C72.4663 75.9432 85.4659 62.9435 85.4659 46.9077V38.0708V29.2339C85.4659 13.1981 72.4663 0.198486 56.4304 0.198486H42.8333H29.2361C13.2003 0.198486 0.200684 13.1981 0.200684 29.234V38.0708Z" fill="#1D3C6A" />
                <path fillRule="evenodd" clipRule="evenodd" d="M29.4268 21.5708V51.4771H59.333V54.5708H26.333V21.5708H29.4268ZM45.1533 47.9197L39.4299 43.0212L33.5002 49.0025L32.0564 47.5587L39.3267 40.1853L44.8439 44.9806L57.322 29.254L58.9205 30.5431L45.1533 47.9197Z" fill="#1D3C6A" />
              </svg>
            </div>
          </header>
          <div className='flex justify-start items-center gap-3 mt-3'>
            <svg width="22" height="18" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.028 0.32616L23.2823 3.21708L16.3474 9.37765L10.6631 4.328L0.132812 13.6951L2.13655 15.4751L10.6631 7.90063L16.3474 12.9503L25.3003 5.00971L28.5546 7.90063L28.5546 0.326159L20.028 0.32616Z" fill="#3EB100" />
            </svg>


            <h6 className='custoer-growth-text font-size-10'>+$20,000 Last 30 days investment</h6>
          </div>
        </div>
      </div>
      <div className={`${loading ? "opacity-0":"opacity-[1]"} transition-all duration-[2s] border border-indigo-300 flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-sm rounded-xl`}>
        <div className="p-4">
          <header className="flex justify-between items-start mb-2">
            <div className='d-flex flex-col'>
              <h2 className="text-lg font-semibold text-xs mb-3  text-gray-400">Total Expense</h2>
              <div className="text-3xl font-bold text-gray-800 mr-2 blue-text">$30,000</div>
            </div>
            <div>

              <svg width="55" height="56" viewBox="0 0 86 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0.550781 38.0708V46.9077C0.550781 62.9436 13.5504 75.9432 29.5863 75.9432H43.1834H56.7806C72.8164 75.9432 85.816 62.9435 85.816 46.9077V38.0708V29.2339C85.816 13.1981 72.8164 0.198486 56.7805 0.198486H43.1834H29.5862C13.5504 0.198486 0.550781 13.1981 0.550781 29.234V38.0708Z" fill="#1D3C6A" />
                <path fillRule="evenodd" clipRule="evenodd" d="M32.1836 30.9485C32.1836 29.8651 32.397 28.7923 32.8116 27.7913C33.2262 26.7904 33.8339 25.8809 34.6 25.1149C35.366 24.3488 36.2755 23.7411 37.2765 23.3265C38.2774 22.9119 39.3502 22.6985 40.4336 22.6985C41.517 22.6985 42.5898 22.9119 43.5907 23.3265C44.5917 23.7411 45.5011 24.3488 46.2672 25.1149C47.0333 25.8809 47.641 26.7904 48.0556 27.7913C48.4702 28.7923 48.6836 29.8651 48.6836 30.9485C48.6836 33.1365 47.8144 35.2349 46.2672 36.7821C44.7201 38.3293 42.6216 39.1985 40.4336 39.1985C38.2456 39.1985 36.1471 38.3293 34.6 36.7821C33.0528 35.2349 32.1836 33.1365 32.1836 30.9485ZM59.6836 28.1985H51.4336V25.4485H59.6836V28.1985ZM59.6836 33.6985H51.4336V30.9485H59.6836V33.6985ZM59.6836 39.1985H51.4336V36.4485H59.6836V39.1985ZM26.6836 55.6985V54.3235C26.6836 51.0414 27.9874 47.8938 30.3081 45.573C32.6289 43.2523 35.7765 41.9485 39.0586 41.9485H41.8086C45.0906 41.9485 48.2383 43.2523 50.559 45.573C52.8798 47.8938 54.1836 51.0414 54.1836 54.3235V55.6985H26.6836Z" fill="#1D3C6A" />
              </svg>
            </div>
          </header>
          <div className='flex justify-start items-center gap-3 mt-3'>
            <svg width="22" height="12" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.028 0.32616L23.2823 3.21708L16.3474 9.37765L10.6631 4.328L0.132812 13.6951L2.13655 15.4751L10.6631 7.90063L16.3474 12.9503L25.3003 5.00971L28.5546 7.90063L28.5546 0.326159L20.028 0.32616Z" fill="#3EB100" />
            </svg>



            <h6 className='custoer-growth-text font-size-10'>- $5,000 Last 30 days expense</h6>
          </div>
        </div>
      </div>

    </>
  );
}

export default DashboardCard01;
