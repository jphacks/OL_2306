import mysql_connection from '@/application/lib/db/connect_db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const postId = req.query.postId as string;
  const { userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({ message: 'Required parameters are missing' });
  }

  try {
    // mysqlと接続
    const connection = await mysql_connection();

    // 論理削除
    const [result] = await connection.query(
      'UPDATE tweet SET is_delete = true WHERE id = ? AND user_id = ?',
      [postId, userId]
    );

    connection.end();

    if (!('affectedRows' in result)) {
      return res.status(500).json({ message: 'Unexpected database response.' });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: 'No matching tweet found for deletion.' });
    }

    res.status(200).json({ message: 'Successfully deleted the tweet.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: 'Failed to delete the tweet.', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to delete the tweet.' });
    }
  }
}
