import Joi from "@hapi/joi";

export const employeeSchema = Joi.object({
  employeeID: Joi.string(),
  registeredDate: Joi.date().iso(),
  employeeVersion: Joi.string(),
  employeeType: Joi.string(),
  archived: Joi.bool(),
});

export const blankEmployee = {
  employeeID: "",
  registeredDate: "",
  employeeVersion: "",
  employeeType: "",
  archived: false,
};
