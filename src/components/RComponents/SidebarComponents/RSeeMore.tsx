import React, { useState } from "react";
import { useTranslation } from "react-i18next";
interface RSeeMoreProps {
    text: string; // The full text to display
    maxChars: number; // Maximum number of characters to show before truncating
    seeMoreText?: string; // Custom "See More" text (optional)
    seeLessText?: string; // Custom "See Less" text (optional)
    onSeeMoreClick?: () => void; // Callback when "See More" is clicked (optional)
    onSeeLessClick?: () => void; // Callback when "See Less" is clicked (optional)
}

const RSeeMore: React.FC<RSeeMoreProps> = ({
    text,
    maxChars,
    seeMoreText = "See more",
    seeLessText = "See less",
    onSeeMoreClick,
    onSeeLessClick,
}) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    // Truncate the text if it exceeds maxChars and is not expanded
    const truncatedText = isExpanded ? text : text?.slice(0, maxChars) + (text?.length > maxChars ? "..." : "");

    // Toggle between expanded and collapsed states
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
        if (isExpanded && onSeeLessClick) {
            onSeeLessClick();
        } else if (!isExpanded && onSeeMoreClick) {
            onSeeMoreClick();
        }
    };

    return (
        <div>
            <span>{truncatedText}</span>
            {text?.length > maxChars && (
                <button
                    onClick={toggleExpand}
                    className="text-muted-foreground cursor-pointer ml-[10px] text-[13px]"
                    style={{
                        background: "none",
                        border: "none",
                    }}
                >
                    {isExpanded ? t(seeLessText) : t(seeMoreText)}
                </button>
            )}
        </div>
    );
};

export default RSeeMore;