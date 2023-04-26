import { build } from "./builders";

import { config } from "./config";
const { hierarchy } = config

const rootFolderId = "862108234556"

const deploy = [
    build(hierarchy, { RootFolderId: rootFolderId })
];

export const project = config.project;
