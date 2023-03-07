import { NextFunction, Request, Response } from "express";

const requireUser = (req: Request, res: Responsen, next: NextFunction) => {
  const user = req.locals.user;

  if (!user) res.status(403).json({ msg: "User not found" });

  return next();
};
export default requireUser;
