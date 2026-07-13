import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

// Allow only code files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".js",
    ".jsx",
    ".py",
    ".java",
    ".cpp",
    ".c",
  ];

  const extension = path.extname(file.originalname);

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only code files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;