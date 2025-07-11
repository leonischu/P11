const userSvc = require("./user.service");
const { deleteFile } = require("../../utilities/helpers");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const {
        page,
        limit,
        userType,
        userStatus,
        search,
        orderBy,
        orderDirection,
      } = req.query;

      const filter = {};
      if (userType) filter.userType = userType;
      if (userStatus) filter.userStatus = userStatus;
      if (search) {
        filter[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        orderBy: orderBy || "createdAt",
        orderDirection: orderDirection || "DESC",
      };

      const result = await userSvc.getAllUsers(filter, options);

      res.json({
        data: result,
        message: "Users fetched successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userSvc.getSingleRowByFilter({ id });

      if (!user) {
        throw {
          code: 404,
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }

      res.json({
        data: userSvc.getUserPublicProfile(user),
        message: "User fetched successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Handle profile image upload
      if (req.file) {
        updateData.profileImage = req.file.path;
      }

      const user = await userSvc.getSingleRowByFilter({ id });
      if (!user) {
        throw {
          code: 404,
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }

      // Delete old profile image if new one is uploaded
      if (req.file && user.profileImage) {
        deleteFile(user.profileImage);
      }

      const updatedUser = await userSvc.updateSingleRowByFilter(updateData, {
        id,
      });

      res.json({
        data: userSvc.getUserPublicProfile(updatedUser),
        message: "User updated successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userSvc.getSingleRowByFilter({ id });
      if (!user) {
        throw {
          code: 404,
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }

      // Delete profile image if exists
      if (user.profileImage) {
        deleteFile(user.profileImage);
      }

      const deleted = await userSvc.deleteUser(id);
      if (!deleted) {
        throw {
          code: 500,
          status: "DELETE_FAILED",
          message: "Failed to delete user",
        };
      }

      res.json({
        data: null,
        message: "User deleted successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDashboardData(req, res, next) {
    try {
      const userId = req.loggedInUser.id;
      const dashboardData = await userSvc.getUserDashboardData(userId);

      res.json({
        data: dashboardData,
        message: "Dashboard data fetched successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const userCtrl = new UserController();
module.exports = userCtrl;
