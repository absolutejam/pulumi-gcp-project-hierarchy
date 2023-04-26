import { z } from "zod";

// Hierarchy DSL

export type Project = z.infer<typeof Project>
export type Folder = { kind: "Folder", id: string, labels?: Record<string, string>, children: FolderOrProject[] }
export type FolderOrProject = z.infer<typeof FolderOrProject>

export const Folder: z.ZodType<Folder> = z.lazy(() =>
  z.object({
    kind: z.literal("Folder"),
    id: z.string().max(30),
    labels: z.record(z.string()).optional(),
    children: FolderOrProject.array(),
  })
)

export const Project = z.object({
  kind: z.literal("Project"),
  id: z.string().max(30),
  labels: z.record(z.string()).optional(),
  displayName: z.string().max(30).optional(),
})

export const FolderOrProject = Folder.or(Project)

//

export const Config = z.object({
  environment: z.string(),
  project: z.string(),

  hierarchy: FolderOrProject,
});

export type Config = z.infer<typeof Config>;
