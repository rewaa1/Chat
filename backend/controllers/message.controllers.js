import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecevierSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try{
        const { message } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, reciverId],
            });
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //  await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);


        const reciverSocketId = getRecevierSocketId(reciverId);
        if(reciverSocketId){
            // io.to(<socketi_id>).emit is used to send events to specific client 
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }

        

        res.status(201).json(newMessage)
    }catch(error){
        console.log("error sendMessage", error.message);
        res.status(400).json({error:"internal server error"})
    }
}

export const getMessage = async (req, res) =>{
    try{

        const { id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{ $all: [senderId, userToChatId]},    
        }).populate("messages"); // GETTING THE ACTUAL MESSAGES 

        if(!conversation) return res.status(200).json({});
        const messages = conversation.messages

        res.status(200).json(messages);

    }catch (error){
        console.log("error getMessage", error.message);
        res.status(400).json({error:"internal server error"})
    }
}