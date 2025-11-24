import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Lock, Plus, Trash2, Edit, Mail, FileText, LogOut } from "lucide-react";
import type { NewsItem, ContactSubmission, InsertNewsItem } from "@shared/schema";
import { insertNewsItemSchema } from "@shared/schema";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Login Form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    if (values.password === "admin") {
      setIsAuthenticated(true);
      toast({ title: "Welcome back, Admin" });
    } else {
      toast({ title: "Access Denied", description: "Incorrect password", variant: "destructive" });
    }
  }

  // News Query
  const { data: newsItems = [], isLoading: newsLoading } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Contact Submissions Query
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const response = await fetch("/api/contact");
      if (!response.ok) throw new Error("Failed to fetch submissions");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // News Form
  const newsForm = useForm<z.infer<typeof insertNewsItemSchema>>({
    resolver: zodResolver(insertNewsItemSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      iconName: "Trophy",
    },
  });

  // Create News Mutation
  const createNewsMutation = useMutation({
    mutationFn: async (data: InsertNewsItem) => {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create news");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "News item created successfully!" });
      setIsNewsDialogOpen(false);
      newsForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create news item", variant: "destructive" });
    },
  });

  // Update News Mutation
  const updateNewsMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertNewsItem> }) => {
      const response = await fetch(`/api/news/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update news");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "News item updated successfully!" });
      setIsNewsDialogOpen(false);
      setEditingNews(null);
      newsForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update news item", variant: "destructive" });
    },
  });

  // Delete News Mutation
  const deleteNewsMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete news");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "News item deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete news item", variant: "destructive" });
    },
  });

  function onSubmitNews(values: z.infer<typeof insertNewsItemSchema>) {
    if (editingNews) {
      updateNewsMutation.mutate({ id: editingNews.id, data: values });
    } else {
      createNewsMutation.mutate(values);
    }
  }

  function handleEditNews(news: NewsItem) {
    setEditingNews(news);
    newsForm.reset({
      title: news.title,
      date: news.date,
      category: news.category,
      description: news.description,
      iconName: news.iconName,
    });
    setIsNewsDialogOpen(true);
  }

  function handleAddNew() {
    setEditingNews(null);
    newsForm.reset({
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      iconName: "Trophy",
    });
    setIsNewsDialogOpen(true);
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
          
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
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
              <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNew} className="rounded-full shadow-md shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" /> Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingNews ? "Edit News Item" : "Add News Item"}</DialogTitle>
                    <DialogDescription>
                      {editingNews ? "Update the news item details." : "Create a new news announcement."}
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...newsForm}>
                    <form onSubmit={newsForm.handleSubmit(onSubmitNews)} className="space-y-4">
                      <FormField
                        control={newsForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="News title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newsForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newsForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Competition, Events" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newsForm.control}
                        name="iconName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an icon" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Trophy">Trophy</SelectItem>
                                <SelectItem value="Calendar">Calendar</SelectItem>
                                <SelectItem value="Zap">Zap</SelectItem>
                                <SelectItem value="MapPin">MapPin</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={newsForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="News details..." {...field} rows={4} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsNewsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={createNewsMutation.isPending || updateNewsMutation.isPending}>
                          {createNewsMutation.isPending || updateNewsMutation.isPending ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {newsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : newsItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No news items yet.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-white/40 transition-colors border-slate-100 dark:border-slate-800">
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {item.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                            onClick={() => handleEditNews(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this news item?")) {
                                deleteNewsMutation.mutate(item.id);
                              }
                            }}
                            disabled={deleteNewsMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
              {submissionsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No messages yet.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-slate-200 dark:border-slate-800">
                      <TableHead>From</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((msg) => (
                      <TableRow key={msg.id} className="hover:bg-white/40 transition-colors border-slate-100 dark:border-slate-800">
                        <TableCell>
                          <div className="font-medium">{msg.name}</div>
                          <div className="text-xs text-muted-foreground">{msg.email}</div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="line-clamp-2 text-sm">{msg.message}</p>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
