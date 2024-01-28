import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TicketEntryCreation = () => {
  const [formData, setFormData] = useState({
    topic: "",
    severity: "",
    dateCreated: new Date(),
    description: "",
    type: "",
    assignedTo: "",
    status: "New",
    resolvedOn: new Date(),
  });

  const [isCreated, setIsCreated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isFormValid = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.topic.trim()) {
      newErrors.topic = "please enter a topic";
      isValid = false;
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = "please enter whom it is assignedTo";
      isValid = false;
    }
    if (!formData.severity.trim()) {
      newErrors.severity = "please select severity level of the ticket";
      isValid = false;
    }
    if (!formData.type.trim()) {
      newErrors.type = "please enter a type";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "description is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log("form submitted:", formData);
      
      try {
        const res = await axios.post(
          `${process.env.API_ENDPOINT}/api/support-tickets/create-ticket`,
          { ...formData }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          // setTimeout(() => {
          //   navigate("/");
          // }, 2000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }

      toast("New support ticket created!", {
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
      setIsCreated(true);

    } else {
      console.log("form validation failed!");
    }
  };

  const handleAssign = async(e) => {
    e.preventDefault();

      try {
        const res = await axios.post(
          `https://support-ticket-system-api-murex.vercel.app/api/support-tickets/assign-ticket`,
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

      setFormData({
        topic: "",
        severity: "",
        dateCreated: new Date(),
        description: "",
        type: "",
        assignedTo: "",
        status: "",
        resolvedOn: new Date(),
      });
  }

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
            Create ticket entry
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Fill details of ticket
            </p>

            <div>
              <div className="relative">
                <input
                  type="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow`}
                  placeholder="Enter topic"
                />
              </div>
              {errors.topic && (
                <p className="text-red-500 text-xs mt-1"> *{errors.topic}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow`}
                  placeholder="Enter description"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  *{errors.description}
                </p>
              )}
            </div>

          <div>
          <div className="relative w-full rounded-lg p-2 pe-12 text-sm shadow">
              <p className="ml-2 mb-1 text-sm">Date created:</p>
              <DatePicker
                className="w-[300px]"
                showIcon
                toggleCalendarOnIconClick
                showTimeSelect
                selected={formData.dateCreated}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={(date) =>
                  setFormData({ ...formData, dateCreated: date })
                }
              />
            </div>
          </div>

            <div>
              <div className="relative w-full rounded-lg p-2  text-sm shadow">
                <p className="ml-2 mb-1 text-sm">Severity:</p>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow`}
                >
                  <option value="">Select an option</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
                
              {errors.severity && (
                <p className="text-red-500 text-xs mt-1"> *{errors.severity}</p>
              )}
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow`}
                  placeholder="Enter type"
                />
              </div>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1"> *{errors.type}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow`}
                  placeholder="Enter assignedTo"
                />
              </div>
              {errors.assignedTo && (
                <p className="text-red-500 text-xs mt-1">
                  *{errors.assignedTo}
                </p>
              )}
            </div>
            
            <div>
              <div className="relative w-full rounded-lg p-2 text-sm shadow">
                <p className="ml-2 mb-1 text-sm">Status:</p>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full rounded-lg p-4 pe-12 text-sm shadow`}
                  // defaultValue="New"
                >
                  <option value="New">New</option>
                  <option value="Assigned" disabled>Assigned</option>
                  <option value="Resolved" disabled>Resolved</option>
                </select>
              </div>
            </div>
            <div>
              <div className="relative w-full rounded-lg p-2 pe-12 text-sm shadow">
                <p className="ml-2 mb-1 text-sm">Resolved on:</p>
                <DatePicker
                  showIcon
                  className="w-[300px]"
                  toggleCalendarOnIconClick
                  selected={formData.resolvedOn}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  onChange={(date) =>
                    setFormData({ ...formData, resolvedOn: date })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className={`block w-full rounded-lg  px-5 py-3 text-sm font-medium text-white ${!isFormValid ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600'}`}
              disabled={!isFormValid}
            >
              CREATE
            </button>
            <button
              type="submit"
              onClick={handleAssign}
              className={`block w-full rounded-lg  px-5 py-3 text-sm font-medium text-white ${!isCreated ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-800'}`}
              disabled={!isCreated}
            >
              ASSIGN TO AGENT
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

export default TicketEntryCreation;
