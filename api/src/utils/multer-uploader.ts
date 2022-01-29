import { Request } from 'express';
import * as path from 'path';
import multer from 'multer';

const IMAGE_MAX_SIZE = 8389000;

export const UPLOAD_DIRECTORY = 'uploads/';

export const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif'];

const multerFileFilter: any = (_req: Request, file: any, callback: any) => {
  const ext: string = path.extname(file.originalname);
  if (
    file &&
    !ALLOWED_EXTENSIONS.includes(ext) &&
    file.mimetype.slice(0, 5) !== 'image'
  ) {
    throw Error(`invalid file type, supports only: ${ALLOWED_EXTENSIONS}`);
  }
  callback(null, true);
};

const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    callback(null, UPLOAD_DIRECTORY);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (_req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerUploader: any = multer({
  fileFilter: multerFileFilter,
  limits: {
    fileSize: IMAGE_MAX_SIZE,
  },
  storage,
});

export default multerUploader;
