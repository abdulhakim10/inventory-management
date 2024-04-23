const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

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

/**
 * 
 * 1. Check if Email and Password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct
 * 6. check if user is active
 * 7. generate token
 * 8. send user and token
 */

exports.login = async (req, res) => {
    try {
       const { email, password } = req.body;
        // Check if Email and Password are given
        if(!email || !password) {
            return res.status(400).json({
                status: "fail",
                error: "Please provide credentials"
            })
        }

        // Load user with email
        const user = await findUserByEmail(email);

        // if not user send res
        if(!user) {
            return res.status(404).json({
                status: "fail",
                error: "No user found, Please signup"
            })
        }

        // compare password
        const isPasswordValid = user.comparePassword(password, user.password);

        // if password not correct
        if(!isPasswordValid) {
            return res.status(401).json({
                status: "fail",
                error: " password is not correct"
            })
        }

        // check if user is active
        if(user.status !== "active") {
            return res.status(403).json({
                status: "fail",
                error: "User is not active"
            })
        }

        // generate token
        const token = generateToken(user);

        // sending user info without password
        const {password: pwd, ...others} = user.toObject(); // user.toObject() use for prevent spread operator give extra info

        res.status(201).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                others,
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
}