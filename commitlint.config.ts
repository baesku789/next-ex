import { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  /**
   * Resolve and load @commitlint/config-conventional from node_modules
   * Referenced packages must be installed.
   */
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
};

module.exports = Configuration;
