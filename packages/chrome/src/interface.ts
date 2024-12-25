export interface IProject {
    id: string;
    name: string;
    path: string;
    pathPartials: string[];
    active?: boolean;
}

export interface IProjects {
    [id: string]: IProject;
}

export type TRequestMethod = 'GET' | 'PUT' | 'DELETE' | 'POST' | 'PATCH';

export interface IManifestRequest {
    url: string;
    method: TRequestMethod;
    response: {
        [key: string]: string;
    }
}

export interface IManifest {
    domains: string[];
    requests: IManifestRequest[];
}

export interface IActiveMock {
    url: string;
    method: TRequestMethod;
    status: number;
    path: string;
}

export interface IActiveMocks {
        [key: string]: IActiveMock
}