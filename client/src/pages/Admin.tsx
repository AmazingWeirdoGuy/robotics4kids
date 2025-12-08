import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, AlertTriangle, CheckCircle, Upload, Image, X } from "lucide-react";

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

function ImagePicker({ value, onChange, label }: { value: string; onChange: (url: string) => void; label?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [availableImages, setAvailableImages] = useState<string[]>([]);

  const loadImages = async () => {
    try {
      const res = await fetch("/api/admin/images");
      const data = await res.json();
      setAvailableImages(data.images || []);
    } catch {
      console.error("Failed to load images");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, data: base64 }),
        });
        const data = await res.json();
        if (data.path) {
          onChange(data.path);
          loadImages();
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium block">{label}</label>}
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          {value ? (
            <div className="flex items-center gap-2 p-2 border rounded-lg bg-white/50">
              <img src={value} alt="" className="w-10 h-10 object-cover rounded" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span className="text-sm truncate flex-1">{value.split('/').pop()}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => { loadImages(); setShowPicker(true); }} className="h-8">Change</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")} className="h-8 w-8 p-0 text-red-500"><X className="w-4 h-4" /></Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex-1">
                <Upload className="w-4 h-4 mr-2" /> {uploading ? "Uploading..." : "Upload"}
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => { loadImages(); setShowPicker(true); }}>
                <Image className="w-4 h-4 mr-2" /> Choose
              </Button>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>
      {showPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPicker(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Choose Image</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPicker(false)}><X className="w-4 h-4" /></Button>
            </div>
            {availableImages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No images uploaded yet. Upload one first.</p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {availableImages.map((img) => (
                  <button key={img} onClick={() => { onChange(img); setShowPicker(false); }} className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
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

  useEffect(() => { checkAccess(); }, []);
  useEffect(() => { if (isReplit) { activeTab === "news" ? loadNewsData() : loadTeamData(); } }, [isReplit, activeTab]);

  const checkAccess = async () => {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      setIsReplit(data.isReplit);
    } catch { setIsReplit(false); }
  };

  const loadNewsData = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      const match = data.content.match(/export const newsData: NewsItemData\[\] = (\[[\s\S]*?\]);/);
      if (match) setNewsItems(eval(match[1]));
    } catch (e) { console.error("Failed to load news:", e); }
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
    } catch (e) { console.error("Failed to load team:", e); }
  };

  const formatArray = (arr: any[]) => {
    return "[\n" + arr.map(item => {
      const entries = Object.entries(item).map(([k, v]) => `    ${k}: "${String(v).replace(/"/g, '\\"')}"`);
      return "  {\n" + entries.join(",\n") + "\n  }";
    }).join(",\n") + "\n]";
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

export const newsData: NewsItemData[] = [\n${newsItems.map(item => `  {
    id: ${item.id},
    title: "${item.title.replace(/"/g, '\\"')}",
    date: "${item.date}",
    category: "${item.category}",
    description: "${item.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
    iconName: "${item.iconName}"${item.image ? `,\n    image: "${item.image}"` : ""}
  }`).join(",\n")}\n];
`;
      await fetch("/api/admin/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      toast({ title: "Saved!", description: "News updated. Commit and push to deploy." });
    } catch { toast({ title: "Error", description: "Failed to save", variant: "destructive" }); }
    setSaving(false);
  };

  const saveTeamData = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      let content = data.content;
      content = content.replace(/const officers = \[[\s\S]*?\];/, `const officers = ${formatArray(officers)};`);
      content = content.replace(/const webDevelopment = \[[\s\S]*?\];/, `const webDevelopment = ${formatArray(webDevelopment)};`);
      content = content.replace(/const facultyAdvisors = \[[\s\S]*?\];/, `const facultyAdvisors = ${formatArray(facultyAdvisors)};`);
      content = content.replace(/const activeMembers = \[[\s\S]*?\];/, `const activeMembers = ${formatArray(activeMembers)};`);
      await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      toast({ title: "Saved!", description: "Team updated. Commit and push to deploy." });
    } catch { toast({ title: "Error", description: "Failed to save", variant: "destructive" }); }
    setSaving(false);
  };

  const addNewsItem = () => {
    const newId = newsItems.length > 0 ? Math.max(...newsItems.map(n => n.id)) + 1 : 1;
    setNewsItems([...newsItems, { id: newId, title: "New Article", date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), category: "Announcement", description: "Description...", iconName: "Zap", image: "" }]);
  };

  const updateNewsItem = (id: number, field: keyof NewsItem, value: string | number) => {
    setNewsItems(newsItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  if (isReplit === null) return <div className="min-h-screen flex items-center justify-center"><p>Checking access...</p></div>;
  if (!isReplit) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center glass-card p-12 rounded-3xl max-w-md">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="font-heading text-3xl font-bold mb-4">Admin Not Available</h1>
        <p className="text-muted-foreground">The admin panel is only available on Replit.</p>
      </div>
    </div>
  );

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-sm text-green-600 font-medium">Connected to Replit</span>
          </div>
          <h1 className="font-heading text-5xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">Edit content, then commit and push to GitHub to deploy.</p>
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
                <Button onClick={addNewsItem} variant="outline" className="rounded-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
                <Button onClick={saveNewsData} disabled={saving} className="rounded-full"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}</Button>
              </div>
            </div>
            {newsItems.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">Article #{item.id}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setNewsItems(newsItems.filter(n => n.id !== item.id))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1 block">Title</label><Input value={item.title} onChange={(e) => updateNewsItem(item.id, "title", e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Date</label><Input value={item.date} onChange={(e) => updateNewsItem(item.id, "date", e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Category</label><Input value={item.category} onChange={(e) => updateNewsItem(item.id, "category", e.target.value)} /></div>
                  <div><label className="text-sm font-medium mb-1 block">Icon</label><Input value={item.iconName} onChange={(e) => updateNewsItem(item.id, "iconName", e.target.value)} placeholder="Trophy, Calendar, Zap, MapPin, Heart" /></div>
                </div>
                <ImagePicker label="Image" value={item.image || ""} onChange={(url) => updateNewsItem(item.id, "image", url)} />
                <div><label className="text-sm font-medium mb-1 block">Description</label><Textarea value={item.description} onChange={(e) => updateNewsItem(item.id, "description", e.target.value)} /></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <Button onClick={saveTeamData} disabled={saving} className="rounded-full"><Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save All"}</Button>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Officers</h3>
                <Button onClick={() => setOfficers([...officers, { firstName: "", lastName: "", role: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-4">
                {officers.map((o, i) => (
                  <div key={i} className="p-4 bg-white/30 rounded-xl space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="First Name" value={o.firstName} onChange={(e) => { const u = [...officers]; u[i].firstName = e.target.value; setOfficers(u); }} />
                      <Input placeholder="Last Name" value={o.lastName} onChange={(e) => { const u = [...officers]; u[i].lastName = e.target.value; setOfficers(u); }} />
                      <Input placeholder="Role" value={o.role} onChange={(e) => { const u = [...officers]; u[i].role = e.target.value; setOfficers(u); }} />
                    </div>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1"><ImagePicker value={o.image} onChange={(url) => { const u = [...officers]; u[i].image = url; setOfficers(u); }} /></div>
                      <Button variant="ghost" size="sm" onClick={() => setOfficers(officers.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Website Development</h3>
                <Button onClick={() => setWebDevelopment([...webDevelopment, { firstName: "", lastName: "", role: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-4">
                {webDevelopment.map((d, i) => (
                  <div key={i} className="p-4 bg-white/30 rounded-xl space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="First Name" value={d.firstName} onChange={(e) => { const u = [...webDevelopment]; u[i].firstName = e.target.value; setWebDevelopment(u); }} />
                      <Input placeholder="Last Name" value={d.lastName} onChange={(e) => { const u = [...webDevelopment]; u[i].lastName = e.target.value; setWebDevelopment(u); }} />
                      <Input placeholder="Role" value={d.role} onChange={(e) => { const u = [...webDevelopment]; u[i].role = e.target.value; setWebDevelopment(u); }} />
                    </div>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1"><ImagePicker value={d.image} onChange={(url) => { const u = [...webDevelopment]; u[i].image = url; setWebDevelopment(u); }} /></div>
                      <Button variant="ghost" size="sm" onClick={() => setWebDevelopment(webDevelopment.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Faculty Advisors</h3>
                <Button onClick={() => setFacultyAdvisors([...facultyAdvisors, { name: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-4">
                {facultyAdvisors.map((a, i) => (
                  <div key={i} className="p-4 bg-white/30 rounded-xl space-y-3">
                    <Input placeholder="Full Name" value={a.name} onChange={(e) => { const u = [...facultyAdvisors]; u[i].name = e.target.value; setFacultyAdvisors(u); }} />
                    <div className="flex gap-3 items-end">
                      <div className="flex-1"><ImagePicker value={a.image} onChange={(url) => { const u = [...facultyAdvisors]; u[i].image = url; setFacultyAdvisors(u); }} /></div>
                      <Button variant="ghost" size="sm" onClick={() => setFacultyAdvisors(facultyAdvisors.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-xl font-bold">Active Members</h3>
                <Button onClick={() => setActiveMembers([...activeMembers, { name: "", image: "" }])} variant="outline" size="sm" className="rounded-full"><Plus className="w-4 h-4 mr-1" /> Add</Button>
              </div>
              <div className="space-y-4">
                {activeMembers.map((m, i) => (
                  <div key={i} className="p-4 bg-white/30 rounded-xl space-y-3">
                    <Input placeholder="Full Name" value={m.name} onChange={(e) => { const u = [...activeMembers]; u[i].name = e.target.value; setActiveMembers(u); }} />
                    <div className="flex gap-3 items-end">
                      <div className="flex-1"><ImagePicker value={m.image} onChange={(url) => { const u = [...activeMembers]; u[i].image = url; setActiveMembers(u); }} /></div>
                      <Button variant="ghost" size="sm" onClick={() => setActiveMembers(activeMembers.filter((_, idx) => idx !== i))} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
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
