import {
    Card, CardBody, Row, Col,
    Button,
    CardText,
    CardTitle,
    CardSubtitle,
    Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap"
import axios from "../../services/axiosConfig"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { setLoading } from "../../redux/actions/loading"
import {
    saveAdvertisement
} from "../../services/ads"
import { toast } from "react-toastify"
import styles from './style.css'

function Dashboard({ direction, ...args }) {
    const dispatch = useDispatch()
    const [addModal, setAddModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [images, setImages] = useState({})
    const [selectedItem, setSelectedItem] = useState(null)
    const [addingCount, setAddingCount] = useState("")

    const toggleAddModal = () => setAddModal(!addModal)
    const toggleRemoveModal = () => setRemoveModal(!removeModal)

    const getImage = async (imageName) => {
        try {
            const response = await fetch(`http://localhost:4000/upload/images/${imageName}`, {
                method: "GET"
            })

            if (!response.ok) {
                throw new Error("Failed to fetch image")
            }

            const blob = await response.blob()
            const imageUrl = URL.createObjectURL(blob)

            setImages((prevImages) => ({
                ...prevImages,
                [imageName]: imageUrl
            }))
        } catch (error) {
            console.error(`Error fetching image for ID ${imageName}:`, error)
        }
    }

    const getAllItems = async () => {
        dispatch(setLoading(true))

        try {
            const response = await axios.get("http://localhost:4000/api/products/allproduct", {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setAllProducts(response.data)
            response.data.forEach((item) => getImage(item.image))
        } catch (error) {
            console.error("Upload failed", error)
            toast.error("Data fetching failed, try again!.")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const updateQty = async (id) => {
        if (addingCount > 0) {
            try {
                const response = await fetch(`http://localhost:4000/api/products/update-qty/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ qty: addingCount })
                })

                await response.json()
                toast.success('Qty updated succefully')
            } catch (error) {
                toast.error('updated failed')
            } finally {
                getAllItems()
            }
        } else {
            toast.error('somrthing went wrong, try again!')
        }
    }

    const removeProduct = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:4000/api/products/remove-product/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()

            if (response.ok) {
                toast.success("Product removed successfully")
            } else {
                toast.error(data.message || "Error removing product")
            }
        } catch (error) {
            toast.error("Error connecting to the server")
        } finally {
            getAllItems()
        }
    }

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <Card className="advertisement-page-wrapper">
            <CardBody className="p-3">
                {/* <Row>
                    <Col md="8">
                        <h1 style={{ color: "black" }}>Product Manage</h1>
                    </Col>
                </Row>
                <hr /> */}
                <div className="category-products">
                    {
                        allProducts.map((product, index) => {
                            return (
                                <Card
                                    key={index}
                                    style={{
                                        width: "18rem",
                                        backgroundColor: '#EEEEEE'
                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        src={images[product.image]}
                                        style={{ maxHeight: 250 }}
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            {product?.name ?? "-"}{` (${product.qty})`}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            {product.category}
                                        </CardSubtitle>
                                        <CardText>
                                            {product.description}
                                        </CardText>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                                            <Button size='sm' color={'success'} outline style={{ width: '100%' }} onClick={() => { setSelectedItem(product); toggleAddModal() }}>
                                                Add
                                            </Button>
                                            <Button size='sm' color={'danger'} outline style={{ width: '100%' }} onClick={() => { setSelectedItem(product); toggleRemoveModal() }}>
                                                Remove
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            )
                        })
                    }
                </div>
            </CardBody>
            <div>
                <Modal isOpen={addModal} toggle={toggleAddModal}>
                    <ModalHeader toggle={toggleAddModal}>Add items for ' {selectedItem?.name} '</ModalHeader>
                    <ModalBody>
                        <Input placeholder={'Enter Count'} onChange={(e) => setAddingCount(e.target.value)} value={addingCount || ""} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => { updateQty(selectedItem?.id); toggleAddModal(); setAddingCount('') }}>
                            Add
                        </Button>{' '}
                        <Button color="danger" onClick={() => { toggleAddModal(); setAddingCount('') }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={removeModal} toggle={toggleRemoveModal}>
                    <ModalHeader toggle={toggleRemoveModal}>Do you want to remove ' {selectedItem?.name} ' from store</ModalHeader>
                    <ModalFooter>
                        <Button color="success" onClick={() => { removeProduct(selectedItem?.id); toggleRemoveModal() }}>
                            Yes
                        </Button>{' '}
                        <Button color="danger" onClick={toggleRemoveModal}>
                            No,Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Card>
    )
}

export default Dashboard
