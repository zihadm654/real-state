export type StepListItem = {
  id: string;
  label: string;
  name: string;
  description: string;
  fields?: string[];
};

export const steps: StepListItem[] = [
  {
    label: 'Welcome',
    id: '1',
    name: 'Welcome to DMT',
    description: `We welcome all the individuals and businesses to our tourism marketplace platform. Here, you can list Accommodation property and Experience offering based in Africa and Asia. Focused on tourism niche and regional specific services, the sellers will be able to take great advantage among buyers around the world.`,
  },
  {
    label: 'Location',
    id: '2',
    name: 'Specify your event location',
    description:
      "Let's get started by specifying the location where you want to host your event.",
    fields: ['latitude'],
  },
  {
    label: 'Business',
    id: '3',
    name: 'Tell us about your business',
    description:
      'Share some details about your business and the type of listing you want to host.',
    fields: [
      'businessNature',
      'individualNbr',
      'individualTaxIdNbr',
      'businessRegistrationNbr',
      'businessTaxIdNbr',
      'eventType',
      'listingType',
    ],
  },
  {
    label: 'Rooms',
    id: '4',
    name: 'Set up your rooms categories',
    description: 'Let guests know what your listing has to offer.',
    fields: [
      'onsiteEvent.name',
      'onsiteEvent.price',
      'onsiteEvent.business',
      // 'onsiteEvent.isDiscountAvailable',
      'onsiteEvent.nbrOfDays',
      'onsiteEvent.highlight',
      'onsiteEvent.endTime',
      'onsiteEvent.startTime',
    ],
  },
  // {
  //   label: 'Details',
  //   id: '5',
  //   name: 'Provide details about your listing',
  //   description:
  //     'Include details about your listing to help guests find the right fit.',
  //   fields: ['title', 'description'],
  // },
  // {
  //   label: 'Property',
  //   id: '6',
  //   name: 'What amenities does your property have',
  //   description:
  //     'We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.',
  //   fields: ['amenities', 'facilities', 'foodDrinks'],
  // },
  {
    label: 'Photos',
    id: '5',
    name: 'Photos for the beautiful listing',
    description:
      'We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.',
    fields: ['photos'],
  },
  {
    label: 'Preview',
    id: '6',
    name: 'Preview all your selections',
    description: 'preview all the selections and validate',
    fields: [
      'latitude',
      'businessNature',
      'individualNbr',
      'individualTaxIdNbr',
      'businessRegistrationNbr',
      'businessTaxIdNbr',
      'eventType',
      'listingType',
      'onsiteEvent.name',
      'onsiteEvent.price',
      'onsiteEvent.business',
      'onsiteEvent.isCustomDatesAvailable',
      // 'onsiteEvent.isDiscountAvailable',
      'onsiteEvent.nbrOfDays',
      'onsiteEvent.category',
      'onsiteEvent.endDate',
      'onsiteEvent.startDate',
      'photos',
    ],
  },
  {
    label: 'complete',
    id: '7',
    name: 'Complete',
    description:
      'We recommend having at least five of these top amenities. You’ll be able to add other amenities after you publish your listing.',
  },
];
