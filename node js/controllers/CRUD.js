const userModel = require("../models/User");
//get users by server side pagination
const GetUser = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { searchTerm } = req.query
        console.log(searchTerm, "searchTerm>>>>>>>>>>.");

        let query = {}
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { email: { $regex: searchTerm, $options: "i" } },
                    { address: { $regex: searchTerm, $options: "i" } },
                    { phone: { $regex: searchTerm, $options: "i" } },
                ]
            }
        }
        const allUsersCount = await userModel.countDocuments()
        const total = await userModel.countDocuments(query)
        const totalPages = Math.ceil(total / limit)
        // ✅ Auto-fix invalid page numbers
        if (page > totalPages && totalPages > 0) {
            page = 1;
        }
        const skip = (page - 1) * limit
        const allUsers = await userModel.find(query).skip(skip).limit(limit);

        if (allUsers.length === 0) {
            return res.status(200).json({ message: "No users found", code: 404 });
        }
        res.status(200).json({
            data: allUsers,
            total,
            page,
            totalPages,
            allUsersCount,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const exportUsers = async (req, res) => {
    try {
        const { searchTerm = "", exportType = "all" } = req.query;

        // Validate exportType
        const allowedExportTypes = ["all", "filtered"];
        if (!allowedExportTypes.includes(exportType)) {
            return res.status(400).json({ message: "Invalid export type." });
        }

        let query = {};

        if (exportType === "filtered") {
            if (!searchTerm.trim()) {
                return res.status(400).json({ message: "Search term is required for filtered export." });
            }

            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { email: { $regex: searchTerm, $options: "i" } },
                    { address: { $regex: searchTerm, $options: "i" } },
                    { phone: { $regex: searchTerm, $options: "i" } },
                ],
            };
        }

        const users = await userModel
            .find(query)
            .select("name email phone address createdAt")
            .lean();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found for the given criteria." });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error exporting users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const AddUser = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "This email already existed" })
        }
        const newUser = new userModel({ name, email, phone, address });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
const EditUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    try {
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail?._id.toString() !== id && existingEmail) {
            return res.status(400).json({ message: "This email is already taken. Try another" })
        }
        const updatedUser = await userModel.findByIdAndUpdate({ _id: id },
            { name, email, phone, address },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete({ _id: id });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", id });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = {
    GetUser,
    AddUser,
    EditUser,
    DeleteUser,
    exportUsers,
}