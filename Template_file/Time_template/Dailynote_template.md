---
created: ""
modified: 2024-10-30T12:47:11+09:00
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
## Table
#### Today created
```dataview
TABLE
	tags, 
	modified
FROM "Markdown"
WHERE file.cday = date("<%tp.date.now("YYYY-MM-DD")%>")
LIMIT 10
```
#### Fixed
```dataview
TABLE
	created
FROM !"Markdown/Template_file"
WHERE
	status = "fixed"
SORT created DESC
LIMIT 5
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
## Task
#### 開始タスク
- [ ] [[#読み上げ]]を読む
- [ ] [[../../Log/研究室_TASK|研究室_TASK]]を確認する
- [ ] 今日の目標設定
	- [ ] 前回のログページからコピペする
	- [ ] 前回の記録の確認
#### Now Doing_task
- [ ] 
#### Next doing_task
- [ ] 
#### Did&Archive
- [ ] 
## memo
- [[<%tp.date.now("YYYY-MM-DD")%>_memo]]

## Now doing
![[#Now Doing_task]]


### Day Planner
- [ ] 