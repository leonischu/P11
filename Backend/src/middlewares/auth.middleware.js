const jwt = require("jsonwebtoken");
const { AppConfig } = require("../config/config");
const authSvc = require("../modules/auth/auth.service");
const userSvc = require("../modules/user/user.service");
const { UserType } = require("../config/constants");

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw {
          code: 401,
          status: "UNAUTHORIZED",
          message: "Access token is required",
        };
      }

      const token = authHeader.replace("Bearer ", "");

      // Get session from database
      const session = await authSvc.getSessionByToken(token);
      if (!session) {
        throw {
          code: 401,
          status: "INVALID_TOKEN",
          message: "Invalid or expired access token",
        };
      }

      // Verify the actual JWT token
      let decoded;
      try {
        decoded = jwt.verify(
          session.accessTokenActual,
          AppConfig.jwtAccessSecret
        );
      } catch (jwtError) {
        // Token is invalid, deactivate session
        await session.update({ isActive: false });
        throw {
          code: 401,
          status: "INVALID_TOKEN",
          message: "Invalid or expired access token",
        };
      }

      // Get user details
      const user = await userSvc.getSingleRowByFilter({ id: decoded.sub });
      if (!user) {
        throw {
          code: 401,
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }

      // Check if user is active
      if (!user.isActive) {
        throw {
          code: 403,
          status: "ACCOUNT_DEACTIVATED",
          message: "Your account has been deactivated",
        };
      }

      // Check if email is verified (optional, based on your requirements)
      if (!user.isEmailVerified) {
        throw {
          code: 403,
          status: "EMAIL_NOT_VERIFIED",
          message: "Please verify your email address",
        };
      }

      // Check role-based access
      if (roles.length > 0 && !roles.includes(user.userType)) {
        throw {
          code: 403,
          status: "INSUFFICIENT_PERMISSIONS",
          message: "You don't have permission to access this resource",
        };
      }

      // Attach user to request
      req.loggedInUser = user;
      req.currentSession = session;

      next();
    } catch (exception) {
      next(exception);
    }
  };
};

// Middleware for checking specific user types
const requireUserType = (...userTypes) => {
  return auth(userTypes);
};

// Middleware for service providers only
const requireServiceProvider = () => {
  return auth([
    UserType.PHOTOGRAPHER,
    UserType.MAKEUP_ARTIST,
    UserType.DECORATOR,
    UserType.VENUE,
    UserType.CATERER,
  ]);
};

// Middleware for clients only
const requireClient = () => {
  return auth([UserType.CLIENT]);
};

// Optional auth middleware (doesn't throw error if no token)
const optionalAuth = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next();
      }

      const token = authHeader.replace("Bearer ", "");
      const session = await authSvc.getSessionByToken(token);

      if (session) {
        try {
          const decoded = jwt.verify(
            session.accessTokenActual,
            AppConfig.jwtAccessSecret
          );
          const user = await userSvc.getSingleRowByFilter({ id: decoded.sub });

          if (user && user.isActive) {
            req.loggedInUser = user;
            req.currentSession = session;
          }
        } catch (jwtError) {
          // Token is invalid, but don't throw error for optional auth
          await session.update({ isActive: false });
        }
      }

      next();
    } catch (exception) {
      // For optional auth, continue even if there's an error
      next();
    }
  };
};

module.exports = auth;
module.exports.requireUserType = requireUserType;
module.exports.requireServiceProvider = requireServiceProvider;
module.exports.requireClient = requireClient;
module.exports.optionalAuth = optionalAuth;
