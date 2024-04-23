const { signupService } = require("../services/user.service");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(201).json({
            status: "success",
            message: "User signed up successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        });
    }
}