export interface Project {
  title: string;
  description?: string;
  projectUrl?: string;
  image?: string;
}

export interface Portfolio {
  id: string;
  name: string;
  photo?: string | null;
  email?: string;
  phoneNumber?: string;
  address?: string;
  skills?: string[];
  userId?: string;
  public?: boolean;
}
