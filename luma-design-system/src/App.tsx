import { useState } from 'react'
import './styles/globals.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Checkbox } from './components/ui/checkbox'
import { Switch } from './components/ui/switch'
import { Slider } from './components/ui/slider'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './components/ui/alert-dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './components/ui/context-menu'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './components/ui/menubar'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/ui/command'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion'
import { Badge } from './components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Progress } from './components/ui/progress'
import { Separator } from './components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Toggle } from './components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './components/ui/breadcrumb'
import { Skeleton } from './components/ui/skeleton'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card'
import { ScrollArea } from './components/ui/scroll-area'
import { Toaster } from './components/ui/toaster'
import { useToast } from './components/ui/use-toast'
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  User,
  Bold,
  Italic,
  Underline,
  ChevronDown,
  Settings,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  UserPlus,
  Calendar,
  Search,
} from 'lucide-react'

function App() {
  const [sliderValue, setSliderValue] = useState([50])
  const [progressValue, setProgressValue] = useState(33)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState("option1")
  const [selectValue, setSelectValue] = useState("")
  const [commandOpen, setCommandOpen] = useState(false)
  const [togglePressed, setTogglePressed] = useState(false)
  const [alignment, setAlignment] = useState("center")
  const { toast } = useToast()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Luma UI Component Library
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete recreation of Luma design system • 33 Components • shadcn/ui + Radix UI
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Badge>33 Components</Badge>
            <Badge variant="success">React 19</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
          </div>
        </header>

        {/* Buttons Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Buttons</h2>
            <Badge>16 variants</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="light">Light</Button>
            <Button variant="success">Success</Button>
            <Button variant="error">Error</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="barney">Barney</Button>
            <Button variant="blue">Blue</Button>
            <Button variant="green">Green</Button>
            <Button variant="purple">Purple</Button>
            <Button variant="orange">Orange</Button>
            <Button variant="red">Red</Button>
            <Button variant="yellow">Yellow</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <Separator />

        {/* Inputs & Textarea Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Inputs & Textarea</h2>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="default">Default Input</Label>
              <Input id="default" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filled">Filled Input</Label>
              <Input id="filled" variant="filled" placeholder="Filled variant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rounded">Rounded Input</Label>
              <Input id="rounded" variant="rounded" placeholder="Rounded variant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="error">Error Input</Label>
              <Input id="error" variant="error" placeholder="Error state" />
              <p className="text-sm text-destructive">This field has an error</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" disabled placeholder="Disabled input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter longer text..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-rounded">Rounded Textarea</Label>
              <Textarea
                id="textarea-rounded"
                variant="rounded"
                placeholder="Rounded variant..."
                rows={3}
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Form Controls Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Form Controls</h2>
          <div className="space-y-6 max-w-md">
            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox"
                checked={checkboxChecked}
                onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
              />
              <Label htmlFor="checkbox">Checkbox with label</Label>
            </div>

            {/* Switch */}
            <div className="flex items-center justify-between border border-[hsl(var(--divider-color))] rounded-md p-3">
              <Label htmlFor="switch">Enable notifications</Label>
              <Switch
                id="switch"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
            </div>

            {/* Radio Group */}
            <div className="space-y-3">
              <Label>Radio Group</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">Option 3</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Select */}
            <div className="space-y-2">
              <Label htmlFor="select">Select Dropdown</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="cherry">Cherry</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="elderberry">Elderberry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <Label>Slider - Value: {sliderValue[0]}</Label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
              />
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Progress</Label>
                <span className="text-sm text-muted-foreground">{progressValue}%</span>
              </div>
              <Progress value={progressValue} />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                  +10%
                </Button>
                <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                  -10%
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Alerts / Banners</h2>
          <div className="space-y-4">
            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational message with important details.
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your action was completed successfully!
              </AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review this important warning message.
              </AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                An error occurred. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <Separator />

        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Cards</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content area. You can put any content here.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Action</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1">Confirm</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Avatar & Badge Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Avatars & Badges</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        <Separator />

        {/* Tabs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Tabs</h2>
          <Tabs defaultValue="tab1" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="space-y-4">
              <p>Content for Tab 1. This is where your tab content goes.</p>
              <Input placeholder="Tab 1 input..." />
            </TabsContent>
            <TabsContent value="tab2" className="space-y-4">
              <p>Content for Tab 2 with different information.</p>
              <Button>Tab 2 Action</Button>
            </TabsContent>
            <TabsContent value="tab3" className="space-y-4">
              <p>Content for Tab 3 with even more options.</p>
              <Textarea placeholder="Tab 3 textarea..." />
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Accordion Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Accordion</h2>
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern and is built with Radix UI primitives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the Luma design system,
                but you can customize it however you want.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default with smooth expand/collapse transitions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Overlays Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Overlays</h2>
          <div className="flex gap-4 flex-wrap">
            {/* Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog description. Dialogs are built using Radix UI primitives.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Popover Title</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a popover with some content inside.
                  </p>
                  <Input placeholder="Enter something..." />
                </div>
              </PopoverContent>
            </Popover>

            {/* Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip with helpful information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Toast Triggers */}
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Success!",
                  description: "Your action was completed successfully.",
                  variant: "success",
                })
              }}
            >
              Show Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Error occurred",
                  description: "Something went wrong. Please try again.",
                  variant: "error",
                })
              }}
            >
              Show Error Toast
            </Button>
          </div>
        </section>

        <Separator />

        {/* Alert Dialog & Sheet Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Alert Dialog & Sheet</h2>
          <div className="flex gap-4 flex-wrap">
            {/* Alert Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="error">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Sheet - Left */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    This is a left-side sheet panel for navigation.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sheet - Right */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Right Sheet</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Configure your preferences here.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-sheet">Name</Label>
                    <Input id="name-sheet" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-sheet">Email</Label>
                    <Input id="email-sheet" type="email" placeholder="your@email.com" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        <Separator />

        {/* Dropdown Menu & Context Menu Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Dropdown & Context Menus</h2>
          <div className="flex gap-4 flex-wrap">
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open Menu <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Context Menu */}
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </ContextMenuItem>
                <ContextMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  New Item
                </ContextMenuItem>
                <ContextMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite User
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </section>

        <Separator />

        {/* Menubar Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Menubar</h2>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Zoom In</MenubarItem>
                <MenubarItem>Zoom Out</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Full Screen</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </section>

        <Separator />

        {/* Command Palette Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Command Palette</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setCommandOpen(true)}>
              <Search className="mr-2 h-4 w-4" />
              Open Command Palette
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </CommandItem>
                <CommandItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </section>

        <Separator />

        {/* Toggle & Toggle Group Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Toggle & Toggle Group</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Toggle
                pressed={togglePressed}
                onPressedChange={setTogglePressed}
                aria-label="Toggle bold"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </Toggle>
            </div>
            <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
              <ToggleGroupItem value="left" aria-label="Align left">
                Left
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                Center
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                Right
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </section>

        <Separator />

        {/* Breadcrumb Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Breadcrumb</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        <Separator />

        {/* Skeleton & Hover Card Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Skeleton & Hover Card</h2>
          <div className="space-y-6">
            {/* Skeleton Demo */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Skeleton Loading</h3>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>

            {/* Hover Card Demo */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Hover Card</h3>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@lumadesign</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>LD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@lumadesign</h4>
                      <p className="text-sm">
                        The Luma design system – created and maintained by Luma team.
                      </p>
                      <div className="flex items-center pt-2">
                        <Calendar className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </section>

        <Separator />

        {/* Scroll Area Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Scroll Area</h2>
          <ScrollArea className="h-[200px] w-full max-w-md rounded-md border p-4">
            <div className="space-y-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Scrollable Content</h4>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="text-sm">
                  Item {i + 1} - This is some scrollable content in a custom scroll area.
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>

        <Separator />

        {/* Theme Toggle */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Theme</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => document.documentElement.classList.remove('dark')}
            >
              Light Mode
            </Button>
            <Button
              variant="outline"
              onClick={() => document.documentElement.classList.add('dark')}
            >
              Dark Mode
            </Button>
          </div>
        </section>

        <Separator />

        <footer className="text-center text-muted-foreground space-y-2 pt-8">
          <p className="font-semibold">33 Production-Ready Components</p>
          <p>Built with React 19, TypeScript, Tailwind CSS, Radix UI, and shadcn/ui</p>
          <p className="text-sm">Reverse-engineered from Luma design system</p>
          <div className="flex gap-2 justify-center pt-2">
            <Badge variant="success">Accessible</Badge>
            <Badge variant="success">Type-Safe</Badge>
            <Badge variant="success">Customizable</Badge>
          </div>
        </footer>
      </div>
      <Toaster />
    </div>
  )
}

export default App
