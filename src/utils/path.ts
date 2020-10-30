import * as path from 'path';

const pathFile = relativePath => {
    return path.join(__dirname, '../', relativePath);
};

export { pathFile };
