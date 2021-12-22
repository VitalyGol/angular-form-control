
export interface IFileUploadItem extends File {
    completed: boolean;
    uploading: boolean;
    message: string;
    trustedName: string;
}
