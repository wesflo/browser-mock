
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
    uid: string;
    name: string;
    path: string;
    method: TRequestMethod;
    status: number;
    timeout: number;
    response: string;
}
export interface IManifestMocks {
    domains: TManifestDomains;
    requests: IManifestRequest[];
}

export type TManifestDomains = string[];

export interface IManifest {
    name:string;
    mocks: IManifestMocks[];
}

export interface IActiveMock {
    uid: string;
    path: string;
    method: TRequestMethod;
    status: number;
    mockPath: string;
    domains: string[];
}

export interface IActiveMocks {
    [key: string]: IActiveMock
}

