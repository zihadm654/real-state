"use client";

import { useCallback, useState } from "react";
// import useRegisterModal from '@/hooks/useRegisterModal';
// import useLoginModal from '@/hooks/useLoginModal';
// import { SafeUser } from '@/types';
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface Props {
  currentUser?: any | null;
}
const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const toggleOpen = useCallback(() => {
  //   setIsOpen((value) => !value);
  // }, []);
  // const registerModal = useRegisterModal();
  // const loginModal = useLoginModal();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 
        md:block"
        >
          Airbnb Your Home
        </div>
        <div
          className="flex cursor-pointer flex-row items-center
        gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-sm md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Trips" />
                <MenuItem onClick={() => {}} label="My Favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="Aibnb My Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => {}} label="login" />
                <MenuItem onClick={() => {}} label="signup" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
