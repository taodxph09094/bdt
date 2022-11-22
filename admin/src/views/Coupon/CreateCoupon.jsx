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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_COUPON_RESET } from "../../constants/couponConstants";
import { clearErrors, createCoupon } from "../../actions/couponAction";
const CreateCoupon = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCoupon);
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Tạo mã giảm giá thành công");
      history.push("/admin/coupons");
      dispatch({ type: NEW_COUPON_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("code", code);
    myForm.set("value", value);
    dispatch(createCoupon(myForm));
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tạo mã giảm giá mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>CODE</label>
                        <Form.Control
                          // defaultValue={name}
                          value={code}
                          placeholder="Nhập code..."
                          type="text"
                          onChange={(e) => setCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Giá trị</label>
                        <Form.Control
                          // defaultValue={name}
                          value={value}
                          placeholder="Nhập giá trị của mã"
                          type="text"
                          onChange={(e) => setValue(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right buttonCreate"
                    type="submit"
                    variant="info"
                    disabled={loading ? true : false}
                  >
                    Tạo mã
                  </Button>
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

export default CreateCoupon;
