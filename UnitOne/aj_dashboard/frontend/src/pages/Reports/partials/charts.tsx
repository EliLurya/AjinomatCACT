import { useHttp } from "../../../plugins/axios";
import { addParamsToEndpoint, getEndpoint } from "../../../common/http";
import { ListType, ProjectType, ProtocolType } from "../../../types/ModelTypes";
import { useEffect, useState } from "react";

export const useChartsData = () => {
  const { request } = useHttp();
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [panelists, setPanelists] = useState<number>(0);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [emouthData, setEmouthData] = useState<any[]>([]);
  const [processData, setProcessData] = useState<any[]>([]);
  const [recipeData, setRecipeData] = useState<any[]>([]);
  const [nutritionData, setNutritionData] = useState<any[]>([]);
  const [textureData, setTextureData] = useState<any[]>([]);
  const [textureScale, setTextureScale] = useState<number>(1);

  /**
   * fetch all project and protocols data from backend
   *
   */
  const fetch = async () => {
    let start = new Date().getTime();
    try {
      const projectResponse = await request<ListType<ProjectType>>(
        getEndpoint("all_projects")
      );
      const _projects = projectResponse?.data?.payload?.results;
      setProjects(_projects);
      // Set the first project as the selected project
      setProject(_projects[0]);
    } catch (error) {
      throw error;
    } finally {
      let end = new Date().getTime();
      setDuration(end - start);
    }
  };
  // useEffect hook to call formChartData when 'project' changes
  useEffect(() => {
    project && formChartData(project);
  }, [project]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      console.log("projects", JSON.stringify(projects, null, 2));
      // setProject(projects[0]);
      // formChartData(projects[0]);
    } else {
      console.log("projects is null or empty");
    }
  }, [projects]);
  /**
   * convert project and protocol data to chart data
   *
   */
  const formChartData = (project: ProjectType) => {
    const data: any = [];
    const emouth: any = [];
    const processes: any = [
      {
        process: "Preheat Oven",
        parameter: "Temperature (°C)",
      },
      {
        process: "Baking",
        parameter: "Duration (minutes)",
      },
    ];
    let recipeAnalysis: any = [];
    let nutrition: any = [];
    let texture: any = [];
    let pIndex = 0;

    console.log("PROJECT", project);

    let { protocols }: any = project;
    protocols = protocols.slice(0, 3);
    setSelectedProtocols(protocols.map((p: any) => p.name));
    console.log("protocols", JSON.stringify(protocols, null, 2));

    let _panelists = 0;
    if (project.sensory_panels) {
      _panelists = project.sensory_panels.filter(
        (value, index, array) => array.indexOf(value) === index
      ).length;
    }

    for (let protocol of protocols) {
      const { sensory_panel }: any = protocol.extra;

      if (!sensory_panel) continue;
      /**
       * line graph data
       *
       */
      let emouthData = {
        id: protocol.name,
        color: colors[pIndex],
        data: sensory_panel.map((item: any) => ({
          x: item.variable,
          y: item.value,
        })),
      };
      emouth.unshift(emouthData);

      /**
       * rotational graph data
       *
       */
      for (let sensor of sensory_panel) {
        let index = data.findIndex(
          (data: any) => data["taste"] === sensor.variable
        );

        if (index > -1) {
          data[index][protocol.name] = sensor.value;
        } else {
          data.push({
            taste: sensor.variable,
            [protocol.name]: sensor.value,
          });
        }
      }

      /**
       * recipe analysis data
       *
       */
      const ingredients = protocol.ingredients;
      for (let ing of ingredients) {
        let index = recipeAnalysis.findIndex(
          (data: any) => data["id"] === ing.ingredient_id
        );

        // TODO: check for multiple same ingredient ids for the same protocol

        if (index > -1) {
          recipeAnalysis[index]["p" + (pIndex + 1)] = ing.quantity;
          recipeAnalysis[index].total =
            recipeAnalysis[index].total + ing.quantity;
        } else {
          recipeAnalysis.push({
            name: ing.name,
            id: ing.ingredient_id,
            ["p" + (pIndex + 1)]: ing.quantity,
            total: ing.quantity,
          });
        }
      }

      /**
       * processes data
       *
       */
      const _processes = protocol.processes;
      for (let process of _processes) {
        let index =
          process.name === "Preheat Oven"
            ? 0
            : process.name === "Baking"
            ? 1
            : -1;

        if (index < 0) continue;
        if (process.name === "Preheat Oven") {
          processes[0]["p" + (pIndex + 1)] =
            process.arguments.temperature.value;
        }

        if (process.name === "Baking") {
          processes[1]["p" + (pIndex + 1)] = process.arguments.duration.value;
        }
      }

      if (!_processes.some((p: any) => p.name === "Baking")) {
        processes[1]["p" + (pIndex + 1)] = "N/A";
      }

      if (!_processes.some((p: any) => p.name === "Preheat Oven")) {
        processes[0]["p" + (pIndex + 1)] = "N/A";
      }

      pIndex++;

      /**
       * nutrition data
       *
       */
      let { nutritional_info } = protocol.extra;

      if (!!nutritional_info) {
        let _nutrition: any = {
          name: protocol.name,
        };
        for (let nutr of nutritional_info) {
          switch (nutr.variable) {
            case "Energy kcal":
              _nutrition.calories = nutr.quantity;
              break;
            case "Fat":
              _nutrition.fat = nutr.quantity;
              break;
            case "Carbohydrates":
              _nutrition.carbs = nutr.quantity;
              break;
            case "Protein":
              _nutrition.protein = nutr.quantity;
              break;
          }
        }

        nutrition.push(_nutrition);
      }

      /**
       * texture data
       *
       */
      let { texture_metrics } = protocol.extra;
      let _texture: any = {
        protocol: protocol.name,
        HardnessColor: "rgb(42, 159, 222)",
        FracturabilityColor: "rgb(26, 214, 176)",
      };

      texture_metrics.forEach((item: any) => {
        _texture[item.variable] =
          item.variable === "Fracturability" ? item.quantity : item.quantity;
      });
      texture.push(_texture);
    }

    let maxHardness = Math.max(...texture.map((item: any) => item.Hardness));
    let maxFracturability =
      Math.ceil(
        Math.max(...texture.map((item: any) => item.Fracturability)) / 5
      ) * 5;
    let _scale = maxHardness / maxFracturability;

    let _texture = texture.map((item: any) => ({
      ...item,
      Fracturability: item.Fracturability * _scale,
    }));

    let _recipeData = recipeAnalysis
      .sort((acc: any, cur: any) => cur.total - acc.total)
      .slice(0, 5)
      .map((item: any) => ({
        id: item.name,
        markers: [0],
        measures: [0],
        ranges: [
          item.p1,
          item.p1 + item.p2,
          item.p1 + item.p2 + item.p3,
          0,
          item.total,
        ],
      }));

    setChartData(data);
    setEmouthData(emouth);
    setPanelists(_panelists);
    setProcessData(processes);
    setRecipeData(_recipeData);
    setNutritionData(nutrition);
    setTextureData(_texture);
    setTextureScale(_scale);
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    projects,
    setProject,
    project,
    selectedProtocols,
    duration,
    panelists,
    chartData,
    emouthData,
    processData,
    recipeData,
    nutritionData,
    textureData,
    textureScale,
  };
};

const colors = ["#FF6F67", "#FFAF68", "#66B2FE"];
