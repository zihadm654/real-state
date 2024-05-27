import { useCallback, useMemo } from "react";
import { redirect, useRouter } from "next/navigation";
import {
  addFavoriteListings,
  deleteFavoriteListing,
} from "@/actions/getFavoriteListings";
import { SafeUser } from "@/types";
import { toast } from "sonner";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        redirect("/login");
      }

      try {
        let request;

        if (hasFavorited) {
          // request = () => axios.delete(`/api/favorites/${listingId}`);
          await deleteFavoriteListing({ listingId });
        } else {
          await addFavoriteListings({ listingId });
          // request = () => axios.post(`/api/favorites/${listingId}`);
        }

        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, router],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
