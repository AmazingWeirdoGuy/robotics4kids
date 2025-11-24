import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Trash2, Edit, Mail, FileText, LogOut } from "lucide-react";

// Mock Data
const initialNews = [
  { id: 1, title: "Regional Championship Win!", date: "2025-11-20", status: "Published" },
  { id: 2, title: "Upcoming Workshop Series", date: "2025-12-05", status: "Scheduled" },
  { id: 3, title: "New Lab Equipment", date: "2025-11-15", status: "Published" },
];

const initialMessages = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", subject: "Joining the team", date: "2025-11-24" },
  { id: 2, name: "Bob Smith", email: "bob@company.com", subject: "Sponsorship Opportunity", date: "2025-11-23" },
];

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  // Login Form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    if (values.password === "admin") {
      setIsAuthenticated(true);
      toast({ title: "Welcome back, Admin" });
    } else {
      toast({ title: "Access Denied", description: "Incorrect password (hint: admin)", variant: "destructive" });
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 glass-card rounded-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-blue-50 text-primary">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-heading font-bold text-center mb-2">Admin Access</h1>
          <p className="text-center text-muted-foreground mb-8">Enter your password to manage the site.</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-white/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 rounded-full shadow-lg shadow-primary/20">
                Login
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 container mx-auto px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-heading text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage content and view inquiries.</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="news" className="space-y-8">
        <TabsList className="bg-white/50 p-1 rounded-full border border-white/20">
          <TabsTrigger value="news" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" /> News
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Mail className="w-4 h-4 mr-2" /> Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>News Articles</CardTitle>
                <CardDescription>Manage your club's announcements.</CardDescription>
              </div>
              <Button className="rounded-full shadow-md shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialNews.map((item) => (
                    <TableRow key={item.id} className="hover:bg-white/40 transition-colors border-slate-100 dark:border-slate-800">
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Messages from the contact form.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialMessages.map((msg) => (
                    <TableRow key={msg.id} className="hover:bg-white/40 transition-colors border-slate-100 dark:border-slate-800">
                      <TableCell>
                        <div className="font-medium">{msg.name}</div>
                        <div className="text-xs text-muted-foreground">{msg.email}</div>
                      </TableCell>
                      <TableCell>{msg.subject}</TableCell>
                      <TableCell>{msg.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="rounded-full">
                          Reply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
