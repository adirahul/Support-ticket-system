import supportAgent from "../models/supportAgentModel.js";
import supportTicket from "../models/supportTicketModel.js";


let lastAssignedAgentIndex = 0;

export const createTicketController = async(req, res) => {
    try {
        const {topic, description, dateCreated, severity, type, assignedTo, status, resolvedOn} = req.body;
        if (!topic) {
            return res.send({ message: "Topic is required" });
        }
        if (!description) {
          return res.send({ message: "Description is required" });
        }
        if (!dateCreated) {
            return res.send({ message: "DateCreated is required" });
        }
        if (!severity) {
            return res.send({ message: "Severity is required" });
        }
        if (!type) {
            return res.send({ message: "Type is required" });
        }
        if (!assignedTo) {
          return res.send({ message: "AssignedTo is required" });
        }
        if (!status) {
            return res.send({ message: "Status is required" });
        }
        if (!resolvedOn) {
            return res.send({ message: "ResolvedOn is required" });
        }
        //check existing topic
        const existingTopic = await supportTicket.findOne({topic});
        if(existingTopic){
            return res.status(200).send({
                success: "false",
                message: "Ticket exists, create with different topic!",
            })
        }

        const ticket = await new supportTicket({
            topic,
            description,
            dateCreated,
            severity,
            type,
            assignedTo,
            status,
            resolvedOn
        }).save();

        res.status(201).send({
            success: true,
            message: "supportTicket generated successfully!!",
            ticket,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in generating ticket!",
            error,
        });
    }
}

export const getTicketsController = async(req, res) => {
    try {
        let sortBy = req.query.sortBy || 'dateCreated';
        let order = req.query.order || 'desc';
        const tickets = await supportTicket.find().sort({ [sortBy]: order});
        res.status(200).send({
            success: true,
            message: "All support tickets",
            total_tickets: tickets.length,
            tickets,
        })
    } catch (error) {
        console.log("Error in getting tickets: ", error);
        res.status(500).send({
            success: false,
            message: "Error in getting tickets",
            error,
        });
    }
}


export const getFilteredController = async(req, res) => {
    try {
        const {keyword} = req.params;
        //filtering based on status, severity, assignedTo and tyype
        const tickets = await supportTicket.find({
            $or:[
                {status: { $regex : keyword,$options: "i"}},
                {assignedTo: { $regex : keyword,$options: "i"}},
                {severity: { $regex : keyword,$options: "i"}},
                {type: { $regex : keyword,$options: "i"}},
              ]
        });
        res.status(200).send({
            success: true,
            message: "Filtered support tickets",
            tickets_count: tickets.length,
            tickets,
        })
    } catch (e) {
        res.status(500).send({
            message: "Error in getting filtered tickets",
            success: false,
            e,
        })
    }
}

export const assignTicketController = async(req, res) => {
    try {
        const {topic} = req.body;
        const ticket = await supportTicket.findOne({topic});
        const agents = await supportAgent.find();
        const len = agents.length;
        const nextAvailableAgentIndex = (lastAssignedAgentIndex + 1) % len;
        
        await supportTicket.findByIdAndUpdate(ticket._id, {
            assignedTo: agents[nextAvailableAgentIndex].name,
            status: 'Assigned',
        });
        
        lastAssignedAgentIndex = nextAvailableAgentIndex;

        res.status(200).send({
            success: true,
            message: "Ticket assigned to next agent!",
        })
    } catch ( e ) {
        res.status(500).send({
            message: "Error in assigning ticket",
            success: false,
            e,
        })
    }
}