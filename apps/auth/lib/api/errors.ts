export class ApiError<T = unknown> extends Error {
  readonly status: number;
  readonly payload: T | null;

  constructor(message: string, status: number, payload: T | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}
