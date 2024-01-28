import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgentCreation = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isFormValid = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "please enter a valid email address";
      isValid = false;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "please enter a 10-digit phone number";
      isValid = false;
    }

    // Name validation (assuming it should not be empty)
    if (!formData.name.trim()) {
      newErrors.name = "name is required";
      isValid = false;
    }

    // Description validation (assuming it should not be empty)
    if (!formData.description.trim()) {
      newErrors.description = "description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log("form submitted:", formData);

      try {
        const res = await axios.post(
          `${process.env.API_ENDPOINT}/api/support-agents/create-agent`,
          { ...formData }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Something went wromg");
        console.log(error);
      }

      toast("New support agent created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setFormData({
        email: "",
        name: "",
        phone: "",
        description: "",
      });
    } else {
      console.log("form validation failed!");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Create support agent
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Fill details of agent
            </p>

            <div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow border-red-500`}
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1"> *{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow border-red-500`}
                  placeholder="Enter name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1"> *{errors.name}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow border-red-500`}
                  placeholder="Enter Phone"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1"> *{errors.phone}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow border-red-500`}
                  placeholder="Enter description"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  *{errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              CREATE
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default AgentCreation;
