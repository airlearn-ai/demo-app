class ApiResponse {
    public success?: boolean;
    public message?: string;
    public errorCode?: Number;
    public data: any;

    constructor(params: ApiResponse = {} as ApiResponse) {
        const {
            success = true,
            message = null,
            errorCode = null,
            data = null
        } = params;
        this.success = success;
        this.message = message;
        this.errorCode = errorCode;
        this.data = success ? data : null;
    }
}

export default ApiResponse;
