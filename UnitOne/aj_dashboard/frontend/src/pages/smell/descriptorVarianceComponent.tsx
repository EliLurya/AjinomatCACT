import React, { useState } from "react";
import "./style.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DataLoader from "./dataLoader";
import MenuSmell from "./menuSmell";

const DescriptorVarianceComponent: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({});
  // Callback function called when data is loaded
  const handleDataLoaded = (data: any) => {
    // Define Highcharts configuration options based on the loaded data
    const options = {
      chart: {
        type: "scatter",
        zoomType: "xy",
        height: 1000, // set the height
        width: 1500, // set the width
        backgroundColor: "#ffffff",
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 70,
        y: 150,
        floating: true,
        borderWidth: 1,
        backgroundColor: "#ffffff",
      },
      colors: ["#8c0fe8"],

      title: {
        text: "Which decriptor shows max variance <br> (aggregation of the 47 descriptors and their weights to create the PCA components)",

        style: {
          fontSize: "36px",
        },
      },
      xAxis: {
        title: {
          text: "",

          fontSize: "24px",
          style: {
            fontSize: "36px",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },

        plotLines: [
          {
            color: "#64a0ca",
            value: 0,
            width: 1,
            zIndex: 4,
          },
        ],
      },
      yAxis: {
        title: {
          text: "",

          style: {
            fontSize: "24px",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
          },
        },

        plotLines: [
          {
            color: "#64a0ca",
            value: 0,
            width: 1,
            zIndex: 4,
          },
        ],
      },
      series: [
        {
          name: "Descriptor",
          data: data,
        },
      ],
      credits: {
        enabled: false,
      },
      plotOptions: {
        scatter: {
          dataLabels: {
            enabled: true,
            format: "{point.name}",
            radius: 7,
            symbol: "circle", // display the name of the data point
          },
        },
      },
      turboThreshold: 100,
      tooltip: {
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          return (
            "<b>" +
            this.point?.name +
            "</b><br>X: " +
            this.x +
            "<br>Y: " +
            this.y
          );
        },
      },
    };
    setChartOptions(options);
  };

  return (
    <div className="center">
      {/* menu */}
      <MenuSmell></MenuSmell>
      {/* Highcharts  */}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      {/* Get data from DataLoader */}
      <DataLoader
        endpointName="descriptor_variance"
        onDataLoaded={handleDataLoaded}
      />
      <table className="text">
        <tbody>
          <tr>
            <td width="1500">
              <br />
              <br />
              Descriptors plot (descriptor-variance.png): This image shows the
              maximum variance among the descriptors, with the North-East
              Quadrant being the most helpful for clustering. By identifying
              which descriptors are most correlated with certain aroma
              impressions, we can gain a better understanding of how to optimize
              the recipe for a vegan croissant and create the best product
              possible.
              <br />
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DescriptorVarianceComponent;
