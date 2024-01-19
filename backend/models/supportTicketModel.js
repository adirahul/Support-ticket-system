import { Schema, model } from "mongoose";

const supportTicketSchema = new Schema({
    topic: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    severity: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        default: 'New',
        enum: ['New', 'Assigned', 'Resolved'],
    },
    resolvedOn: {
        type: Date,
        required: true,
    }
});

const supportTicket = model("supportTicket", supportTicketSchema);

export default supportTicket;
