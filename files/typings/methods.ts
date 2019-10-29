resolve<T>(afterResolve: Function, toResolve: Promise<any>): Promise<T>
resolve<T>(toResolve: Function) : (toResolve: Promise<any>) => Promise<T>