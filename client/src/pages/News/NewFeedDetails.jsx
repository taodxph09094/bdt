import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getNewFeed,
  getNewFeedDetails,
} from "../../actions/newFeedAction";
import Menu from "../../component/layout/Header/Menu";
import Sidebar from "./Sidebar";

const NewFeedDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { newFeed, error } = useSelector((state) => state.newFeedDetails);
  const { loading, newFeeds } = useSelector((state) => state.newFeeds);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getNewFeedDetails(match.params.id));
    dispatch(getNewFeed());
  }, [dispatch, match.params.id, error, alert]);
  return (
    <>
      <Menu />
      {/* <section
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
                <h2>
                  Tin tức<code></code>
                </h2>
                <div className="breadcrumb__option">
                  <a href="/">Home</a>
                  <span>Tin tức</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="blog spad">
        <div className="container">
          <div className="row">
            {newFeeds &&
              newFeeds.map((newFeed) => (
                <Sidebar key={newFeed._id} newFeed={newFeed} />
              ))}
            <div className="col-lg-8 col-md-7 order-md-1 order-1">
              <div className="blog__details__text">
                <h2>{newFeed.title}</h2>
                <img src={newFeed.image} alt="" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${newFeed.content}`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewFeedDetails;
