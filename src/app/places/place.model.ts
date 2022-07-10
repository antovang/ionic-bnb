export class Place {
  constructor(
    public id: string,
    public userId: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: number,
  ) {}
}
