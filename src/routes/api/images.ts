import express from 'express';
import {
  createthumb,
  getImagePath,
  isImageFound
} from '../../utilities/imageProcessing';
const images = express.Router();

images.get('/', async (req, res) => {
  //do something
  let filename: string;
  let width: number;
  let height: number;

  if (!req.query.filename) {
    return res.status(400).send('filename parameter is missing');
  } else {
    filename = req.query.filename as string;
  }

  if (!req.query.width) {
    res.status(400);
    res.send('width parameter is missing');
    return;
  } else if (req.query.width && Number(req.query.width) <= 0) {
    return res.status(400).send(`Invalid "width" value: ${req.query.width}`);
  } else {
    width = Number(req.query.width) as number;
  }

  if (!req.query.height) {
    res.status(400);
    res.send('height parameter is missing');
    return;
  } else if (req.query.height && Number(req.query.height) <= 0) {
    return res.status(400).send(`Invalid "height" value: ${req.query.height}`);
  } else {
    height = Number(req.query.height) as number;
  }

  const error: null | string = '';
  if (error) {
    res.send(error);
    return;
  }

  if (isImageFound(filename)) {
    await createthumb(filename, width, height);
  } else {
    res.send('No image with this name, please enter a valid name');
  }
  const path: null | string = await getImagePath(filename, width, height);
  if (path) {
    res.sendFile(path);
  } else {
    res.send('Something wrong');
  }
});

export default images;
