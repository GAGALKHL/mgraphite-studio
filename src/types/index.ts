export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  gallery?: string[];
  tags?: string[];
  date?: string;
  likes?: number;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
  favorites: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'comment' | 'like' | 'project';
  title: string;
  message: string;
  date: string;
  read: boolean;
}
