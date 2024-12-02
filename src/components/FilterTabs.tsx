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

interface FilterAttributes {
  category: string;
  options: string[];
}

interface FilterTabsProps {
  filterList?: FilterAttributes[];
  handleFilterChange?: (selectedFilter: string) => void;
  handleTabChange?: (selectedFilter: string, selectedTab: string) => void;
  computeBadges?: (selectedFilter: string, tabs: string[]) => any;
}

const filterListInfo: FilterAttributes[] = [
  { category: "txnStatus", options: ["all", "paid", "upcoming", "failed"] },
  { category: "status", options: ["active", "paused", "cancelled"] },
];

const computeBadgesFn = (selectedFilter: string, tabs: string[]) => {
  return tabs.map((tab, index) => ({ option: tab, badge: index }));
};

const FilterTabs: React.FC<FilterTabsProps> = ({
  filterList = filterListInfo,
  handleFilterChange,
  handleTabChange,
  computeBadges = computeBadgesFn,
}) => {
  const [filter, setFilter] = useState<any>(filterList[0]);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onFilterChange = (filter: string) => {
    setFilter({ category: filter, option: "" });
    if (handleFilterChange) {
      handleFilterChange(filter);
    }
  };

  const onTabChange = (newValue: any) => {
    setFilter({ ...filter, option: newValue });
    if (handleTabChange) {
      handleTabChange(filter, newValue);
    }
  };

  const tabs = useMemo(() => {
    if (filter.category) {
      const options = filterList.find(
        (listItem) => listItem.category === filter.category
      )?.options;
      if (computeBadges && options) {
        return computeBadges(filter.category, options);
      }
      return options;
    }
    return [];
  }, [filter.category]);

  const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  console.log(tabs);

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
        value={filter.option || false}
        onChange={(e, v) => onTabChange(v)}
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
            onClick={() => onTabChange(tab?.option || tab)}
            value={tab?.option || tab}
            label={
              <Badge
                badgeContent={
                  <Typography variant="body1">{tab?.badge}</Typography>
                }
                invisible={Boolean(tab?.badge)}
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
                <Typography variant="body1" sx={{ textTransform: "none" }}>
                  {capitalize(tab?.option || tab)}
                </Typography>
              </Badge>
            }
          />
        ))}
      </Tabs>
    </Stack>
  );
};

export default FilterTabs;
