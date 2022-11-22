import React, { useEffect, useState } from "react";
import { splitText } from "../../utils/helper";
import Moment from "moment";
import { Link } from "react-router-dom";
const NewCard = ({ newFeed }) => {
  // console.log();
  // const [formatDate, setFormatDate] = useState();
  useEffect(() => {
    // setFormatDate(newFeed.createdAt);
  });
  const formatDate = Moment(newFeed.createdAt).format("DD-MM-YYYY");
  return (
    <div className="col-lg-6 col-md-6 col-sm-6">
      <div className="blog__item">
        <Link to={`/new/${newFeed._id}`}>
          <div className="blog__item__pic">
            <img src={newFeed.image} alt="" />
          </div>
          <div className="blog__item__text">
            <ul>
              <li>
                <i className="fa fa-calendar-o" />
                {/* <Moment></Moment> */}
                {formatDate}
              </li>
              <li>
                <i className="fa fa-comment-o" /> 5
              </li>
            </ul>
            <h5>
              <a href="#">{newFeed.title}</a>
            </h5>
            <p
              dangerouslySetInnerHTML={{
                __html: `${splitText(newFeed.content, 50)}`,
              }}
            ></p>
            <a href="#" className="blog__btn">
              Xem thêm <span className="arrow_right" />
            </a>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewCard;
