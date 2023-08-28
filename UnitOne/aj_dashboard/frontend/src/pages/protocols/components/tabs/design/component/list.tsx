import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ClassNames } from "@emotion/react";
import ViewItme from "./view-item";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

const ListSensory: React.FC<any> = ({
  items,
  name,
  newTitle,
  orgTitle,
  sensory,
  handleSensory,
}) => {
  const [copy, setCopy] = useState<boolean>(true);
  const [orgSensory, setOrgSensory] = useState<Array<any>>([]);
  const handelIncresing = (value: number, name: string, id: number) => {
    value <= 10 && handleSensory(value, name, id);
  };
  const handelDecresing = (value: number, name: string, id: number) => {
    value >= 0 && handleSensory(value, name, id);
  };

  useEffect(() => {
    copy && setOrgSensory([...sensory]);
    setCopy(false);
  }, [sensory]);

  return (
    <>
      <ListItem className="justify-center">{name}</ListItem>

      <List sx={{ maxHeight: 350, position: "relative", overflow: "auto" }}>
        <Grid container spacing={2} m={1}>
          <Grid xs={12}>
            <Box>
              <Grid container>
                <Grid xs={8}></Grid>
                <Grid xs={4} className="design-new-title">
                  {newTitle}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* <Grid xs={2} className="design-org-title">
                         {orgTitle}
                    </Grid> */}
        </Grid>
        {items.map((item: any) => {
          let sValue = sensory?.length
            ? sensory?.find((s: any) => s?.variable == item.name)
            : {};
          let orgValue = orgSensory?.length
            ? orgSensory?.find((s: any) => s?.variable == item.name)
            : {};
          //console.log("sValue",sValue)
          return (
            <Grid container spacing={2} m={1}>
              <Grid
                xs={12}
                className="design-taste-items"
                style={{
                  background: `linear-gradient(90deg, rgba(49, 114, 220, 0.1) ${
                    sValue?.value * 10
                  }%, #FFF 0%)`,
                }}
              >
                <Box className="design-taste-bg">
                  {/* Background of arrow  */}
                  <Grid container>
                    <Grid
                      xs={1}
                      className="design-arrow-container-left design-arrow"
                    >
                      {/* Arrow left */}
                      <ArrowLeftOutlinedIcon
                        onClick={() =>
                          handelDecresing(
                            sValue?.value - 0.5,
                            item.name,
                            sValue?.id
                          )
                        }
                        className="design-arrow-left"
                      />
                    </Grid>
                    <Grid xs={7} className="design-taste-name">
                      {item.name}
                    </Grid>
                    <Grid xs={3} className="design-taste-new-value">
                      {sValue?.value}
                    </Grid>
                    {/* Background of arrow  */}
                    <Grid
                      xs={1}
                      className="design-arrow-container-right design-arrow"
                    >
                      {/* Arrow right */}
                      <ArrowRightOutlinedIcon
                        onClick={() =>
                          handelIncresing(
                            sValue?.value + 0.5,
                            item.name,
                            sValue?.id
                          )
                        }
                        className="design-arrow-right"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* <Grid xs={2}>
                                {orgValue.value}
                            </Grid> */}
            </Grid>
          );
        })}
      </List>
    </>
  );
};

export default ListSensory;
