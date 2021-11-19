export type TPaginationOptions = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  direction?: 'ASC' | 'DESC';
};

export type TPaginationResult<T> = {
  items: T[];
  pagination: {
    total: number;
    pageSize: number;
    current: number;
  };
};
