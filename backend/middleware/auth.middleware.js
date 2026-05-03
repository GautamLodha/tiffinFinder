const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    // const token = req.headers.authorization?.split(' ')[1] || req.headers.token ;
    const token = req.headers.token
    console.log( "token in function is " ,token);
    

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { userId, role }

        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};