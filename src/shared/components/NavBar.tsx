import React, { useEffect, useState } from 'react';
import {
  AccordionSheet,
  AccordionBody,
  AccordionContent,
  AccordionHeader,
  AccordionContentItem,
} from '../common/Accordion';
import { SpaceDashboardOutlined } from "@mui/icons-material";
import * as Icons from "@mui/icons-material";
import { fetchCategories, Category } from '../services/Categories';

export default function NavBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const getIconComponent = (iconName: string, className?: string) => {
    const IconComponent = Icons[`${iconName}Outlined` as keyof typeof Icons];
    return IconComponent ? (
      <IconComponent className={className} />
    ) : null;
  };

  return (
    <div>
      <AccordionSheet className=' h-[70vh] overflow-y-auto smallScrollbar'>
        {categories.length > 0 ? (
          categories.sort((a, b) => a.sequence - b.sequence).map((category) => (
            <AccordionBody key={category.rawId} className="my-2 py-2" panelId={category.rawId}>
              <AccordionHeader 
              panelId={category.rawId} 
            //   icon={getIconComponent(category.iconName)}
              >
              {getIconComponent(category.iconName, "w-8 h-8 text-blue-500")}
              {category.description}
              </AccordionHeader>
              {category.appMenuList.length > 0 ? (
                category.appMenuList.map((child) => (
                  <AccordionContent key={child.rawId} panelId={category.rawId}>
                    <AccordionContentItem
                      id={child.rawId}
                    //   icon={getIconComponent(child.iconName)}
                    >
                        {getIconComponent(child.iconName, "w-6 h-6 text-green-600")}
                      {child.description}
                    </AccordionContentItem>
                  </AccordionContent>
                ))
              ) : (
                <div>No subcategories available</div>
              )}
            </AccordionBody>
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </AccordionSheet>
    </div>
  );
}
