import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

type Data = {
  users: Array<Object>;
};
// const getUsers = async () => {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   res.status(200).json()
  try {
    const client = await clientPromise;
    const db = client.db("users");

    const dev = await db
      .collection("dev")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json({ users: dev });
  } catch (e) {
    console.error(e);
  }
}
