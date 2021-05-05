export enum Route {
  account = 'account',
  video = 'video',
  user = 'user',
  subarea = 'subarea',
}
export enum AccountControllerPath {
  create = 'create',
  createBank = 'createBank',
  login = 'login',
  fetch_account_info = 'fetch_account_info',
  find_all = 'find_all',
  find_all_bank = 'find_all_bank',
}
export enum VideoControllerPath {
  create = 'create',
  uploadVideo = 'uploadVideo',
  getUploadingVideo = 'getUploadingVideo',
  abortProcessingVideo = 'abortProcessingVideo',
}
export enum SubareaControllerPath {
  create_parent = 'createParent',
  create_children = 'createChildren',
  query_subarea = 'querySubarea',
}
export enum UserControllerPath {
  create = 'create',
  isUsed = 'isUsedByUser',
  identifyIDCard = 'identifyIDCard',
}
