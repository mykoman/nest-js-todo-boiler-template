interface PaginationType {
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
}
export class SuccessResponse {
  message: string;
  data: object;
  pagination: PaginationType;

  constructor({
    message = 'Success',
    data = {},
    pagination,
  }: {
    message?: string;
    data?: object;
    pagination?: PaginationType;
  }) {
    this.message = message;
    this.data = data;
    this.pagination = pagination;
  }
}
