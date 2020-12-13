import React, { useRef } from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../firebase";
import mime from "mime-types";
import { setPhotoURL } from "../../../redux/actions/user_action";

const UserPanel = () => {
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImageRef = useRef();
  const dispatch = useDispatch();

  const handleLogout = () => {
    firebase.auth().signOut();
  };
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    //스토리지에 파일 저장하기
    //user_image 폴더 안에다가 저장이 됨
    try {
      let uploadTaskSnapshot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metadata);

      let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

      //프로필 이미지 수정
      await firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL,
      });

      dispatch(setPhotoURL(downloadURL));

      //데이터베이스 유저 이미지 수정
      await firebase
        .database()
        .ref("users")
        .child(user.uid)
        .update({ image: downloadURL });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <h3 style={{ color: "white", display: "flex", alignItems: "center" }}>
        <IoIosChatboxes />
        <div style={{ marginLeft: "5px" }}> Chat App</div>
      </h3>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          style={{ width: "30px", height: "30px", marginTop: "3px" }}
          roundedCircle
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{
              background: "transparent",
              border: "0px",
            }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={handleUploadImage}
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        ref={inputOpenImageRef}
        type="file"
      />
    </div>
  );
};

export default UserPanel;
