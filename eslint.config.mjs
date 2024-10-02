// @ts-check
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

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import jestEslint from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    // TS project config
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.eslint.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    // Adjust rules for our code specifically
    rules: {
      "no-console": "warn",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": [
        "warn",
        {
          typesToIgnore: ["const"],
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "warn",
        {
          allowNumber: true,
          allowBoolean: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
    },
  },
  {
    files: ["eslint.config.mjs"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
  // And specific rules for test code
  {
    files: ["**/*.test.ts"],
    ...jestEslint.configs["flat/recommended"],
    ...jestEslint.configs["flat/style"],
    plugins: {
      "eslint-plugin-jest": jestEslint,
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "jest/no-disabled-tests": "off",
    },
  },
  // Disable rules that conflict with prettier
  prettierConfig,
);
