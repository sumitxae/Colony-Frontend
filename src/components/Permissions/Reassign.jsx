import { Close } from "@mui/icons-material";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  Box,
  Select,
  MenuItem,
  Switch,
  InputLabel,
} from "@mui/material";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUser } from "../../store/reducers/authSlice";
import { selectColony } from "../../store/reducers/colonySlice";
import {
  fetchActiveColony,
  getAlldecisions,
} from "../../store/actions/colonyActions";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { useNavigate } from "react-router-dom";

const Reassign = ({ isOpen, setIsOpen, type, setParentOpen }) => {
  const dispatch = useDispatch();
  const colony = useSelector(selectColony);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const permissions = ["Root", "Contributor", ""];
  const colonyMembers = [...colony.watchers, ...colony.contributors].filter(
    (member) => member._id !== user._id
  );

  useMemo(() => {
    if (!isLoggedIn(token)) {
      navigate("/");
      return toast.warn("Session Expired! Please login again.");
    }
  });

  const [form, setForm] = useState({
    force: false,
    assignee: "",
    assignment: "Promote",
    permission: "",
    reason: "",
  });

  const outArea = useRef(null);

  useEffect(() => {
    if (outArea.current) {
      outArea.current.addEventListener("click", () => setIsOpen(false));
    }
  }, [setIsOpen]);

  const handleForceChange = useCallback(() => {
    setForm((prevForm) => ({ ...prevForm, force: !prevForm.force }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleSelectChange = (e, field) => {
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const validateForm = () => {
    for (const key in form) {
      if (key !== "force" && !form[key]) {
        toast.error(`Please fill in ${key} field!`);
        return false;
      }
    }
    return true;
  };

  const checkPermission = (assignment, position, user) => {
    if (assignment === "Promote") {
      if (position === "Root") {
        return !colony.rootUsers.some((rootUser) => rootUser._id === user);
      } else if (position === "Contributor") {
        return !colony.contributors.some(
          (contributor) => contributor._id === user
        );
      }
    } else if (assignment === "Demote") {
      if (position === "Root") {
        return colony.rootUsers.some((rootUser) => rootUser._id === user);
      } else if (position === "Contributor") {
        return colony.contributors.some(
          (contributor) => contributor._id === user
        );
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log(checkPermission(form.assignment, form.permission, form.assignee))
    if (!checkPermission(form.assignment, form.permission, form.assignee))
      return toast.error(
        "User either already has the permission or has already been demoted!"
      );
    setIsOpen(false);
    try {
      const { data } = await axios.post("/colony/create-decision", {
        type,
        forced: form.force,
        colonyId: colony._id,
        creator: user._id,
        reassigned: form.assignee,
        assignment: form.assignment,
        position: form.permission,
        desc: form.reason,
      });
      toast.success("Decision created successfully!");
      dispatch(fetchActiveColony(colony._id));
      dispatch(getAlldecisions(colony._id));
      setParentOpen(false);
    } catch (error) {
      toast.error("There was an error creating the decision!");
    }
    setForm({
      force: false,
      assignment: "Promote",
      assignee: "",
      permission: "",
      reason: "",
    });
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
  const textFieldStyles = {
    InputLabelProps: { style: { color: "white" } },
    InputProps: { style: { color: "white" } },
    className: "bg-[#1F1F23] text-white",
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
            Manage Permission
          </Typography>
        </div>
        <FormControl fullWidth className="my-4">
          <InputLabel sx={inputLabelStyles} id="team-select-label">
            Assignment
          </InputLabel>
          <Select
            labelId="team-select-label"
            value={form.assignment}
            onChange={(e) => handleSelectChange(e, "assignment")}
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
            <MenuItem sx={menuItemStyles} key={"Promote"} value={"Promote"}>
              {"Promote"}
            </MenuItem>
            <MenuItem sx={menuItemStyles} key={"Demote"} value={"Demote"}>
              {"Demote"}
            </MenuItem>
          </Select>
          <Typography
            variant="caption"
            display="block"
            className="text-slate-400"
          ></Typography>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel sx={inputLabelStyles} id="assignee-select-label">
            User
          </InputLabel>
          <Select
            labelId="assignee-select-label"
            value={form.assignee}
            onChange={(e) => handleSelectChange(e, "assignee")}
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
            {colonyMembers.map((member) => (
              <MenuItem sx={menuItemStyles} key={member._id} value={member._id}>
                {member.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel sx={inputLabelStyles} id="assignee-select-label">
            Permission
          </InputLabel>
          <Select
            labelId="assignee-select-label"
            value={form.permission}
            onChange={(e) => handleSelectChange(e, "permission")}
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
            {permissions.map((permission, index) => (
              <MenuItem sx={menuItemStyles} key={index} value={permission}>
                {permission}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <TextField
            label="Explain why you're making this payment (optional)"
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="mb-4 text-slate-200"
        >
          <Typography variant="body2">Force</Typography>
          <Switch
            checked={form.force}
            onChange={handleForceChange}
            className="text-white-500"
          />
        </Box>
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
            className="bg-teal-500 hover:bg-teal-700"
            onClick={handleSubmit}
          >
            Create Motion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reassign;
