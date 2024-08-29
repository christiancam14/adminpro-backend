const { Schema, model } = require("mongoose");

const MedicoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  }
);

MedicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", MedicoSchema);
