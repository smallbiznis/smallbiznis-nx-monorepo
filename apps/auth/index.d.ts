/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'bcryptjs' {
  export function hash(data: string, saltOrRounds: number | string): Promise<string>;
  export function hashSync(data: string, saltOrRounds: number | string): string;
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compareSync(data: string, encrypted: string): boolean;
}
