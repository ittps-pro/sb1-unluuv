export interface Device {
  id: string;
  name: string;
  type: 'laptop' | 'desktop' | 'mobile' | 'tablet' | 'other';
  status: 'active' | 'inactive' | 'maintenance';
  last_checked: string;
  assigned_to?: string;
  specifications: {
    os: string;
    ram?: string;
    storage?: string;
    processor?: string;
  };
}