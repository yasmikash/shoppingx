import { ValidationError } from "class-validator";

import BodyError from "../interfaces/body-error.interface";

let generatedErrors: BodyError[] = [];

const getBodyErrors = (
  errors: ValidationError[],
  recursion: boolean
): BodyError[] => {
  if (!recursion) {
    generatedErrors = [];
  }
  errors.forEach((error) => {
    if (error.children) {
      getBodyErrors(error.children, true);
    }

    if (!error.constraints) {
      return;
    }

    const bodyError: BodyError = {
      field: error.property,
      errors: error.constraints ? Object.values(error.constraints) : null,
    };
    console.log(bodyError);

    generatedErrors.push(bodyError);
  });

  return generatedErrors;
};

export default getBodyErrors;
