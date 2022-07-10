export class Booking {
    constructor(
        public id: string,
        public userId: string,
        public placeId: string,
        public date: string,
        public nbJours: number,
    ) {}
}
