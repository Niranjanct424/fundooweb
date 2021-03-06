// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
  production: true,

  userApiUrl:'http://localhost:8080',
  registerUrl:'/User/Registration',
  loginUrl:'/User/Login',
  forgotPasswordUrl:'/User/ForgotPassword',
  resetPasswordUrl:'/User/UpdatePassword/',
  userVerificationUrl:'/User/Verification/',
  // colaborators:'localhost:8080/colaborators/add',

  noteApiUrl:'http://localhost:8080/notes',
  createNoteUrl:'/Create',
  getAllNotesUrl:'/fetch/notes',
  pinNoteUrl:'/pin',
  archieveUrl: "/archieve/",
  trashUrl:'/delete/',
  addColorUrl:'/addColor/',
  getArchieveUrl:'/fetch/notes/archived',
  getTrashedUrl:'/fetch/notes/trashed/',
  getPinnedNoteUrl:'/fetch/notes/pinned',
  deletePermanentlyUrl:'/deletePermanently/',
  searchNoteUrl:'/getNotesByTitle',
  restoreTrashrdNoteUrl:'/restore/',
  updateNoteUrl:'/update/',
  addReminderUrl:'/noteReminder',
  removeReminderUrl:'/deleteReminder',
  
  // label note
  labelApiUrl:'http://localhost:8080/labels',
  createLabelUrl:'/create',
  deleteLabelUrl:'/delete',
  updateLabelUrl:'/update',
  getLabelsUrl:'/getLabels',
  addLabelUrl:'/addLabel',
  removeLabelUrl:'/remove',
  getNotesByLableUrl:'/getNotesByLabel/',



  addCollaboratorUrl:'/addCollaborator',
  deleteCollaboratorUrl:'/deleteCollaborator',
  getCollaboratorsUrl:'/getCollaborators',
  



  ADD_REMAINDER_URL: "/remainder/add?time=",
  REMOVE_REMAINDER_URL: "/remainder/remove",
  CREATE_NOTE_URL: "/create",
  GET_ALL_REMAINDER_NOTES_URL: "/fetch/notes/remainders",
  NOTE_API_URL: "http://localhost:8080/notes",  
  LOGIN_URL: '/login',
  DELETE_NOTE_URL:'/delete/',
  UPDATE_NOTE_URL: "/update?id=",
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
