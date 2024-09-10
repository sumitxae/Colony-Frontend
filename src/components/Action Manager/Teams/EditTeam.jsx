import { Close, CloseFullscreen, Description } from "@mui/icons-material";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../store/reducers/authSlice";
import { selectColony, selectTeams } from "../../../store/reducers/colonySlice";
import {
  fetchActiveColony,
  getAlldecisions,
} from "../../../store/actions/colonyActions";
import { toast } from "react-toastify";
import axios from "../../../../axios";

const EditTeam = ({ isOpen, setIsOpen, teams, setParentOpen }) => {
  const dispatch = useDispatch();
  const colony = useSelector(selectColony);
  const user = useSelector(selectUser);

  const inputLabelStyles = {
    color: "white",
    "&.Mui-focused": { color: "white" },
  };
  const selectStyles = {
    "& .MuiSvgIcon-root": { color: "white" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "teal",
    },
  };
  const menuItemStyles = {
    bgcolor: "#18181B",
    "&:hover": {
      bgcolor: "#1F1F23",
    },
    "&.Mui-selected": {
      bgcolor: "#1F1F23",
    },
    "&.Mui-selected:hover": {
      bgcolor: "#1F1F23",
    },
  };

  const [form, setForm] = useState({
    from: teams[1],
    title: "",
    reason: "",
  });

  const outArea = useRef(null);
  // console.log(form.from)

  useEffect(() => {
    if (outArea.current) {
      outArea.current.addEventListener("click", () => setIsOpen(false));
    }
  }, [setIsOpen]);

  const handleSelectChange = (e, field) => {
    const value = e.target.value;
    const selected =
      field === "from"
        ? teams.find((t) => t.teamName === value)
        : e.target.value;
    setForm((prevForm) => ({ ...prevForm, [field]: selected }));
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const validateForm = () => {
    for (const key in form) {
      if (key !== "force" && !form[key]) {
        toast.error(`Please fill in ${key} field!`);
        return false;
      }
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsOpen(false);
    // try {
      const { data } = await axios.post(`/colony/edit/team/${form.from._id}`, {
        teamId: form.from._id,
        teamName: form.title,
        colony: colony._id,
        description: form.reason,
      });
      toast.success("Decision created successfully!");
      setParentOpen(false);
      // window.location.reload();
    // } catch (error) {
    //   toast.error("There was an error creating the decision!");
    // }
    setForm({
      from: teams[1],
      title: "",
      reason: "", 
    });
  };

  const textFieldStyles = {
    InputLabelProps: { style: { color: "white" } },
    InputProps: { style: { color: "white" } },
    className: "bg-[#1F1F23] text-white",
  };

  const deleteTeamHandler = async () => {
    const flag = window.confirm("Are you sure you want to delete this team?");
    console.log(flag)
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={outArea}
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="bg-[#18181B] w-11/12 rounded-lg overflow-hidden shadow-xl max-w-xl h-auto lg:w-full relative z-10 p-6">
        <div className="h-auto w-full flex flex-row-reverse border-b-2 pb-4 border-slate-500 items-center justify-between">
          <Button
            className="text-blue-500 hover:text-teal-700"
            onClick={() => setIsOpen(false)}
          >
            <Close />
          </Button>
          <Typography
            variant="h6"
            className="text-xl font-semibold text-slate-200 lg:text-3xl"
          >
            Edit Team
          </Typography>
        </div>
        <FormControl fullWidth className="my-4">
          <InputLabel sx={inputLabelStyles} id="team-select-label">
            Select Team
          </InputLabel>
          <Select
            labelId="team-select-label"
            value={form.from.teamName}
            onChange={(e) => handleSelectChange(e, "from")}
            sx={selectStyles}
            className="bg-[#1F1F23] text-white"
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#18181B",
                  color: "white",
                },
              },
            }}
          >
            {teams.map(
              (team, index) =>
                index > 0 && (
                  <MenuItem
                    sx={menuItemStyles}
                    key={team._id}
                    value={team.teamName}
                  >
                    {team.teamName}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth className="my-4">
          <TextField
            label="Team Name"
            name="title"
            value={form.title}
            onChange={handleChange}
            {...textFieldStyles}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Team Description"
            multiline
            minRows={3}
            name="reason"
            value={form.reason}
            onChange={handleChange}
            {...textFieldStyles}
          />
          <Typography
            variant="caption"
            display="block"
            align="right"
            className="text-slate-400"
          >
            {form.reason.length}/4000
          </Typography>
        </FormControl>
        {form.from.teamName !== "Root" ?
        <>
          <div className="w-full mb-4 flex items-center justify-center" >OR</div>
          <button onClick={deleteTeamHandler} className="w-full py-2 px-5 flex items-center justify-center bg-red-700 mb-4 rounded-xl">Delete Team</button>
        </> : null
        }
        <div className="flex justify-between">
          <Button
            className="text-slate-200 hover:text-teal-400"
            onClick={() => setIsOpen(false)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="bg-teal-500 disabled:text-[#fff9] disabled:bg-teal-900 hover:bg-teal-700"
            onClick={handleSubmit}
          >
            Edit Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
