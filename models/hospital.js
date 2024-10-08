const { Schema, model } = require("mongoose");

const HospitalSchema = new Schema(
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
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "hospitales" }
);

HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Hospital", HospitalSchema);
