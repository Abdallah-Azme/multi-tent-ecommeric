import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { useLocale } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NavbarSidebar({ items, onOpenChange, open }: Props) {
  const side = useLocale() === "ar" ? "right" : "left";
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 transition-none" side={side}>
        <SheetHeader className="p-4 border-b ">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea>
          {items.map((item) => (
            <Link
              key={item.href}
              {...item}
              className="w-full ltr:text-left rtl:text-right p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}

          <div className="border-t">
            <Link
              className="w-full ltr:text-left rtl:text-right p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              href={"/sign-in"}
            >
              Log in
            </Link>
            <Link
              className="w-full ltr:text-left rtl:text-right p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              href={"/sign-up"}
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
