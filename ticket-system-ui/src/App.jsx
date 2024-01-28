import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AgentCreation from "./screens/AgentCreation";
import TicketEntryCreation from "./screens/TicketEntryCreation";
import SupportTickets from "./components/SupportTickets";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/create-ticket" element={<TicketEntryCreation/>}/>
        <Route path="/create-agent" element={<AgentCreation/>}/>
        <Route path="/tickets/:sortBy?" element={<SupportTickets/>}/>
      </Routes>
    </>
  );
}

export default App;
