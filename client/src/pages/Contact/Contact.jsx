import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback } from "../../actions/feedbackAction";
import { loadUser } from "../../actions/userAction";
import Menu from "../../component/layout/Header/Menu";
import Loader from "../../component/layout/Loader/Loader";
import {
  CLEAR_ERRORS,
  CREATE_FEEDBACK_RESET,
} from "../../constants/feedbackConstants";

const Contact = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newFeedback);
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERRORS());
    }

    if (success) {
      alert.success("Thêm bài viết thành công");
      history.push("/contact");
      dispatch({ type: CREATE_FEEDBACK_RESET });
    }
    // dispatch(loadUser());
  }, [dispatch, alert, error, history, success, user]);
  // console.log(user.name);
  const createProductSubmitHandler = (e) => {
    if (user.name === user.name) {
      e.preventDefault();

      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("content", content);
      dispatch(createFeedback(myForm));
    } else {
      alert.success("Bạn cần đăng nhập để thực hiện");
    }
  };
  return (
    <>
      <Menu />
      <section
        className="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb.jpg"
        style={{
          backgroundImage: `url("img/breadcrumb.jpg")`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Liên hệ chúng tôi</h2>
                <div className="breadcrumb__option">
                  <a href="/">Home</a>
                  <span>Liên hệ chúng tôi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -------- */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_phone" />
                <h4>Phone</h4>
                <p>+01-3-8888-6868</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_pin_alt" />
                <h4>Địa chỉ</h4>
                <p>Hà Nội</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_clock_alt" />
                <h4>Thời gian mở</h4>
                <p>10:00 am to 23:00 pm</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_mail_alt" />
                <h4>Email</h4>
                <p>hello@colorlib.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ---------- */}
      <div className="map">
        {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d126334.13059900698!2d106.00270485081117!3d20.93803140932793!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1661324510625!5m2!1svi!2s"
          height={500}
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
        <div className="map-inside">
          <i className="icon_pin" />
          <div className="inside-widget">
            <h4>Hà Nội</h4>
            <ul>
              <li>Phone: +12-345-6789</li>
              <li>Add: 16 Creek Ave. Farmingdale, NY</li>
            </ul>
          </div>
        </div>
      </div>
      {/* -------- */}
      <div className="contact-form spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact__form__title">
                <h2>Gửi email</h2>
              </div>
            </div>
          </div>
          <form action="#" onSubmit={createProductSubmitHandler}>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <input
                  type="text"
                  value={name}
                  placeholder="Nhập tên của bạn"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <input
                  type="text"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-lg-12 text-center">
                <textarea
                  placeholder="Nhập nội dung"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="site-btn">
                  Gửi email
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
