const jwt = require("jsonwebtoken");
const { findUserByUserId } = require("../utils/user.utils");

const authVerify = async (req, res, next) => {
  try {
    console.log(`token `,  req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    
    const mySecret = process.env["mySecret"];
    const { userId } = jwt.verify(token, mySecret);
    const user = await findUserByUserId(userId);

    // if (userId !== req.params.userId) {
    //   return res.json({
    //     success: false,
    //     message: "token mismatch error",
    //   });
    // }

    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Invalid token..!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(`somehting went  while finding you token..!`, error)
    res.status(500).json({
      success: false,
      message: "something went wrong while finding you token..!",
      errorMessage: error.message,
    });
  }
};

module.exports = { authVerify };
