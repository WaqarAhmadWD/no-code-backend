import DashboardCard01 from "../components/dashboard/cards/DashboardCard01";
import DashboardCard05 from "../components/dashboard/cards/DashboardCard05";
import DashboardCard06 from "../components/dashboard/cards/DashboardCard06";
import DashboardCard07 from "../components/dashboard/cards/DashboardCard07";
import DashboardCard08 from '../components/dashboard/cards/DashboardCard08';
import DashboardCard09 from '../components/dashboard/cards/DashboardCard09';
import DashboardCard10 from '../components/dashboard/cards/DashboardCard10';
import DashboardCard11 from '../components/dashboard/cards/DashboardCard11';
import DashboardCard12 from '../components/dashboard/cards/DashboardCard12';
import DashboardCard13 from '../components/dashboard/cards/DashboardCard13';
import Investor from "./dashboard/investors";
export default function home({permissions}) {
  return (
    <>
      { permissions("do_get") ? (<main className="grow">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Dashboard actions */}

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Line chart (Acme Plus) */}
            <DashboardCard01 />
            {/* Line chart (Acme Advanced) */}

            {/* Line chart (Real Time Value) */}
            <DashboardCard05 />
            {/* Doughnut chart (Top Countries) */}
            <DashboardCard06 />
            {/* Table (Top Channels) */}
            {/* <DashboardCard07 /> */}
            {/* Line chart (Sales Over Time) */}
          </div>
        </div>
        {permissions("do_get",{name:"investor"}) && <div className="md:p-4">
            <Investor permissions={permissions} outsider={true}/>
        </div>}
        {/* <div></div> */}
      </main>):(
       <section className="glow">
       {" "}
       <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
         {" "}
         <div className="mx-auto max-w-screen-sm text-center">
           {" "}
           <h1 className="mb-4  tracking-tight font-extrabold lg:text-9xl text-primary-600 flex justify-center items-center ">
             <img src="/svg/lock.svg" className=" w-24 h-24" alt="locked"/>
           </h1>{" "}
           <p className="mb-4  text-3xl tracking-tight font-bold text-gray-900 md:text-4xl username">
             Roam Around
           </p>{" "}
           <p className="mb-4 text-lg font-light text-gray-500 ">
           You have restricted access to the dashboard statistics
           </p>{" "}
         </div>{" "}
       </div>{" "}
     </section>
      )}
    </>
  );
}
