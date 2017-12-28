export default function resolve<T>(promise: Promise<T>): Promise<[null, any] | [T, null]>;
