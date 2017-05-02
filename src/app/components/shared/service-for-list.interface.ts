interface ServiceForListInterface {
  getList(): Promise<any[]>;
  getDescriptionById(id: string): Promise<string>;
}
