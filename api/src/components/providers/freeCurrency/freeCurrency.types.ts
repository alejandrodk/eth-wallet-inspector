export interface FcApiResponse<T> {
  meta: Record<string, any>;
  data: T;
}
