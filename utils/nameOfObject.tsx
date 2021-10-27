export const nameOfObject = (fileUri: string) =>
  fileUri.substr(fileUri.lastIndexOf("/") + 1);
