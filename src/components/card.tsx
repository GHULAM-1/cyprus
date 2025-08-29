"use client";

import React, { useState } from "react";
import { Search, MapPin, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock location data - in a real app, this would come from an API
const mockLocations = [
  { id: 1, city: "Austin", state: "TX" },
  { id: 2, city: "Albuquerque", state: "NM" },
  { id: 3, city: "Anchorage", state: "AK" },
  { id: 4, city: "Anaheim", state: "CA" },
  { id: 5, city: "Arroyo City", state: "TX" },
  { id: 6, city: "Atlanta", state: "GA" },
  { id: 7, city: "Austin", state: "TX" },
  { id: 8, city: "Baltimore", state: "MD" },
];

export default function Card() {
  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("Mon, Sep 29");
  const [travelers, setTravelers] = useState(2);

  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);

  const filteredLocations = mockLocations.filter(
    (location) =>
      location.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
      location.state.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
    setLocationQuery(location);
  };

  const handleLocationInputChange = (value: string) => {
    setLocationQuery(value);
    setSelectedLocation("");
    setShowLocationDropdown(value.length > 0);
  };

  return (
    <div className="relative sm:max-w-md mx-auto">
      {/* Main Card */}
      <div className="bg-white rounded-lg sm:shadow-lg sm:p-6 sm:border sm:border-gray-100">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold sm:font-semibold mb-6 sm:mb-4">
            Things to do in Cyprus
          </h1>
          <p className="text-gray-600 text-xl sm:text-sm">
            Book tours, activities, and excursions for your perfect trip
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* WHERE TO Field */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Book tours, activities, and excursions for your"
                value={locationQuery}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                onFocus={() =>
                  setShowLocationDropdown(locationQuery.length > 0)
                }
                className="w-full px-3 sm:py-2 py-3 pt-10 sm:pt-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00AEEF] focus:border-transparent text-md sm:text-sm placeholder-gray-400"
              />
              <label className="absolute top-2 left-3 text-md sm:text-xs font-semibold text-black uppercase z-10">
                WHERE TO
              </label>
            </div>

            {/* Location Dropdown */}
            {showLocationDropdown && (
              <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() =>
                      handleLocationSelect(
                        `${location.city}, ${location.state}`
                      )
                    }
                    className="flex items-center px-3 sm:py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-gray-800 font-medium">
                      {location.city}, {location.state}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date and Travelers Row - Merged Container */}
          <div className="relative border border-gray-300 rounded-md flex">
            {/* DATE Field - Left Side */}
            <div className="relative flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={selectedDate}
                      readOnly
                      className="w-full px-3 sm:py-2 py-3 sm:pt-6 pt-10 border-0 focus:outline-none focus:ring-0 cursor-pointer text-md sm:text-sm"
                    />
                    <label className="absolute top-2 left-3 text-md sm:text-xs font-semibold text-black uppercase z-10">
                      DATE
                    </label>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date()}
                    onSelect={(date) => {
                      if (date) {
                        const formattedDate = date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        });
                        setSelectedDate(formattedDate);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Vertical Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300"></div>

            {/* TRAVELERS Field - Right Side */}
            <div className="relative flex-1">
              <input
                type="text"
                value=""
                readOnly
                onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                className="w-full px-3 sm:py-2 py-3 sm:pt-6 pt-10 border-0 focus:outline-none focus:ring-0 cursor-pointer text-md sm:text-sm"
              />
              <label className="absolute top-2 left-3 text-md sm:text-xs font-semibold text-black uppercase z-10">
                TRAVELERS
              </label>
              <div className="absolute left-3 top-[52px] sm:top-9 transform -translate-y-1/2 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="sm:text-sm text-md text-gray-600">{travelers}</span>
              </div>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

              {/* Travelers Dropdown */}
              {showTravelersDropdown && (
                <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div
                      key={num}
                      onClick={() => {
                        setTravelers(num);
                        setShowTravelersDropdown(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-center"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button className="w-full mt-6 bg-gradient-to-r from-[#00B5F1] via-[#00AEEF] to-[#0066B3] text-white py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2">
          <Search className="w-5 h-5" />
          Search
        </button>
      </div>

      {/* Click outside to close dropdowns */}
      {(showLocationDropdown || showTravelersDropdown) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowLocationDropdown(false);
            setShowTravelersDropdown(false);
          }}
        />
      )}
    </div>
  );
}
