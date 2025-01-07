import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("All Fields are required.", 400));
    }

    function validatePhoneNumber(phone) {
      const phoneRegex = /^+91\d(10)$/;
      return phoneRegex.test(phone);
    }
    if (!validatePhoneNumber) {
      return next(new ErrorHandler("Invalid Phone Number", 400));
    }

    const existingUser = await User.findOne({
      $or: [
        { email, accountVerified: true },
        { phone, accountVerified: true },
      ],
    });
    if (existingUser) {
      return next(
        new ErrorHandler("Email or phone is alreeady is in use.", 400)
      );
    }

    const registrationAttemptsByUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false },
      ],
    });
    if (registrationAttemptsByUser.length > 3) {
      return next(
        new ErrorHandler(
          "You have exceeded the maximum number of attemts for successful registeration,Please try again in 1 Hour",
          400
        )
      );
    }

    const userData = {
      name,
      email,
      password,
      phone,
    };
    const user = await User.create(userData);

    const verificationCode = await user.generateVerificationCode();
    await user.save();
    sendVerificationCode(verificationMethod, verificationCode, email, phone);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
