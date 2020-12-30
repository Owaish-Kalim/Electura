import expressJwt from 'express-jwt'
function authorizer(){
    console.log("we are checking authorizer")
    return expressJwt({
        secret:process.env.PRIVATE_JWT_KEY,
        userProperty:'auth'
    })
}

export const isAuth = (req, res, next) => {
    console.log("We are checking isAuth")
    // console.log(req.auth,req.body.user)
    var reqBodyUser = JSON.parse(req.body.user)
    let user = reqBodyUser && req.auth && (reqBodyUser._id == req.auth._id);
    // console.log(user)
    // console.log(JSON.parse(req.body.user))
    // console.log(req.auth._id)
    // console.log(req.body.user && req.auth)
    // console.log(req.body.user._id == req.auth._id)

    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    console.log("we are checking isAdmin")
    if (req.body.user.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};


export default authorizer