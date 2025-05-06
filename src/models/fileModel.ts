import { Schema, model, Types, HydratedDocument } from 'mongoose';

export interface IFile {
  _id: Types.ObjectId;
  fileName: string;
  isFolder: boolean;
  fileType: string; 
  size?: number;   
  url?: string;    
  uploadedBy: Types.ObjectId;
  parentFolder?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const fileSchema = new Schema<IFile>(
  {
    fileName: { type: String, required: true },
    isFolder: { type: Boolean, default: false },
    fileType: { type: String, required: true },
    size: { type: Number },
    url: { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentFolder: { type: Schema.Types.ObjectId, ref: 'File', default: null },
  },
  { timestamps: true }
);


fileSchema.pre('save', function (next) {
  const file = this as HydratedDocument<IFile>;

  if (file.isFolder) {
    file.size = 0;
    file.url = undefined;
    file.fileType = 'folder';
  }

  next();
});

export const File = model<IFile>('File', fileSchema);
