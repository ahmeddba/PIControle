const User = require('../Models/User');
const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send({ msg: "Unauthorized: Token not found!" });
        }

        // Retirez le préfixe "Bearer " du token
        const tokenWithoutBearer = token.split(" ")[1];

        const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        const foundUser = await User.findById({ _id: decoded._id }).select("-password").populate('');

        if (!foundUser)
            return res.status(400).send({ errors: [{ msg: "Unauthorized: User not found!" }] });

        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(400).send({ errors: [{ msg: "Unauthorized: Invalid token!" }] });
    }
};

