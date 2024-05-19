export const types = ['Hotel', 'Hostel'] as const;
export type RoomType = (typeof types)[number];
export interface Room<Type = string> {
  id: number;
  name: string;
  description: string;
  type: Type;
}

export interface RoomsData {
  roomsHost: Room<RoomType>[];
}

export const roomsData: RoomsData = {
  roomsHost: [
    {
      id: 1,
      name: 'Entire place',
      description: 'Have a place to yourself',
      type: 'Hotel',
    },
    {
      id: 2,
      name: 'Private room',
      description: 'Have your own room and share some common spaces',
      type: 'Hostel',
    },
    {
      id: 3,
      name: 'Hotel room',
      description:
        'Have a private or shared room in a boutique hotel, hostel, and more',
      type: 'Hotel',
    },
    {
      id: 4,
      name: 'Shared room',
      description: 'Stay in a shared space, like a common room',
      type: 'Hostel',
    },
  ],
};
