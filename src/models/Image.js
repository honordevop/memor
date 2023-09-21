import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    imgtag: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Image || mongoose.model("Image", postSchema);
