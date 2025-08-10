// app/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const menu = [
    { name: "หน้าหลัก", href: "/", items: [] },
    {
      name: "บริการ",
      href: "#",
      items: [
        { name: "บริการ 1", href: "/services/service1" },
        { name: "บริการ 2", href: "/services/service2" },
        { name: "บริการ 3", href: "/services/service3" },
      ],
    },
    { name: "เกี่ยวกับเรา", href: "/#about", items: [] },
    { name: "ผลงาน", href: "/#portfolio", items: [] },
    { name: "ติดต่อ", href: "/#contact", items: [] },
  ];
  return (
    <header className="sticky top-0 z-50 flex items-center border-b justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl  mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Color System
          </Link>
          <NavigationMenu className="ml-6 hidden md:flex">
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    {item.items.length > 0 ? (
                      <NavigationMenuTrigger
                        className={
                          navigationMenuTriggerStyle() + " bg-transparent"
                        }
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                    ) : (
                      <NavigationMenuLink
                        className={
                          navigationMenuTriggerStyle() + " bg-transparent"
                        }
                      >
                        {item.name}
                      </NavigationMenuLink>
                    )}
                  </Link>
                  {item.items.length > 0 && (
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.items.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="block py-2 text-gray-700 hover:text-gray-900"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link
                      href="/about"
                      className="block py-2 text-gray-700 hover:text-gray-900"
                    >
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/services"
                      className="block py-2 text-gray-700 hover:text-gray-900"
                    >
                      Services
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/contact"
                      className="block py-2 text-gray-700 hover:text-gray-900"
                    >
                      Contact Edit ddd
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
