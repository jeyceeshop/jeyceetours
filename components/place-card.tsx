import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  destinationArtwork,
  destinations,
  imageFor,
} from "../lib/destinations";

export function PlaceCard({ place }: { place: (typeof destinations)[number] }) {
  const image = destinationArtwork[place.id];
  const href =
    (place.country === "panama" ? "/panama/" : "/america/") + place.id;

  return (
    <Link href={href} className="place-card">
      <div className="place-image">
        <Image
          src={image ? "/images/" + image + ".webp" : imageFor(place.country)}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 30vw"
        />
      </div>
      <div className="place-body">
        <div className="locator">
          <MapPin size={14} /> {place.types.join(" · ")}
        </div>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <span className="text-link">
          Ver guía <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
