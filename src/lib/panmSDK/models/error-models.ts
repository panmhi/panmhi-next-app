export type FetchResponseErrorType = {
  /*
   * This is a JSON.stringify version of the body of the response that was returned from the failed request.
   */
  body: string;
  /*
   * This is the HTTP Status code associated with the failed HTTP request.
   */
  statusCode: number;
};
