exports.errorResponse = (res, statusCode = 500, error) => {
    res.status(statusCode).json({
      success: false,
      message: error,
      result: {}
    });
}
  
exports.successResponse = (res, statusCode = 200, data) => {
    return res.status(statusCode).json({
      success: true,
      message: "success",
      result: data
    });
}
  