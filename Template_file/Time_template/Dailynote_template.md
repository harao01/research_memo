---
created: 2024-10-24T13:54:47+09:00
modified: 2024-10-25T15:34:25+09:00
status: Not tag
aliases: 
tags:
  - memo/research/log/daily
set_hour: 
---


### 読み上げ
1. 論文読みながらメモを取れ。
2. 積極性を出せ。質問・相談どんどんして知見を吸収していこう。お礼も忘れずに。
3. 週二回進捗報告をしよう。週1で報告書提出（金曜）
4. どんどん新しいファイルを作りながらメモしろ
## Day Planner
- [ ] 10:00 
```dataviewjs
await dv.view('Markdown/Template_file/scripts/aggregate-day-planner', { filePath: dv.current().file.path })
```
## TASK
#### Today created
```dataview
TABLE
	tags, 
	modified
FROM "Markdown"
WHERE file.cday = date("<%tp.date.now("YYYY-MM-DD")%>")
LIMIT 10
```
#### Now doing
```dataview
TABLE
	created
FROM !"Markdown/Template_file"
WHERE
	status = "Now Doing"
SORT created DESC
LIMIT 10
```
#### 細かいタスク

#### 開始タスク
- [ ] [[#読み上げ]]を読む
- [ ] 今日の目標設定
	- [ ] 前回のログページからコピペする
	- [ ] 前回の記録の確認
#### Today doing
- [ ] 
#### Next doing
- [ ] 
#### Did
- [ ] 
## memo
### 