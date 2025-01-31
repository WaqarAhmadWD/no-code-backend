const { ValidationError, DatabaseError } = require('sequelize');
class CustomError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = this.constructor.name; 
    this.status = status;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.CustomError = CustomError;

exports.AE = (Controller, useTransaction = false) => async (req, res, next) => {
    let transaction;
    if (useTransaction) {
        transaction = await sequelize.transaction();
    }
    try {
        await Controller(req, res, next, transaction);
        if (transaction) {
            await transaction.commit();
        }
        return res.status(next.status || 200).json({
            message: next.message || 'Success',
            data: next.data || {},
        });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: 'Validation Error',
                error: error.errors,
            });
        } else if (error instanceof DatabaseError) {
            return res.status(500).json({
                message: 'Database Error',
                error: error.message,
            });
        } else if (error.isCustomError) {
            return res.status(error.statusCode).json({
                message: error.message,
                data: error.data || {},
            });
        } else {
            next(error);
        }
    }
};

exports.errorFinder = (error) => {
    try {
      if (!error) return "Unknown error";
  
      if (error?.name === "SequelizeValidationError") {
        return (
          error?.errors
            ?.map((err) => err.message)
            .join(", ") || "Validation error occurred"
        );
      }
      
      if (error?.name === "SequelizeForeignKeyConstraintError") {
        const parentError = error?.parent || {};
        return (
          "Cannot delete parent without removing associated child records." || parentError?.sqlMessage
        );
      }
  
      if (error?.name === "SequelizeUniqueConstraintError") {
        return (
          error.errors
            ?.map((err) => err.message)
            .join(", ") || "Unique constraint violation"
        );
      }
  
      if (error?.parent?.sqlMessage) {
        return error.parent.sqlMessage;
      }
  
      return error?.message || "An unknown error occurred";
    } catch (catchError) {
      return catchError?.message || "An unexpected error occurred while processing the error.";
    }
  };
  