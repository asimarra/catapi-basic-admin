export interface IToastrConfig {
    timeOut: number,
    positionClass: string,
    preventDuplicates?: boolean,
    progressBar: boolean,
    closeButton: boolean,
    enableHtml: boolean,
    maxOpened?: number,
    tapToDismiss: boolean,
    disableTimeOut: boolean | 'timeOut' | 'extendedTimeOut';
}