export default function resolve<T>(promise: Promise<T>): Promise<[null, any] | [T, null]> {
    return promise
        .then(value => [value, null] as [T, null])
        .catch(err => [null, err] as [null, any]);
}
