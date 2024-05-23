import Image from "next/image";

import { categories } from "../navbar/categories";

export function CaegoryShowcase({ categoryName }: { categoryName: string }) {
  const category = categories?.find(
    (item: { label: string }) => item.label === categoryName,
  );

  return (
    <div className="flex items-center">
      {/* <Image
        src={category?.imageUrl as string}
        alt="Caegory image"
        width={44}
        height={44}
      /> */}

      <div className="ml-4 flex flex-col">
        <h3 className="font-medium">{category?.label}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
}
