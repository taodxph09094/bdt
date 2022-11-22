const Statistical = require("../models/statisticalModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createStatistical = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const statistical = await Statistical.create(req.body);
  res.status(201).json({
    success: true,
    statistical,
  });
});
exports.getAdminStatistical = catchAsyncErrors(async (req, res, next) => {
  const statisticals = await Statistical.find();
  let totalAmount = 0;

  res.status(200).json({
    success: true,
    statisticals,
  });
});

exports.getAdminStatisticalDetails = catchAsyncErrors(
  async (req, res, next) => {
    const statistical = await Statistical.findById(req.params.id);

    if (!statistical) {
      return next(new ErrorHander("Không tìm thấy dữ liệu", 404));
    }

    res.status(200).json({
      success: true,
      statistical,
    });
  }
);

exports.deleteStatistical = catchAsyncErrors(async (req, res, next) => {
  const statistical = await Statistical.findById(req.params.id);

  if (!statistical) {
    return next(new ErrorHander("Không tìm thấy dữ liệu", 404));
  }
  await statistical.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công !",
  });
});
