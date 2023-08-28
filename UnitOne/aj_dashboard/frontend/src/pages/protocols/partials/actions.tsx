import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const actions = (navigator:any , onDuplicate : any, onDelete: any )=> [
    {
        label: 'Duplicate',
        extra: {
            // className: 'primary',
            onClick : ()=>  onDuplicate()
        }
    },
    {
        label: 'Create new',
        extra: {
            className: 'primary',
            onClick : ()=>{
                navigator("/protocols/create");
            }
        }
    },
    {
        label: 'Delete',
        extra: {
            onClick : ()=>  onDelete()
        }
    },
    // {
    //     label: 'Compare',
    //     extra: {
    //
    //         onClick : ()=>{
    //             alert('Compare')
    //         }
    //     }
    // },
    {
        component: <IconButton aria-label="upload picture" component="label" key={'stack-list-actions'}>
            <MoreVertIcon/>
        </IconButton> 
    },

] as Array<StackActionsType>