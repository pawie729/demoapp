import * as React from 'react';
import { ExpandMore } from "@mui/icons-material";

interface AccordionSheetProps {
    children: React.ReactNode;
    className?: string;
}

interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    panelId: string;
}

interface AccordionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    panelId: string;
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    panelId: string;
}

interface AccordionContentItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    className?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const AccordionSheetContext = React.createContext<{
    expandedPanel: string | null,
    setExpandedPanel: (panelId: string | null) => void,
    activeItemId: string | null,
    setActiveItemId: (itemId: string | null) => void
} | undefined>(undefined);

const AccordionSheet: React.FC<AccordionSheetProps> = ({ className = '', children }) => {

    const [expandedPanel, setExpandedPanel] = React.useState<string | null>(null);
    const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
    const value = { expandedPanel, setExpandedPanel, activeItemId, setActiveItemId };

    return (
        <AccordionSheetContext.Provider value={value}>
            <div className={` my-4 mx-8 md:m-4 bg-white p-2 rounded-lg shadow-md lg:text-sm md:text-xs ${className}`}>
                {children}
            </div>
        </AccordionSheetContext.Provider>
    );
};

const AccordionBody: React.FC<AccordionBodyProps> = ({ children, className = '', panelId, ...props }) => {

    const context = React.useContext(AccordionSheetContext);

    if (!context) throw new Error("AccordionBody must be used within an AccordionSheet");
    const { expandedPanel, setExpandedPanel } = context;
    const handleToggle = () => {
        setExpandedPanel(expandedPanel === panelId ? null : panelId);
    };

    return (
        <div
            className={` p-2 bg-white transition-all ${className}`}
            onClick={handleToggle}
            {...props}
        >
            {children}
        </div>
    );
};

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ icon, children, className = '', panelId, ...props }) => {

    const context = React.useContext(AccordionSheetContext);

    if (!context) {
        throw new Error('AccordionHeader must be used within AccordionSheet');
    }
    const { expandedPanel, setExpandedPanel } = context;
    const toggleExpanded = () => {
        setExpandedPanel(expandedPanel === panelId ? null : panelId);
    };

    return (
        <div
            className={`flex justify-between items-center py-1 cursor-pointer ${className}`}
            onClick={toggleExpanded}
            {...props}
        >
            <div className="flex items-center gap-2 font-bold">
                {icon}
                {children}
            </div>
            {children && (
                <div
                    className={`text-gray-500 transition-transform duration-300 ease-in-out transform ${expandedPanel === panelId ? '-rotate-180' : ''}`}
                >
                    <ExpandMore sx={{ fontSize: 15 }} />
                </div>)}
        </div>
    );
};

const AccordionContent: React.FC<AccordionContentProps> = ({ icon, children, className = '', panelId, ...props }) => {
    
    const context = React.useContext(AccordionSheetContext);

    if (!context) throw new Error("AccordionContent must be used within AccordionSheet");

    const { expandedPanel } = context;
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = React.useState<number>(0);

    React.useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [children]);

    return (
        <div
            ref={contentRef}
            className={` overflow-hidden transition-[max-height] duration-300 ease-in-out ${className}`}
            style={{
                maxHeight: expandedPanel === panelId ? `${contentHeight}px` : '0px',
            }}
            {...props}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
};

const AccordionContentItem: React.FC<AccordionContentItemProps> = ({ id, icon, children }) => {

    const context = React.useContext(AccordionSheetContext);

    if (!context) throw new Error("AccordionContentItem must be used within AccordionSheet");
    const { activeItemId, setActiveItemId } = context;
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveItemId(activeItemId === id ? null : id);
    };

    return (
        <div
            onClick={handleClick}
            className={`m-1 my-2 p-2.5 py-1.5  text-gray-500 flex items-center gap-2 rounded-lg cursor-pointer duration-300 hover:bg-slate-100
                ${activeItemId  === id ? ' font-bold text-fuchsia-600  ring-2 ring-fuchsia-300' : ''}`}
        >
            {icon && <span className="mr-1">{icon}</span>}
            {children}
        </div>
    );
};

export {
    AccordionSheet,
    AccordionSheetContext,
    AccordionBody,
    AccordionHeader,
    AccordionContent,
    AccordionContentItem
};