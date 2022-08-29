const jwt = require("jsonwebtoken")

const jwtkey = 'mysecrectkey'
const jwtExpirySeconds = 3000

const sign = (req, res) => {
    const token = jwt.sign({ username: "user1" }, jwtkey, { algorithm: 'HS256', expiresIn: jwtExpirySeconds })
    // return token;
    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
    res.send(token)
}

const verify = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).end("not authorized")
    }

    var payload

    try {
        payload = jwt.verify(token, jwtkey)
        next()

    } catch (e) {
        if(e instanceof jwt.JsonWebTokenError){
            return res.status(401).end();
        }
        console.log(e)
    }
}


module.exports = { sign, verify }