'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { RxCaretSort } from 'react-icons/rx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BiDotsHorizontalRounded, BiEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { safeListings } from '@/types';
// import { deleteListing } from '@/actions/getListings';

export const columns: ColumnDef<safeListings>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'eventType',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <RxCaretSort className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('eventType')}</div>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue('isActive') === true ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Location
          <RxCaretSort className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='lowercase'>{row.getValue('location')}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className='text-right items-end'>
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
            <RxCaretSort className='ml-2 h-4 w-4' />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));

      // Format the price as a dollar price
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return <div className='text-center font-medium'>{formatted}</div>;
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: function Cell({ row }) {
      const listing = row.original;
      const router = useRouter();
      const navigateTo = (id: string) => {
        router.push(`/listing/${id}`);
      };

      const handleDelete = async () => {
        // await deleteListing(listing.id);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <BiDotsHorizontalRounded className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(listing.id)}
            >
              Copy listing ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigateTo(listing.id)}>
              <BiEdit size={22} className='mr-2' />
              Edit
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => navigateTo(listing.id)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
