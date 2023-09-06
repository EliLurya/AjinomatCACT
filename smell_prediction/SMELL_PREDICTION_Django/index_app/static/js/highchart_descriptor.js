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
    y: 150,
    floating: true,
    borderWidth: 1,
    backgroundColor: "#ffffff",
  },
  colors: ["#8c0fe8"],

  plotOptions: {
    scatter: {
      marker: {
        radius: 7,
        symbol: "circle",
      },
    },
  },

  title: {
    text: "Which decriptor shows max variance <br> (aggregation of the 47 descriptors and their weights to create the PCA components)",

    style: {
      fontSize: "36px",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
  },
  xAxis: {
    title: {
      text: "",

      fontSize: "24px",
      style: {
        fontSize: "36px",
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
      data: descriptor_variance,
    },
  ],
  credits: {
    enabled: false,
  },
  plotOptions: {
    scatter: {
      dataLabels: {
        enabled: true,
        format: "{point.name}", // display the name of the data point
      },
    },
  },
  turboThreshold: 100,
  tooltip: {
    formatter: function () {
      return (
        "<b>" + this.point.name + "</b><br>X: " + this.x + "<br>Y: " + this.y
      );
    },
  },
});
