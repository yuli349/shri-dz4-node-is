const axios = require('axios');
const util = require('util');
const {GIT_LOCAL_PATH, AXIOS_CONFIG} = require('../../config/index');

module.exports = async (req, res) => {
  try {
    const commitHash = req.params.commitHash;
    const exec = util.promisify(require('child_process').exec);
    const dir = GIT_LOCAL_PATH + '\\.git';

    const branchSearchResult = await exec('git --git-dir ' + dir + ' branch --contains ' + commitHash);
    const branchName = branchSearchResult.stdout.replace(/\*/g, '').trim();
    const logResult = await exec('git --git-dir ' + dir + ' log -1 --pretty=format:"%H|%an|%s" ' + commitHash);
    const commitInfo = logResult.stdout.split('|');
    const authorName = commitInfo[1].trim();
    const commitMessage = commitInfo[2].trim();
    const buildDir = GIT_LOCAL_PATH + '\\build';

    const buildDirConfig = {
      shell: true,
      cwd: buildDir,
      env: {
        ...process.env,
        FORCE_COLOR: true,
        TERM: 'xterm-256color'
      }
    };

    const requestBody = {commitMessage, commitHash, branchName, authorName};
    const response = await axios.post('/build/request', requestBody, AXIOS_CONFIG);

    const buildId = response.data.data.id;
    const dateTimeStart = new Date();
    const requestBodyStart = {buildId, dateTimeStart};

    const respSettings = await axios.get('/conf', AXIOS_CONFIG);

    const buildCommand = respSettings.data.data.buildCommand;

    await axios.post('/build/start', requestBodyStart, AXIOS_CONFIG);

    const duration = new Date() - dateTimeStart;

    // const log = await exec(buildCommand);
    //
    // console.log(log);

    // const log = await exec(buildCommand[,buildDirConfig]);
    //
    // console.log(log.stderr);
    // console.log(log.stdout);
    // console.log(log);

    const success = !!!logResult.stdout.length;
    const str = 'string';
    const requestBodyFinish = {buildId, duration, success, str };

    console.log(requestBodyFinish);

    const respFinish = await axios.post('/build/finish', requestBodyFinish, AXIOS_CONFIG);

    // console.log(respFinish);
    // res.json(respFinish.data);
    res.json(respFinish.data);

  } catch (error) {

    res.send(error);
  }
};
