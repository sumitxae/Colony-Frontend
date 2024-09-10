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
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../store/reducers/authSlice";
import { selectColony } from "../../../store/reducers/colonySlice";
import { fetchActiveColony, getAlldecisions } from "../../../store/actions/colonyActions";
import { toast } from "react-toastify";
import axios from "../../../../axios";

const Transfer = ({ isOpen, setIsOpen, teams, team, type, setParentOpen }) => {
  const dispatch = useDispatch();
  const colony = useSelector(selectColony);
  const user = useSelector(selectUser);
  const currency = colony.nativeTokenSymbol;
  const colonyMembers = [...colony.watchers, ...colony.contributors].filter(
    (member) => member._id !== user._id
  );

  const [form, setForm] = useState({
    force: false,
    from: team,
    assignee: team,
    amount: "",
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
    const selected =
      field === "from" || field === "assignee"
        ? teams.find((t) => t.teamName === value)
        : colonyMembers.find((member) => member._id === value)._id;
    setForm((prevForm) => ({ ...prevForm, [field]: selected }));
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

  const validateTeamsandAmount = () => {
    if (form.from._id === form.assignee._id)
      return { stat: false, message: "You can't transfer funds to the same team!" };
    if (form.amount > form.from.funds)
      return { stat: false, message: "You don't have enough funds to transfer!" };
    if (form.amount <= 0)
      return { stat: false, message: "Amount must be greater than 0!" };
    return { stat: true };
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const { stat, message } = validateTeamsandAmount();
    if (!stat) {
      toast.error(message);
      return;
    }

    setIsOpen(false);
    try {
      const { data } = await axios.post("/colony/create-decision", {
        type,
        forced: form.force,
        colonyId: colony._id,
        creator: user._id,
        team: form.from._id,
        reciever: form.assignee._id,
        amount: form.amount,
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

  const isFormValid = validateTeamsandAmount().stat;

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
            Transfer Funds
          </Typography>
        </div>
        <FormControl fullWidth className="my-4">
          <InputLabel sx={inputLabelStyles} id="team-select-label">
            From
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
            {teams.map((team) => (
              <MenuItem
                sx={menuItemStyles}
                key={team._id}
                value={team.teamName}
              >
                {team.teamName}
              </MenuItem>
            ))}
          </Select>
          <Typography
            variant="caption"
            display="block"
            className="text-slate-400"
          >
            Available Funds:{" "}
            {`${form.from._id ? form.from.funds : colony.funds} ${currency}`}
          </Typography>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <InputLabel sx={inputLabelStyles} id="team-select-label">
            To
          </InputLabel>
          <Select
            labelId="team-select-label"
            value={form.assignee.teamName}
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
            {teams.map((team) => (
              <MenuItem
                sx={menuItemStyles}
                key={team._id}
                value={team.teamName}
              >
                {team.teamName}
              </MenuItem>
            ))}
          </Select>
          <Typography
            variant="caption"
            display="block"
            className="text-slate-400"
          >
            Available Funds:{" "}
            {`${
              form.assignee?._id ? form.assignee.funds : colony.funds
            } ${currency}`}
          </Typography>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <TextField
            label="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            {...textFieldStyles}
          />
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <TextField
            label="Currency"
            value={currency}
            aria-readonly={true}
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
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Create Motion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
