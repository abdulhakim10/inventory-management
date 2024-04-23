module.exports = (...role) => {
    return (req, res, next) =>{
        const userRole = req.body.role;
        if(!role.includes(userRole)) {
            return res.status(403).json({
                status: "fail",
                message: "You are not authorized to perform this action"
            });
        }
        next();
    }
}