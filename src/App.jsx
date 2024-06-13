import style from "./App.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [arr, setArr] = useState([]);
  const [inp, setInp] = useState("");

  async function request() {
    const response = await axios.get("https://dummyjson.com/todos");
    setArr(response.data.todos);
  }

  function changeInp(e) {
    setInp(e.target.value);
  }

  const clickButton = async () => {
    const res = await axios.post("https://dummyjson.com/todos/add", {
      todo: inp,
      completed: false,
      userId: 5,
    });
    console.log(res);
    setArr([...arr, res.data]);
    setInp("");
  };

  async function deleteEl(el) {
    const response = await axios.delete(`https://dummyjson.com/todos/${el.id}`);
    const newArr = arr.filter((newEl) => newEl.todo != response.data.todo);
    setArr(newArr);
  }

  useEffect(() => {
    request();
    clickButton();
    deleteEl();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.containerBtn}>
        <TextField
          onChange={changeInp}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={inp}
        />
        <Button onClick={clickButton} variant="contained">
          Click me
        </Button>
      </div>
      <div className={style.scroll}>
        {arr.map((el) => (
          <div className={style.divTasks}>
            <p>{el.todo}</p>
            <div>
              <CreateIcon onClick={handleOpen} />
              <DeleteIcon onClick={() => deleteEl(el)} />
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.styleBox}>
          <h1>Update Task</h1>
          <TextField id="standard-basic" label="Name tast" variant="standard" />
          <Button variant="contained">Update Task</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
