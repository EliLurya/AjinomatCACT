console.log("segment_1");

console.log(typeof segment_1);
// Set up the chart
Highcharts.chart("container", {
  chart: {
    type: "scatter",
    zoomType: "xy",
    height: 1000, // set the height
    width: 1000, // set the width
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
  colors: ["#8c0fe8", "#ff5733", "#23bd10", "#d6e519", "#f03312", "#f012cb"],

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
      data: segment_1,
    },
    {
      name: "K-means PCA : 1",
      data: segment_2,
    },
    {
      name: "K-means PCA : 2",
      data: segment_3,
    },
    {
      name: "K-means PCA : 3",
      data: segment_4,
    },
    {
      name: "K-means PCA : 4",
      data: segment_5,
    },
    {
      name: "K-means PCA : 5",
      data: segment_6,
    },
  ],
  credits: {
    enabled: false,
  },
  turboThreshold: 100,
  tooltip: {
    formatter: function () {
      return (
        "<b> odor : " +
        this.point.odor +
        "</b><br><b>" +
        this.point.name +
        "</b><br>X: " +
        this.x +
        "<br>Y: " +
        this.y
      );
    },
  },
});
