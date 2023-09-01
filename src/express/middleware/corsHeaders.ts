import { Request, Response, NextFunction } from 'express';
import { SanitizedConfig } from '../../config/types';

export default (config: SanitizedConfig) => (
  (req: Request, res: Response, next: NextFunction) => {
    if (config.cors) {
      let headers = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Content-Encoding', 'x-apollo-tracing'];

      res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
      

      if (config.cors === '*') {
        res.setHeader('Access-Control-Allow-Origin', '*');
      } else if (Array.isArray(config.cors) && config.cors.indexOf(req.headers.origin) > -1) {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        headers.push("credentials");
      }

      res.header('Access-Control-Allow-Headers', headers.join(","));
    }

    next();
  });
