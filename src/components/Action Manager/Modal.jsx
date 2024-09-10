import { Close } from "@mui/icons-material";
import { Button, List, ListItemButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Expenditure from "./Expenditure/Expenditure";
import Transfer from "./Funds/Transfer";
import { isRootUser } from "../../utils/isRootUser";
import Mint from "./Funds/Mint";
import {
  selectColony,
  selectContributor,
  selectRootUser,
} from "../../store/reducers/colonySlice";
import { selectUser } from "../../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Reassign from "../Permissions/Reassign";
import SimpleDecision from "../Decision/SimpleDecision";
import CreateTeam from "./Teams/CreateTeam";
import EditTeam from "./Teams/EditTeam";
import { fetchActiveColony } from "../../store/actions/colonyActions";

const Modal = ({ isOpen, setIsOpen, teams, team }) => {
  const outArea = useRef(null);
  const dispatch = useDispatch();
  const [action, setAction] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [mint, setMint] = useState(false);
  const [assignment, setAssignment] = useState(false);
  const [simpleDecision, setSimpleDecision] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);
  const [editTeam, setEditTeam] = useState(false);
  const [Advanced, setAdvanced] = useState(false);
  const colony = useSelector(selectColony);
  const contributor = useSelector(selectContributor);
  const rootUser = useSelector(selectRootUser);
  const user = useSelector(selectUser);

  useEffect(() =>{
    dispatch(fetchActiveColony(colony._id));
  },[isOpen])

  outArea.current?.addEventListener("click", (e) => setIsOpen(false));
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div ref={outArea} className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-[#18181B] w-11/12 rounded-lg overflow-hidden shadow-xl max-w-xl max-h-lvh h-auto lg:w-full relative z-10 p-6">
        <Expenditure
          setParentOpen={setIsOpen}
          setIsOpen={setAction}
          type={"payment"}
          isOpen={action}
          teams={teams}
          team={team ? team : teams[0]}
        />
        <Transfer
          setParentOpen={setIsOpen}
          setIsOpen={setTransfer}
          type={"transfer"}
          isOpen={transfer}
          teams={teams}
          team={team ? team : teams[0]}
        />
        <Mint
          setParentOpen={setIsOpen}
          setIsOpen={setMint}
          type={"mint"}
          isOpen={mint}
        />
        <Reassign
          setParentOpen={setIsOpen}
          isOpen={assignment}
          setIsOpen={setAssignment}
          type={"reassignment"}
        />
        <SimpleDecision 
        setIsOpen={setSimpleDecision} 
        isOpen={simpleDecision}
        setParentOpen={setIsOpen}
        type={"decision"}
         />
         <CreateTeam 
         isOpen={createTeam}
         setIsOpen={setCreateTeam}
         setParentOpen={setIsOpen}
         type={"createTeam"}
         />
         <EditTeam 
         isOpen={editTeam}
         setIsOpen={setEditTeam}
         teams={teams}
         setParentOpen={setIsOpen}
         type={"EditTeam"}
         />
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
        <ListItemButton
            onClick={() => setSimpleDecision(true)}
            className="flex flex-col items-start justify-center border-b-2 border-slate-900 hover:bg-gray-700"
          >
            <span>🤝 Decision</span>
            <p className="text-sm text-gray-200 mt-2">
              Create Decision related to your company.
            </p>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              return contributor || rootUser
              ? setAction(true)
              : toast.error("You are not authorized to create an expenditure")
            }}
            className="flex flex-col items-start justify-center border-b-2 border-slate-900 hover:bg-gray-700"
          >
            <span>💰 Create Expenditure</span>
            <p className="text-sm text-gray-200 mt-2">
              Send funds from this colony to external addresses.
            </p>
          </ListItemButton>
          {rootUser && (
            <ListItemButton
              onClick={() => setTransfer(true)}
              className="flex flex-col items-start justify-center hover:bg-gray-700"
            >
              <p>💼 Transfer Funds</p>
              <p className="text-sm text-gray-200 mt-2">
                Move funds between teams.
              </p>
            </ListItemButton>
          )}
          {rootUser && (
            <ListItemButton
              onClick={() => {
                if (isRootUser(colony, user)) setMint(true);
                else toast.error("You are not authorized to mint tokens");
              }}
              className="flex flex-col items-start justify-center hover:bg-gray-700"
            >
              <p>☘️ Mint Tokens</p>
              <p className="text-sm text-gray-200 mt-2">
                Need more tokens ? cook up a batch here.
              </p>
            </ListItemButton>
          )}
          {rootUser && (
            <ListItemButton
              onClick={() => {
                setAssignment(true);
              }}
              className="flex flex-col items-start justify-center hover:bg-gray-700"
            >
              <p>🔝 Reassign User Permissions</p>
              <p className="text-sm text-gray-200 mt-2">
                Provide or smite permission to different actions.
              </p>
            </ListItemButton>
          )}
          <ListItemButton
            onClick={() => {
              contributor || rootUser
              ? setCreateTeam(true)
              : toast.error("You are not authorized to create a team")
            }}
            className="flex flex-col items-start justify-center hover:bg-gray-700"
          >
            <span className="mr-2">🏗️ Create New Team</span>
            <p className="text-sm text-gray-200 mt-2">
              Domains, departments, circles: teams let you group types of
              activity.
            </p>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              return rootUser || contributor
              ? setEditTeam(true)
              : toast.error("You are not authorized to create a team")
            }}
            className="flex flex-col items-start justify-center hover:bg-gray-700"
          >
            <span className="mr-2">📝 Edit Team</span>
            <p className="text-sm text-gray-200 mt-2">
              Need to repurpose a team? Here's the place to do it.
            </p>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              return !rootUser
                ? toast.error("You are not authorized to create a team")
                : setAdvanced(false);
            }}
            className="flex flex-col items-start justify-center hover:bg-gray-700"
          >
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
