
export type Talent = {
  id: string;
  name: string;
  category: 'Actress' | 'Artist' | 'Model' | 'Content Creator' | 'Photographer' | 'actress' | 'artist' | 'model' | 'content-creator' | 'photographer';
  bio: string;
  email: string;
  phone: string;
  socials: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  portfolio: {
    image: string; // Corresponds to an ID in placeholder-images.json
    caption: string;
  }[];
  profileImage: string; // Corresponds to an ID in placeholder-images.json
  approved: boolean;
  createdAt: any;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  featuredImage: string; // Corresponds to an ID in placeholder-images.json
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type UserProfile = {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'admin' | 'talent';
};
