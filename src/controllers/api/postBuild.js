const axios = require('axios');
const Promise = require("bluebird");
const {GIT_LOCAL_PATH, AXIOS_CONFIG} = require('../../config/index');

module.exports = async (req, res) => {
  try {
    const commitHash = req.params.commitHash;
    const exec = Promise.promisify(require('child_process').exec,
      {multiArgs: true});

    const dir = GIT_LOCAL_PATH + '\\.git';
    const branchSearchResult = await exec('git --git-dir ' + dir + ' branch --contains ' + commitHash);
    const branchName = branchSearchResult[0].replace(/\*/g, '').trim();
    const logResult = await exec('git --git-dir ' + dir + ' log -1 --pretty=format:"%H|%an|%s" ' + commitHash);

    const respSettings = await axios.get('/conf', AXIOS_CONFIG);

    const buildCommand = respSettings.data.data.buildCommand;
    const commitInfo = logResult[0].split('|');
    const authorName = commitInfo[1].trim();
    const commitMessage = commitInfo[2].trim();
    const buildDirConfig = {
      shell: true,
      cwd: GIT_LOCAL_PATH,
      env: {
        ...process.env,
        FORCE_COLOR: true,
        TERM: 'xterm-256color'
      }
    };
    const requestBody = {commitMessage, commitHash, branchName, authorName};
    const response = await axios.post('/build/request', requestBody, AXIOS_CONFIG);
    const buildId = response.data.data.id;
    const buildNumber = response.data.data.buildNumber;
    const dateTime = new Date();
    const requestBodyStart = {buildId, dateTime};

    await axios.post('/build/start', requestBodyStart, AXIOS_CONFIG);

    const duration = new Date() - dateTime;
    const buildLog = await exec(buildCommand, buildDirConfig);
    const success = !!logResult[0].length;
    const requestBodyFinish = {buildId, duration, success, buildLog: buildLog[0] };
    const respJson = {
      data: {
        buildId,
        buildNumber,
        branchName,
        authorName,
        commitMessage,
        success,
        start: dateTime,
        duration,
        buildLog: buildLog[0]
      }
    };
    const resFinish = await axios.post('/build/finish', requestBodyFinish, AXIOS_CONFIG);
    res.send(respJson);
    res.json(resFinish);
  } catch (error) {
    res.send(error);
  }
};
