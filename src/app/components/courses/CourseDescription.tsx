"use client";
import React, { useState } from "react";
import RawHtmlRenderer from "../UI/RawHtmlRendererProps";
interface DescriptionProps {
  description: string;
  currentLocation: any;
}

const CourseDescription: React.FC<DescriptionProps> = ({
  description,
  currentLocation,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    if (count == 450) {
      setcount(10000000000);
    } else {
      setcount(450);
    }
  };
  const [count, setcount] = useState<any>(450);
  return (
    <div className="  mx-auto">
      <div
        onClick={handleToggle}
        className={`${isExpanded ? "" : ""}  transition-all duration-300`}
      >
        <RawHtmlRenderer
          htmlContent={description.substring(0, count)}
          currentLocation={currentLocation}
        />
      </div>
      {/* <button
        onClick={handleToggle}
        className="text-blue-600 mt-2 underline text-sm font-bold"
      >
        {isExpanded ? "..." : "..."}
      </button> */}
    </div>
  );
};

export default CourseDescription;
