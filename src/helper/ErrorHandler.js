//Create Custom Error
const CreateError = (message, status = 400) => {
    const err = new Error(message);
    err.status = status;
    return err;
  };


module.exports = {CreateError}