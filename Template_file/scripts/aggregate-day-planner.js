/** �w��t�@�C���̃^�X�N�̏��v���Ԃ��^�O���ƂɏW�v����X�N���v�g */

// �^�X�N���玞���𒊏o���邽�߂̐��K�\��
const timeRegex = /^(\d+:\d+)(\s*-(\d+:\d+))?/;

// dv.view�̈���input����t�@�C���p�X���擾����
const filePath = input.filePath;
showDurations(filePath);

/**
 * �e�^�X�N�̏��v���Ԃ��W�v���ĕ\������
 * @param {string} filePath �W�v����t�@�C���̃p�X
 */
function showDurations(filePath) {
  const durations = aggregateTaskDurations(filePath);
  const tableContent = generateTableContent(durations);
  dv.table(...tableContent);
}

/**
 * �e�^�X�N�̏��v���Ԃ��W�v����
 * @param {string} filePath �W�v����t�@�C���̃p�X
 * @returns {Object} �e�^�O�̏��v���Ԃ��i�[�����I�u�W�F�N�g
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
 * �^�X�N�̏��v���Ԃ��W�v����
 * @param {Object} durations �e�^�O�̏��v���Ԃ��i�[�����I�u�W�F�N�g
 * @param {Object} currentTask ���݂̃^�X�N
 * @param {Object} nextTask ���̃^�X�N
 * @returns {Object} �e�^�O�̏��v���Ԃ��i�[�����I�u�W�F�N�g
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
 * �^�X�N���珊�v���ԁi�~���b�j�𒊏o����
 * @param {*} task �^�X�N
 * @returns {Object} �^�X�N�̊J�n���ԂƏI�����Ԃ��i�[�����I�u�W�F�N�g
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
 * ������������~���b�ɕϊ�����
 * @param {string} time ����������
 * @returns {number} �����̃~���b
 */
function parseTime(time) {
  return Date.parse(`01/01/2000 ${time}`);
}

/**
 * �e�[�u���̓��e�𐶐�����
 * @param {Object} durations �e�^�O�̏��v���Ԃ��i�[�����I�u�W�F�N�g
 * @returns {Array} �e�[�u���̓��e
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
 * ���v���Ԃ𕶎���ɕϊ�����
 * @param {number} duration �~���b
 * @returns {string} HH:mm�`���̕�����
 */
function getTimeStringFromMs(duration) {
  const hours = Math.floor(duration / 1000 / 60 / 60);
  const minutes = Math.floor(duration / 1000 / 60) % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}