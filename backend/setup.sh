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

# Golangをインストール
echo "golangをインストールします..."
brew install go

# パッケージをインストールする
echo "必要なパッケージをインストールします..."
go get -d ./...

# main.goを実行・ビルドする
echo "main.goを実行します"
go run main.go &> /dev/null &
