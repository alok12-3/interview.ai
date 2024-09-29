const express = require("express");
const User = require("../models/User"); 
const router = express.Router();

router.get("/details", async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ userId: user._id, email: user.email });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;