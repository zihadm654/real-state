// 'use client';

// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Separator } from '@/components/ui/separator';
// import { CheckIcon, PlusIcon } from '@radix-ui/react-icons';
// import { Chip } from '@mui/material';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import RoomTypeSelector from './roomType';
// import { roomsData, types } from '../data/room';
// import UploadImages from '@/components/uploadImage';
// // import RoomTypeSelector from '../roomType';
// // import { roomsData, types } from '../../data/rooms';
// // import UploadImages from '@/components/common/input/uploadImage';

// export default function CreateRoomForm() {
//   return (
//     <div className='flex w-full'>
//       <div className='grid grid-cols-2 w-full gap-6'>
//         <InputsSection />
//         <Separator className='col-span-2' />
//         <NumbersSection />
//         <AdonsPhotosSection />
//         <Separator className='col-span-2' />
//         <AmentiesSection />
//         <Separator className='col-span-2' />
//         <FooterSection />
//       </div>
//     </div>
//   );
// }

// function InputsSection() {
//   return (
//     <>
//       <div className='flex gap-2 flex-col w-full'>
//         <Label htmlFor='category_name'>Category Name</Label>
//         <Input type='text' id='category_name' placeholder='exp: 5 stars' />
//       </div>
//       <div className='flex gap-2 flex-col w-full'>
//         <Label htmlFor='category_description'>Description</Label>
//         <Textarea placeholder='exp: For rooms with a private bathroom,...' />
//       </div>
//       <RoomTypeSelector rooms={roomsData.roomsHost} types={types} />
//       <div className='flex gap-2 flex-col w-full'>
//         <Label htmlFor='area'>Currency</Label>
//         <Select defaultValue='USD'>
//           <SelectTrigger id='area'>
//             <SelectValue placeholder='Select' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='USD'>USD</SelectItem>
//             <SelectItem value='EUR'>EUR</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </>
//   );
// }

// function NumbersSection() {
//   return (
//     <div className='w-full col-span-2 grid grid-cols-3 gap-4'>
//       <div className='flex gap-2 flex-col w-full'>
//         <Label htmlFor='number_of_rooms'>Number of Rooms</Label>
//         <Input type='number' id='number_of_rooms' placeholder='exp: 50' />
//       </div>
//       <div className='col-span-2 w-full grid grid-cols-3 gap-4'>
//         <div className='flex gap-2 flex-col w-full'>
//           <Label htmlFor='max_occupancy'>
//             Max Occupancy
//             <sub className='italic'>per room</sub>
//           </Label>
//           <Input type='number' id='max_occupancy' placeholder='exp: 3' />
//         </div>
//         <div className='flex gap-2 flex-col w-full'>
//           <Label htmlFor='price_per_night'>
//             Price <sub className='italic'>per night</sub>
//           </Label>
//           <Input type='number' id='price_per_night' placeholder={`exp: 50`} />
//         </div>
//         <div className='flex gap-2 flex-col w-full'>
//           <Label htmlFor='price_per_night'>
//             Discount <sub className='italic'>Optional</sub>
//           </Label>
//           <Input
//             type='number'
//             value={0}
//             id='price_per_night'
//             placeholder={`exp: 5`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function AdonsPhotosSection() {
//   return (
//     <div className='w-full col-span-2 grid grid-cols-3 gap-4'>
//       {/* radios */}
//       <div className='flex gap-4 flex-col w-full'>
//         <RadioGroup defaultValue='comfortable'>
//           <Label className='mb-1'>Breakfast</Label>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem value='default' id='r1' />
//             <Label htmlFor='r1'>Included</Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem value='comfortable' id='r2' />
//             <Label htmlFor='r2'>Extra</Label>
//           </div>
//           <div className='flex flex-col  items-start mt-2 ml-6 space-y-2'>
//             <Label>
//               Price <sub className='italic'>per person</sub>
//             </Label>
//             <Input type='text' placeholder='exp: 5' />
//           </div>
//         </RadioGroup>
//         <RadioGroup defaultValue='comfortable'>
//           <Label className='mb-1'>Transfer of service</Label>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem value='default' id='r1' />
//             <Label htmlFor='r1'>Included</Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem value='comfortable' id='r2' />
//             <Label htmlFor='r2'>Extra</Label>
//           </div>
//           <div className='flex flex-col  items-start mt-2 ml-6 space-y-2'>
//             <Label>
//               Price <sub className='italic'>per person</sub>
//             </Label>
//             <Input type='text' placeholder='exp: 5' />
//           </div>
//         </RadioGroup>
//       </div>
//       {/* photos */}
//       <div className='w-full flex flex-col col-span-2 '>
//         <Label className='!mb-2'>
//           Photos <sub className='italic'>optional</sub>
//         </Label>
//         <UploadImages className='h-full' />
//       </div>
//     </div>
//   );
// }

// function AmentiesSection() {
//   return (
//     <div className='grid col-span-2 grid-cols-3 gap-4'>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant='outline'>
//             <PlusIcon className='w-4 h-4 mr-2' />
//             Add Amenities <sub className='italic ml-1'>optional</sub>
//           </Button>
//         </DialogTrigger>
//         <DialogContent className=''>
//           <DialogHeader>
//             <DialogTitle>Select Amenities</DialogTitle>
//             <DialogDescription className='w-full'>
//               Select the amenities you want to add to the room
//             </DialogDescription>
//           </DialogHeader>
//           <div className='col-span-2 gap-2 flex flex-wrap'>
//             {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
//               (item) => (
//                 <Chip
//                   label={item}
//                   key={item}
//                   variant='outlined'
//                   onDelete={() => {}}
//                   color={item % 2 === 0 ? 'success' : 'default'}
//                   deleteIcon={item % 2 === 0 ? <CheckIcon /> : <PlusIcon />}
//                 />
//               )
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>

//       <div className='col-span-2 gap-2 flex flex-wrap'>
//         {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
//           <Chip
//             label={item}
//             key={item}
//             variant='outlined'
//             onDelete={() => {}}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function FooterSection() {
//   return (
//     <footer className='w-full col-span-2 flex flex-row items-center justify-between'>
//       <p className='text-sm'>
//         Price after discount<sub className='italic'>per room</sub> :{' '}
//         <span className='font-bold'>$ 50</span>
//       </p>
//       <div className='cst-row space-x-4'>
//         <Button variant='outline'> Cancel</Button>
//         <Button> Submit</Button>
//       </div>
//     </footer>
//   );
// }
