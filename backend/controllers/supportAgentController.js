import supportAgent from "../models/supportAgentModel.js";


export const createAgentController = async (req, res) => {
    try {
        const { name, email, phone, description, active, dateCreated } = req.body;
    
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: "Email is required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is required" });
        }
        if (!description) {
          return res.send({ message: "Description is required" });
        }
        
      //   Check Agent
      const existingAgent = await supportAgent.findOne({ email });
      // existing Agent
      if (existingAgent) {
        return res.status(200).send({
          success: false,
          message: "Agent Already Exists Please Login...",
        });
      }
  
      const agent = await new supportAgent({
        name,
        email,
        phone,
        description,
        active,
        dateCreated
      }).save();
      
  
      res.status(201).send({
        success: true,
        message: "supportAgent created Successfully!!!",
        agent,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in creating agent",
        error,
      });
    }
};
  