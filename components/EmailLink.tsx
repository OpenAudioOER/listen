import React from 'react';

interface EmailLinkProps {
    className?: string;
    title?: string;
    children: React.ReactNode;
}

export const EmailLink: React.FC<EmailLinkProps> = ({ className, title, children }) => {
    const handleContact = (e: React.MouseEvent) => {
        e.preventDefault();
        // Reconstruct email address on click to hide from bots
        const user = "audiobook";
        const domain = "fastmail.com";
        const subject = "OpenAudio Website Inquiry";
        window.location.href = `mailto:${user}@${domain}?subject=${encodeURIComponent(subject)}`;
    };

    return (
        <button
            onClick={handleContact}
            className={className}
            title={title}
            type="button"
        >
            {children}
        </button>
    );
};
