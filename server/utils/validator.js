const { isValidObjectId } = require("mongoose");
const Provider = require("../models/provider");

const validateProvider = async (req, db) => {
  const { provider } = req.body;

  if (!Array.isArray(provider)) {
    throw new Error("Invalid Provider");
  }
  if (provider.length == 0) {
    throw new Error("Invalid Provider");
  }

  const providerSanitized = [...new Set(provider)];

  for (const provid of [providerSanitized]) {
    await validateId({ params: { id: provid } }, Provider);
  }

  if (
    (await db.countDocuments({
      _id: { $in: providerSanitized },
      deleted: false,
    })) == 0
  ) {
    throw new Error("Invalid Provider");
  }

  return providerSanitized;
};

const validateId = async (req, db) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Invalid Id");
  }

  if (!isValidObjectId(id)) {
    throw new Error("Invalid Id");
  }

  if (!(await db.findById(id))) {
    throw new Error("Invalid Id");
  }
};

module.exports = {
  validateProvider,
  validateId,
};
