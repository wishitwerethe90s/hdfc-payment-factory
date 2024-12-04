import React, { useMemo, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Badge,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Tune } from "@mui/icons-material";

interface TabAttributes {
  label: string;
  component: Element;
}

interface FilterTabsProps {
  tabList?: TabAttributes[];
  onTabChange?: (selectedTab: string) => void;
  // onFilterChange?: (selectedFilter: string) => void;
  // computeBadges?: (selectedFilter: string, tabs: string[]) => any;
}

const renderTab = (tabData: any) => {
  return (
    <Badge
      badgeContent={
        <Typography variant="body1" color="#FFFFFF">
          {tabData.badge}
        </Typography>
      }
      color="primary"
      slotProps={{
        root: { style: { gap: 4, alignItems: "center" } },
        badge: {
          style: {
            position: "static",
            transform: "none",
          },
        },
      }}
    >
      <Typography variant="body1">{tabData.text}</Typography>
    </Badge>
  );
};

const tabListInfo = [
  { label: "all", component: renderTab({ badge: 12, text: "All" }) },
  { label: "paid", component: renderTab({ badge: 9, text: "Paid" }) },
  {
    label: "upcoming",
    component: renderTab({ badge: 3, text: "Upcoming" }),
  },
  {
    label: "failed",
    component: renderTab({ badge: 0, text: "Failed" }),
  },
];

// const filterListInfo: FilterAttributes[] = [
//   { category: "txnStatus", options: ["all", "paid", "upcoming", "failed"] },
//   { category: "status", options: ["active", "paused", "cancelled"] },
// ];

// const computeBadgesFn = (selectedFilter: string, tabs: string[]) => {
//   return tabs.map((tab, index) => ({ option: tab, badge: index }));
// };

const FilterTabs = ({
  tabList = tabListInfo,
  onTabChange,
}: // onFilterChange,
// computeBadges = computeBadgesFn,
FilterTabsProps) => {
  // const [filter, setFilter] = useState<any>(filterList[0]);
  const [tab, setTab] = useState<TabAttributes>(tabList[0]);

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  // const onFilterChange = (filter: string) => {
  //   setFilter({ category: filter, option: "" });
  //   if (handleFilterChange) {
  //     handleFilterChange(filter);
  //   }
  // };

  const handleTabChange = (newValue: any) => {
    setTab(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  // const tabs = useMemo(() => {
  //   if (filter.category) {
  //     const options = filterList.find(
  //       (listItem) => listItem.category === filter.category
  //     )?.options;
  //     if (computeBadges && options) {
  //       return computeBadges(filter.category, options);
  //     }
  //     return options;
  //   }
  //   return [];
  // }, [filter.category]);

  // const capitalize = (value: string) => {
  //   return value.charAt(0).toUpperCase() + value.slice(1);
  // };

  return (
    <Stack
      direction="row"
      sx={{
        // overflowX: "auto",
        // whiteSpace: "nowrap",
        gap: 1,
      }}
    >
      <Button
        variant={isMobile ? "text" : "outlined"}
        sx={{
          gap: 1,
          borderRadius: 4,
          backgroundColor: { xs: "#ededed", sm: "#ffffff" },
        }}
      >
        <Tune fontSize="small" />
        {!isMobile && (
          <Typography variant="body1" sx={{ textTransform: "none" }}>
            Filter
          </Typography>
        )}
      </Button>
      <Tabs
        value={tab}
        onChange={(e, v) => handleTabChange(v)}
        variant="scrollable"
        sx={{
          gap: 3,
          backgroundColor: { xs: "#ededed", sm: "#ffffff" },
          borderRadius: 4,
        }}
      >
        {tabs.map((tab: any, index: number) => (
          <Tab
            key={index}
            // onClick={() => onTabChange(tab?.option || tab)}
            value={tab.label}
            label={tab.component}
          />
        ))}
      </Tabs>
    </Stack>
  );
};

export default FilterTabs;
