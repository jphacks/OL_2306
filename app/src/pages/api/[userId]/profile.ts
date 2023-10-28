import mysql_connection from '@/application/lib/db/connect_db';
import type { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).json({ message: 'User ID is missing' });
    return;
  }

  const connection = await mysql_connection();

  switch (req.method) {
    case 'GET': {
      try {
        const userProfile = <RowDataPacket[]>(
          await connection.query('SELECT description FROM users WHERE id = ?', [
            userId,
          ])
        );

        if (!userProfile.length) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userProfile[0]);
      } catch (error: unknown) {
        handleDatabaseError(res, error);
      }
      break;
    }

    case 'POST': {
      const { content } = req.body;

      try {
        await connection.query(
          'UPDATE users SET description = ? WHERE id = ?',
          [content, userId]
        );

        res
          .status(200)
          .json({ message: 'Successfully created the profile description.' });
      } catch (error: unknown) {
        handleDatabaseError(res, error);
      }
      break;
    }

    case 'PUT': {
      const updatedContent = req.body.content;

      try {
        await connection.query(
          'UPDATE users SET description = ? WHERE id = ?',
          [updatedContent, userId]
        );

        res
          .status(200)
          .json({ message: 'Successfully updated the profile description.' });
      } catch (error: unknown) {
        handleDatabaseError(res, error);
      }
    }
  }
}

function handleDatabaseError(res: NextApiResponse, error: unknown) {
  if (error instanceof Error) {
    res.status(500).json({
      message: 'Failed to process database request.',
      error: error.message,
    });
  } else {
    res.status(500).json({ message: 'Failed to process database request.' });
  }
}
