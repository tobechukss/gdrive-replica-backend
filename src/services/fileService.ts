import { Types } from 'mongoose';
import cloudinary from '../utils/cloudinary';
import { File, IFile } from '../models/fileModel';
import { getFileCategory } from '../utils/fileUtils';
import fs from 'fs';

export const createFile = async (file: Express.Multer.File, uploadedBy: Types.ObjectId, parentFolder?: Types.ObjectId):Promise<{status: boolean, data:IFile, message: string}> => {
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('File size exceeds 8MB limit');
  }

  const uploadResult = await cloudinary.uploader.upload(file.path, {
    resource_type: 'auto',
    folder: 'file-storage-app'
  });

   // delete local file after upload
   fs.unlink(file.path, (err) => {
    if (err) console.error('Error deleting temp file:', err);
    else console.log('Temp file deleted:', file.path);
  });

  const newFile = await File.create({
    fileName: file.originalname,
    fileType: file.mimetype,
    size: file.size,
    url: uploadResult.secure_url,
    uploadedBy,
    isFolder: false,
    parentFolder: parentFolder ?? null
  });

  return {status: true, data: newFile, message: "File uploaded"};
};


export const createFolder = async (folderName: string, uploadedBy: Types.ObjectId, parentFolder?: Types.ObjectId) => {
  const newFolder = await File.create({
    fileName: folderName,
    fileType: 'folder',
    isFolder: true,
    uploadedBy,
    parentFolder: parentFolder ?? null
  });

  return {status: true, data: newFolder, message: "Folder created"};
};


export const deleteFileOrFolder = async (fileId: Types.ObjectId, uploadedBy: Types.ObjectId) => {
  const file = await File.findOne({_id: fileId, uploadedBy});
  if (!file) throw new Error('File or Folder not found');

 
  if (file.isFolder) {
    const children = await File.find({ parentFolder: file._id });
    await Promise.all(children.map(child => deleteFileOrFolder(child._id, uploadedBy)));
  }

  if (!file.isFolder && file.url) {
    const publicId = file.url.split('/').pop()?.split('.')[0]; 
    const category = getFileCategory(file.fileType)
    if (publicId) {
      await cloudinary.uploader.destroy(`file-storage-app/${publicId}`, { resource_type: category});
    }
  }

  await file.deleteOne();
  return {status: true, message: 'Deleted successfully' };
};

export const getFileOrFolderDetails = async (fileId: Types.ObjectId, uploadedBy: Types.ObjectId): Promise<{status: boolean, data: IFile, message: string}> => {
  const file = await File.findOne({_id: fileId, uploadedBy}).lean();
  if (!file) throw new Error('File not found');

  return {status: true, data: file, message: "Folder retrieved"};
};


export const getFolderChildren = async (folderId: Types.ObjectId, uploadedBy: Types.ObjectId): Promise<{status: boolean, data: IFile[], message: string}>  => {
    const children = await File.find({ parentFolder: folderId, uploadedBy }).lean();
    return {status: true, data: children, message: "File retrieved"};
  };

  export const getAllRootFolderForUser = async (uploadedBy: Types.ObjectId): Promise<{status: boolean, data: IFile[], message: string}>  => {
    const children = await File.find({ uploadedBy, parentFolder: null }).lean();
    return {status: true, data: children, message: "File retrieved"};
  };