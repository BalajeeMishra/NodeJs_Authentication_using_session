const Student = require("../model/colegedata");

const addInformation = async (req, res, next) => {
  try {
    const { name, branch, enrollmentNo, collegeName } = req.body;
    const newStudent = new Student({
      name,
      branch,
      enrollmentNo,
      collegeName,
      user: req.session.userId,
    });
    await newStudent.save();
    return res.status(200).json({ newStudent });
  } catch (err) {
    return next(err);
  }
};

const getInformation = async (req, res, next) => {
  try {
    const studentDetail = await Student.findOne({ user: req.session.userId });
    return res.status(200).json({ studentDetail });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addInformation,
  getInformation,
};
