import Joi from "@hapi/joi";

export const customerSchema = Joi.object({
    customerID: Joi.string(),
    registeredDate: Joi.date().iso(),
    customerVersion: Joi.string(),
    customerType: Joi.string(),
    archived: Joi.bool(),
});

export const blankCustomer = {
    customerID: "",
    registeredDate: "",
    customerVersion: "",
    customerType: "",
    archived: false,
};
