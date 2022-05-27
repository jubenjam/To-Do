import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfilePopup(props) {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmedNewPassword, setConfirmedNewPassword] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else setConfirmedNewPassword(value);
  }

  return (
    <Modal
      show={true}
      onHide={() => {
        props.setShow(false);
      }}
    >
      <Modal.Header>
        <button
          className="close"
          data-dismiss="modal"
          aria-hidden="true"
          onClick={() => {
            props.setShow(false);
          }}
        >
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              defaultValue={oldPassword}
              onChange={handleChange}
            />

            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              defaultValue={newPassword}
              onChange={handleChange}
            />

            <label htmlFor="confirmedNewPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmedNewPassword"
              id="confirmedNewPassword"
              defaultValue={confirmedNewPassword}
              onChange={handleChange}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <input
          type="button"
          value="Change Password"
          onClick={() => {
            props.setShow(false);
            props.changePassword(oldPassword, newPassword);
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ProfilePopup;
