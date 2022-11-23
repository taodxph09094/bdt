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
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { formatCurrency } from "../../utils/helper";
import { getBrand } from "../../actions/brandAction";
import {
  createStatistical,
  getAdminStatistical,
} from "../../actions/statisticalAction";
import { NEW_STATISTICAL_RESET } from "../../constants/statisticalConstants";
const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const test = -20000;
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { statisticals } = useSelector((state) => state.statisticals);
  const { loading2 } = useSelector((state) => state.newStatistical);
  const { brand } = useSelector((state) => state.allBrand);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [company, setCompany] = useState("");
  const [productLine, setProductLine] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [category, setCategory] = useState("");
  const [importPrice, setImportPrice] = useState(0);
  const [Stock, setStock] = useState(1);
  const [budget, setBudget] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(getAdminStatistical());
    dispatch(getBrand());
  }, [dispatch, alert, history]);
  let totalAmount = 0;
  statisticals &&
    statisticals.forEach((item) => {
      totalAmount += item.budget;
    });
  useEffect(() => {
    setBudget(totalAmount - importPrice * Stock);
  });
  const categories = [
    "Apple",
    "Samsung",
    "Xiaomi Redmi",
    "Realmi",
    "Huawei",
    "OPPO",
    "Vivo",
    "Nokia",
    "ASUS",
    "Sony",
    "OnePlus",
  ];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thêm sản phẩm thành công");
      history.push("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
      dispatch({ type: NEW_STATISTICAL_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    myForm.set("productLine", productLine);
    myForm.set("supplier", supplier);
    myForm.set("promotion", promotion);
    myForm.set("brand", company);
    myForm.set("importPrice", importPrice);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    let bug = 0;
    dispatch(createProduct(myForm));
    const statisForm = new FormData();
    statisForm.set("budget", bug - importPrice * Stock);
    dispatch(createStatistical(statisForm));
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Thêm sản phẩm mới {budget}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="6 ">
                      <Form.Group>
                        <label>Tên sản phẩm</label>
                        <Form.Control
                          // defaultValue={name}
                          value={name}
                          placeholder="Nhập tên sản phẩm"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="2">
                      <Form.Group>
                        <label>Khuyến mãi ( % )</label>
                        <Form.Control
                          // defaultValue={name}
                          value={promotion}
                          placeholder="Nhập % khuyến mãi"
                          type="text"
                          onChange={(e) => setPromotion(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Giá nhập sản phẩm</label>
                        <Form.Control
                          // defaultValue={name}
                          value={importPrice}
                          placeholder="Giá nhập sản phẩm"
                          type="text"
                          onChange={(e) => setImportPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Giá tiền</label>
                        <Form.Control
                          // value={price}
                          placeholder="Giá tiền"
                          required
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Số lượng</label>
                        <Form.Control
                          // value={Stock}
                          placeholder="Số lượng"
                          type="number"
                          required
                          onChange={(e) => setStock(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Hãng</label>
                        <Form.Control
                          value={company}
                          placeholder="Nhập hãng"
                          type="text"
                          onChange={(e) => setCompany(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <Form.Select
                          className="select-category"
                          aria-label="Default select example"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Chọn thể loại</option>
                          {categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <Form.Select
                          className="select-category"
                          aria-label="Default select example"
                          onChange={(e) => setSupplier(e.target.value)}
                        >
                          <option value="">Chọn nhà cung cấp</option>
                          {brand?.map((item) => (
                            <option key={item} value={item}>
                              {item?.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Dòng sản phẩm</label>
                        <Form.Control
                          value={productLine}
                          placeholder="Nhập dòng sản phẩm"
                          type="text"
                          onChange={(e) => setProductLine(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Thông tin máy</label>

                        <CKEditor
                          cols="80"
                          //   rows="5"
                          editor={ClassicEditor}
                          data={info}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setInfo(data);
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
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Mô tả</label>

                        <CKEditor
                          cols="80"
                          rows="5"
                          editor={ClassicEditor}
                          data={description}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
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
                    Tạo sản phẩm
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-imageProduct">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
              <hr></hr>

              <div className="button-container mr-auto ml-auto">
                <input
                  type="file"
                  name="avatar"
                  className="inputImageProduct"
                  // style="position:relative;overflow:hidden"
                  // name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
                {/* */}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateProduct;
