import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import FilterTickets from "./FilterTickets";
import { Link } from "react-router-dom";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState({
    field: "dateCreated",
    order: "desc",
  });
  const handleSort = (field) => {
    setSortBy((prevSortBy) => ({
      field,
      order:
        prevSortBy.field === field && prevSortBy.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getAllTickets = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.API_ENDPOINT}/api/support-tickets/tickets?sortBy=${sortBy.field}&order=${sortBy.order}`
      );
      setTickets(data.tickets);
    } catch (error) {
      console.log("Error in getting tickets: ", error);
    }
  };
  useEffect(() => {
    getAllTickets();
  }, [sortBy]);
  return (
    <>
      <div className="bg-gray-600 min-h-[800px] p-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <FilterTickets setTickets={setTickets} />

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S. No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Ticket topic
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  <Link to={`/tickets/sort:${sortBy.field}&${sortBy.order}`}>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("dateCreated")}
                    >
                      Date Created
                      <svg
                        className={`w-3 h-3 ms-1.5 ${
                          sortBy.field === "dateCreated"
                            ? sortBy.order === "asc"
                              ? "text-blue-600"
                              : "text-red-400"
                            : "text-gray-100"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </div>
                  </Link>
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  <Link to={`/tickets?sort:${sortBy.field}&${sortBy.order}`}>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("resolvedOn")}
                    >
                      Resolved On
                      <svg
                        className={`w-3 h-3 ms-1.5 ${
                          sortBy.field === "resolvedOn"
                            ? sortBy.order === "asc"
                              ? "text-blue-600"
                              : "text-red-400"
                            : "text-gray-100"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </div>
                  </Link>
                </th>
              </tr>
            </thead>
            {tickets.map((ticket, id) => (
              <tbody key={id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{id + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {ticket.topic}
                  </th>
                  {/* moment(inputDate).format('MM/DD/YYYY HH:mm:ss') */}
                  <td className="px-6 py-4">{ticket.description}</td>
                  <td className="px-6 py-4">
                    {moment(ticket.dateCreated).format("MM/DD/YYYY HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">{ticket.assignedTo}</td>
                  <td className="px-6 py-4">{ticket.status}</td>
                  <td className="px-6 py-4">{ticket.severity}</td>
                  <td className="px-6 py-4">{ticket.type}</td>
                  <td className="px-6 py-4">
                    {moment(ticket.resolvedOn).format("MM/DD/YYYY HH:mm:ss")}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default SupportTickets;
