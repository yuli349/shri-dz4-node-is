import {Request, Response} from "express";

import axios from 'axios';
import CONFIG from '../../config';

export default async (req: Request, res: Response) => {
  try {
    const response = await axios.get('/conf', CONFIG.AXIOS_CONFIG);
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
};
