import { Close } from "@mui/icons-material";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  Box,
  Input,
  OutlinedInput,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectColony, selectTeams } from "../store/reducers/colonySlice";

const Action = ({ isOpen, setIsOpen, teams, team }) => {
  const currency = useSelector(selectColony).nativeTokenSymbol;
  const [force, setForce] = useState(false);
  const [from, setFrom] = useState(team);
  const [assignee, setAssignee] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const outArea = useRef(null);
  // console.log(from)
  useEffect(() => {
    if (outArea.current) {
      outArea.current.addEventListener("click", (e) => setIsOpen(false));
    }
  }, [outArea, setIsOpen]);

  const handleForceChange = () => {
    setForce(!force);
  };

  const handleSubmit = () => {
    setIsOpen(false);
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
          <h2 className="text-xl font-semibold text-slate-200 lg:text-3xl">
            Create motion in Root
          </h2>
        </div>
        <Typography
          variant="h6"
          component="div"
          className="text-teal-500 mt-4 mb-4"
        >
          Payment
        </Typography>
        <FormControl fullWidth className="mb-4">
          <Select
            value={from.teamName}
            onChange={(e) => {
              const curTeam = teams.find((t) => t.teamName === e.target.value);
              setFrom(curTeam);
            }}
            className="bg-[#1F1F23] text-white"
            inputProps={{ style: { color: "white" } }}
            sx={{
              "& .MuiSvgIcon-root": { color: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "teal",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#18181B",
                  color: "white",
                },
              },
            }}
          >
            {teams.map((team, index) => (
              <MenuItem
                sx={{
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
                }}
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
            Available Funds: 59,500 PZA
          </Typography>
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <TextField
            label="Assignee"
            placeholder="Search for a user or paste wallet address"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", borderColor: "white" },
            }}
            className="bg-[#1F1F23]"
          />
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            className="bg-[#1F1F23] text-white"
          />
        </FormControl>
        <FormControl fullWidth className="mb-4">
          {/* <InputLabel className="text-white-500">Currency</InputLabel> */}
          <TextField
            label="Currency"
            value={currency}
            // contentEditable={false}
            aria-readonly={true}
            // disabled
            className="bg-[#1F1F23] text-white"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
          />
        </FormControl>
        <FormControl fullWidth className="mb-4">
          <TextField
            label="Explain why you're making this payment (optional)"
            multiline
            minRows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
            className="bg-[#1F1F23] text-white"
          />
          <Typography
            variant="caption"
            display="block"
            align="right"
            className="text-slate-400"
          >
            {reason.length}/4000
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
            checked={force}
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

export default Action;
