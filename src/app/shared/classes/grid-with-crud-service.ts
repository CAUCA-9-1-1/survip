
export class GridWithCrudService {
    dataSource = [];

    constructor(private sourceService: any) { }

    onRowValidating(e) {
        if (!e.newData.localizations) {
            e.isValid = false;
        }
    }

    onRowInserted(e) {
        this.sourceService.save(e.data).subscribe(info => {
            this.loadSource();
        }, error => {
            this.loadSource();
        });
    }

    onRowUpdated(e) {
        this.sourceService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.sourceService.remove(e.key.id).subscribe();
    }

    protected loadSource(opts?: any) {
        if (typeof(opts) === 'function') {
            this.loadWithCallback(opts);
        } else if (typeof(opts) === 'string') {
            this.loadSpecificItem(opts);
        } else {
            this.sourceService.getAll().subscribe(data => this.dataSource = data);
        }
    }

    private loadSpecificItem(id: string) {
        this.sourceService.getAll(id).subscribe(data => this.dataSource = data);
    }

    private loadWithCallback(callback: () => void) {
        this.sourceService.getAll().subscribe(data => {
            this.dataSource = data;

            if (callback) {
                callback();
            }
        });
    }
}
