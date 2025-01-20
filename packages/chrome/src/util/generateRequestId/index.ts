import {IManifestRequest} from "../../interface";

export const generateRequestId = (req: IManifestRequest) => `${req.method}_${req.url}`;