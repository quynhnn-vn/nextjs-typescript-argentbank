export interface UserProfileType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  name: string;
  path?: string;
  icon: JSX.Element;
  onClick?: () => void;
}
