import generateFilePath from './generateFilePath';

describe('generateFilePath', () => {
    it('should create right filepath', () => {
        const repo = 'foo';
        const branch = 'feature/bar-lorem';
        const path = generateFilePath(repo, branch);

        expect(path.indexOf(repo)).toBe(0);
        expect(path.indexOf('/')).toBe(repo.length);
        expect(path.lastIndexOf('/')).toBe(repo.length);
        expect(path.indexOf('.js')).toBe(path.length - 3);
    });
});
