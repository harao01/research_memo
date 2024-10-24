/** 指定ファイルのタスクの所要時間をタグごとに集計するスクリプト */

// タスクから時刻を抽出するための正規表現
const timeRegex = /^(\d+:\d+)(\s*-(\d+:\d+))?/;

// dv.viewの引数inputからファイルパスを取得する
const filePath = input.filePath;
showDurations(filePath);

/**
 * 各タスクの所要時間を集計して表示する
 * @param {string} filePath 集計するファイルのパス
 */
function showDurations(filePath) {
  const durations = aggregateTaskDurations(filePath);
  const tableContent = generateTableContent(durations);
  dv.table(...tableContent);
}

/**
 * 各タスクの所要時間を集計する
 * @param {string} filePath 集計するファイルのパス
 * @returns {Object} 各タグの所要時間を格納したオブジェクト
 */
function aggregateTaskDurations(filePath) {
  const tasks = dv
    .page(filePath)
    .file.tasks.filter((task) => timeRegex.test(task.text));
  const durations = {};

  for (let i = 0; i < tasks.length - 1; i++) {
    parseTask(durations, tasks[i], tasks[i + 1]);
  }
  if (tasks.length > 0) {
    parseTask(durations, tasks[tasks.length - 1], null);
  }
  return durations;
}

/**
 * タスクの所要時間を集計する
 * @param {Object} durations 各タグの所要時間を格納したオブジェクト
 * @param {Object} currentTask 現在のタスク
 * @param {Object} nextTask 次のタスク
 * @returns {Object} 各タグの所要時間を格納したオブジェクト
 */
function parseTask(durations, currentTask, nextTask) {
  let { startTime, endTime } = extractTimeFromTask(currentTask);
  if (!endTime) {
    endTime = extractTimeFromTask(nextTask).startTime || parseTime("24:00");
  }

  if (!currentTask.tags.length) {
    return;
  }
  const tag = currentTask.tags[0];
  if (!durations[tag]) {
    durations[tag] = 0;
  }
  durations[tag] += endTime - startTime;
}

/**
 * タスクから所要時間（ミリ秒）を抽出する
 * @param {*} task タスク
 * @returns {Object} タスクの開始時間と終了時間を格納したオブジェクト
 */
function extractTimeFromTask(task) {
  if (!task) {
    return { startTime: null, endTime: null };
  }
  const match = task.text.match(timeRegex);
  if (!match) {
    return { startTime: null, endTime: null };
  }

  const startTime = parseTime(match[1]);
  const endTime = match[3] ? parseTime(match[3]) : null;

  return { startTime, endTime };
}

/**
 * 時刻文字列をミリ秒に変換する
 * @param {string} time 時刻文字列
 * @returns {number} 時刻のミリ秒
 */
function parseTime(time) {
  return Date.parse(`01/01/2000 ${time}`);
}

/**
 * テーブルの内容を生成する
 * @param {Object} durations 各タグの所要時間を格納したオブジェクト
 * @returns {Array} テーブルの内容
 */
function generateTableContent(durations) {
  const totalMs = Object.values(durations).reduce(
    (prev, curr) => prev + curr,
    0
  );
  const tableHeader = ["Task", "Time"];
  const tableContent = Object.entries(durations)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, duration]) => [tag, getTimeStringFromMs(duration)]);
  tableContent.push(["**Total**", getTimeStringFromMs(totalMs)]);
  return [tableHeader, tableContent];
}

/**
 * 所要時間を文字列に変換する
 * @param {number} duration ミリ秒
 * @returns {string} HH:mm形式の文字列
 */
function getTimeStringFromMs(duration) {
  const hours = Math.floor(duration / 1000 / 60 / 60);
  const minutes = Math.floor(duration / 1000 / 60) % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}