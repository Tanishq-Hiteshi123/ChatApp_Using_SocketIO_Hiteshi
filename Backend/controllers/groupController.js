const { Sequelize, where } = require("sequelize");
const Group = require("../Models/groupModel.js");
const errorHandler = require("../utils/errorHandler.js")
const unknownErrorHandler = require("../utils/unknownErrorHandler");
const responseHandler = require("../utils/responseHandler");
const { v4: uuidv4 } = require('uuid');
const { GROUP_CREATED } = require("../EventEmitter.js");
const { getSocketInstance } = require("../configurations/socketConfig.js");
const User = require("../Models/userModel.js");

//  Fetch All The Group Details :-
const getAllGroups = async (req, res) => {

    try {

        const authUser = req.user;

        //  Fetch all the group in which the authUser is a member :-
        const allGroups = await Group.findAll({
            where: {
                members: {
                    [Sequelize.Op.contains]: [authUser.id]
                }
            }
        })

        return responseHandler(res, 200, "All Groups", allGroups)

    }
    catch (error) {

        return unknownErrorHandler(res, error.message)

    }

}

const createGroup = async (req, res) => {

    try {

        const io = getSocketInstance()

        if (!io) {
            throw new Error("Socket is not initailized yet...")
        }

        const { name, members } = req.body;



        if (!name || !members) {

            return errorHandler(res, 400, "Please Provide All Details")

        }

        if (members.length < 2) {
            return errorHandler(res, 400, "Making Group atleast 3 members are required")
        }

        //   Generate the UUID for group Id :-
        const groupId = uuidv4()

        const allMembers = [...members, req.user.id]

        // Create the group :-
        const newGroup = await Group.create({
            name: name,
            members: allMembers,
            groupId,
            createdBy: req.user.id
        })

        if (!newGroup) {

            return errorHandler(res, 400, "Group could not be created")

        }


        io.emit("group_created", {
            type: "New Group Created",
            newGroup
        })




        return responseHandler(res, 200, "Group Created SuccessFully", newGroup)


    }
    catch (error) {

        return unknownErrorHandler(res, error.message)

    }

}


const addNewMembersToGroup = async (req, res) => {

    try {
        console.log("object")
        const io = getSocketInstance()

        if (!io) {
            throw new Error("Socket is not initailized yet...")

        }
        const { name, members } = req.body;

        if (!name || !members) {
            return errorHandler(res, 400, "Please Provide the complete details")
        }

        //   Check First Group exist or not :-
        const isExist = await Group.findOne({
            where: {
                name
            }
        })

        if (!isExist.dataValues) {
            return errorHandler(res, 400, "Group with this name not found")
        }

        const updatedMembers = [...isExist.members, ...members]
        console.log("Updated Members ", updatedMembers)

        //  Update The Group Members List :-
        const updatedGroupDetails = await Group.update(
            { members: updatedMembers },
            {
                where: {
                    id: isExist.id
                }
            }
        );

        if (updatedGroupDetails[0] != 1) {

            return errorHandler(res, 400, "Group Details could not be updated")

        }


        //  API Call for all the fetching all the groups details for DB :-
        const newUpdatedGroups = await Group.findAll()

        


        io.emit("new_member_added_to_group", {
            type: "Add To Group",
            newUpdatedGroups
        })





        return responseHandler(res, 200, "Group Details updated SuccessFully", updatedGroupDetails)

    }
    catch (error) {

        return unknownErrorHandler(res, error.message)

    }

}





module.exports = { getAllGroups, createGroup, addNewMembersToGroup }