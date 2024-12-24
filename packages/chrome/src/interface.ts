export interface IProject {
    id: string;
    name: string;
    path: string;
    pathPartials: string[];
}

export interface IProjects {
    [id: string]: IProject;
}