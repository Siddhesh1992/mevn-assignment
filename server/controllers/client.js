const Client = require("../models/client");
const Provider = require("../models/provider");
const { validateId, validateProvider } = require("../utils/validator");

exports.getClient = async (req, res, next) => {
  try {
    const { id } = req?.query;
    const data = await Client.find({
      ...(id && { _id: id }),
      deleted: false,
    }).populate({ path: "provider", match: { deleted: false } });
    return res.send({ message: "Success", error: null, data });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};

exports.createClient = async (req, res, next) => {
  try {
    const providerSanitized = await validateProvider(req, Provider);

    const data = await Client.create({
      ...req.body,
      provider: providerSanitized,
    });
    return res.status(201).send({ message: "Success", error: null, data });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};

exports.updateClient = async (req, res, next) => {
  try {
    await validateId(req, Client);
    const providerSanitized = await validateProvider(req, Provider);
    const data = await Client.updateOne(
      { _id: req.params.id },
      { ...req.body, provider: providerSanitized },
      { runValidators: true }
    );
    return res.send({ message: "Success", error: null, data });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "Error", error: e.message, data: [] });
  }
};

exports.deleteClient = async (req, res, next) => {
  try {
    await validateId(req, Client);
    const data = await Client.updateOne(
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
