const User = require('../Models/User');
const JobSeeker = require('../Models/JobSeeker');
const HRRepresentative = require('../Models/HrRepresentative');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

    exports.register = async (req, res) => {
        try {
            const { role, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            let user;
            if (role === 'JobSeeker') {
                user = new JobSeeker({...req.body , password : hashedPassword});
            } else if (role === 'HRRepresentative') {
                user = new HRRepresentative({...req.body , password : hashedPassword});
            } else {
               return res.status(400).send({errors : [{msg:"Invalid role"}]})
            }

            await user.save();
            res.status(201).send({success: {msg:"User created" , user }})
        } catch (error) {
            res.status(400).send({errors : [{msg:error.message}]})
        }
    }

    exports.login = async (req, res) => {
        try {
            const user = await User.findOne({ email :req.body.email });
            if (!user) {
              return  res.status(400).send({errors : [{msg:"User not found"}]})
            }
            const isPasswordValid = await bcrypt.compare(req.body.password , user.password);
            if (!isPasswordValid) {
               return  res.status(400).send({errors : [{msg:"Invalid password"}]})
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY , { expiresIn: '1h' });

            res.status(200).send({success: {msg:"User logged in" , token , user }})
        } catch (error) {
            res.status(400).send({errors : [{msg:error.message}]})
        }
    }

    exports.changePassword = async (req , res) => {
        try {
            const {id} = req.params;
            const foundUser = await User.findById(id);
            const { oldPassword, newPassword } = req.body;
            const isPasswordValid = await bcrypt.compare(oldPassword , foundUser.password);
            if (!isPasswordValid) {
               return res.status(400).send({errors : [{msg:"Invalid password"}]})
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate(id, { password: hashedPassword } );
            res.status(200).send({success: {msg:"Password changed successfully"}});
        } catch (error) {
            res.status(400).send({errors : [{msg:error.message}]})
        }
    }

    exports.updateProfile = async (req, res) => {
        try {
            const { id } = req.params;  // Get user ID from request parameters
            const updatedData = req.body;  // Get updated profile data from request body

            // Find the user by ID
            const foundUser = await User.findById(id);
            if (!foundUser) {
                return res.status(404).send({ errors: [{ msg: "User not found" }] });
            }

            // Update the user's profile with the new data
            const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true }).select('-password');

            // Send a success response with the updated user profile
            res.status(200).send({ success: { msg: "Profile updated successfully" }, user: updatedUser });
        } catch (error) {
            // Handle any errors that occur during the update
            res.status(400).send({ errors: [{ msg: error.message }] });
        }
    };


