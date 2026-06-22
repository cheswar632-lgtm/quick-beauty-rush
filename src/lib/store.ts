import { useSyncExternalStore } from "react";

export type Category = "Hair" | "Skin" | "Nails" | "Bridal";

export type Deal = {
  id: string;
  salon: string;
  area: string;
  service: string;
  category: Category;
  originalPrice: number;
  discountPct: number;
  slotsLeft: number;
  endsAt: number; // epoch ms
  about?: string;
  services?: { name: string; price: number }[];
};

export type Booking = {
  id: string;
  dealId: string;
  name: string;
  phone: string;
  time: string;
};

const now = Date.now();
const mins = (m: number) => now + m * 60_000;

const initialDeals: Deal[] = [
  {
    id: "luxe-hair",
    salon: "Luxe Hair Studio",
    area: "Koregaon Park",
    service: "Haircut & Blowdry",
    category: "Hair",
    originalPrice: 1200,
    discountPct: 40,
    slotsLeft: 2,
    endsAt: mins(95),
    about:
      "An award-winning hair studio in the heart of Koregaon Park. Trusted by Pune's tastemakers for precision cuts and editorial colour.",
    services: [
      { name: "Signature Haircut", price: 900 },
      { name: "Blowdry & Style", price: 600 },
      { name: "Deep Conditioning", price: 800 },
    ],
  },
  {
    id: "glow-skin",
    salon: "Glow Skin Clinic",
    area: "Baner",
    service: "Hydra Facial",
    category: "Skin",
    originalPrice: 2500,
    discountPct: 40,
    slotsLeft: 3,
    endsAt: mins(110),
    about:
      "Medical-grade skin clinic with a calm, minimal interior. Specialises in Korean glass-skin facials and advanced hydration therapies.",
    services: [
      { name: "Hydra Facial", price: 2500 },
      { name: "Korean Glass Glow", price: 3200 },
      { name: "Dermaplaning", price: 1800 },
    ],
  },
  {
    id: "nail-artistry",
    salon: "Nail Artistry",
    area: "Viman Nagar",
    service: "Gel Nail Extension",
    category: "Nails",
    originalPrice: 800,
    discountPct: 40,
    slotsLeft: 4,
    endsAt: mins(80),
    about:
      "Pune's most-Instagrammed nail bar. Custom hand-painted art, chrome finishes, and gel extensions that last six weeks.",
    services: [
      { name: "Gel Nail Extension", price: 800 },
      { name: "Classic Manicure", price: 500 },
      { name: "Nail Art (per nail)", price: 80 },
    ],
  },
  {
    id: "bridal-bliss",
    salon: "Bridal Bliss Studio",
    area: "Kothrud",
    service: "Bridal Makeup Trial",
    category: "Bridal",
    originalPrice: 3500,
    discountPct: 45,
    slotsLeft: 1,
    endsAt: mins(60),
    about:
      "Couture bridal studio led by a celebrity MUA. HD airbrush, hair styling, and dupatta draping under one roof.",
    services: [
      { name: "Bridal Makeup Trial", price: 3500 },
      { name: "Engagement Look", price: 8500 },
      { name: "Hair Styling", price: 2500 },
    ],
  },
  {
    id: "grooming-co",
    salon: "The Grooming Co",
    area: "Aundh",
    service: "Hair Colour",
    category: "Hair",
    originalPrice: 1800,
    discountPct: 45,
    slotsLeft: 2,
    endsAt: mins(130),
    about:
      "Modern unisex grooming lounge with imported colour brands. Known for ammonia-free global colour and balayage.",
    services: [
      { name: "Global Hair Colour", price: 1800 },
      { name: "Highlights", price: 2400 },
      { name: "Beard Sculpt", price: 400 },
    ],
  },
];

let deals: Deal[] = initialDeals;
let bookings: Booking[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const store = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getDeals: () => deals,
  getBookings: () => bookings,
  addDeal(d: Omit<Deal, "id">) {
    deals = [{ ...d, id: `deal-${Date.now()}` }, ...deals];
    emit();
  },
  addBooking(b: Omit<Booking, "id">) {
    const id = `SLP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    bookings = [...bookings, { ...b, id }];
    // decrement slot
    deals = deals.map((d) =>
      d.id === b.dealId ? { ...d, slotsLeft: Math.max(0, d.slotsLeft - 1) } : d,
    );
    emit();
    return id;
  },
};

export function useDeals() {
  return useSyncExternalStore(
    store.subscribe,
    store.getDeals,
    store.getDeals,
  );
}

export function useDeal(id: string) {
  const all = useDeals();
  return all.find((d) => d.id === id);
}

export const dealStore = store;
