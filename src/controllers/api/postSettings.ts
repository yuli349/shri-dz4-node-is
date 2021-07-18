import {Request, Response} from "express";

import axios from 'axios';
import { execFile } from 'child_process';
import util from 'util';
import { rm } from 'fs/promises';
import CONFIG from '../../config';

export default async (req: Request, res: Response) => {
  try {
    await rm(CONFIG.GIT_LOCAL_PATH, { recursive: true, force: true });
    await util.promisify(execFile)('git', ['clone', req.body.repoName, CONFIG.GIT_REPOSITORY_FOLDER_NAME]);
    const response = await axios.post('/conf', req.body, CONFIG.AXIOS_CONFIG);
    res.json(response.data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
