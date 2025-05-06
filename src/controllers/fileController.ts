import { Request, Response } from 'express';
import { Types } from 'mongoose';
import * as fileService from '../services/fileService';
const LOG_PREFIX = `fileController`


export const createFile= async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error('No file uploaded');
    if (!req.userId) throw new Error('Unauthorized');

    const uploadedBy = new Types.ObjectId(req.userId);
    const parentFolder = req.body.parentFolder ? new Types.ObjectId(req.body.parentFolder) : undefined;

    const result = await fileService.createFile(req.file, uploadedBy, parentFolder);
    res.status(201).json({ message: 'File uploaded successfully', data: result, status: true });

  } catch (error: any) {
    console.log(`${LOG_PREFIX} uploadFile error`, error.message)
    res.status(400).json({ message: (error as Error).message, data: {status: false} });
  }
};


export const createFolder = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error('Unauthorized');
    const { folderName, parentFolder } = req.body;

    const uploadedBy = new Types.ObjectId(req.userId);
    if (!folderName) throw new Error('Folder name is required');

    const result = await fileService.createFolder(
      folderName,
      new Types.ObjectId(uploadedBy),
      parentFolder ? new Types.ObjectId(parentFolder) : undefined
    );


    res.status(201).json({ message: 'Folder created successfully', data: result });

  } catch (error: any) {
    console.log(`${LOG_PREFIX} createFolder error`, error.message)
    res.status(400).json({ message: (error as Error).message , data: {status: false} });
  }
};

export const deleteFileOrFolder = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    if (!fileId) throw new Error('fileId is required');

    const uploadedBy = new Types.ObjectId(req.userId);
    const fileIdMongo = new Types.ObjectId(fileId)
    const result = await fileService.deleteFileOrFolder(fileIdMongo, uploadedBy);
    res.status(200).json(result);

  } catch (error: any) {
    console.log(`${LOG_PREFIX} deleteFileOrFolder error`, error.message)
    res.status(400).json({ message: (error as Error).message,data: { status: false}  });
  }
};

export const getFileOrFolderDetails = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    if (!fileId) throw new Error('fileId is required');

    const uploadedBy = new Types.ObjectId(req.userId);
    const fileIdMongo = new Types.ObjectId(fileId)

    const result = await fileService.getFileOrFolderDetails(fileIdMongo, uploadedBy);
    res.status(200).json(result);

  } catch (error: any) {
    console.log(`${LOG_PREFIX} getFileOrFolderDetails error`, error.message)
    res.status(400).json({ message: (error as Error).message, data: {status: false } });
  }
};

export const getFolderChildren = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    if (!folderId) throw new Error('folderId is required');

   
    const uploadedBy = new Types.ObjectId(req.userId);
    const folderIdMongo = new Types.ObjectId(folderId)

    const result = await fileService.getFolderChildren(folderIdMongo, uploadedBy);
    res.status(200).json(result);

  } catch (error: any) {
    console.log(`${LOG_PREFIX} getFolderChildren error`, error.message)
    res.status(400).json({ message: (error as Error).message, data: {status: false } });
  }
};

export const getAllRootFolderForUser = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error('Unauthorized');
    const uploadedBy = new Types.ObjectId(req.userId);

    const result = await fileService.getAllRootFolderForUser(uploadedBy);
    res.status(200).json(result);

  } catch (error: any) {
    console.log(`${LOG_PREFIX} getAllRootFolderForUser error`, error.message)
    res.status(400).json({ message: (error as Error).message, data: {status: false } });
  }
};