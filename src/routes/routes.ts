import { info } from "console";
import { Express, Request, Response } from "express";
import logger from "../utils/logger";
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createSession } from "../services/session.service";
import {
  createUserSession,
  getUserSessionHandler,
} from "../controller/session.controlle";
import { createSessionSchema } from "../schema/sessions.schema";
import { deserializeUser } from "../middleware/deserializeUser";
import requireUser from "../middleware/requireUser";

function routes(app: Express) {
  app.get("/api", (req: Request, res: Response) => {
    console.log("it is here");
    logger.info("it is here");
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post("/api/sessions", validate(createSessionSchema), createUserSession);
  // .get(getUserSessionHandler);

  app.get("/api/sessions", requireUser, getUserSessionHandler);
}

export default routes;
