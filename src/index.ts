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

import "source-map-support/register";
import pino from "pino";
import { createApp } from "./app";
import dotenv from "dotenv";

const log = pino({
  level: "info",
});

const startApp = async () => {
  dotenv.config();

  const app = await createApp(log);

  // Launch the app.
  await new Promise<void>((resolve, reject) => {
    try {
      app.listen(9000, () => {
        resolve();
      });
    } catch (err) {
      // We can't force upstream errors to be Error objects
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reject(err);
    }
  });
  log.info("api listen at http://localhost:9000");
};

void startApp()
  .then()
  .catch((e: unknown) => {
    log.fatal(
      { error: e },
      "API server failed due to uncaught exception. Terminating.",
    );
    process.exit(1);
  });
