import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/orderAction";
import { getOrderSystem } from "../../actions/orderSysAction";
import { getAdminStatistical } from "../../actions/statisticalAction";
import { formatCurrency } from "../../utils/helper";
import { Link } from "react-router-dom";
import "./stat.css";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
const Statistical = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { statisticals } = useSelector((state) => state.statisticals);
  const { orders } = useSelector((state) => state.allOrders);
  const { error, totalAmountCash } = useSelector(
    (state) => state.allOrderSystem
  );
  useEffect(() => {
    dispatch(getAdminStatistical());
    dispatch(getAllOrders());
    dispatch(getOrderSystem());
  }, [dispatch, alert, history]);
  console.log(statisticals.budget);
  let totalBudget = 0;
  statisticals &&
    statisticals.forEach((item) => {
      totalBudget += item.budget;
    });
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  console.log(totalAmountCash);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="2" sm="2">
            <Card className="card-stats">
              <Card.Body>
                <Col xs="6">
                  <div className="wCard">
                    <p className="card-category">Tổng doanh thu</p>
                    <Card.Title as="h4">
                      {formatCurrency(
                        totalAmountCash + totalAmount * 23000 + "",
                        0,
                        3,
                        ",",
                        "."
                      ) + " đ"}
                    </Card.Title>
                  </div>
                </Col>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="6">
                    <div className="wCard">
                      <p className="card-category">Tiền vốn</p>
                      <Card.Title as="h4">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalBudget)}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="6">
                    <div className="wCard">
                      <p className="card-category">Doanh số bán online</p>
                      <Card.Title as="h4">
                        {formatCurrency(
                          totalAmount * 23000 + "",
                          0,
                          3,
                          ",",
                          "."
                        ) + " đ"}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="7">
                    <div className="wCard">
                      <p className="card-category">Doanh số offline</p>
                      <Card.Title as="h4">
                        {" "}
                        {formatCurrency(totalAmountCash + "", 0, 3, ",", ".") +
                          " đ"}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="7">
                    <div className="wCard">
                      <p className="card-category">Lợi nhuận</p>
                      <Card.Title as="h4">
                        {" "}
                        {totalBudget > 0
                          ? new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              totalAmount * 23000 -
                                totalBudget +
                                totalAmountCash
                            )
                          : new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              totalAmount * 23000 +
                                totalBudget +
                                totalAmountCash
                            )}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div>
        Tiền vốn:{" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(totalBudget)}
      </div>
      <div className="">
        Doanh thu bán online:{" "}
        {formatCurrency(totalAmount * 23000 + "", 0, 3, ",", ".") + " đ"}
      </div>
      <div className="">
        Doanh thu bán offline:{" "}
        {formatCurrency(totalAmountCash + "", 0, 3, ",", ".") + " đ"}
      </div>
      <div className="">
        Tổng doanh số:{" "}
        {formatCurrency(
          totalAmountCash + totalAmount * 23000 + "",
          0,
          3,
          ",",
          "."
        ) + " đ"}
      </div>
      <div className="">
        Lợi nhuận:{" "}
        {totalBudget > 0
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalAmount * 23000 - totalBudget + totalAmountCash)
          : new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalAmount * 23000 + totalBudget + totalAmountCash)}
      </div> */}
    </>
  );
};

export default Statistical;
