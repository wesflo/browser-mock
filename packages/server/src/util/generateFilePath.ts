const generateFilePath = (repo, branch) => `${repo}/${branch.replace('/', '-')}.bundle.js`;

export default generateFilePath;
