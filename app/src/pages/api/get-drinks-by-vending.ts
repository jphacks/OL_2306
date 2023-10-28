import mysql_connection from '@/application/lib/db/connect_db';
import type { NextApiRequest, NextApiResponse } from 'next';
// サンプル
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // mysqlと接続
    const connection = await mysql_connection();
    // クエリーパラメータから取得
    const vid = req.query.vid as string;
    // SQL実行
    const result = await connection.query(
      'SELECT * FROM drinks where vid = ?',
      [vid]
    );
    connection.end();

    console.log(result[0]);
    // レスポンス返す
    res
      .status(200)
      .json({ message: '接続に成功しました。', contents: result[0] });
  } catch (error) {
    // 失敗時
    res.status(405).json({
      message: '取得に失敗しました。',
      error: error,
    });
  }
}
