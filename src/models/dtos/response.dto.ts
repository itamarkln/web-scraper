export class ResponseDTO {
    constructor(public data?: {
        content: any | null,
        success: boolean |null,
        errMsg: string | null,
    }) {}
}