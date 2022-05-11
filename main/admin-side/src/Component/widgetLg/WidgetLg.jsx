import { useEffect, useState } from "react";
import { userRequest } from "../../reqMethod";
import "./widgetLg.css";
import { format } from "timeago.js"
import { convertRupiah } from "../../utils/ConvertRupiah";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

export default function WidgetLg() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("/order/?new=true");
                setOrders(res.data);
            } catch { }
        };
        getOrders();
    }, []);
    const ButtonX = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Invoice</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                    <th></th>
                </tr>
                {orders.map((order) => (
                    <tr className="widgetLgTr" key={order._id}>
                        <td className="widgetLgUser">
                            <span className="widgetLgName">{order.invoiceId}</span>
                        </td>
                        <td className="widgetLgDate">{format(order.createdAt)}</td>
                        <td className="widgetLgAmount">{convertRupiah(order.gross_amount)}</td>
                        <td className="widgetLgStatus">
                            <ButtonX type={order.status} />
                        </td>
                        <td className="widgetLgStatus">
                            <Button variant="dark" as={Link} to={`/order/${order.invoiceId}`}>Cek Pesanan</Button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
