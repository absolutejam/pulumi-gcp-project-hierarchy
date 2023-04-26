import * as gcp from "@pulumi/gcp";

import { FolderOrProject, Folder } from "../types";

type RootOrgId = { RootOrgId: string }
type RootFolderId = { RootFolderId: string }
type Parent = { folder: Folder, resource: gcp.organizations.Folder }

export function build(projectOrFolder: FolderOrProject, parent: Parent | RootOrgId | RootFolderId): (gcp.organizations.Project | gcp.organizations.Folder)[] {
    switch (projectOrFolder.kind) {
        case "Project":
            const project = projectOrFolder

            if ('RootOrgId' in parent) {
                return [
                    new gcp.organizations.Project(project.id, {
                        projectId: project.id,
                        name: project.displayName ?? project.id,
                        orgId: parent.RootOrgId,
                        labels: project.labels,
                    })
                ]

            } else if ('RootFolderId' in parent) {
                return [
                    new gcp.organizations.Project(project.id, {
                        projectId: project.id,
                        name: project.displayName ?? project.id,
                        folderId: parent.RootFolderId,
                        labels: project.labels,
                    })
                ]

            } else {
                return [
                    new gcp.organizations.Project(project.id, {
                        projectId: project.id,
                        name: project.displayName ?? project.id,
                        folderId: parent.resource.id,
                        labels: project.labels,
                    }, { parent: parent.resource })
                ]
            }

        case "Folder":
            const folder = projectOrFolder

            var folderResource: gcp.organizations.Folder
            var parentLabels: Record<string, string> | undefined

            if ('RootOrgId' in parent) {
                folderResource = new gcp.organizations.Folder(folder.id, {
                    parent: `organizations/${parent.RootOrgId}`,
                    displayName: folder.id,
                })

            } else if ('RootFolderId' in parent) {
                folderResource = new gcp.organizations.Folder(folder.id, {
                    parent: `folders/${parent.RootFolderId}`,
                    displayName: folder.id,
                })

            } else {
                folderResource = new gcp.organizations.Folder(folder.id, {
                    parent: parent.resource.name,
                    displayName: folder.id,
                }, { parent: parent.resource })

                parentLabels = { ...parent.folder.labels, ...folder.labels }
            }

            return [
                folderResource,
                ...projectOrFolder.children.flatMap(projectOrFolder => {
                    const projectOrFolderWithInheritedLabels: FolderOrProject = {
                        ...projectOrFolder,
                        labels: { ...parentLabels, ...folder.labels },
                    }

                    return build(projectOrFolderWithInheritedLabels, { folder, resource: folderResource })
                })
            ]
    }
}
