import {Request, Response} from "express";

import axios from 'axios';
import CONFIG from '../../config';
import {execFile} from 'node:child_process';
import {promisify} from "node:util";

export default async (req: Request, res: Response) => {
  try {
    const commitHash = req.params.commitHash;

    const dir = CONFIG.GIT_LOCAL_PATH + '\\.git';
    const branchSearchResult: { [index: string]: any } = await promisify(execFile)('git --git-dir ' + dir + ' branch --contains ' + commitHash);
    const branchName = branchSearchResult[0].replace(/\*/g, '').trim();
    const logResult: { [index: string]: any } = await promisify(execFile)('git --git-dir ' + dir + ' log -1 --pretty=format:"%H|%an|%s" ' + commitHash);

    const respSettings = await axios.get('/conf', CONFIG.AXIOS_CONFIG);

    const buildCommand = respSettings.data.data.buildCommand;
    const commitInfo = logResult[0].split('|');
    const authorName = commitInfo[1].trim();
    const commitMessage = commitInfo[2].trim();
    const buildDirConfig: any = { //подскажите, как можно ошибку на 43 строчке решить без any?

      shell: true,
      cwd: CONFIG.GIT_LOCAL_PATH,
      env: {
        ...process.env,
        FORCE_COLOR: true,
        TERM: 'xterm-256color'
      }
    };
    const requestBody = {commitMessage, commitHash, branchName, authorName};
    const response = await axios.post('/build/request', requestBody, CONFIG.AXIOS_CONFIG);
    const buildId = response.data.data.id;
    const buildNumber = response.data.data.buildNumber;
    const dateTime: number = Number(new Date());
    const requestBodyStart = {buildId, dateTime};

    await axios.post('/build/start', requestBodyStart, CONFIG.AXIOS_CONFIG);

    const duration = Number(new Date()) - dateTime;
    const buildLog: { [index: string]: any } = await promisify(execFile)(buildCommand, buildDirConfig);
    const success = !!logResult[0].length;
    const requestBodyFinish = {
      buildId,
      duration,
      success,
      buildLog: buildLog[0]
    };
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
    const resFinish = await axios.post('/build/finish', requestBodyFinish, CONFIG.AXIOS_CONFIG);
    res.send(respJson);
    res.json(resFinish);
  } catch (error) {
    res.send(error);
  }
};
