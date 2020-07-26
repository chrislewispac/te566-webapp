import Joi from "@hapi/joi";

export const patientDevicesSchema = Joi.object({
  deviceDBKey: Joi.string(),
  deviceID: Joi.string(),
  linkedStartDate: Joi.date().iso(),
  linkedEndDate: Joi.date().iso().allow(""),
});

export const blankPatientDevice = {
  deviceDBKey: "",
  deviceID: "",
  linkedStartDate: "",
  linkedEndDate: "",
};

export const patientSchema = Joi.object({
  uuid: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  middleInitial: Joi.string().allow("").max(1),
  dob: Joi.date().iso(),
  cellPhone: Joi.string().allow(""),
  homePhone: Joi.string().allow(""),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zip: Joi.string(),
  country: Joi.string(),
  registeredDate: Joi.date().iso(),
  devices: Joi.array().items(patientDevicesSchema),
  archived: Joi.bool(),
});

export const blankPatient = {
  uuid: "",
  firstName: "",
  lastName: "",
  middleInitial: "",
  dob: "",
  cellPhone: "",
  homePhone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  registeredDate: "",
  devices: [],
  archived: false,
};
