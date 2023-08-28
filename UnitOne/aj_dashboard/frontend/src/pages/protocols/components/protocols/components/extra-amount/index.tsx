import * as React from 'react';
import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { addParamsToEndpoint, getEndpoint } from "../../../../../../common/http";
import { http, useHttp } from "../../../../../../plugins/axios";
import { ListType, ProjectType, ProtocolType } from "../../../../../../types/ModelTypes";
import { useAlert } from "../../../../../../common/hooks/alert";
import { AlertTypes } from "../../../../../../types/Enums";
import { useNavigator } from "../../../../../../common/routes";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


/**
    * View  protocal Amount popup Modal
    * @author Bilal
    */

const BasicModal: React.FC<any> = ({ open, setOpen, protocol_id, sensory, setSensory, afterSave }) => {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sensorsList, setSensorsList] = useState<any>([]);
  const { request } = useHttp();
  const defaultValue=5

  /**
     * Save protocal Amount
     * @author Bilal
     */

  const onSave = () => {
    let _form = {
      protocol: protocol_id,
      sugar: sensory?.sugar,
      salt: sensory?.salt,
      spicy: sensory?.spicy,
    }
    console.log('form', _form, JSON.stringify(_form))
    // change the endpoint according to the isEdit flag
    const endpoint = addParamsToEndpoint(getEndpoint('amount_protocol'), {
      protocol_id,
      id: protocol_id
    })

    request<ProtocolType>(endpoint, _form).then((response) => {
      const protocol = response?.data?.payload

      // handleClose()
      // window.location.reload();
      afterSave(response);



      // navigator('/protocols/'+protocol_id);
    })


  }
  useEffect(() => {
    http<ListType<ProjectType>>(getEndpoint('all_sensors'), { params: { page_size: 12 } }).then(response => {
      setSensorsList(response.data.payload?.results)
    })

  }, [])

  const handleSensory = (event: Event, newValue: number | number[], key: string,id : number) => {
      setSensory(sensory.map((el:any) => (el.id === id ? {...el, ["value"]:newValue} : el)))
  };

  useEffect(() => {
     console.log(sensory)

  }, [sensory])


  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {sensorsList?.map((sensor:any) => {
            let sValue= sensory?.length ? sensory?.find((s:any)=> s?.variable == sensor.name) : {}
             return (
              <Box key={sensor.id}>
                <Typography id="modal-modal-title" >
                  {sensor.name}
                </Typography>
                <Slider track={false} color={sensory[''+sensor.name] < 5 ? "secondary" : "primary"} step={.5} min={0} max={10} onChange={(e: Event, v: number | number[]) => handleSensory(e, v, sensor.name,sValue?.id)} value={sValue?.value } aria-label="Default" valueLabelDisplay="on" />
              </Box>
            )
          })}

         {/*  <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Salt
            </Typography>
            <Slider track={false} min={-50} max={50} color={sensory?.salt < 0 ? "secondary" : "primary"} onChange={(e, v) => handleSensory(e, v, "salt")} defaultValue={sensory?.salt} aria-label="Default" valueLabelDisplay="on" />
          </Box>
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Spicy
            </Typography>
            <Slider track={false} min={-50} max={50} color={sensory?.spicy < 0 ? "secondary" : "primary"} onChange={(e, v) => handleSensory(e, v, "spicy")} defaultValue={sensory?.spicy} aria-label="Default" valueLabelDisplay="on" />
          </Box> */}
          <Button onClick={() => afterSave()} variant="contained">Save</Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => handleClose()}  >Close</Button>
        </Box>

      </Modal>
    </div>
  );
}

export default BasicModal;