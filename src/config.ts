import * as pulumi from "@pulumi/pulumi";

import { Config } from "./types";
import { Folder } from "./types"

const gcpConfig = new pulumi.Config("gcp");

const pulumiConfig = new pulumi.Config();
const instance = pulumiConfig.get("instance") || pulumi.getStack();
const environment = pulumiConfig.get("environment") || instance;

const hierarchy: Folder = {
  kind: "Folder",
  id: "jam-lgst",
  labels: { "business-unit": "logistics" },
  children: [
    {
      kind: "Folder",
      id: "jam-lgst-sched",
      labels: { "project": "scheduler" },
      children: [
        {
          kind: "Folder",
          id: "jam-lgst-sched-prod",
          labels: { "environment": "production" },
          children: [
            {
              kind: "Project",
              id: "jam-lgst-sched-prd-app",
              labels: { "responsibility": "app" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-prd-backups",
              labels: { "responsibility": "backups" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-prd-obsrv",
              labels: { "responsibility": "observability" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-prd-report",
              labels: { "responsibility": "reporting" },
            },
          ]
        },

        {
          kind: "Folder",
          id: "jam-lgst-sched-stg",
          labels: { "environment": "staging" },
          children: [
            {
              kind: "Project",
              id: "jam-lgst-sched-stg-app",
              labels: { "responsibility": "app" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-stg-backups",
              labels: { "responsibility": "backups" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-stg-obsrv",
              labels: { "responsibility": "observability" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-stg-report",
              labels: { "responsibility": "reporting" },
            },
          ]
        },

        {
          kind: "Folder",
          id: "jam-lgst-sched-dev",
          labels: { "environment": "development" },
          children: [
            {
              kind: "Project",
              id: "jam-lgst-sched-dev-app",
              labels: { "responsibility": "app" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-dev-backups",
              labels: { "responsibility": "backups" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-dev-obsrv",
              labels: { "responsibility": "observability" },
            },

            {
              kind: "Project",
              id: "jam-lgst-sched-dev-report",
              labels: { "responsibility": "reporting" },
            },
          ]
        }
      ]
    },
    {
      kind: "Folder",
      id: "jam-lgst-invt",
      labels: { "project": "inventory" },
      children: [
        {
          kind: "Folder",
          id: "jam-lgst-invt-prod",
          labels: { "environment": "production" },
          children: [
            {
              kind: "Project",
              id: "jam-lgst-invt-prod-app",
              labels: { "responsibility": "app" }
            },
          ]
        }
      ]
    }
  ]
}

export const config = Config.parse({
  environment,
  project: gcpConfig.require("project"),

  hierarchy,
} as Config);
