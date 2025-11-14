import { useState } from "react";
import arrowup from "../../assets/img/arrowup.png";

interface ReviewTopicsProps {
  topics?: string[];
  onChange?: (selected: string[]) => void; 
  className?: string; 
}

const DEFAULT_TOPICS = [
  "Product Quality",
  "Seller Services",
  "Product Price",
  "Shipment",
  "Match with Description",
];

const ReviewTopics: React.FC<ReviewTopicsProps> = ({
  topics = DEFAULT_TOPICS,
  onChange,
  className = "",
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const toggleTopic = (topic: string) => {
    const newSelected = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    setSelectedTopics(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className={`mt-6 ${className}`}>
      {/* Header */}
      <button
        onClick={toggleCollapse}
        className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        aria-expanded={!collapsed}
        aria-controls="review-topics-list"
      >
        <span>Review Topics</span>
        <span
          className={`transform transition-transform duration-300 ${
            collapsed ? "rotate-0" : "rotate-180"
          }`}
          aria-hidden="true"
        >
          <img src={arrowup} className="w-3 h-3" alt="Toggle" />
        </span>
      </button>

      {/* Topics List */}
      {!collapsed && (
        <div id="review-topics-list" className="flex flex-col gap-3">
          {topics.map((topic) => (
            <label
              key={topic}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={selectedTopics.includes(topic)}
                onChange={() => toggleTopic(topic)}
              />
              <span className="text-[14px] font-semibold text-rating">{topic}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewTopics;
