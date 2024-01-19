import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-gray-500">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-[380px] items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="https://yt3.googleusercontent.com/M8xfRpGR4IxOs6xkuTkVJQU6ZB2V03jBWtVo1GbVNy_2yndHBoFwA_4bxurMZOqRIydJDcKopA=s900-c-k-c0x00ffffff-no-rj"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="mx-auto lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Make Yoga a habit for life
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Practice yoga with the world's best teachers. At home or
                on-the-go.
              </p>
            </div>
          </section>
          <section className="lg:col-span-7 xl:col-span-6 flex flex-wrap items-center justify-center min-h-[350px] p-8">
            {/* Create Ticket Card */}
            <div className="bg-white rounded-lg p-6 shadow-md h-[200px] w-72 ">
              <h3 className="text-xl font-semibold mb-4">Create Ticket</h3>
              <p className="text-gray-600 mb-4">
                Need assistance? Create a support ticket.
              </p>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-full"
                onClick={() => navigate("/create-ticket")}
              >
                Create Ticket
              </button>
            </div>

            {/* Create Agent Card */}
            <div className="bg-white rounded-lg p-6 shadow-md h-[200px] w-72 ml-8 ">
              <h3 className="text-xl font-semibold mb-4">Create Agent</h3>
              <p className="text-gray-600 mb-4">
                Add a new support agent to your team.
              </p>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-full"
                onClick={() => navigate("/create-agent")}
              >
                Create Agent
              </button>
            </div>

            {/* Additional Card (placed below) */}
            <div className="bg-white rounded-lg p-6 shadow-md h-[190px] w-72">
              <h3 className="text-xl font-semibold mb-4">Get all tickets</h3>
              <p className="text-gray-600 mb-4">Find more about tickets.</p>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-full"
                onClick={() => navigate("/tickets")}
              >
                Support tickets
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
