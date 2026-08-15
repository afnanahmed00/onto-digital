import type { ElementType } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcon";
import { SITE } from "@/config/site";
import { SOCIALS } from "@/config/social";

export type ContactInfoItem = {
  icon: ElementType;
  title: string;
  value: string;
  description: string;
  href?: string;
};

export const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    title: "EMAIL",
    value: SITE.email,
    description: "We typically reply within 24 hours.",
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MessageCircle,
    title: "WHATSAPP",
    value: SITE.phone,
    description: "Available Monday to Saturday.",
  },
  {
    icon: InstagramIcon,
    title: "INSTAGRAM",
    value: "@ontodigital.in",
    description: "Follow us for updates.",
    href: SOCIALS.instagram || undefined,
  },
  {
    icon: MapPin,
    title: "OUR LOCATION",
    value: SITE.address,
    description: "We'd love to meet in person.",
  },
];
