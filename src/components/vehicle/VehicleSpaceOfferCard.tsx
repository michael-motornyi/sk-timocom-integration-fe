"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getStatusColor } from "@/lib/utils";
import type { VehicleSpaceOffer } from "@/types";
import { Eye, MapPin, Truck } from "lucide-react";

interface VehicleSpaceOfferCardProps {
  offer: VehicleSpaceOffer;
  onView?: (offer: VehicleSpaceOffer) => void;
  onEdit?: (offer: VehicleSpaceOffer) => void;
  onDelete?: (offer: VehicleSpaceOffer) => void;
}

export function VehicleSpaceOfferCard({
  offer,
  onView,
  onEdit,
  onDelete,
}: VehicleSpaceOfferCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">
            {offer.vehicle.type}
          </CardTitle>
          <Badge className={getStatusColor(offer.status)} variant="outline">
            {offer.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">ID: {offer.publicOfferId}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Route Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="font-medium">From:</span>
            <span>
              {offer.loadingLocation.city}, {offer.loadingLocation.country}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-red-600" />
            <span className="font-medium">To:</span>
            <span>
              {offer.unloadingLocation.city}, {offer.unloadingLocation.country}
            </span>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4" />
          <span className="font-medium">Capacity:</span>
          <span>{offer.vehicle.capacity.toLocaleString()} kg</span>
        </div>

        {/* Availability */}
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium">Available from:</span>{" "}
            {formatDate(offer.availableFrom)}
          </div>
          <div>
            <span className="font-medium">Available to:</span>{" "}
            {formatDate(offer.availableTo)}
          </div>
        </div>

        {/* Features */}
        {offer.vehicle.features && offer.vehicle.features.length > 0 && (
          <div className="text-sm">
            <span className="font-medium">Features:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {offer.vehicle.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="text-sm">
          <span className="font-medium">Contact:</span> {offer.contact.name}
          {offer.contact.company && (
            <span className="text-gray-600"> ({offer.contact.company})</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button variant="outline" size="sm" onClick={() => onView(offer)}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          )}
          {onEdit && (
            <Button variant="secondary" size="sm" onClick={() => onEdit(offer)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(offer)}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
