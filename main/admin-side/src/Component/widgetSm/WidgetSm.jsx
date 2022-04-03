import "./widgetSm.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../reqMethod";
import { format } from "timeago.js";
import { Table } from "react-bootstrap";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/user/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);
  
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
        <Table hover responsive className='table align-middle mb-0 px-1 bg-white'>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr>
                    <td>
                        <img src={user.image || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" } alt="" className="widgetSmImg"/>
                    </td>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{format(user.createdAt)}</td>
                </tr>
            ))}
            </tbody>    
        </Table>
        </ul>
    </div>
  );
}