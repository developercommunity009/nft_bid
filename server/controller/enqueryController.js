const Enquery = require("../Model/enqueryModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");



exports.createEnquery = catchAsync(async (req, res) => {
    const newEnq = await Enquery.create(req.body);
     res.status(200).json({newEnq});
})
