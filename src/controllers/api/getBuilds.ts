import {Request, Response} from "express";

import axios from 'axios';
import CONFIG from '../../config';

export default async (req: Request, res: Response) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 25;
  try {
    const response = await axios.get(`/build/list?offset=${offset}&limit=${limit}`, CONFIG.AXIOS_CONFIG);
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
};
