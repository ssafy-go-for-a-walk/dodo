import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user";
export default function LoginPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = useCallback(async () => {
    await axios
      .get("https://j8b104.p.ssafy.io/api/users", {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      })
      .then(res => {
        const data = {
          token: params.token,
          loginUserPk: res.data.data.seq,
          loginUserEmail: res.data.data.email,
          loginUserImg: res.data.data.profileImage,
          loginUserNickname: res.data.data.nickname,
          selectedBucketlist: {
            pk: res.data.data.defaultBucketList.seq,
            title: res.data.data.defaultBucketList.title,
            completeRate: res.data.data.defaultBucketList.completeRate,
          },
          defaultBucketlist: {
            pk: res.data.data.defaultBucketList.seq,
            title: res.data.data.defaultBucketList.title,
            completeRate: res.data.data.defaultBucketList.completeRate,
          },
        };
        dispatch(login(data));
        if (res.data.data.firstLogin) {
          navigate("/setprofile");
        } else {
          navigate("/");
        }
      });
  }, [params, dispatch, navigate]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return <></>;
}
