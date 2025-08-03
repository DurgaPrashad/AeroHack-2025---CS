import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Box, Menu, BookOpen, Bot, Github, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      title: "Cube Sizes",
      items: [
        { title: "2×2 Pocket Cube", desc: "Perfect for beginners", link: "#2x2" },
        { title: "3×3 Classic Cube", desc: "The original Rubik's Cube", link: "#3x3" },
        { title: "4×4 Revenge Cube", desc: "Advanced challenge", link: "#4x4" },
      ]
    },
    {
      title: "Learn",
      items: [
        { title: "Move Notation", desc: "Understanding cube notation", link: "#notation" },
        { title: "Algorithms", desc: "Common solving patterns", link: "#algorithms" },
        { title: "Speedcubing", desc: "Advanced techniques", link: "#speedcubing" },
      ]
    },
    {
      title: "Tools",
      items: [
        { title: "AI Solver", desc: "Get solving assistance", link: "#solver" },
        { title: "Timer", desc: "Track your solve times", link: "#timer" },
        { title: "Scrambler", desc: "Generate random scrambles", link: "#scrambler" },
      ]
    }
  ];

  return (
    <nav className="border-b border-border glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cube-red to-cube-blue rounded-lg">
              <Box className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Rubik's Cube 3D
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Interactive Puzzle Visualizer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className="text-sm">
                      {section.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {section.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.link}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.desc}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Solver
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guide
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2 bg-gradient-to-br from-cube-red to-cube-blue rounded-lg">
                    <Box className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Rubik's Cube 3D</h2>
                    <p className="text-sm text-muted-foreground">Menu</p>
                  </div>
                </div>

                {navItems.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <h3 className="text-sm font-semibold text-primary">{section.title}</h3>
                    <div className="space-y-1 pl-4">
                      {section.items.map((item) => (
                        <a
                          key={item.title}
                          href={item.link}
                          className="block py-2 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-border space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <Bot className="h-4 w-4" />
                    AI Solver
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learning Guide
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Github className="h-4 w-4" />
                    View Source
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;