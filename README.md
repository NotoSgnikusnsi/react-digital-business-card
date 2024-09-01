# react-learning-record
## 学習ソース
[【2024年最新版】0からReactを勉強するならこのロードマップに従え！](https://qiita.com/Sicut_study/items/7d8c6f309dddda1a3961)
## 課題1
- [x] Viteを利用してReact環境を用意する
- [x] Node.jsをインストールする
- [x] タイトル「学習記録一覧」を見ることができる
- [x] テストデータを一覧で表示する
```js
const records = [
    { title: "勉強の記録1", time: 1},
    { title: "勉強の記録2", time: 3},
    { title: "勉強の記録3", time: 5}
]
```
- [x] 学習内容の入力フォームをみることができる
- [x] 学習時間の入力フォームをみることができる
- [x] 学習時間の入力フォームは数字を入力できる
- [x] 登録ボタンをみることができる
- [x] 登録ボタンをクリックするとrecordsに記録を追加できる
- [x] 登録をしたらフォームが初期化される
- [x] 全項目が入力されていないときにエラーが表示される
- [x] 正しく入力されている場合登録ボタンを押すとエラーが消える
- [x] 記録した勉強の時間を合計した値をみることができる