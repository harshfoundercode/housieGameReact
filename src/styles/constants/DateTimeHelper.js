/**
 * Parse ISO datetime string to get date and time
 * @param {string} startDateTime - ISO datetime string
 * @returns {Object} { gameDate, roundTime }
 */
export const parseDateTime = (startDateTime) => {
    if (!startDateTime) return { gameDate: null, roundTime: null };

    try {
        const date = new Date(startDateTime);

        // Format date as YYYY-MM-DD
        const gameDate = date.toISOString().split('T')[0];

        // Format time as HH:MM:SS
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const roundTime = `${hours}:${minutes}:${seconds}`;

        return { gameDate, roundTime };
    } catch (error) {
        console.error("Error parsing datetime:", error);
        return { gameDate: null, roundTime: null };
    }
};

/**
 * Format time for display (12-hour format)
 * @param {string} roundTime - Time in HH:MM:SS format
 * @param {string} gameDate - Date in YYYY-MM-DD format
 * @returns {string} Formatted time string
 */
export const formatDrawTime = (roundTime, gameDate) => {
    if (!roundTime) return "TBD";

    try {
        const [hours, minutes] = roundTime.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error("Error formatting draw time:", error);
        return "TBD";
    }
};

/**
 * Format days for display (Today, Tomorrow, Yesterday, etc.)
 * @param {string} startDateTime - ISO datetime string
 * @returns {string} Formatted day string
 */
export const formatDays = (startDateTime) => {
    if (!startDateTime) return "TBD";

    try {
        const date = new Date(startDateTime);
        const now = new Date();

        // Reset time for accurate day comparison
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const gameDateObj = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const diffTime = gameDateObj - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        if (diffDays > 1) return `In ${diffDays} days`;
        if (diffDays === -1) return "Yesterday";
        if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;

        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error("Error formatting days:", error);
        return "TBD";
    }
};

/**
 * Format date for display (DD/MM/YYYY)
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        return "";
    }
};

/**
 * Format full date and time
 * @param {string} startDateTime - ISO datetime string
 * @returns {string} Formatted date and time
 */
export const formatFullDateTime = (startDateTime) => {
    if (!startDateTime) return "TBD";

    try {
        const date = new Date(startDateTime);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error("Error formatting full datetime:", error);
        return "TBD";
    }
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 hours")
 * @param {string} startDateTime - ISO datetime string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (startDateTime) => {
    if (!startDateTime) return "";

    try {
        const date = new Date(startDateTime);
        const now = new Date();
        const diffMs = date - now;
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 0) {
            // Past time
            const absMinutes = Math.abs(diffMinutes);
            if (absMinutes < 1) return "Just now";
            if (absMinutes < 60) return `${absMinutes} minute${absMinutes > 1 ? 's' : ''} ago`;
            if (absMinutes < 1440) return `${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? 's' : ''} ago`;
            return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
        } else {
            // Future time
            if (diffMinutes < 1) return "Now";
            if (diffMinutes < 60) return `in ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
            if (diffMinutes < 1440) return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
            return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
        }
    } catch (error) {
        console.error("Error calculating relative time:", error);
        return "";
    }
};

/**
 * Check if a date is today
 * @param {string} dateString - Date string
 * @returns {boolean}
 */
export const isToday = (dateString) => {
    if (!dateString) return false;

    try {
        const date = new Date(dateString);
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    } catch (error) {
        return false;
    }
};

/**
 * Check if a date is tomorrow
 * @param {string} dateString - Date string
 * @returns {boolean}
 */
export const isTomorrow = (dateString) => {
    if (!dateString) return false;

    try {
        const date = new Date(dateString);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return date.getDate() === tomorrow.getDate() &&
               date.getMonth() === tomorrow.getMonth() &&
               date.getFullYear() === tomorrow.getFullYear();
    } catch (error) {
        return false;
    }
};