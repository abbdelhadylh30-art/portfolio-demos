import {
  Snowflake,
  Sparkles,
  Wrench,
  Droplets,
  Zap,
  Hammer,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  ac: Snowflake,
  clean: Sparkles,
  install: Wrench,
  plumbing: Droplets,
  electrical: Zap,
  handyman: Hammer,
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const C = MAP[icon] ?? Wrench;
  return <C className={className} aria-hidden />;
}
