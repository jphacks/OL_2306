-- ユーザーテーブル
create table users (
    id int auto_increment primary key, -- id（主キー）
    user_name varchar(255) not null, -- ユーザー名（一意キーにしても良い）
    email varchar(255) not null, -- メールアドレス（同じく一意キーにしても良い）
    password varchar(255) not null, -- パスワード（ハッシュ化してもそのままでも良し）
    description varchar(255) default '', -- 説明
    icon_path varchar(255) default '' -- アイコン画像のパス
);

-- ユーザーの初期データ追加
insert into users (user_name, email, password, icon_path) values 
('hoge', 'hoge@email.com', SHA2('password', 256), ''), -- パスワードをハッシュ化して保存
('fuga', 'fuga@email.com', 'password', '/public/image/icon/02.png'), -- アイコンのURL保存する場合
('fuga', 'fuga@email.com', 'password', '');

-- ユーザーのポートフォリオ画像テーブル
create table user_portfolios (
    id int auto_increment primary key,
    user_id int not null,
    image_path varchar(255) not null,
    foreign key (user_id) references users(id)
);

-- 画像の登録
insert into user_portfolios (user_id, image_path) values
(1, '/public/image/portfolios/01-01.png'),
(1, '/public/image/portfolios/01-02.png'),
(2, '/public/image/portfolios/02-01.png');

-- 投稿テーブル
create table tweet (
    id int auto_increment primary key, 
    user_id int not null, -- 投稿したユーザーのid
    content varchar(255) not null, -- 投稿内容
    type ENUM('tweet', 'model', 'camera') not null, -- 投稿のタイプ
    post_date timestamp default current_timestamp, -- 投稿日時
    update_date timestamp default current_timestamp on update current_timestamp, -- 更新日時
    is_delete boolean default false, -- 論理削除フラグ（削除する場合はこれをtrueにする）
    FOREIGN KEY (user_id) REFERENCES users(id) -- 外部キー：user_idはusersテーブルのidを参照する
);

-- 投稿の追加
insert into tweet (user_id, content) values
(1, 'hello world!!'),
(2, 'hoge hage boke!!'),
(1, 'こんにちわ');

-- 投稿の画像のテーブル
create table tweet_images (
    id int auto_increment primary key,
    tweet_id int not null,
    image_path varchar(255) not null,
    foreign key (tweet_id) references tweet (id)
);

-- 投稿の画像の追加
insert into tweet_images (tweet_id, image_path) values
(1, '/public/images/tweet/01-01.png'),
(1, '/public/images/tweet/01-02.png'),
(2, '/public/images/tweet/02-01.png');

/* 
以下のように投稿と画像をまとめて取得できたりする
select
tweet.id,
tweet.user_id,
tweet.content,
tweet.post_date,
tweet.update_date,
tweet_images.id,
tweet_images.image_path
from tweet join tweet_images on tweet.id = tweet_images.tweet_id;
*/

-- -- メッセージのテーブル
-- create table messages (
--     id int auto_increment primary key, -- メッセージの主キー
--     room_id int not null, -- 部屋id
--     content varchar(255) not null, -- 内容
--     user_id int not null, -- 送信者userid
--     post_date timestamp default current_timestamp, -- 日時
--     foreign key (user_id) references users(id),
--     foreign key (room_id) references messages_rooms(id)
-- );

-- -- メッセージルームテーブル
-- create table messages_rooms (
--     id int auto_increment primary key
-- );

-- -- メッセージ・ユーザー中間テーブル
-- create table messages_relation (
--     id int auto_increment primary key,
--     room_id int not null, -- 部屋id
--     user_id int not null, -- メッセージルームに入っているuserid
--     foreign key (user_id) references users(id),
--     foreign key (room_id) references messages_rooms(id)
-- );