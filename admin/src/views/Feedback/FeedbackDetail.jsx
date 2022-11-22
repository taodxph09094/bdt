import React, { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
// react-bootstrap components

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getFeedbackDetails } from "../../actions/feedbackAction";
const FeedbackDetail = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { feedback, error } = useSelector((state) => state.feedbackDetails);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const feedbackId = match.params.id;
  useEffect(() => {
    if (feedback && feedback._id !== feedbackId) {
      dispatch(getFeedbackDetails(feedbackId));
    } else {
      setName(feedback.name);
      setEmail(feedback.email);
      setContent(feedback.content);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, history, feedbackId, feedback]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Chi tiết bài góp ý</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form encType="multipart/form-data">
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Tên người gửi</label>
                        <p>{name}</p>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Email</label>
                        <p> {email}</p>
                        {/* <Form.Control
                          //   defaultValue={email}
                          value=""
                          placeholder="Nhập thể loại bài viết"
                          type="text"
                          //   onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Nội dung</label>
                        <p>{content}</p>
                        {/* <Form.Control
                          // defaultValue={name}
                          value=""
                          placeholder="Nhập tiêu đề bài viết"
                          type="text"
                          //   onChange={(e) => setImage(e.target.value)}
                        ></Form.Control> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FeedbackDetail;
