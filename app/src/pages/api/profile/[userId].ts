import mysql_connection from "@/application/lib/db/connect_db";
import type { RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).json({ message: "User ID is missing" });
    return;
  }

  const connection = await mysql_connection();

  switch (req.method) {
    case "GET":
      try {
        const userProfile = <RowDataPacket[]>(
          await connection.query(
            "SELECT user_name, email, description FROM users WHERE id = ?",
            [userId]
          )
        );

        if (!userProfile.length) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userProfile[0]);
      } catch (error: unknown) {
        handleDatabaseError(res, error);
      }
      break;

    case "POST":
    case "PUT":
      try {
        await updateProfile(connection, userId, req.body);
        res.status(200).json({ message: "Successfully updated." });
      } catch (error: unknown) {
        handleDatabaseError(res, error);
      }
      break;
  }
}

async function updateProfile(connection: any, userId: string, body: any) {
  const updates = [];
  const values = [];

  if (body.description !== undefined) {
    updates.push("description = ?");
    values.push(body.description);
  }

  if (body.email !== undefined) {
    updates.push("email = ?");
    values.push(body.email);
  }

  if (body.user_name !== undefined) {
    updates.push("user_name = ?");
    values.push(body.user_name);
  }

  values.push(userId);

  const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

  await connection.query(sql, values);
}

function handleDatabaseError(res: NextApiResponse, error: unknown) {
  if (error instanceof Error) {
    res.status(500).json({
      message: "Failed to process database request.",
      error: error.message,
    });
  } else {
    res.status(500).json({ message: "Failed to process database request." });
  }
}
