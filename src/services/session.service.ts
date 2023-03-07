import { FilterQuery } from "mongoose";
import Session, { schemaDocument } from "../models/session.model";

export async function createSession<schemaDocument>(
  userId: object,
  userAgent: string
) {
  const session = await Session.create({ user: userId, userAgent });

  return session;
}


export async function findSession(query: FilterQuery<schemaDocument>) {
  return Session.find(query).lean()
}