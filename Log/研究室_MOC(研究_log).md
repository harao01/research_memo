---
created: 2024-04-12T18:26:00
modified: 2024-10-25T15:53:33+09:00
tags:
  - MOC
status: did
type: 
aliases: 
優先_num: 1
set_hour: 1
---
### 方針
- アルカンのPVTの論文に関してピックアップしてどういった論文か情報共有できるようにする

## 本題
#### NOW DOING
```dataview
TABLE
	aliases, 
	tags
FROM 
	#memo/study/Tohtech/研究 
WHERE
	status ="Now Doing"
SORT modified DESC
LIMIT 10
```

#### TASK
---
```dataview
TASK
WHERE 
	contains(text, "#task/2/research") and
	!checked
LIMIT 5
```

#### TABLE
```dataview
TABLE
	created, 
	status,
	aliases
FROM #memo/study/Tohtech/研究 
SORT created DESC
LIMIT 25
```

#### 
