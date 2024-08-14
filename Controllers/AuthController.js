const User = require('../Models/User');
const JobSeeker = require('../Models/JobSeeker');
const HRRepresentative = require('../Models/HrRepresentative');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


    exports.register = async (userData) => {
        const { role, password } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;

        let user;
        if (role === 'JobSeeker') {
            user = new JobSeeker(userData);
        } else if (role === 'HRRepresentative') {
            user = new HRRepresentative(userData);
        } else {
            throw new Error('Invalid role');
        }

        return await user.save();
    }

    exports.login = async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
        return { token, user };
    }

    exports.changePassword = async (userId, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
    }

module.exports = AuthController;
