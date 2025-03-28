import React, { useState } from "react"
import { useSkin } from "@hooks/useSkin"
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Modal
} from "reactstrap"
import olo from "../assets/images/logo/logo.svg"
import axios from "axios"
// import getRT from '../servirces/getRefreshToken'
import * as constant from "../configs/constant"
import Cookies from "cookies-js"
import { toast } from "react-toastify"
import { loginUser } from "../services/auth"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { handleLogin } from "../redux/actions/auth"
import { GoEyeClosed, GoEye } from "react-icons/go"

const Login = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [username, setUsername] = useState("kushan")//94779998877
  const [password, setPassword] = useState("123456")//841535
  const [errorMessage, setErrorMessage] = useState("")
  const [showEyeIcon, setShowEyeIcon] = useState(false)

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg"
  const source = require(`@src/assets/images/pages/${illustration}`).default

  const handleLoginSubmit = async () => {
    // if (!username) {
    //   toast.error("Username cannot be empty")
    // } else if (!password) {
    //   toast.error("Password cannot be empty")
    // } else {
    //   await loginUser({
    //     mobile: username,
    //     password
    //   }).then((res) => {
    //     if (res.success) {
    //       if (res?.result?.role === "ADMIN") {
    //         const userData = {
    //           id: res?.result?.userId ?? "",
    //           userName: res?.result?.userName ?? "",
    //           mobile: res?.result?.mobile ?? "",
    //           profilePic: res?.result?.profilePic ?? null
    //         }

    //         Cookies.set(constant.ACCESS_TOKEN, res.result.token)
    //         Cookies.set(constant.REFRESH_TOKEN, res.result.token)
    //         localStorage.setItem(constant.USER_DATA, JSON.stringify(userData))
    //         dispatch(handleLogin(userData))
            history.push("/dashboard")
        //   } else {
        //     toast.error("You are not an admin. Please use correct user details")
        //   }
        // } else if (res.status === 0) {
        //   toast.error("User data is incorrect")
        // } else {
        //   toast.error(
        //     "Connection refused: Unable to connect to the server. Please try again later"
        //   )
        // }
      // })
    }

    // console.log(username, password)
    // const userData = {
    //   mobile: username,
    //   password
    // }
  // }

  const toggleEyeIcon = () => {
    setShowEyeIcon(!showEyeIcon)
  }

  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Modal
          isOpen={true}
          toggle={() => { }}
          className="modal-dialog-centered modal-sm login-form"
          fade={false}
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col lg="12" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <CardBody>
                    <div className={"align-center"}>
                      <img
                        src={olo}
                        alt={"."}
                        className={"bcon-off-logo-reg"}
                        style={{ width: "50%", height: "50%" }}
                      />
                    </div>
                    <Form
                      onSubmit={(e) => e.preventDefault()}
                      className={"mt-1"}
                    >
                      {errorMessage && (
                        <div className="text-danger mb-2">{errorMessage}</div>
                      )}
                      <FormGroup className="form-label-group position-relative not-has-icon-left">
                        <Input
                          type="text"
                          placeholder="Mobile"
                          onChange={(e) => {
                            setUsername(e.target.value)
                          }}
                        />
                        <Label>Mobile</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative not-has-icon-left">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Input
                            style={{ paddingRight: 40 }}
                            type={showEyeIcon ? "Text" : "password"}
                            placeholder="Password"
                            onChange={(e) => {
                              setPassword(e.target.value)
                            }}
                          />
                          {
                            showEyeIcon ?
                              <GoEye size={18} style={{ position: 'absolute', right: 15 }} onClick={toggleEyeIcon} />
                              :
                              <GoEyeClosed size={18} style={{ position: 'absolute', right: 15 }} onClick={toggleEyeIcon} />
                          }
                        </div>
                        <Label>Password</Label>
                      </FormGroup>

                      <div className="d-flex justify-content-center center signin-btn-wrapper mt-3">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className={"cmn-gradient-bg signin-btn"}
                          onClick={handleLoginSubmit}
                        >
                          Login
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Modal>
      </Col>
    </Row>
  )
}

export default Login
