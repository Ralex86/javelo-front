/* @flow */

export type RequestType = {
  Start: string,
  Failure: string,
  Success: string
};

export default (name: string): RequestType => {
  return {
    Start: `${name}__Start`,
    Failure: `${name}__Failure`,
    Success: `${name}__Success`
  };
};
