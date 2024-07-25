import { Close } from "@mui/icons-material";
import { Button, List, ListItemButton } from "@mui/material";
import { useRef, useState } from "react";
import Action from "./Action";
const Modal = ({ isOpen, setIsOpen, teams, team }) => {
  const outArea = useRef(null);
  const [action, setAction] = useState(false);
  outArea.current?.addEventListener("click", (e) => setIsOpen(false));
  // console.log(teams, team)
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div ref={outArea} className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-[#18181B] w-11/12 rounded-lg overflow-hidden shadow-xl max-w-xl max-h-lvh h-auto lg:w-full relative z-10 p-6">
        <Action setIsOpen={setAction} isOpen={action} teams={teams} team={team ? team : teams[0]} />
        <div className="h-auto w-full flex flex-row-reverse border-b-2 pb-4 border-slate-500 items-center justify-between">
          <Button
            className="text-blue-500 hover:text-teal-700"
            onClick={() => setIsOpen(false)}
          >
            <Close />
          </Button>
          <h2 className="text-xl font-bold text-slate-200 lg:text-3xl">
            What would you like to do?
          </h2>
        </div>
        <List className="space-y-1 text-teal-500 text-lg">
          <ListItemButton onClick={() => setAction(true)} className="flex flex-col items-start justify-center border-b-2 border-slate-900 hover:bg-gray-700">
            <span>💰 Create Expenditure</span>
            <p className="text-sm text-gray-200 mt-2">
              Send funds from this colony to external addresses.
            </p>
          </ListItemButton>
          <ListItemButton className="flex flex-col items-start justify-center hover:bg-gray-700">
            <p>💼 Manage Funds</p>
            <p className="text-sm text-gray-200 mt-2">
              The tools you need to manage your colony's money.
            </p>
          </ListItemButton>
          <ListItemButton className="flex flex-col items-start justify-center hover:bg-gray-700">
            <span className="mr-2">👥 Manage Teams</span>
            <p className="text-sm text-gray-200 mt-2">
              Need more structure? Need to change Link team name?
            </p>
          </ListItemButton>
          <ListItemButton className="flex flex-col items-start justify-center hover:bg-gray-700">
            <span className="mr-2">⚡ Manage Reputation</span>
            <p className="text-sm text-gray-200 mt-2">
              Award the worthy; Smite the unworthy.
            </p>
          </ListItemButton>
          <ListItemButton className="flex flex-col items-start justify-center hover:bg-gray-700">
            <span className="mr-2">🔧 Advanced</span>
            <p className="text-sm text-gray-200 mt-2">
              Need to tinker under the hood? This is the place to do it.
            </p>
          </ListItemButton>
        </List>
      </div>
    </div>
  );
};

export default Modal;
