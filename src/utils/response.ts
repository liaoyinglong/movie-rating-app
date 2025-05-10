import z from 'zod';

type SuccessResponse<T> = {
  data: T;
  success: true;
  code: ResponseCode;
};
type ErrorResponse = {
  errorMessage: string | null;
  success: false;
  code: ResponseCode;
};

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse;

export function successResponse<T>(data: T): SuccessResponse<T> {
  return {
    data,
    success: true,
    code: ResponseCode.Ok,
  };
}

export function errorResponse(
  errorMessage: string | z.ZodError,
  code: ResponseCode = ResponseCode.BadRequest,
): ErrorResponse {
  if (errorMessage instanceof z.ZodError) {
    errorMessage = errorMessage.issues[0].message;
  }

  return {
    errorMessage,
    success: false,
    code,
  };
}

export enum ResponseCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
}
