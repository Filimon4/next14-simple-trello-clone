"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useMobileSidebar } from "../../../../../hooks/use-mobile-sidebar";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false)
  const {isOpen,onClose,onOpen} = useMobileSidebar((state) => state)

  useEffect(() => {
    setIsMounted(true)
  }, []);

  useEffect(() => {
    onClose()
  }, [pathName, onClose])

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side={"left"}
          className="p-2 pt-10"
        >
          <Sidebar
            storageKey="t-sidebar-mobile-state"
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
