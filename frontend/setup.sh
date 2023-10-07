#!/bin/bash

# バックエンドもこのスクリプトで起動する
echo "---------------------------------"
echo "バックエンドを起動します"
echo "---------------------------------"

current_dir=$(pwd)

cd ../backend
./setup.sh

cd $current_dir

# Homebrewが既にインストールされているか確認
echo "---------------------------------"
echo "Homebrewの設定を開始します..."
echo "---------------------------------"
if ! command -v brew &> /dev/null; then
    # Homebrewのインストール
    echo "Homebrewのインストールを開始します..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # PATHを通す
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
    source ~/.zshrc
    echo "Homebrewのインストールが完了しました。"
else
    echo "Homebrewは既にインストールされています。"
fi

# yarnをインストール
echo "yarnをインストールします..."
brew install yarn

# パッケージをインストールする
echo "必要なパッケージをインストールします..."
yarn install

# reactを実行・ビルドする
echo "reactを実行します"
yarn start
