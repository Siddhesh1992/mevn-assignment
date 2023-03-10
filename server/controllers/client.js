const { isValidObjectId } = require("mongoose");
const Client = require("../models/client");
const Provider = require("../models/provider");

const validateProvider = async (req) => {
  const { provider } = req.body;

  if (!Array.isArray(provider)) {
    throw new Error("Invalid Provider");
  }
  if (provider.length == 0) {
    throw new Error("Invalid Provider");
  }

  const providerSanitized = [...new Set(provider)];
  if (
    (await Provider.countDocuments({
      _id: { $in: providerSanitized },
      deleted: false,
    })) == 0
  ) {
    throw new Error("Invalid Provider");
  }

  return providerSanitized;
};

const validateId = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Invalid Id");
  }

  if (!isValidObjectId(id)) {
    throw new Error("Invalid Id");
  }

  if (!(await Client.findById(id))) {
    throw new Error("Invalid Id");
  }
};

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
    const providerSanitized = await validateProvider(req);

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
    await validateId(req);
    const providerSanitized = await validateProvider(req);
    const data = await Client.updateOne(
      { _id: req.params.id },
      { ...req.body, provider: providerSanitized }
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
    await validateId(req);
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
