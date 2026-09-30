const Certificate = require("../../database/models/Certificate");

// GET certificates for a student
const getStudentCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      student: req.params.studentId,
    })
      .populate("event", "eventName date category")
      .sort({ issuedAt: -1 });

    res.status(200).json(certificates);
  } catch (error) {
    console.error("Failed to fetch certificates:", error);

    res.status(500).json({
      message: "Failed to fetch certificates",
      error: error.message,
    });
  }
};

module.exports = {
  getStudentCertificates,
};