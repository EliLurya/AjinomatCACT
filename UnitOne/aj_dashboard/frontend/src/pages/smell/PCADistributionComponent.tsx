import React, { useState } from "react";
import "./style.css";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DataLoader from "./dataLoader";
import MenuSmell from "./menuSmell";

const PCADistributionComponent: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({});
  // Callback function called when data is loaded
  const handleDataLoaded = (data: any) => {
    // Define Highcharts configuration options based on the loaded data
    const options = {
      chart: {
        type: "scatter",
        zoomType: "xy",
        height: 1000,
        width: 1500,
        backgroundColor: "#ffffff",
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 70,
        y: 50,
        floating: true,
        borderWidth: 1,
        backgroundColor: "#ffffff",
      },
      colors: [
        "#8c0fe8",
        "#ff5733",
        "#23bd10",
        "#d6e519",
        "#f03312",
        "#f012cb",
        "#1292f0",
        "#12f0cb",
        "#9ca2a1",
      ],
      plotOptions: {
        scatter: {
          marker: {
            radius: 7,
            symbol: "circle",
          },
        },
      },
      title: {
        text: "PCA Distribution",
        style: {
          fontSize: "36px",
        },
      },
      xAxis: {
        title: {
          text: "First principal component",
          style: {
            fontSize: "24px",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: {
          text: "Second principal component",
          style: {
            fontSize: "24px",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      series: [
        {
          name: "Odor : Berry",
          data: data.odor_berry,
        },
        {
          name: "Odor : Alliaceaous",
          data: data.odor_alliaceaous,
        },
        {
          name: "Odor : Coffee",
          data: data.odor_coffee,
        },
        {
          name: "Odor : Citrus",
          data: data.odor_citrus,
        },
        {
          name: "Odor : Fishy",
          data: data.odor_fishy,
        },
        {
          name: "Odor : Jasmine",
          data: data.odor_jasmine,
        },
        {
          name: "Odor : Minty",
          data: data.odor_minty,
        },
        {
          name: "Odor : Earthy",
          data: data.odor_earthy,
        },
        {
          name: "Odor : Smoky",
          data: data.odor_smoky,
        },
      ],
      credits: {
        enabled: false,
      },
      turboThreshold: 100,
      tooltip: {
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          const point = this.point as {
            name: string;
            x: number;
            y: number;
          };
          return (
            "<b>" + point.name + "</b><br>X: " + point.x + "<br>Y: " + point.y
          );
        },
      },
    };

    // Update the chart options state
    setChartOptions(options);
  };
  return (
    <div className="center">
      {/* Menu */}
      <MenuSmell></MenuSmell>
      {/* Highcharts  */}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      {/* Get data from DataLoader */}
      <DataLoader
        onDataLoaded={handleDataLoaded}
        endpointName="pca_distribution"
      />
      <table className="text">
        <tbody>
          <tr>
            <td width="1500">
              <br />
              <br />
              PCA Distribution chart: This image shows how the data is
              distributed among principal components, which is important in
              understanding the relationships between different molecular
              properties and aroma impressions. The scatter plot of the
              principal components 1 vs 2 allows for the visualization of the
              analog data and analog descriptors, which can reveal patterns and
              correlations between different components.
              <br />
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PCADistributionComponent;
