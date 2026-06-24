export type AppType = 'gallery' | 'music' | 'message' | 'profile' | null;

export interface AppConfig {
  id: AppType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
