import { TravelPackage } from "./types";

export const POPULAR_PACKAGES: TravelPackage[] = [
  {
    id: "p1",
    packageName: "Bali Bliss Retreat",
    destination: "Bali, Indonesia",
    duration: "7 Days",
    price: "$1,299",
    description: "Experience the tropical paradise of Bali with temple tours, beach relaxation, and cultural immersion.",
    image: "https://picsum.photos/seed/bali/600/400",
    hotel: {
      name: "Ubud Hanging Gardens",
      rating: "5 Stars",
      description: "Luxury villas with private pools overlooking the jungle.",
      amenities: ["Spa", "Infinity Pool", "Free Wifi"]
    },
    inclusions: ["Airport Transfer", "Daily Breakfast", "2 Guided Tours", "Spa Voucher"],
    itinerary: []
  },
  {
    id: "p2",
    packageName: "Parisian Romance",
    destination: "Paris, France",
    duration: "5 Days",
    price: "$1,850",
    description: "A romantic getaway to the city of lights, featuring river cruises and gourmet dining.",
    image: "https://picsum.photos/seed/paris/600/400",
    hotel: {
      name: "Hotel Le Plaza",
      rating: "4 Stars",
      description: "Charming boutique hotel near the Eiffel Tower.",
      amenities: ["Bar", "Concierge", "Room Service"]
    },
    inclusions: ["Seine Cruise Ticket", "Louvre Museum Entry", "Wine Tasting"],
    itinerary: []
  },
  {
    id: "p3",
    packageName: "Swiss Alps Adventure",
    destination: "Interlaken, Switzerland",
    duration: "6 Days",
    price: "$2,100",
    description: "Explore the majestic Swiss Alps with train rides, hiking, and chocolate tasting.",
    image: "https://picsum.photos/seed/swiss/600/400",
    hotel: {
      name: "Alpine Lodge",
      rating: "4.5 Stars",
      description: "Cozy lodge with mountain views and fireplace.",
      amenities: ["Sauna", "Restaurant", "Ski Storage"]
    },
    inclusions: ["Swiss Travel Pass", "Chocolate Factory Tour", "Hiking Guide"],
    itinerary: []
  }
];

export const DESTINATIONS = [
  { name: "Tokyo", img: "https://picsum.photos/seed/tokyo/400/300", link: "https://www.trip.com/t/ulIWu2bEQS2" },
  { name: "Dubai", img: "https://picsum.photos/seed/dubai/400/300", link: "https://www.trip.com/t/FxOTpypEQS2" },
  { name: "Paris", img: "https://picsum.photos/seed/paris/400/300", link: "https://www.trip.com/t/0ac8cktEQS2" },
  { name: "Hong Kong", img: "https://picsum.photos/seed/hongkong/400/300", link: "https://www.trip.com/t/IjwWbYwEQS2" },
  { name: "Bangkok", img: "https://picsum.photos/seed/bangkok/400/300", link: "https://www.trip.com/t/m9FJYTyEQS2" },
  { name: "Shanghai", img: "https://picsum.photos/seed/shanghai/400/300", link: "https://www.trip.com/t/M6YTnvzEQS2" },
  { name: "Frankfurt", img: "https://picsum.photos/seed/frankfurt/400/300", link: "https://www.trip.com/t/3lKf6a2FQS2" },
  { name: "Rome", img: "https://picsum.photos/seed/rome/400/300", link: "https://www.trip.com/t/kVNGvw4FQS2" },
  { name: "Amsterdam", img: "https://picsum.photos/seed/amsterdam/400/300", link: "https://www.trip.com/t/VPDeCa6FQS2" },
  { name: "Madrid", img: "https://picsum.photos/seed/madrid/400/300", link: "https://www.trip.com/t/4Q6VXM8FQS2" },
  { name: "London", img: "https://picsum.photos/seed/london/400/300", link: "https://www.trip.com/t/UDY1xeAFQS2" },
  { name: "New York", img: "https://picsum.photos/seed/nyc/400/300", link: "https://www.trip.com/t/dJZ1EQCFQS2" },
  { name: "Seoul", img: "https://picsum.photos/seed/seoul/400/300", link: "https://www.trip.com/t/NzhcE1EFQS2" },
  { name: "Singapore", img: "https://picsum.photos/seed/singapore/400/300", link: "https://www.trip.com/t/0k7MNeFFQS2" },
  { name: "Manila", img: "https://picsum.photos/seed/manila/400/300", link: "https://www.trip.com/t/x5GzfVIFQS2" },
  { name: "Kuala Lumpur", img: "https://picsum.photos/seed/kl/400/300", link: "https://www.trip.com/t/ptzzo8KFQS2" },
  { name: "Taipei", img: "https://picsum.photos/seed/taipei/400/300", link: "https://www.trip.com/t/yfTvETNFQS2" },
];

export const TESTIMONIALS = [
  { name: "Sarah Jenkins", location: "USA", text: "The AI planned the perfect trip to Italy for my family. It saved us hours of research!", img: "https://picsum.photos/seed/person1/100/100" },
  { name: "David Chen", location: "Canada", text: "Booking was seamless. The hotel recommendations were spot on for our budget.", img: "https://picsum.photos/seed/person2/100/100" },
  { name: "Amara O.", location: "UK", text: "I loved the customized itinerary. We discovered hidden gems we wouldn't have found otherwise.", img: "https://picsum.photos/seed/person3/100/100" },
];