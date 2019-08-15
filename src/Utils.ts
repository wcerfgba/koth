export const pipeline = (fs: Array<(x: any) => any>) => (x: any): any => fs.reduce((y, f) => f(y), x)

export const _if = (p: boolean) => (a: any) => (b: any): any => p ? a : b