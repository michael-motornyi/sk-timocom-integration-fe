"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatWeight } from "@/lib/utils";
import type { FreightOffer } from "@/types";
import { Eye, MapPin, Package, Truck } from "lucide-react";

interface FreightOfferCardProps {
  offer: FreightOffer;
  onView?: (offer: FreightOffer) => void;
  onEdit?: (offer: FreightOffer) => void;
  onDelete?: (offer: FreightOffer) => void;
}

export function FreightOfferCard({
  offer,
  onView,
  onEdit,
  onDelete,
}: FreightOfferCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {offer.freightDescription}
          </CardTitle>
        </div>
        <p className="text-sm text-gray-700">ID: {offer.id}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Route Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="font-medium">From:</span>
            <span>
              {offer.loadingPlaces[0]?.address.city}, {offer.loadingPlaces[0]?.address.country}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-800">
            <MapPin className="h-4 w-4 text-red-600" />
            <span className="font-medium">To:</span>
            <span>
              {offer.loadingPlaces.find(p => p.loadingType === 'UNLOADING')?.address.city}, {offer.loadingPlaces.find(p => p.loadingType === 'UNLOADING')?.address.country}
            </span>
          </div>
        </div>

        {/* Freight Information */}
        <div className="flex items-center gap-4 text-sm text-gray-800">
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>{formatWeight(offer.weight_t)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            <span>{offer.length_m} m length</span>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-1 text-sm text-gray-800">
          <div>
            <span className="font-medium">Loading:</span>{" "}
            {formatDate(offer.loadingPlaces[0]?.earliestLoadingDate)}
          </div>
          <div>
            <span className="font-medium">Unloading:</span>{" "}
            {formatDate(offer.loadingPlaces.find(p => p.loadingType === 'UNLOADING')?.earliestLoadingDate || '')}
          </div>
        </div>

        {/* Contact */}
        <div className="text-sm text-gray-800">
          <span className="font-medium">Contact:</span> {offer.contactPerson.firstName} {offer.contactPerson.lastName}
          <div className="text-gray-700">{offer.contactPerson.email}</div>
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
