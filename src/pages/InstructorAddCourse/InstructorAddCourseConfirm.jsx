import * as React from "react";
import { Link } from 'react-router-dom';


function Confirmation() {
  return (
    <div className="flex flex-col items-center px-3.5 py-20 mx-auto w-full text-3xl text-center text-white bg-white shadow-sm max-w-[480px]">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/72974eaa155a251e6c74dda4c51df31f1136504696049f499f84255e34843624?apiKey=c5df811824c24081a17b55f8fa94a3d0&"
        className="mt-5 w-full rounded-full aspect-[1.05] max-w-[296px]"
      />
      <div className="mt-12 text-4xl text-black">
        Your course has been submitted
      </div>
      <Link to="/dashboardInstructor">
        <div className="justify-center items-center self-stretch px-16 py-6 mt-24 rounded-3xl shadow-sm bg-slate-500">
          Go to Dashboard
        </div>
      </Link>
    </div>
  );
}

export default Confirmation;



