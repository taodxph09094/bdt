import React, { useEffect, useState } from "react";

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
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { formatCurrency } from "../../utils/helper";
import { getBrand } from "../../actions/brandAction";
const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { brand } = useSelector((state) => state.allBrand);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [promotion, setPromotion] = useState("");
  const [category, setCategory] = useState("");
  const [productLine, setProductLine] = useState("");
  const [company, setCompany] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [Stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch, alert, history]);
  const categories = [
    "Điện thoại",
    "Máy tính bản",
    "Đồng hồ",
    "Tai nghe",
    "Phụ kiện",
    "Laptop",
  ];
  const productId = match.params.id;
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setInfo(product.info);
      setCompany(product.company);
      setPrice(product.price);
      setProductLine(product.productLine);
      setPromotion(product.promotion);
      setCategory(product.category);
      setStock(product.Stock);
      setSupplier(product.supplier);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Sửa thông tin sản phẩm thành công");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("productLine", productLine);
    myForm.set("promotion", promotion);
    myForm.set("info", info);
    myForm.set("supplier", supplier);
    myForm.set("brand", company);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
                <Card.Title as="h4">Chỉnh sửa sản phẩm</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Mã sản phẩm</label>
                        <Form.Control
                          disabled
                          defaultValue={product._id}
                          placeholder="Mã sản phẩm"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Tên sản phẩm</label>
                        <Form.Control
                          defaultValue={name}
                          placeholder="Nhập tên sản phẩm"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="3">
                      <Form.Group>
                        <label>Khuyến mãi ( % )</label>
                        <Form.Control
                          // defaultValue={name}
                          defaultValue={promotion}
                          placeholder="Nhập % khuyến mãi"
                          type="text"
                          onChange={(e) => setPromotion(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Giá tiền gốc</label>
                        <Form.Control
                          defaultValue={price}
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
                          defaultValue={Stock}
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
                          defaultValue={company}
                          placeholder="Nhập hãng"
                          type="text"
                          onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <Form.Select
                          defaultValue={category}
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
                        {/* <h5>{info}</h5 */}
                        <CKEditor
                          cols="80"
                          defaultValue={info}
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
                          // rows="5"
                          editor={ClassicEditor}
                          defaultValue={description}
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
                    Sửa sản phẩm
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <label>Ảnh cũ</label>
              <div className="card-imageProduct">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      className="oldImagesProduct"
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
              </div>
            </Card>
            <Card>
              <label>Ảnh mới</label>
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
                  onChange={updateProductImagesChange}
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

export default UpdateProduct;
