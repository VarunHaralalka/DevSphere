import { body } from "express-validator";

export const postValidation = [
  body("title").notEmpty().isLength({ max: 255 }),
  body("content").notEmpty(),
  body("owner_id").isInt(),
  body("collab").optional().isBoolean(),
];
