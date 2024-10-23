import {Box} from "@mui/material";
import Button from '@mui/material/Button'

const Items=["home", "Spain", "England", "Germany", "France", "Italy", "International"];

const Menu=()=>{
    return(
       <Box sx={{mt:5,ml:50,mb:5}}>
           {Items.map((item,index)=>(
               <Button sx={{mr:2}} variant={'contained'}>
                   {item}
               </Button>
           ))}
       </Box>
    )
}
export  default Menu;