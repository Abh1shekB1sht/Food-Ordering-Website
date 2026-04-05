import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.delete(`${url}/api/food/remove`, {
            data: { id: foodId },
        });
        if (response.data.success) {
            toast.success(response.data.message);
            fetchList();
        } else {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Actions</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img
                                src={`${url}/images/` + item.image}
                                alt="Food Image"
                            />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p
                                onClick={() => removeFood(item._id)}
                                className="cursor"
                            >
                                X
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;
