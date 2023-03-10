const Provider = require("../models/provider");
const { validateId } = require("../utils/validator");

exports.getProvider = async (req, res, next) => {
  try {
    const { id } = req?.query;
    const data = await Provider.find({
      ...(id && { _id: id }),
      deleted: false,
    });
    return res.send({ message: "Success", error: null, data });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};

exports.createProvider = async (req, res, next) => {
  try {
    const data = await Provider.create(req.body);
    return res.status(201).send({ message: "Success", error: null, data });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};

exports.updateProvider = async (req, res, next) => {
  try {
    await validateId(req, Provider);
    const data = await Provider.updateOne({ _id: req.params.id }, req.body);
    return res.send({ message: "Success", error: null, data });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};

exports.deleteProvider = async (req, res, next) => {
  try {
    await validateId(req, Provider);
    const data = await Provider.updateOne(
      { _id: req.params.id },
      { deleted: true }
    );
    return res.send({ message: "Success", error: null, data: [] });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};
