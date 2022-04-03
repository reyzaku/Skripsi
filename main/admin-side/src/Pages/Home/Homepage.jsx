import React, { useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import WidgetLg from '../../Component/widgetLg/WidgetLg'
import WidgetSm from '../../Component/widgetSm/WidgetSm'
import Chart from '../../Component/chart/Chart'
import { GlobalContainer } from '../../PreStyled'
import { userRequest } from '../../reqMethod'

const Homepage = () => {
    const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

    useEffect(() => {
        const getStats = async () => {
        try {
            const res = await userRequest.get("/user/stats");
            res.data.map((item) =>
                setUserStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], "Active User": item.total },
            ]))} catch {}
        };
        getStats();
        console.log(userStats)
    }, [MONTHS]);
    return (
        <GlobalContainer>
            <Chart 
                data={userStats}
                title="User Analytics"
                grid
                dataKey="Active User"
            />
            <Row>
                <Col>
                    <WidgetSm />
                </Col>
                <Col>
                    <WidgetLg />
                </Col>
            </Row>
        </GlobalContainer>
    )
}

export default Homepage