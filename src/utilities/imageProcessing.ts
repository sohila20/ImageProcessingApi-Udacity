import sharp from 'sharp';
import path from 'path';
const fs = require('fs');
const imagesFullPath = path.resolve(__dirname, '../../images/full');
const imagesThmbPath = path.resolve(__dirname, '../../images/thumb');

async function createthumb(name: string, w: number, h: number) {
  if (!fs.existsSync(imagesThmbPath)) {
    fs.mkdirSync(imagesThmbPath);
  }
  const filePathThumb: string = path.resolve(
    imagesThmbPath,
    `${name}-${w}x${h}.jpg`
  );

  console.log(`Creating thumb ${filePathThumb}`);
  const filePath = path.resolve(imagesFullPath, `${name}.jpg`);
  return await sharp(filePath)
    .resize(w, h)
    .toFormat('jpeg')
    .toFile(filePathThumb);
}

async function getImagePath(
  name: string,
  w: number,
  h: number
): Promise<null | string> {
  if (!name) {
    return null;
  }

  const filePath: string =
    w && h
      ? path.resolve(imagesThmbPath, `${name}-${w}x${h}.jpg`)
      : path.resolve(imagesFullPath, `${name}.jpg`);

  try {
    await fs.existsSync(filePath);
    return filePath;
  } catch {
    return null;
  }
}

function isImageFound(name: string) {
  const filePath: string = path.resolve(imagesFullPath, `${name}.jpg`);
  if (fs.existsSync(filePath)) {
    return true;
  } else {
    return false;
  }
}

export { createthumb, getImagePath, isImageFound };
