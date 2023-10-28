import mysql_connection from '@/application/lib/db/connect_db';
import type { NextApiRequest, NextApiResponse } from 'next';

// ログイン処理を行うAPI
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'POSTメソッドでアクセスしてください。',
    });
    return;
  }

  try {
    // クエリーパラメータから取得
    const email = req.query.email as string;
    const password = req.query.password as string;

    // パラメータが空でないかチェック
    const check_parameter = (parameter_name: string, parameter: string) => {
      if (!parameter) {
        res.status(400).json({
          message: parameter_name + 'が空です。',
        });
        return false;
      }
      return true;
    };
    if (!check_parameter('email', email) || !check_parameter('password', password)) {
      return;
    }

    // mysqlと接続
    const connection = await mysql_connection();
    // SQL実行
    const result = await connection.query(
      'SELECT * FROM users where email = ? AND password = ?',
      [email, password]
    );
    connection.end();

    // 結果を返す
    console.log(result[0]);
    res
      .status(200)
      .json({ message: '接続に成功しました。', contents: result[0] });
  } catch (error) {
    res.status(405).json({
      message: '取得に失敗しました。',
      error: error,
    });
  }
}


