import {VIEW_LVL_1, VIEW_LVL_2} from "./constant";

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
    name: string;
    url: string;
    method: TRequestMethod;
    response: {
        [key: string]: string;
    }
}
export type TManifestDomains = string[];
export interface IManifest {
    domains: TManifestDomains;
    requests: IManifestRequest[];
}

export interface IActiveMock {
    url: string;
    method: TRequestMethod;
    status: number;
    path: string;
    timeout?: number;
    domains: string[];
}

export interface IActiveMocks {
    [key: string]: IActiveMock
}

export type TLvl = typeof VIEW_LVL_1 | typeof VIEW_LVL_2