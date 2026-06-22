import { useEffect } from "react";
import { toast } from "sonner";

const names = [
  "Priya",
  "Riya",
  "Aanya",
  "Neha",
  "Ananya",
  "Kavya",
  "Sneha",
  "Divya",
  "Meera",
  "Ishita",
  "Tanvi",
  "Sofia",
  "Aaradhya",
  "Diya",
  "Pooja",
];

const salons = [
  "Luxe Hair Studio",
  "Glow Skin Clinic",
  "Nail Artistry",
  "Bridal Bliss Studio",
  "The Grooming Co",
];

export function BookingToasts() {
  useEffect(() => {
    const tick = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const salon = salons[Math.floor(Math.random() * salons.length)];
      toast(`${name} just booked at ${salon}`, {
        description: "Hurry — slots are filling up fast!",
      });
    };

    // first toast after a short delay so it doesn't clash with initial render
    const first = setTimeout(tick, 8000);
    const interval = setInterval(tick, 45000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return null;
}
