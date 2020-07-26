import Joi from "@hapi/joi";

export const deviceSchema = Joi.object({
  deviceID: Joi.string(),
  registeredDate: Joi.date().iso(),
  deviceVersion: Joi.string(),
  deviceType: Joi.string(),
  archived: Joi.bool(),
});

export const blankDevice = {
  deviceID: "",
  registeredDate: "",
  deviceVersion: "",
  deviceType: "",
  archived: false,
};
