import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const err = new Error(parsed.error.message) as any;
      err.status = 400;
      return next(err);
    }
    req.body = parsed.data;
    next();
  };
}


