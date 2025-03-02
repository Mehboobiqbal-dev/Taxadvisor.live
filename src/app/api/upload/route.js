// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';

// Configure Multer storage to store files in the public/uploads folder
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Allow only images and PDFs (you can add more file types if needed)
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  },
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Use Multer middleware
apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  // Return the file path so the client can use it in the chat message
  res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
});

export default apiRoute;

// Disable Next.js default body parser for this route so Multer can handle it
export const config = {
  api: {
    bodyParser: false,
  },
};
