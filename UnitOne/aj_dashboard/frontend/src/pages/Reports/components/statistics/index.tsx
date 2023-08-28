import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TimelineDot from "@mui/lab/TimelineDot";
import { ProjectType, ProtocolType } from "../../../../types/ModelTypes";
import { FormControl, MenuItem } from "@mui/material";
import { Select } from "antd";
import { useState } from "react";
import "./ReportStatisticsStyles.css";
const ReportStatistics = ({
  selectedProtocols,
  duration,
  panelists,
  projects,
  setProject,
}: {
  selectedProject: ProjectType;
  selectedProtocols: string[];
  duration: number;
  panelists: number;
  colors: string[];
  projects: any[];
  setProject: any;
}) => {
  selectedProtocols = selectedProtocols.map(
    (p: any, index: number) => "P" + (index + 1) + ": " + p
  );
  // State to manage selected project ID and name
  const [selectedProjectId, setSelectedProjectId] =
    useState<any>("Select a project");
  const [name, setName] = useState<string>(projects[0]?.name);
  // Function to handle project selection change
  const handleProjectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedProjectId(event); // Update selectedProjectId
    // Find the selected project based on its ID
    const selectedProject = projects.find(
      (project: any) => project.id === event
    );
    if (selectedProject) {
      setProject(selectedProject); // Update selected project
      setName(selectedProject.name); // Update project name
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} className="report-statistic common-legends">
          {/* Project selection UI */}
          <div className="select-container">
            <FormControl variant="outlined" className="form-control">
              <Select value={selectedProjectId} onChange={handleProjectChange}>
                <MenuItem value="" disabled>
                  Select a Project
                </MenuItem>
                {/* Loop through projects to populate the options */}
                {projects.map((project: any) => (
                  <MenuItem
                    className="menu-item"
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display the selected project name */}
            <Typography variant="h4" className="project-title">
              {name || "No project selected"}
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined" className="report-statistic">
          <Typography variant="h5">
            {Math.round(duration / 10) / 100} sec
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Digitization time
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined" className="report-statistic">
          <Typography variant="h5">{panelists}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Panelists
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined" className="report-statistic">
          <Typography variant="h5">{selectedProtocols.length}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Potential comparable items in Database
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ReportStatistics;
