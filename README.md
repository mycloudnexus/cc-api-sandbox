<!--
   Copyright 2024 Console Connect

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

<!--
    TODO: Add a readme
-->

# cc-api-sandbox

cc-api-sandbox is a mock server for the Console Connect API.

_Please, be aware that this repo is under heavy development, and should be expected to change rapidly._

## Installation

Use Docker Compose to build and run the container

```bash
docker compose up --build
```

## Usage

Simply open your favorite CLI or browser and navigate to http://127.0.0.1:9000

## Contributing

Pull requests are welcome and encouraged!

For details, please see [CONTRIBUTING.md](CONTRIBUTING.md).

### Updating the OpenAPI Specification

There is a modified version of the Console Connect OpenAPI specification included in the repository.
To update the spec, simply remove the old specification from the `specs/` folder and push a new
version with the filename `ccapi_YYYYMMDD.json`, where YYYY is the 4 digit year, MM is the two
digit month, and DD is the two digit day. Then update the filename in `src/app.ts` to match.

To try out a new specification file locally, you can pass in the path to the file through the
environment variable `SPEC_FILE`. For example:

```bash
export SPEC_FILE="./specs/mytestapi.json"
yarn dev
```

## License

[Apache 2.0](LICENSE)
