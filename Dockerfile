# Copyright 2024 Console Connect
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM node:20 AS devenv
WORKDIR /usr/src/app
COPY . .
RUN corepack enable \
    && yarn install
CMD ["/bin/bash"]

FROM devenv AS build
RUN yarn build

# When we add a bundler
# FROM node:20 AS output
# WORKDIR /app
# COPY --from=build /usr/src/app/dist .
# ENV SPECPATH=/app/spec.json

# CMD ["node", "index.js"]

FROM build AS output
CMD ["yarn", "start"]
