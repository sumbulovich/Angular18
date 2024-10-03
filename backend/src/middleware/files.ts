import multer from "multer";

const MINE_TYPE: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error: Error | null = null;
    if (!MINE_TYPE[file.mimetype]) error = new Error('Invalid mine type');
    cb(error, './public/tickets')
  },
  filename: (req, file, cb) => {
    const ext = MINE_TYPE[file.mimetype];
    cb(null, `${Date.now()}.${ext}`);
  }
});

export const extractFile = multer({ storage }).single('file')
