/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

declare module '*.json' {
    const value: any;
    export default value;
}

interface String {
    toSnakeCase(): string;

    pick(min: number, max?: number): string;

    shuffle(): string;
}
