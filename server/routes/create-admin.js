import express from "express";
import userModel from "../models/user-model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, isAdmin, isManager, club, userType, email, password } =
        req.body;

    const admin = await userModel.findOne({ email });

    if (admin) {
        res.status(409).json({
            status: 409,
            message: "Admin Already Exists",
        });
    } else {
        userModel
            .create({
                username,
                isAdmin,
                isManager,
                club,
                userType,
                email,
                password,
            })
            .then((success) => {
                res.json({ status: 400, message: "Admin Created" });
            })
            .catch((err) => {
                res.json({ status: 424, message: err });
            });
    }
});

export default router;
