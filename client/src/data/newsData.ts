export interface NewsItemData {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  iconName: string;
  image?: string;
}

export const newsData: NewsItemData[] = [
  {
    id: 1,
    title: "Now Open for Donations",
    date: "Dec 01, 2024",
    category: "Announcement",
    description: "We are now open for donations for the purchase of materials needed for teaching and for student coach's tuition. Your support helps us bring robotics education to more children across ASEAN.",
    iconName: "Heart",
    image: "https://r4kclub.com//storage/91/5fd7071cce51f_870x400_12.jpg"
  },
  {
    id: 2,
    title: "New School in Laos - Pasatipatai School",
    date: "Oct 15, 2023",
    category: "Expansion",
    description: "R4K has expanded to Laos! We've partnered with Pasatipatai School in Luang Prabang to bring robotics education to students there.",
    iconName: "MapPin"
  },
  {
    id: 3,
    title: "Zoom:bit Course Launch",
    date: "Mar 01, 2024",
    category: "Courses",
    description: "Introducing our newest course: Micro:bit for Beginners using the Zoom:bit platform. A comprehensive curriculum for teaching robotics programming basics.",
    iconName: "Zap"
  },
  {
    id: 4,
    title: "Philippines Expansion - Three New Schools",
    date: "Aug 20, 2022",
    category: "Expansion",
    description: "R4K is proud to announce partnerships with Xavier School San Juan, Xavier School Nuvali, and University of Philippines Integrated School.",
    iconName: "MapPin"
  },
];
