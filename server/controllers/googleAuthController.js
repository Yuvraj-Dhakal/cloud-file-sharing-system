const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ========================================
// GOOGLE LOGIN
// ========================================
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    // Verify Google credential
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
      picture,
    } = payload;

    if (!email) {
      return res.status(400).json({
        message: "Google account email not available",
      });
    }

    // Find existing user
    let user = await User.findOne({ email });

    // Create user if they don't exist
    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        password: null,
        googleId,
        authProvider: "google",
        profilePicture: picture || "",
      });
    } else {
      // Update Google information for existing user
      user.googleId = googleId;
      user.authProvider = "google";
      user.profilePicture = picture || user.profilePicture;

      await user.save();
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);

    return res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

module.exports = {
  googleLogin,
};