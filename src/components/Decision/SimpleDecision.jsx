import { Close } from "@mui/icons-material";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/reducers/authSlice";
import { selectColony } from "../../store/reducers/colonySlice";
import { fetchActiveColony, getAlldecisions } from "../../store/actions/colonyActions";
import { toast } from "react-toastify";
import axios from "../../../axios";

const SimpleDecision = ({ isOpen, setIsOpen, teams, team, type, setParentOpen }) => {
  const dispatch = useDispatch();
  const colony = useSelector(selectColony);
  const user = useSelector(selectUser);

  const [form, setForm] = useState({
    force: false,
    title: "",
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
    try {
      const { data } = await axios.post("/colony/create-decision", {
        type,
        forced: form.force,
        title: form.title,
        colonyId: colony._id,
        creator: user._id,
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
      from: team,
      assignee: team,
      amount: "",
      reason: "",
    });
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
            Create Decision
          </Typography>
        </div>
        <FormControl fullWidth className="my-4">
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            {...textFieldStyles}
          />
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
            className="bg-teal-500 disabled:text-[#fff9] disabled:bg-teal-900 hover:bg-teal-700"
            onClick={handleSubmit}
          >
            Create Decision
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDecision;
