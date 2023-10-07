# backend serverの起動方法
- このディレクトリで以下のコマンドを実行
```
$ ./setup.sh
```
- もし`brew`コマンドが使えなかった場合，https://zenn.dev/watakarinto/articles/16451707aa08d1 を参照してください


# APIドキュメント

## GET /api/events
- description: イベント一覧を取得する
- request: null
- response:
  - status: 200
  - body:
    - id: string
    - title: string
    - start: string
    - end: string(optional)
    - className: string
    - allDay: boolean(optional)
- example:
  - request: null
  - response(case 1):
    - status: 200
    - body:
      ```json
      [
        {
          "id": "1",
          "title": "重要会議",
          "start": "2023-08-04T12:00:00+09:00",
          "end": "2023-08-04T14:00:00+09:00",
          "className": "仕事",
          "allDay": false,
          "users": [
            "asdf",
            "asdf2"
          ]
        },
        {
          "id": "2",
          "title": "経費精算",
          "start": "2023-08-10T00:00:00+09:00",
          "end": "2023-08-10T15:00:00+09:00",
          "className": "仕事",
          "allDay": true,
          "users": []
        }
      ]
      ```
  - response(case2)
    - status

## POST /api/events
- description: イベントを作成する
- request:
  - body:
    - title: string
    - start: string
    - end: string(optional)
    - className: string
    - allDay: boolean(optional)

- response:
    - status: 201
    - body:
      ```json
      {
        "id": "10"
      }
      ```

## PATCH /api/events/:id
- description: イベントをPATCHする
- request:
  - body:
    - title: string(optional)
    - start: string(optional)
    - end: string(optional)
    - className: string(optional)
    - allDay: boolean(optional)
- response:
  - 更新
    - status: 200
    - body:
      リクエストで送信したパラメータだけが埋まって帰ってくる
     ```json
     {
        "id": "",
        "title": "",
        "start": "2023-09-06T02:00:00Z",
        "end": "2023-09-06T05:30:00Z",
        "className": "",
        "allDay": false
      }
      ```
  - idが存在しない場合
    - status: 404

## PUT /api/events/:id
- description: イベントをPUTする
- request:
  - body:
    - title: string
    - start: string
    - end: string(optional)
    - className: string
    - allDay: boolean(optional)
- response:
  - 新規作成
    - status: 200
    - body:
      ```json
      {
        "id": "10"
      }
      ```
  - 更新
    - status: 204

## DELETE /api/events/:id
- description: イベントを削除する
- request: null
- response:
    - status: 204
    - body: null
    ### idが存在しない場合
    - status: 404

## GET /api/users
- description: ユーザー一覧を取得する
- request: null
- response:
  - status: 200
  - body:
    固定値
    ```json
    [
      "Dennis Ritchie",
      "Jedi Luke Skywalker",
      "Ken Thompson",
      "Linus Torvalds",
      "Neumann"
    ]
    ```
