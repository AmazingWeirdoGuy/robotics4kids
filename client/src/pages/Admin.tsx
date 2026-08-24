import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { GripVertical, Plus, Pencil, Trash2, Upload, ChevronDown, Save, X, ImageIcon, AlertTriangle } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";

interface Member {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo: string;
  email: string;
}

interface MembersData {
  officers: Member[];
  websiteManagers: Member[];
  facultyAdvisors: Member[];
  activeMembers: Member[];
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  content: string;
  iconName: string;
  image: string;
}

interface HeroImage {
  id: number;
  image: string;
  caption: string;
}

interface Program {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = imageSrc;
  });
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("WebP conversion failed")), "image/webp", 0.82);
  });
}

function ImageCropUpload({
  aspectRatio,
  category,
  onUpload,
  currentImage,
}: {
  aspectRatio: number;
  category: string;
  onUpload: (path: string) => void;
  currentImage?: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleCropAndUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setUploading(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append("file", blob, `crop_${Date.now()}.webp`);
      formData.append("category", category);
      const res = await fetch("/dev/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.path) {
        onUpload(data.path);
        setImageSrc(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      {currentImage && (
        <div className="flex items-center gap-2">
          <ResponsiveImage
            src={currentImage}
            alt=""
            className="h-12 w-auto rounded border border-white/10 object-cover"
          />
          <span className="text-xs text-white/40 truncate max-w-[200px]">{currentImage}</span>
        </div>
      )}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          className="text-white/60 border-white/10"
          data-testid={`upload-btn-${category}`}
        >
          <Upload className="w-4 h-4 mr-1" /> {currentImage ? "Change" : "Upload"}
        </Button>
        {currentImage && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onUpload("")}
            className="text-red-400"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Dialog open={!!imageSrc} onOpenChange={(open) => { if (!open) setImageSrc(null); }}>
        <DialogContent className="max-w-2xl bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
            <DialogDescription className="text-white/40">
              Drag to reposition, use slider to zoom
            </DialogDescription>
          </DialogHeader>
          {imageSrc && (
            <div className="space-y-4">
              <div className="relative w-full h-[350px] bg-black rounded-lg overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-white/60 text-sm w-12">Zoom</Label>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={[zoom]}
                  onValueChange={(v) => setZoom(v[0])}
                  className="flex-1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageSrc(null)} className="text-white/60 border-white/10">
              Cancel
            </Button>
            <Button
              onClick={handleCropAndUpload}
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              {uploading ? "Uploading..." : "Crop & Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2">
      <button
        {...attributes}
        {...listeners}
        className="mt-3 cursor-grab text-white/30 hover:text-white/60 flex-shrink-0"
        data-testid={`drag-handle-${id}`}
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function MembersTab() {
  const { toast } = useToast();
  const [data, setData] = useState<MembersData>({ officers: [], websiteManagers: [], facultyAdvisors: [], activeMembers: [] });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingSection, setEditingSection] = useState<keyof MembersData>("officers");
  const [deleteTarget, setDeleteTarget] = useState<{ section: keyof MembersData; id: number } | null>(null);
  const [form, setForm] = useState<Member>({ id: 0, name: "", title: "", bio: "", photo: "", email: "" });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const sectionLabels: Record<keyof MembersData, string> = {
    officers: "Officers",
    websiteManagers: "Website Managers",
    facultyAdvisors: "Faculty Advisors",
    activeMembers: "Active Members",
  };

  useEffect(() => {
    fetch("/data/members.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .catch(() => toast({ title: "Error", description: "Failed to load members", variant: "destructive" }));
  }, []);

  const saveData = async (d: MembersData) => {
    setSaving(true);
    try {
      const response = await fetch("/dev/save-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: "members.json", data: d }),
      });
      if (!response.ok) throw new Error("Failed to save members");
      toast({ title: "Saved", description: "Members data saved successfully" });
      setDirty(false);
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const openAdd = (section: keyof MembersData) => {
    setEditingSection(section);
    setEditingMember(null);
    setForm({ id: Date.now(), name: "", title: "", bio: "", photo: "", email: "" });
    setDialogOpen(true);
  };

  const openEdit = (section: keyof MembersData, member: Member) => {
    setEditingSection(section);
    setEditingMember(member);
    setForm({ ...member });
    setDialogOpen(true);
  };

  const handleSaveForm = () => {
    const updated = { ...data };
    if (editingMember) {
      updated[editingSection] = updated[editingSection].map((m) => (m.id === editingMember.id ? { ...form } : m));
    } else {
      updated[editingSection] = [...updated[editingSection], form];
    }
    setData(updated);
    setDirty(true);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = { ...data };
    const member = updated[deleteTarget.section].find((m) => m.id === deleteTarget.id);
    if (member?.photo && member.photo.startsWith("/uploads/")) {
      fetch("/dev/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: member.photo }),
      }).catch(() => {});
    }
    updated[deleteTarget.section] = updated[deleteTarget.section].filter((m) => m.id !== deleteTarget.id);
    setData(updated);
    setDirty(true);
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  const handleDragEnd = (section: keyof MembersData, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const items = data[section];
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const updated = { ...data, [section]: arrayMove(items, oldIndex, newIndex) };
    setData(updated);
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      {dirty && (
        <div className="flex justify-end">
          <Button
            onClick={() => saveData(data)}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 text-white"
            data-testid="save-members-order"
          >
            <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save Order"}
          </Button>
        </div>
      )}

      {(Object.keys(sectionLabels) as (keyof MembersData)[]).map((section) => (
        <Collapsible key={section} defaultOpen>
          <div className="bg-[hsl(222,20%,14%)] rounded-lg border border-blue-500/8">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
              <span className="text-white font-semibold">{sectionLabels[section]} ({data[section].length})</span>
              <ChevronDown className="w-4 h-4 text-white/40" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Separator className="bg-white/5" />
              <div className="p-4 space-y-2">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(section, e)}>
                  <SortableContext items={data[section].map((m) => m.id)} strategy={verticalListSortingStrategy}>
                    {data[section].map((member) => (
                      <SortableItem key={member.id} id={member.id}>
                        <div className="flex items-center justify-between p-3 bg-[hsl(222,22%,18%)] rounded-lg border border-white/5">
                          <div className="flex items-center gap-3 min-w-0">
                            {member.photo ? (
                              <ResponsiveImage src={member.photo} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                                <ImageIcon className="w-4 h-4 text-blue-400" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate">{member.name || "Unnamed"}</p>
                              <p className="text-white/40 text-xs truncate">{member.title || "No title"}</p>
                            </div>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(section, member)}
                              className="text-blue-400 hover:text-blue-300"
                              data-testid={`edit-member-${member.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => { setDeleteTarget({ section, id: member.id }); setDeleteOpen(true); }}
                              className="text-red-400 hover:text-red-300"
                              data-testid={`delete-member-${member.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAdd(section)}
                  className="w-full border-dashed border-white/10 text-white/40 hover:text-white/60"
                  data-testid={`add-member-${section}`}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Member
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Member" : "Add Member"}</DialogTitle>
            <DialogDescription className="text-white/40">
              {editingMember ? "Update member details" : "Fill in the new member details"}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pr-4">
              <div>
                <Label className="text-blue-400 text-xs">Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-member-name" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-member-title" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Email</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-member-email" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Bio</Label>
                <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="bg-white/5 border-white/10 text-white min-h-[80px]" data-testid="input-member-bio" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Photo</Label>
                <ImageCropUpload
                  aspectRatio={1}
                  category="members"
                  currentImage={form.photo}
                  onUpload={(path) => setForm({ ...form, photo: path })}
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-white/60 border-white/10">Cancel</Button>
            <Button onClick={handleSaveForm} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-member-form">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member</AlertDialogTitle>
            <AlertDialogDescription className="text-white/40">Are you sure you want to delete this member? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white/60 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-500 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function NewsTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<NewsItem>({ id: 0, title: "", date: "", category: "Announcement", description: "", content: "", iconName: "Zap", image: "" });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const categories = ["Announcement", "Expansion", "Courses", "Events", "Achievement"];
  const icons = ["Trophy", "Calendar", "Zap", "MapPin", "Heart"];

  useEffect(() => {
    fetch("/data/news.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast({ title: "Error", description: "Failed to load news", variant: "destructive" }));
  }, []);

  const saveData = async (d: NewsItem[]) => {
    setSaving(true);
    try {
      const response = await fetch("/dev/save-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: "news.json", data: d }),
      });
      if (!response.ok) throw new Error("Failed to save news");
      toast({ title: "Saved", description: "News data saved successfully" });
      setDirty(false);
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const today = () => {
    const d = new Date();
    return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  const openAdd = () => {
    setEditingItem(null);
    setForm({ id: Date.now(), title: "", date: today(), category: "Announcement", description: "", content: "", iconName: "Zap", image: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditingItem(item);
    setForm({ ...item });
    setDialogOpen(true);
  };

  const handleSaveForm = () => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? { ...form } : i)));
    } else {
      setItems([...items, form]);
    }
    setDirty(true);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;
    const item = items.find((i) => i.id === deleteId);
    if (item?.image && item.image.startsWith("/uploads/")) {
      fetch("/dev/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filePath: item.image }) }).catch(() => {});
    }
    setItems(items.filter((i) => i.id !== deleteId));
    setDirty(true);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">News Articles ({items.length})</h2>
        <div className="flex gap-2">
          {dirty && (
            <Button onClick={() => saveData(items)} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-news-order">
              <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save Order"}
            </Button>
          )}
          <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="add-news">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <div className="p-4 bg-[hsl(222,20%,14%)] rounded-lg border border-blue-500/8 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {item.image ? (
                    <ResponsiveImage src={item.image} alt="" className="w-16 h-9 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-9 rounded bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.title || "Untitled"}</p>
                    <p className="text-white/40 text-xs">{item.date} · {item.category}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)} className="text-blue-400" data-testid={`edit-news-${item.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setDeleteId(item.id); setDeleteOpen(true); }} className="text-red-400" data-testid={`delete-news-${item.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit News Article" : "Add News Article"}</DialogTitle>
            <DialogDescription className="text-white/40">
              {editingItem ? "Update article details" : "Fill in the article details"}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pr-4">
              <div>
                <Label className="text-blue-400 text-xs">Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-news-title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-blue-400 text-xs">Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="select-news-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(222,20%,18%)] border-white/10 text-white">
                      {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-blue-400 text-xs">Icon</Label>
                  <Select value={form.iconName} onValueChange={(v) => setForm({ ...form, iconName: v })}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="select-news-icon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(222,20%,18%)] border-white/10 text-white">
                      {icons.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Date</Label>
                <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-news-date" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-white/5 border-white/10 text-white min-h-[60px]" data-testid="input-news-description" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Full Content</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="bg-white/5 border-white/10 text-white min-h-[100px]" data-testid="input-news-content" />
              </div>
              <div>
                <Label className="text-blue-400 text-xs">Image (16:9)</Label>
                <ImageCropUpload
                  aspectRatio={16 / 9}
                  category="news"
                  currentImage={form.image}
                  onUpload={(path) => setForm({ ...form, image: path })}
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-white/60 border-white/10">Cancel</Button>
            <Button onClick={handleSaveForm} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-news-form">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete News Article</AlertDialogTitle>
            <AlertDialogDescription className="text-white/40">Are you sure? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white/60 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-500 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function HeroImagesTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<HeroImage[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeroImage | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<HeroImage>({ id: 0, image: "", caption: "" });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    fetch("/data/heroImages.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast({ title: "Error", description: "Failed to load hero images", variant: "destructive" }));
  }, []);

  const saveData = async (d: HeroImage[]) => {
    setSaving(true);
    try {
      const response = await fetch("/dev/save-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: "heroImages.json", data: d }),
      });
      if (!response.ok) throw new Error("Failed to save hero images");
      toast({ title: "Saved", description: "Hero images saved successfully" });
      setDirty(false);
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const openAdd = () => {
    setEditingItem(null);
    setForm({ id: Date.now(), image: "", caption: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: HeroImage) => {
    setEditingItem(item);
    setForm({ ...item });
    setDialogOpen(true);
  };

  const handleSaveForm = () => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? { ...form } : i)));
    } else {
      setItems([...items, form]);
    }
    setDirty(true);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;
    const item = items.find((i) => i.id === deleteId);
    if (item?.image && item.image.startsWith("/uploads/")) {
      fetch("/dev/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filePath: item.image }) }).catch(() => {});
    }
    setItems(items.filter((i) => i.id !== deleteId));
    setDirty(true);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">Hero Images ({items.length})</h2>
        <div className="flex gap-2">
          {dirty && (
            <Button onClick={() => saveData(items)} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-hero-order">
              <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save Order"}
            </Button>
          )}
          <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="add-hero">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <div className="p-4 bg-[hsl(222,20%,14%)] rounded-lg border border-blue-500/8 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {item.image ? (
                    <ResponsiveImage src={item.image} alt="" className="w-24 h-14 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-14 rounded bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                    </div>
                  )}
                  <p className="text-white text-sm truncate">{item.caption || "No caption"}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)} className="text-blue-400" data-testid={`edit-hero-${item.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setDeleteId(item.id); setDeleteOpen(true); }} className="text-red-400" data-testid={`delete-hero-${item.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Hero Image" : "Add Hero Image"}</DialogTitle>
            <DialogDescription className="text-white/40">
              {editingItem ? "Update hero image details" : "Upload a new hero image"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-blue-400 text-xs">Image (16:9)</Label>
              <ImageCropUpload
                aspectRatio={16 / 9}
                category="hero"
                currentImage={form.image}
                onUpload={(path) => setForm({ ...form, image: path })}
              />
            </div>
            <div>
              <Label className="text-blue-400 text-xs">Caption</Label>
              <Input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-hero-caption" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-white/60 border-white/10">Cancel</Button>
            <Button onClick={handleSaveForm} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-hero-form">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hero Image</AlertDialogTitle>
            <AlertDialogDescription className="text-white/40">Are you sure? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white/60 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-500 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ProgramsTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<Program[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Program | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Program>({ id: 0, name: "", description: "", image: "", link: "" });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    fetch("/data/programs.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast({ title: "Error", description: "Failed to load programs", variant: "destructive" }));
  }, []);

  const saveData = async (d: Program[]) => {
    setSaving(true);
    try {
      const response = await fetch("/dev/save-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: "programs.json", data: d }),
      });
      if (!response.ok) throw new Error("Failed to save programs");
      toast({ title: "Saved", description: "Programs saved successfully" });
      setDirty(false);
    } catch {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
    setSaving(false);
  };

  const openAdd = () => {
    setEditingItem(null);
    setForm({ id: Date.now(), name: "", description: "", image: "", link: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: Program) => {
    setEditingItem(item);
    setForm({ ...item });
    setDialogOpen(true);
  };

  const handleSaveForm = () => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? { ...form } : i)));
    } else {
      setItems([...items, form]);
    }
    setDirty(true);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;
    const item = items.find((i) => i.id === deleteId);
    if (item?.image && item.image.startsWith("/uploads/")) {
      fetch("/dev/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filePath: item.image }) }).catch(() => {});
    }
    setItems(items.filter((i) => i.id !== deleteId));
    setDirty(true);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">Programs ({items.length})</h2>
        <div className="flex gap-2">
          {dirty && (
            <Button onClick={() => saveData(items)} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-programs-order">
              <Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save Order"}
            </Button>
          )}
          <Button onClick={openAdd} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="add-program">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <div className="p-4 bg-[hsl(222,20%,14%)] rounded-lg border border-blue-500/8 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {item.image ? (
                    <ResponsiveImage src={item.image} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name || "Unnamed"}</p>
                    <p className="text-white/40 text-xs truncate">{item.description || "No description"}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)} className="text-blue-400" data-testid={`edit-program-${item.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setDeleteId(item.id); setDeleteOpen(true); }} className="text-red-400" data-testid={`delete-program-${item.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Program" : "Add Program"}</DialogTitle>
            <DialogDescription className="text-white/40">
              {editingItem ? "Update program details" : "Fill in the program details"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-blue-400 text-xs">Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 text-white" data-testid="input-program-name" />
            </div>
            <div>
              <Label className="text-blue-400 text-xs">Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-white/5 border-white/10 text-white min-h-[80px]" data-testid="input-program-description" />
            </div>
            <div>
              <Label className="text-blue-400 text-xs">Link URL</Label>
              <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="bg-white/5 border-white/10 text-white" placeholder="https://..." data-testid="input-program-link" />
            </div>
            <div>
              <Label className="text-blue-400 text-xs">Image (1:1)</Label>
              <ImageCropUpload
                aspectRatio={1}
                category="programs"
                currentImage={form.image}
                onUpload={(path) => setForm({ ...form, image: path })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="text-white/60 border-white/10">Cancel</Button>
            <Button onClick={handleSaveForm} className="bg-blue-600 hover:bg-blue-500 text-white" data-testid="save-program-form">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-[hsl(222,20%,14%)] border-blue-500/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription className="text-white/40">Are you sure? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white/60 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-500 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function Admin() {
  if (!import.meta.env.DEV) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(222,22%,10%)]">
        <div className="text-center p-12 rounded-lg bg-[hsl(222,20%,14%)] border border-blue-500/8 max-w-md">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-white text-3xl font-bold mb-4">Admin Not Available</h1>
          <p className="text-white/40">The admin panel is only available in development mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(222,22%,10%)] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2" data-testid="text-admin-title">Admin Panel</h1>
          <p className="text-white/40">Manage site content. Changes are saved to JSON data files.</p>
        </div>

        <Tabs defaultValue="members">
          <TabsList className="bg-[hsl(222,20%,14%)] border border-blue-500/8 mb-6">
            <TabsTrigger value="members" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60" data-testid="tab-members">Members</TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60" data-testid="tab-news">News</TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60" data-testid="tab-hero">Hero Images</TabsTrigger>
            <TabsTrigger value="programs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white/60" data-testid="tab-programs">Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <MembersTab />
          </TabsContent>
          <TabsContent value="news">
            <NewsTab />
          </TabsContent>
          <TabsContent value="hero">
            <HeroImagesTab />
          </TabsContent>
          <TabsContent value="programs">
            <ProgramsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
