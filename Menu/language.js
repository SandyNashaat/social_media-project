const User = require("../models/User");
module.exports = async function (req, res)
{
    const { userId, language } = req.body;

try {
    const user = await User.findByIdAndUpdate(userId, { language }, { new: true });
    res.json({ message: "Language updated successfully", user });
} catch (error) {
    res.status(500).json({ error: "Error updating language" });
}
    
}