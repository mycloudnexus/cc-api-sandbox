/*
 * Copyright 2024 Console Connect
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Context } from "openapi-backend";
import { Response, Request } from "express";
import {
  formatDistanceToNow,
  differenceInMilliseconds,
  differenceInSeconds,
} from "date-fns";
import { name as packageName, version } from "../../package.json";

export interface HearbeatResponse {
  name: string;
  now: number;
  uptime: number;
  humanUptime: string;
  uptimeSeconds: number;
  version: string;
}

let startTime: number;

export const setStartTime = () => (startTime = Date.now());
const getStartTime = (): number => startTime;

export function heartbeat(_c: Context, _req: Request, res: Response) {
  const curTime = Date.now();
  const resJson: HearbeatResponse = {
    name: packageName,
    now: curTime,
    version: version,
    humanUptime: formatDistanceToNow(getStartTime(), { addSuffix: true }),
    uptime: differenceInMilliseconds(curTime, getStartTime()),
    uptimeSeconds: differenceInSeconds(curTime, getStartTime()),
  };
  return res.status(200).json(resJson);
}
