'use server';

import getCurrentUser from './getCurrentUser';

export async function getPlaces() {
  const user = await getCurrentUser();
}
export default async function getPlace(id: string) {
  const user = await getCurrentUser();
}
