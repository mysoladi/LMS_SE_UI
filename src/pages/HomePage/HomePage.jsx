import * as React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="relative">
      <div className="flex justify-between items-center py-4 px-6 max-md:px-4 relative z-50" style={{ background: '#2B396B' }}>
        <div className="text-xl font-bold text-zinc-50">Edunexa</div>
      </div>


      <div className="pl-20 bg-zinc-50 max-md:pl-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c39b6338bbfe5dc7385aad53b17e1f7a377c10938951ee4a95e05566f6d77166?apiKey=c5df811824c24081a17b55f8fa94a3d0&"
                      className="grow w-full aspect-[1.43] max-md:mt-1.5"
                    />
                  </div>
                  <div className="" style={{ marginLeft: "-5px" }}>
                    <div className="flex flex-col mt-7 text-5xl font-bold whitespace-nowrap max-md:mt-9 max-md:text-4xl">
                      <div className="flex gap-1.5 ">
                        <div className="text-cyan-800 max-md:text-4xl" style={{ color: '#2B396B' }}>E</div>

                        <div className="flex-auto text-black max-md:text-4xl">duNexa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3.5 mt-28 text-base font-bold max-md:flex-wrap max-md:mt-10">
                <Link to="/login">
                  <div className="justify-center px-7 py-5 rounded-xl border border-black border-solid text-zinc-50 max-md:px-5 hover:bg-cyan-700 transition-colors duration-300" style={{ background: '#2B396B' }}>
                    Login
                  </div>
                </Link>
                <Link to="/signup">
                  <div className="justify-center px-7 py-5 text-black rounded-xl border border-black border-solid bg-zinc-50 max-md:px-5 hover:bg-gray-300 transition-colors duration-300">
                    Signup
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/88bf6e9ff04faf4cd733c44187c61fbefa346b6a6d8eb526bdf98c178f6e3cde?apiKey=c5df811824c24081a17b55f8fa94a3d0&"
              className="grow w-full aspect-[0.9] fill-[linear-gradient(179deg,#2B396B_0.69%,rgba(66,134,143,0.00)_151.24%)] max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
