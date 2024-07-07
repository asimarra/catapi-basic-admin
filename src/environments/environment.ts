import { IToastrConfig } from '../app/interfaces/IToastr';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const toastrBasicConfig: IToastrConfig = {
  timeOut: 20000,
  positionClass: 'toast-bottom-right',
  progressBar: true,
  closeButton: true,
  enableHtml: true,
  maxOpened: 5,
  tapToDismiss: false,
  disableTimeOut: 'extendedTimeOut'
}

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:3000',
  baseSocketUrl: 'http://localhost:4500',
  storageKeys: {
    TOKEN_KEY: 'auth-token',
    USER_KEY: 'auth-user'
  },
  toastrBasicConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
