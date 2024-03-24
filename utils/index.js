import mongoose from "mongoose";
function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid ID");
    return res.status(400).json({
      msg: error.message,
    });
  }
}

function handleNotFoundError(message, res) {
  const error = new Error(message);
  return res.status(404).json({
    msg: error.message,
  });
}

const uniqueId = () =>
  Date.now().toString() + Math.random().toString().substring(2);

export { validateObjectId, handleNotFoundError, uniqueId };
