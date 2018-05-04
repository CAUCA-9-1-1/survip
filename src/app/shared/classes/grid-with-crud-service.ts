
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

    loadSource(id?: string) {
        this.sourceService.getAll(id).subscribe(data => this.dataSource = data);
    }

}
