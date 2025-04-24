import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Settings, 
  PaintBucket, 
  Bell, 
  Eye, 
  Lock, 
  Languages, 
  Save
} from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Notifications settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  // General settings
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("utc");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Breadcrumbs 
          segments={[
            { name: "Home", href: "/" },
            { name: "Settings" }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Settings</CardTitle>
            <CardDescription>
              Manage your application preferences and account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="appearance">
                  <PaintBucket className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Lock className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="general">
                  <Settings className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
              </TabsList>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize how the application looks and feels.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card 
                        className={`cursor-pointer border-2 ${theme === 'light' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('light')}
                      >
                        <CardContent className="p-4">
                          <div className="rounded-md bg-white border border-gray-200 p-2 mb-2 shadow-sm">
                            <div className="h-8 bg-blue-600 rounded-md mb-2"></div>
                            <div className="flex gap-2">
                              <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                              <div className="h-8 flex-1 bg-gray-100 rounded-md"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Light</span>
                            {theme === 'light' && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`cursor-pointer border-2 ${theme === 'dark' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('dark')}
                      >
                        <CardContent className="p-4">
                          <div className="rounded-md bg-gray-900 border border-gray-700 p-2 mb-2 shadow-sm">
                            <div className="h-8 bg-blue-600 rounded-md mb-2"></div>
                            <div className="flex gap-2">
                              <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
                              <div className="h-8 flex-1 bg-gray-800 rounded-md"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Dark</span>
                            {theme === 'dark' && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`cursor-pointer border-2 ${theme === 'system' ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setTheme('system')}
                      >
                        <CardContent className="p-4">
                          <div className="rounded-md bg-gradient-to-br from-white to-gray-900 border border-gray-200 p-2 mb-2 shadow-sm">
                            <div className="h-8 bg-blue-600 rounded-md mb-2"></div>
                            <div className="flex gap-2">
                              <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                              <div className="h-8 flex-1 bg-gray-400 rounded-md"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">System</span>
                            {theme === 'system' && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Display Options</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize how the content is displayed.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dense-mode">Dense mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Reduce spacing between items for a more compact view
                          </p>
                        </div>
                        <Switch id="dense-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="animations">Animations</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable animations and transitions throughout the interface
                          </p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure which emails you want to receive.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">All email notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive all email notifications
                          </p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="order-updates">Order updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails for order status changes
                          </p>
                        </div>
                        <Switch 
                          id="order-updates" 
                          checked={orderUpdates}
                          onCheckedChange={setOrderUpdates}
                          disabled={!emailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">Marketing emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotions, offers, and newsletter
                          </p>
                        </div>
                        <Switch 
                          id="marketing-emails" 
                          checked={marketingEmails}
                          onCheckedChange={setMarketingEmails}
                          disabled={!emailNotifications}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure browser notifications.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications on your browser
                          </p>
                        </div>
                        <Switch 
                          id="push-notifications" 
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-factor authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Require a code in addition to your password when signing in
                          </p>
                        </div>
                        <Switch 
                          id="two-factor" 
                          checked={twoFactorAuth}
                          onCheckedChange={setTwoFactorAuth}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Session Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure session timeout and security.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="session-timeout">Session timeout (minutes)</Label>
                        <Select 
                          value={sessionTimeout} 
                          onValueChange={setSessionTimeout}
                        >
                          <SelectTrigger id="session-timeout" className="w-full md:w-[180px]">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after a period of inactivity
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Device Management</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      View and manage devices that are signed in to your account.
                    </p>
                    
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View active sessions
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* General Tab */}
              <TabsContent value="general">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Language and Region</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set your preferred language and timezone.
                    </p>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="language">Language</Label>
                        <Select 
                          value={language} 
                          onValueChange={setLanguage}
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="pt">Português</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select 
                          value={timezone} 
                          onValueChange={setTimezone}
                        >
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                            <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                            <SelectItem value="cst">Central Time (GMT-6)</SelectItem>
                            <SelectItem value="mst">Mountain Time (GMT-7)</SelectItem>
                            <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Accessibility</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure accessibility settings.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reduce-motion">Reduce motion</Label>
                          <p className="text-sm text-muted-foreground">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <Switch id="reduce-motion" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-contrast">High contrast</Label>
                          <p className="text-sm text-muted-foreground">
                            Increase contrast between elements
                          </p>
                        </div>
                        <Switch id="high-contrast" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
