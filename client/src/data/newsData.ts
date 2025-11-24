export interface NewsItemData {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  iconName: string;
}

export const newsData: NewsItemData[] = [
  {
    id: 1,
    title: "Regional Championship Win!",
    date: "Nov 20, 2025",
    category: "Competition",
    description: "Our team took home the gold at the Regional Robotics Championship this weekend. The autonomous mode performed perfectly.",
    iconName: "Trophy",
  },
  {
    id: 2,
    title: "Upcoming Workshop Series",
    date: "Dec 05, 2025",
    category: "Events",
    description: "Join us for a 4-week introduction to Python programming for robotics. Open to all students aged 12-16.",
    iconName: "Calendar",
  },
  {
    id: 3,
    title: "New Lab Equipment Arrived",
    date: "Nov 15, 2025",
    category: "Update",
    description: "We just received our new 3D printers and CNC machine. Big thanks to our sponsors for making this possible.",
    iconName: "Zap",
  },
  {
    id: 4,
    title: "Community Outreach Day",
    date: "Oct 28, 2025",
    category: "Community",
    description: "We visited the local elementary school to demonstrate our latest robot and inspire young engineers.",
    iconName: "MapPin",
  },
];
