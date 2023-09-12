import React, { useEffect, useState } from "react";
import "./style.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SubmitClusterByPCAComponent from "./submitClusterByPCAComponent";
import { useLocation } from "react-router-dom";
import MenuSmell from "./menuSmell";

const UserClusterByPCAComponent: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({});
  const location = useLocation();
  const data = location.state;

  const [allSegment7, setAllSegment7] = useState<any[]>(
    JSON.parse(data?.segment_7)
  ); // Store segment_7 data

  useEffect(() => {
    // Append the new segment_7 data to allSegment7
    if (JSON.parse(data?.segment_7)) {
      const newData = JSON.parse(data.segment_7);

      // Check if each item in newData already exists in allSegment7
      const filteredData = newData.filter(
        (item: { name: number; odor: string; x: number; y: any }) => {
          return !allSegment7.some((existingItem) => {
            // Customize this comparison based on your item structure
            return (
              item.name === existingItem.name &&
              item.odor === existingItem.odor &&
              item.x === existingItem.x &&
              item.y === existingItem.y
            );
          });
        }
      );

      // Combine the unique items with the existing allSegment7
      const mergedArray = [...allSegment7, ...filteredData];

      setAllSegment7(mergedArray);
    }
  }, [data]);

  useEffect(() => {
    console.log(allSegment7);

    // Call handleDataLoaded with both segments_json and accumulated segment_7
    handleDataLoaded(JSON.parse(data?.segments_json), allSegment7);
  }, [allSegment7, data]);

  const handleDataLoaded = (data: any, segment_7: any) => {
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
        "#blue",
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
        text: "Clusters by PCA components",

        style: {
          fontSize: "36px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        },
      },
      xAxis: {
        title: {
          text: "WPath : Wiener index",

          style: {
            fontSize: "24px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          },
        },
      },
      yAxis: {
        title: {
          text: "MW : Molecule Weight, in Daltons",

          style: {
            fontSize: "24px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          },
        },
        labels: {
          style: {
            fontSize: "12px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          },
        },
      },
      series: [
        {
          name: "K-means PCA : 0",
          data: data[0],
        },
        {
          name: "K-means PCA : 1",
          data: data[1],
        },
        {
          name: "K-means PCA : 2",
          data: data[2],
        },
        {
          name: "K-means PCA : 3",
          data: data[3],
        },
        {
          name: "K-means PCA : 4",
          data: data[4],
        },
        {
          name: "K-means PCA : 5",
          data: data[5],
        },
        {
          name: "Added by user: 6",
          data: segment_7,
        },
      ],
      credits: {
        enabled: false,
      },
      turboThreshold: 100,
      tooltip: {
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          const pointWithOdor = this.point as unknown as { odor: string }; // Type assertion
          return (
            "<b> odor : " +
            pointWithOdor.odor +
            "</b><br><b>" +
            this.point.name +
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
      {/* Menu */}
      <MenuSmell></MenuSmell>
      {/* Highcharts  */}
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <table className="text">
        <tbody>
          <tr>
            <td width="1500">
              <br />
              <br />
              <b>Wiener index</b>: In chemical graph theory, the Wiener index
              (also Wiener number) introduced by Harry Wiener, is a topological
              index of a molecule, defined as the sum of the lengths of the
              shortest paths between all pairs of vertices in the chemical graph
              representing the non-hydrogen atoms in the molecule.
              <br />
              <br />
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <div className="row">
        Correlation/Prediction plot: This image shows the results of k-means
        clustering for predicting smell impression based on the chemical
        composition of the ingredients. This correlation is important in
        understanding the relationship between the molecular properties of
        different ingredients and the aroma impressions they create in the
        finished product. By using this information to design and develop new
        products, we can create better and more effective products that meet the
        needs and desires of consumers.
      </div>

      <br />

      <div className="row">
        {/* Add your input and form here */}
        <b>CACT</b> (Chemo Aroma Clustering Tool): Enter the SMILE value in the
        form
        <br />
        <b>Example:</b> CC(C)C1=CC2=C(CC1)C3(CCCC(C3CC2)(C)C=O)C
      </div>

      <br />
      {/* Input field and button */}
      <SubmitClusterByPCAComponent />
      <br />
      <div className="row">
        The use of PCA K-Means clustering can further refine our analysis of
        smell impressions. In cluster-by-pca.png, we can see that smell groups
        were clustered closely, which provides proof that it is possible to
        predict similar kinds of flavor molecules with the same smell
        impressions. By identifying which molecular descriptors are most
        correlated with certain aroma impressions, we can optimize the recipe
        for a vegan croissant, for example, and create the best possible
        product.
      </div>
    </div>
  );
};

export default UserClusterByPCAComponent;
