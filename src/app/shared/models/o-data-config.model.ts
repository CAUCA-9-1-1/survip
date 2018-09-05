export class ODataConfig {
    url: string;
    key: string;
    keyType: string;
    onInserting?: (e: any) => void;
    onUpdating?: (e: any) => void;
    onRemoving?: (e: any) => void;
}
