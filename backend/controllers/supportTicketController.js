import supportTicket from "../models/supportTicketModel.js";

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
        const tickets = await supportTicket.find({});
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
