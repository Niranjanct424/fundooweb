// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // production: false
  production: true,

  userApiUrl:'http://localhost:8080',
  registerUrl:'/User/Registration',
  loginUrl:'/User/Login',
  forgotPasswordUrl:'/User/ForgotPassword',
  resetPasswordUrl:'/User/UpdatePassword/',
  userVerificationUrl:'/User/Verification/',

  noteApiUrl:'http://localhost:8080/notes',
  createNoteUrl:'/Create',
  getAllNotesUrl:'/fetch/notes',
  pinNoteUrl:'/pin',
  strashUrl:'/delete/',
  trashUrl:'/trashedNotes',
  addColorUrl:'/addColor/',
  ARCHIVE_NOTE_URL: "/archieve/",
  // archieveUrl:'/archieve/',

  
  DELETE_FOREVER_NOTE_URL: "/delete",
  NOTE_API_URL: "http://localhost:8080/notes",
  getArchieveUrl:'/fetch/notes/archived',
  getTrashedUrl:'/fetch/notes/trashed/',
  getPinnedNoteUrl:'/fetch/notes/pinned',
  LOGIN_URL: '/login',
  DELETE_NOTE_URL:'/delete/',
  deletePermanentlyUrl:'/deletePermanently/',
  UPDATE_NOTE_URL: "/update?id=",
  // DELETE_NOTE_URL: "/trash",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
