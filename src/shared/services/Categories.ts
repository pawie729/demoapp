// api/categories.ts

export interface Category {
  rawId: string;
  sequence: number;
  iconName: string;
  description: string;
  appMenuList: SubCategory[];
}

export interface SubCategory {
  rawId: string;
  description: string;
  iconName: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          rawId: "1",
          sequence: 1,
          iconName: "AccessAlarm",
          description: "Category 1",
          appMenuList: [
            { rawId: "1-1", description: "SubCategory 1-1", iconName: "AdsClick" },
            { rawId: "1-2", description: "SubCategory 1-2", iconName: "Adjust" },
          ],
        },
        {
          rawId: "2",
          sequence: 2,
          iconName: "AddCircle",
          description: "Category 2",
          appMenuList: [
            { rawId: "2-1", description: "SubCategory 2-1", iconName: "AddAlarm" },
            { rawId: "2-2", description: "SubCategory 2-2", iconName: "AddAlert" },
          ],
        },
        {
          rawId: "3",
          sequence: 3,
          iconName: "AirplaneTicket",
          description: "Category 3",
          appMenuList: [
            { rawId: "3-1", description: "SubCategory 3-1", iconName: "Airplay" },
            { rawId: "3-2", description: "SubCategory 3-2", iconName: "Alarm" },
          ],
        },
        {
          rawId: "4",
          sequence: 4,
          iconName: "Anchor",
          description: "Category 4",
          appMenuList: [
            { rawId: "4-1", description: "SubCategory 4-1", iconName: "Analytics" },
            { rawId: "4-2", description: "SubCategory 4-2", iconName: "Android" },
          ],
        },
        {
          rawId: "5",
          sequence: 5,
          iconName: "Apartment",
          description: "Category 5",
          appMenuList: [
            { rawId: "5-1", description: "SubCategory 5-1", iconName: "Announcement" },
            { rawId: "5-2", description: "SubCategory 5-2", iconName: "Api" },
          ],
        },
        {
          rawId: "6",
          sequence: 6,
          iconName: "Apps",
          description: "Category 6",
          appMenuList: [
            { rawId: "6-1", description: "SubCategory 6-1", iconName: "Archive" },
            { rawId: "6-2", description: "SubCategory 6-2", iconName: "ArrowBack" },
          ],
        },
        {
          rawId: "7",
          sequence: 7,
          iconName: "ArtTrack",
          description: "Category 7",
          appMenuList: [
            { rawId: "7-1", description: "SubCategory 7-1", iconName: "ArrowDownward" },
            { rawId: "7-2", description: "SubCategory 7-2", iconName: "ArrowForward" },
          ],
        },
        {
          rawId: "8",
          sequence: 8,
          iconName: "Assessment",
          description: "Category 8",
          appMenuList: [
            { rawId: "8-1", description: "SubCategory 8-1", iconName: "ArrowUpward" },
            { rawId: "8-2", description: "SubCategory 8-2", iconName: "Assignment" },
          ],
        },
        {
          rawId: "9",
          sequence: 9,
          iconName: "Attractions",
          description: "Category 9",
          appMenuList: [
            { rawId: "9-1", description: "SubCategory 9-1", iconName: "Autorenew" },
            { rawId: "9-2", description: "SubCategory 9-2", iconName: "AvTimer" },
          ],
        },
        {
          rawId: "10",
          sequence: 10,
          iconName: "Audiotrack",
          description: "Category 10",
          appMenuList: [
            { rawId: "10-1", description: "SubCategory 10-1", iconName: "Backup" },
            { rawId: "10-2", description: "SubCategory 10-2", iconName: "BatteryAlert" },
          ],
        },
        {
          rawId: "11",
          sequence: 11,
          iconName: "AutoGraph",
          description: "Category 11",
          appMenuList: [
            { rawId: "11-1", description: "SubCategory 11-1", iconName: "BeachAccess" },
            { rawId: "11-2", description: "SubCategory 11-2", iconName: "Bedtime" },
          ],
        },
        {
          rawId: "12",
          sequence: 12,
          iconName: "Badge",
          description: "Category 12",
          appMenuList: [
            { rawId: "12-1", description: "SubCategory 12-1", iconName: "BikeScooter" },
            { rawId: "12-2", description: "SubCategory 12-2", iconName: "Blender" },
          ],
        },
        {
          rawId: "13",
          sequence: 13,
          iconName: "BakeryDining",
          description: "Category 13",
          appMenuList: [
            { rawId: "13-1", description: "SubCategory 13-1", iconName: "Block" },
            { rawId: "13-2", description: "SubCategory 13-2", iconName: "Bluetooth" },
          ],
        },
        {
          rawId: "14",
          sequence: 14,
          iconName: "Ballot",
          description: "Category 14",
          appMenuList: [
            { rawId: "14-1", description: "SubCategory 14-1", iconName: "Book" },
            { rawId: "14-2", description: "SubCategory 14-2", iconName: "Bookmark" },
          ],
        },
        {
          rawId: "15",
          sequence: 15,
          iconName: "BarChart",
          description: "Category 15",
          appMenuList: [
            { rawId: "15-1", description: "SubCategory 15-1", iconName: "Brush" },
            { rawId: "15-2", description: "SubCategory 15-2", iconName: "BugReport" },
          ],
        },
      ]);
    }, 500);
  });
};

