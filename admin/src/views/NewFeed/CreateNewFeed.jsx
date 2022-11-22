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
import { clearErrors, createNewFeed } from "../../actions/newFeedAction";
import { NEW_NEWFEED_RESET } from "../../constants/newFeedConstants";
const CreateNewFeed = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newNewFeed);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thêm bài viết thành công");
      history.push("/admin/newFeed-List");
      dispatch({ type: NEW_NEWFEED_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("content", content);
    myForm.set("category", category);
    myForm.set("image", image);
    dispatch(createNewFeed(myForm));
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tạo bài viết mới</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Tiêu đề</label>
                        <Form.Control
                          // defaultValue={name}
                          value={title}
                          placeholder="Nhập tiêu đề bài viết"
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Danh mục</label>
                        <Form.Control
                          // defaultValue={name}
                          value={category}
                          placeholder="Nhập thể loại bài viết"
                          type="text"
                          onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <Form.Group>
                        <label>Ảnh</label>
                        <Form.Control
                          // defaultValue={name}
                          value={image}
                          placeholder="Nhập tiêu đề bài viết"
                          type="text"
                          onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Nội dung bài viết</label>

                        <CKEditor
                          cols="80"
                          rows="5"
                          editor={ClassicEditor}
                          data={content}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                            console.log({ event, editor, data });
                          }}
                          onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right buttonCreate"
                    type="submit"
                    variant="info"
                    disabled={loading ? true : false}
                  >
                    Tạo
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

export default CreateNewFeed;
