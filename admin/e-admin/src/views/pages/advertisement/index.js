import {
  Card, CardBody, Row, Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap"
import axios from "./../../../services/axiosConfig"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { setLoading } from "../../../redux/actions/loading"
import {
  saveAdvertisement
} from "../../../services/ads"
import { toast } from "react-toastify"
import { success } from "toastr"
import { v4 as uuidv4 } from 'uuid'

function Advertisement({ direction, ...args }) {
  const dispatch = useDispatch()

  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [category, setCategory] = useState(null)
  const [itemName, setItemName] = useState(null)
  const [file, setFile] = useState(null)
  const [newPrice, setNewPrice] = useState(null)
  const [oldPrice, setOldPrice] = useState(null)
  const [description, setDescription] = useState(null)
  const [qty, setQty] = useState(null)

  const toggle = () => setDropdownOpen((prevState) => !prevState)

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const saveItem = async () => {
    if (!file) {
      toast.error("Please select an image.")
      return
    }

    dispatch(setLoading(true))

    const formData = new FormData()
    formData.append("id", uuidv4())
    formData.append("name", itemName)
    formData.append("image", file)
    formData.append("category", category)
    formData.append("new_price", newPrice)
    formData.append("old_price", oldPrice)
    formData.append("description", description)
    formData.append("qty", qty)

    try {
      const response = await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      console.log(response.data)
      toast.success("Item uploaded successfully!")
    } catch (error) {
      console.error("Upload failed", error)
      toast.error("Upload failed.")
    } finally {
      setPreview(null)
      setCategory('')
      setItemName('')
      setOldPrice('')
      setNewPrice('')
      setQty('')
      setDescription('')
      dispatch(setLoading(false))
    }
  }


  const getDataHandler = async () => {
    // dispatch(setLoading(true))
    // await getAllAdvertisementLayouts()
    //   .then((res) => {
    //     if (res.success) {
    //       setData(res?.result ?? [])
    //     } else if (res.result) {
    //       toast.error(res.result)
    //     } else {
    //       toast.error("Somthing wrong")
    //     }
    //   })
    //   .finally(() => {
    //     dispatch(setLoading(false))
    //   })
  }

  useEffect(() => {
    getDataHandler()
  }, [])

  return (
    <Card className="advertisement-page-wrapper">
      <CardBody className="p-3">
        <Row>
          <Col md="8">
            <h1 style={{ color: "black" }}>Advertisement Manage</h1>
          </Col>
        </Row>

        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Custom Upload Button */}
          <button
            onClick={handleClick}
            // className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            style={{
              backgroundColor: 'white',
              border: '1px solid gray',
              borderRadius: 5,
              paddingLeft: 150,
              paddingRight: 150,
              paddingTop: 10,
              paddingBottom: 10,
              outline: 'none'
            }}
          >
            Select Image
          </button>
          {/* Image Preview */}
          {preview && (
            <div className="relative" style={{ marginTop: 20 }}>
              <img src={preview} alt="Preview" style={{ width: 400, height: 200 }} />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
              <DropdownToggle style={{ width: '395px', marginTop: 10 }} color='dark' caret>{category ?? "Category"}</DropdownToggle>
              <DropdownMenu style={{ width: '395px', marginTop: 10 }} {...args}>
                <DropdownItem onClick={() => setCategory('Women')} style={{ width: '395px', marginTop: 10 }}>Women</DropdownItem>
                <DropdownItem onClick={() => setCategory('Gents')} style={{ width: '395px', marginTop: 10 }}>Gents</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <input type="text" placeholder="Item Name" onChange={(e) => setItemName(e.target.value)} value={itemName} style={{ width: 395, height: 40, borderRadius: 5, marginTop: 10, outline: 'none', border: '1px solid gray', paddingLeft: 5 }} />
            <input type="text" placeholder="Old Price" onChange={(e) => setOldPrice(e.target.value)} value={oldPrice} style={{ width: 395, height: 40, borderRadius: 5, marginTop: 10, outline: 'none', border: '1px solid gray', paddingLeft: 5 }} />
            <input type="text" placeholder="New Price" onChange={(e) => setNewPrice(e.target.value)} value={newPrice} style={{ width: 395, height: 40, borderRadius: 5, marginTop: 10, outline: 'none', border: '1px solid gray', paddingLeft: 5 }} />
            <input type="number" placeholder="qty" onChange={(e) => setQty(e.target.value)} value={qty} style={{ width: 395, height: 40, borderRadius: 5, marginTop: 10, outline: 'none', border: '1px solid gray', paddingLeft: 5 }} />
            <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description} style={{ width: 395, height: 40, borderRadius: 5, marginTop: 10, outline: 'none', border: '1px solid gray', paddingLeft: 5 }} />
            <Button
              color="success"
              disabled={
                !preview || !category || !itemName || !oldPrice || !newPrice || !qty || !description
              }
              style={{ marginTop: 15 }}
              onClick={saveItem}
            >
              Save Item
            </Button>
          </div>
        </div>

        <hr />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            maxWidth: "100%"
          }}
        >
        </div>
      </CardBody>
    </Card>
  )
}

export default Advertisement
