import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, Collapse, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import React from "react";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {ResponsiveLine} from "@nivo/line";

const Emouth:React.FC<any> = ({data, colors})=> {
    return (
        <Grid item xs={6}>
            <Card className='chart-card'>
                <CardHeader
                    className='chart-card-header'
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }


                    title="Emouth"

                />

                <CardContent  className='chart-card-content'>
                    <ResponsiveLine
                        data={data}
                        margin={{ top: 10, right: 30, bottom: 110, left: 30 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false
                        }}
                        // yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 45,
                        }}
                        // axisLeft={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'count',
                        //     legendOffset: -40,
                        //     legendPosition: 'middle'
                        // }}
                        pointSize={5}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={1}
                        pointBorderColor={{ from: 'serieColor' }}
                        // pointLabelYOffset={-12}
                        useMesh={true}
                        colors={{
                            datum: 'color'
                        }}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: -100,
                                translateY: 110,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 100,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Emouth;