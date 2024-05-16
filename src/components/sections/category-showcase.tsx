import Image from "next/image";

import { categoryItems } from "@/config/categoryItems";

export function CaegoryShowcase({ categoryName }: { categoryName: string }) {
  const category = categoryItems.find(
    (item: { name: string }) => item.name === categoryName,
  );

  return (
    <div className="flex items-center">
      <Image
        src={category?.imageUrl as string}
        alt="Caegory image"
        width={44}
        height={44}
      />

      <div className="ml-4 flex flex-col">
        <h3 className="font-medium">{category?.title}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
}
