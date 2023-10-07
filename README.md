# 【重要】 mainブランチの直プッシュはご遠慮ください


# 使い方
- リポジトリをパソコンにcloneします.

## gitとghが入っていることを確認する
- VSCodeを起動し、ターミナルを開きます(左上の「ターミナル」→「新しいターミナル」)
- ターミナルで`git -v`と` gh --version`を実行してください。どちらかのバージョン情報が出てこなかったら`brew install git`or`brew install gh`でインストールしましょう
- `gh auth login`を実行します
  - `GitHub.com`
  - `HTTPS`
  - `Y`
  - `Login with a web browser`
  - コマンドラインに出てくる英数8桁のコードをコピーする
  - Enter押したらブラウザ起動するからな、みたいなメッセージが出るのでEnter押す。
  - ブラウザに8桁入力して、`Authorize github`を押す

## リポジトリのクローン
- ローカルの適当なディレクトリで以下コマンドを実行します
  ```gh repo clone https://github.com/geniee-summer-internship/calendar-day2.git ~/Desktop/calendar_day2```


# 開発の仕方

- ファイルを開く → `git clone`で落としてきたファイル(デスクトップ→`calendar_day2`)→`frontend`を選択し、開くを押す

- ターミナルを開き(左上の「ターミナル」→「新しいターミナル」)、以下のコマンドを実行します
  - `git checkout -b {first_name}-{last_name}`

- 右下の「このリポジトリ 用のおすすめ拡張機能 Prettier と dsznajder からの拡張機能 をインストールしますか?」みたいなメッセージ→インストール→開かれたタブの拡張機能をインストールする

# バックエンド・フロントエンド起動方法

- ターミナルで`pwd`を実行し、現在のディレクトリが`XXXXXXXX/calendar_day2/frontend`なのを確認する
- ターミナルで`./setup.sh`を実行する

# 問題

[Questions](Questions.pdf)

# 提出方法

- 以下のコマンドを実行します．
  - まず， `git status` で，どのファイルを修正したか確認します．
  - `git add {file_name}`
    - (`git add {file_name}` で，修正したファイルをcommitできるようにします．)
  - `git commit -m "{commit_message}"`
    - (`git commit -m "{commit_message}"` で，commitできます．)
  - `git push origin {branch_name}`
    - (`git push origin {branch_name}` で，branchをpushできます．)
