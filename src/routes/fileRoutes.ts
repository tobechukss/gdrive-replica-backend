import express from 'express';
import multer from 'multer';
import * as fileController from '../controllers/fileController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(authMiddleware);

router.post('/create', upload.single('file'), fileController.createFile);
router.post('/create-folder', fileController.createFolder);
router.delete('/:fileId', fileController.deleteFileOrFolder);
router.get('/:fileId', fileController.getFileOrFolderDetails);
router.get('/folder/:folderId/children', fileController.getFolderChildren);
router.get('/all/user', fileController.getAllRootFolderForUser);

export default router;
