import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, AlertTriangle, CheckCircle } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  iconName: string;
  image?: string;
}

interface Officer {
  firstName: string;
  lastName: string;
  role: string;
  image: string;
}

interface WebDev {
  firstName: string;
  lastName: string;
  role: string;
  image: string;
}

interface TeamMember {
  name: string;
  image: string;
}

export default function Admin() {
  const { toast } = useToast();
  const [isReplit, setIsReplit] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"news" | "team">("news");
  const [saving, setSaving] = useState(false);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [webDevelopment, setWebDevelopment] = useState<WebDev[]>([]);
  const [facultyAdvisors, setFacultyAdvisors] = useState<TeamMember[]>([]);
  const [activeMembers, setActiveMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    if (isReplit) {
      if (activeTab === "news") {
        loadNewsData();
      } else {
        loadTeamData();
      }
    }
  }, [isReplit, activeTab]);

  const checkAccess = async () => {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      setIsReplit(data.isReplit);
    } catch {
      setIsReplit(false);
    }
  };

  const loadNewsData = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      const content = data.content;
      const match = content.match(/export const newsData: NewsItemData\[\] = (\[[\s\S]*?\]);/);
      if (match) {
        const newsArray = eval(match[1]);
        setNewsItems(newsArray);
      }
    } catch (error) {
      console.error("Failed to load news:", error);
    }
  };

  const loadTeamData = async () => {
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      const content = data.content;
      
      const officersMatch = content.match(/const officers = (\[[\s\S]*?\]);/);
      if (officersMatch) setOfficers(eval(officersMatch[1]));
      
      const webDevMatch = content.match(/const webDevelopment = (\[[\s\S]*?\]);/);
      if (webDevMatch) setWebDevelopment(eval(webDevMatch[1]));
      
      const advisorsMatch = content.match(/const facultyAdvisors = (\[[\s\S]*?\]);/);
      if (advisorsMatch) setFacultyAdvisors(eval(advisorsMatch[1]));
      
      const membersMatch = content.match(/const activeMembers = (\[[\s\S]*?\]);/);
      if (membersMatch) setActiveMembers(eval(membersMatch[1]));
    } catch (error) {
      console.error("Failed to load team:", error);
    }
  };

  const saveNewsData = async () => {
    setSaving(true);
    try {
      const content = `export interface NewsItemData {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  iconName: string;
  image?: string;
}

export const newsData: NewsItemData[] = ${JSON.stringify(newsItems, null, 2)};
`;
      await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      toast({ title: "Saved!", description: "News updated. Commit and push to GitHub to deploy." });
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const saveTeamData = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      let content = data.content;

      content = content.replace(/const officers = \[[\s\S]*?\];/, `const officers = ${JSON.stringify(officers, null, 2)};`);
      content = content.replace(/const webDevelopment = \[[\s\S]*?\];/, `const webDevelopment = ${JSON.stringify(webDevelopment, null, 2)};`);
      content = content.replace(/const facultyAdvisors = \[[\s\S]*?\];/, `const facultyAdvisors = ${JSON.stringify(facultyAdvisors, null, 2)};`);
      content = content.replace(/const activeMembers = \[[\s\S]*?\];/, `const activeMembers = ${JSON.stringify(activeMembers, null, 2)};`);

      await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      toast({ title: "Saved!", description: "Team updated. Commit and push to GitHub to deploy." });
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const addNewsItem = () => {
    const newId = newsItems.length > 0 ? Math.max(...newsItems.map(n => n.id)) + 1 : 1;
    setNewsItems([...newsItems, {
      id: newId,
      title: "New Article",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      category: "Announcement",
      description: "Article description...",
      iconName: "Zap",
      image: ""
    }]);
  };

  const updateNewsItem = (id: number, field: keyof NewsItem, value: string | number) => {
    setNewsItems(newsItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const deleteNewsItem = (id: number) => setNewsItems(newsItems.filter(item => item.id !== id));

  if (isReplit === null) {
    return <div className="min-h-screen flex items-center justify-center"><p>Checking access...</p></div>;
  }

  if (!isReplit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-12 rounded-3xl max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold mb-4">Admin Not Available</h1>
          <p className="text-muted-foreground">
            The admin panel is only available on Replit. To edit content, open this project in Replit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-sm text-green-600 font-medium">Connected to Replit</span>
          </div>
          <h1 className="font-heading text-5xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Edit content, then commit and push to GitHub to deploy to Vercel.</p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <Button variant={activeTab === "news" ? "default" : "outline"} onClick={() => setActiveTab("news")} className="rounded-full" data-testid="tab-news">News</Button>
          <Button variant={activeTab === "team" ? "default" : "outline"} onClick={() => setActiveTab("team")} className="rounded-full" data-testid="tab-team">Team</Button>
        </div>

        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-2xl font-bold">News Articles</h2>
              <div className="flex gap-3">
                <Button onClick={addNewsItem} variant="outline" className="rounded-full" data-testid="button-add-news"><Plus className="w-4 h-4 mr-2" /> Add</Button>
                <Button onClick={saveNewsData} disabled={saving} className="rounded-full" data-testid="button-save-news"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
              </div>
            </div>
            {newsItems.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-2xl space-y-4" data-testid={`news-editor-${item.id}`}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">Article #{item.id}</h3>
                  <Button variant="ghost" size="sm" onClick={() => deleteNewsItem(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Title</label><Input value={item.title} onChange={(e) => updateNewsItem(item.id, "title", e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Date</label><Input value={item.date} onChange={(e) => updateNewsItem(item.id, "date", e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Category</label><Input value={item.category} onChange={(e) => updateNewsItem(item.id, "category", e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Icon</label><Input value={item.iconName} onChange={(e) => updateNewsItem(item.id, "iconName", e.target.value)} placeholder="Trophy, Calendar, Zap, MapPin, Heart" /></div>
                </div>
                <div><label className="text-sm font-medium mb-1 block">Image URL</label><Input value={item.image || ""} onChange={(e) => updateNewsItem(item.id, "image", e.target.value)} placeholder="https://..." /></div>
                <div><label className="text-sm font-medium mb-1 block">Description</label><Textarea value={item.description} onChange={(e) => updateNewsItem(item.id, "description", e.target.value)} /></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <Button onClick={saveTeamData} disabled={saving} className="rounded-full" data-testid="button-save-team"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save All"}</Button>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Officers</h3>
                <Button onClick={() => setOfficers([...officers, { firstName: "", lastName: "", role: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-3">
                {officers.map((o, i) => (
                  <div key={i} className="grid grid-cols-5 gap-3 items-center">
                    <Input placeholder="First" value={o.firstName} onChange={(e) => { const u = [...officers]; u[i].firstName = e.target.value; setOfficers(u); }} />
                    <Input placeholder="Last" value={o.lastName} onChange={(e) => { const u = [...officers]; u[i].lastName = e.target.value; setOfficers(u); }} />
                    <Input placeholder="Role" value={o.role} onChange={(e) => { const u = [...officers]; u[i].role = e.target.value; setOfficers(u); }} />
                    <Input placeholder="Image URL" value={o.image} onChange={(e) => { const u = [...officers]; u[i].image = e.target.value; setOfficers(u); }} />
                    <Button variant="ghost" size="sm" onClick={() => setOfficers(officers.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Website Development</h3>
                <Button onClick={() => setWebDevelopment([...webDevelopment, { firstName: "", lastName: "", role: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-3">
                {webDevelopment.map((d, i) => (
                  <div key={i} className="grid grid-cols-5 gap-3 items-center">
                    <Input placeholder="First" value={d.firstName} onChange={(e) => { const u = [...webDevelopment]; u[i].firstName = e.target.value; setWebDevelopment(u); }} />
                    <Input placeholder="Last" value={d.lastName} onChange={(e) => { const u = [...webDevelopment]; u[i].lastName = e.target.value; setWebDevelopment(u); }} />
                    <Input placeholder="Role" value={d.role} onChange={(e) => { const u = [...webDevelopment]; u[i].role = e.target.value; setWebDevelopment(u); }} />
                    <Input placeholder="Image URL" value={d.image} onChange={(e) => { const u = [...webDevelopment]; u[i].image = e.target.value; setWebDevelopment(u); }} />
                    <Button variant="ghost" size="sm" onClick={() => setWebDevelopment(webDevelopment.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Faculty Advisors</h3>
                <Button onClick={() => setFacultyAdvisors([...facultyAdvisors, { name: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-3">
                {facultyAdvisors.map((a, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 items-center">
                    <Input placeholder="Full Name" value={a.name} onChange={(e) => { const u = [...facultyAdvisors]; u[i].name = e.target.value; setFacultyAdvisors(u); }} />
                    <Input placeholder="Image URL" value={a.image} onChange={(e) => { const u = [...facultyAdvisors]; u[i].image = e.target.value; setFacultyAdvisors(u); }} />
                    <Button variant="ghost" size="sm" onClick={() => setFacultyAdvisors(facultyAdvisors.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Active Members</h3>
                <Button onClick={() => setActiveMembers([...activeMembers, { name: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-3">
                {activeMembers.map((m, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 items-center">
                    <Input placeholder="Full Name" value={m.name} onChange={(e) => { const u = [...activeMembers]; u[i].name = e.target.value; setActiveMembers(u); }} />
                    <Input placeholder="Image URL" value={m.image} onChange={(e) => { const u = [...activeMembers]; u[i].image = e.target.value; setActiveMembers(u); }} />
                    <Button variant="ghost" size="sm" onClick={() => setActiveMembers(activeMembers.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
