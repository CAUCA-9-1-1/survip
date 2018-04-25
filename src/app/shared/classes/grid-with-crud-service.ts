
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
        console.log('webuser update', e);
        this.sourceService.save(e.key).subscribe();
    }

    onRowRemoved(e) {
        this.sourceService.remove(e.key.id).subscribe();
    }

    protected loadSource() {
        this.sourceService.getAll().subscribe(data => this.dataSource = data);
    }
}