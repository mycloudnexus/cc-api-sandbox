import { Context } from "openapi-backend";
import { Response, Request } from "express";
import { formatDistanceToNow, differenceInMilliseconds, differenceInSeconds } from "date-fns";


interface HearbeatResponse {
    name: string,
    now: number,
    uptime: number,
    humanUptime: string,
    uptimeSeconds: number,
    version: string,
};

let startTime: number;

export const setStartTime = () => startTime = Date.now();
const getStartTime = (): number => startTime;

export function heartbeat(
    _c: Context,
    _req: Request,
    res: Response,
) {
    const curTime = Date.now();
      const resJson: HearbeatResponse = {
        name: "@console/api-sandbox",
        now: curTime,
        version: "30.99.8",
        humanUptime: formatDistanceToNow(getStartTime(), {addSuffix: true}),
        uptime: differenceInMilliseconds(curTime, getStartTime()),
        uptimeSeconds: differenceInSeconds(curTime, getStartTime()),
      };
      return res.status(200).json(resJson);
};
